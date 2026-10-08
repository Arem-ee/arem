/**
 * ==========================================================================
 * Design Page — Shower-like Curtain Cascading Fountain Engine
 * Real Physics 2D Parabolic Jets, Rain Bars, Droplet Pinch-off & Impact Zone
 * ==========================================================================
 */

(function () {
  "use strict";

  const canvas = document.getElementById("fountain-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const section = document.getElementById("fountain-section");
  const wrapper = document.getElementById("design-wrapper");
  const poolEl = document.getElementById("fountain-pool");

  const cards = Array.from(document.querySelectorAll(".design-card"));
  const rows = Array.from(document.querySelectorAll(".design-row"));

  let width = 0;
  let height = 0;
  let dpr = 1;

  // Global physics constants
  const G = 2600; // px/s^2

  // Sim state for cards: tilt spring angles, angular velocities, and fill state
  const cardStates = cards.map((_, i) => ({
    index: i,
    isOdd: i % 2 === 0, // Card 1 is index 0 (odd)
    angle: 0, // Current rotation angle in degrees
    targetAngle: 0,
    angularVelocity: 0,
    fill: 0, // 0 to 1
    flowActive: false
  }));

  // Shower systems: 0 (Shower head -> Card 1), 1..5 (Card i -> Card i+1), 6 (Card 6 -> Pool)
  let showers = [];

  // Splash & particle pools for impact zones
  const splashParticles = [];
  const rippleRings = [];
  const foamBubbles = [];
  const mistPuffs = [];

  function isMobile() {
    return window.innerWidth < 900;
  }

  function getOffsetRelativeToSection(el) {
    if (!el || !section) return { x: 0, y: 0, w: 0, h: 0 };
    let x = 0;
    let y = 0;
    let curr = el;
    while (curr && curr !== section) {
      x += curr.offsetLeft;
      y += curr.offsetTop;
      curr = curr.offsetParent;
    }
    return {
      x,
      y,
      w: el.offsetWidth,
      h: el.offsetHeight,
      right: x + el.offsetWidth,
      bottom: y + el.offsetHeight
    };
  }

  // Smooth pseudo-noise function for lateral air sway
  function noise(seed, t) {
    return Math.sin(t * 4.5 + seed * 2.3) * 0.6 + Math.sin(t * 2.1 + seed * 5.7) * 0.4;
  }

  class ShowerSystem {
    constructor(sourceIndex, targetIndex) {
      this.sourceIndex = sourceIndex; // -1 for shower head, 0..5 for cards
      this.targetIndex = targetIndex; // 0..5 for cards, 6 for pool
      this.active = false;
      this.flowProgress = 0; // 0 to 1
      this.activeTime = 0;
      this.jets = [];
      this.initJets();
    }

    initJets() {
      const mobile = isMobile();
      const N = this.sourceIndex === -1 
        ? (mobile ? 12 : 17) 
        : (mobile ? 10 : 14);
      const w0 = mobile ? 2.8 : 3.4;

      this.jets = [];
      for (let k = 0; k < N; k++) {
        const vy0 = 90 + (Math.random() - 0.5) * 30; // 90 +/- 15
        const outward = this.sourceIndex === -1 ? 0 : (this.sourceIndex % 2 === 0 ? 1 : -1);
        const fan = (N > 1) ? ((k / (N - 1)) - 0.5) * 2 * 36 : 0;
        const vx = outward * 28 + fan + (Math.random() - 0.5) * 8;
        const startTime = Math.random() * 0.25; // starts within 0.25s

        this.jets.push({
          k,
          N,
          w0,
          vy0,
          vx,
          startTime,
          flowTime: 0,
          highlightOffset: Math.random() * 100,
          seed: Math.random() * 1000,
          landTime: 0,
          Hx: 0,
          Hy: 0,
          Tx: 0,
          Ty: 0,
          landed: false
        });
      }
    }

    recalcHoles() {
      const mobile = isMobile();
      const N = this.jets.length;

      // Source is card `this.sourceIndex` (Card 0 to Card 5)
      const cardEl = cards[this.sourceIndex];
      if (!cardEl) return;
      const state = cardStates[this.sourceIndex];
      const cardPos = getOffsetRelativeToSection(cardEl);
      const cardCenter = {
        x: cardPos.x + cardPos.w / 2,
        y: cardPos.y + cardPos.h / 2
      };

      const isOdd = state.isOdd;
      const barLen = mobile ? 60 : Math.min(120, Math.max(88, window.innerWidth * 0.09));
      const barYUnrot = cardPos.y - 8 + 4.5; // level with basin rim

      const radCard = (state.angle * Math.PI) / 180;
      // The bar droops 2 degrees more than the card's own angle
      const droopDeg = state.angle + (isOdd ? 2 : -2);
      const radDroop = (droopDeg * Math.PI) / 180;

      // In the DOM, the rod starts after the throat (8px) and collar (18px) = 26px outside card edge
      const mountOffset = mobile ? (8 + 14) : (8 + 18);

      this.jets.forEach((jet, k) => {
        let baseHoleX;
        if (isOdd) {
          // Right pour end: rod spans from card right + 26px outward
          baseHoleX = cardPos.x + cardPos.w + mountOffset + (k / (N - 1)) * barLen;
        } else {
          // Left pour end: rod spans from card left - 26px - barLen to card left - 26px
          baseHoleX = cardPos.x - mountOffset - barLen + (k / (N - 1)) * barLen;
        }

        // Card rotation around center
        const dxC = baseHoleX - cardCenter.x;
        const dyC = barYUnrot - cardCenter.y;
        const rotHx = cardCenter.x + dxC * Math.cos(radCard) - dyC * Math.sin(radCard);
        const rotHy = cardCenter.y + dxC * Math.sin(radCard) + dyC * Math.cos(radCard);

        // Apply small bar droop offset
        const droopDist = (k / (N - 1)) * barLen;
        const extraDroopY = Math.sin(radDroop - radCard) * droopDist;

        jet.Hx = rotHx;
        jet.Hy = rotHy + extraDroopY;
      });

      // Solve landing times on next target
      this.solveLandings();
    }

    solveLandings() {
      let targetCenter = { x: 0, y: 0 };
      let targetSlope = 0;
      let targetBasinY = 0;

      if (this.targetIndex < 6) {
        const nextCard = cards[this.targetIndex];
        const nextState = cardStates[this.targetIndex];
        const nextPos = getOffsetRelativeToSection(nextCard);
        targetCenter = {
          x: nextPos.x + nextPos.w / 2,
          y: nextPos.y + nextPos.h / 2
        };
        targetBasinY = nextPos.y - 14 + 12; // basin surface height
        targetSlope = Math.tan((nextState.angle * Math.PI) / 180);
      } else {
        // Pool
        const poolPos = getOffsetRelativeToSection(poolEl);
        targetCenter = { x: poolPos.x + poolPos.w / 2, y: poolPos.y + 16 };
        targetBasinY = poolPos.y + 16;
        targetSlope = 0;
      }

      this.jets.forEach(jet => {
        // Quadratic: 0.5 * G * t^2 + (vy0 - m * vx) * t + (Hy - y0 - m*(Hx - x0)) = 0
        const A = 0.5 * G;
        const B = jet.vy0 - targetSlope * jet.vx;
        const C = jet.Hy - targetBasinY - targetSlope * (jet.Hx - targetCenter.x);
        const disc = B * B - 4 * A * C;
        if (disc > 0) {
          jet.landTime = (-B + Math.sqrt(disc)) / (2 * A);
        } else {
          jet.landTime = 0.45;
        }

        // Target impact coords
        jet.Tx = jet.Hx + jet.vx * jet.landTime;
        jet.Ty = jet.Hy + jet.vy0 * jet.landTime + 0.5 * G * jet.landTime * jet.landTime;
      });
    }

    update(dt) {
      if (!this.active) return;
      this.activeTime += dt;

      this.recalcHoles();

      let anyLanded = false;

      this.jets.forEach(jet => {
        if (this.activeTime > jet.startTime) {
          jet.flowTime += dt;
          jet.highlightOffset += dt * 320;

          // Check if jet front has reached target
          if (jet.flowTime >= jet.landTime) {
            if (!jet.landed) {
              jet.landed = true;
              anyLanded = true;
              // Trigger impulse on target card
              if (this.targetIndex < 6) {
                applyCardImpulse(this.targetIndex);
              }
            }

            // Continuous impact emission across width
            emitImpact(jet.Tx, jet.Ty, dt, this.targetIndex);
          }
        }
      });
    }

    draw(ctx) {
      if (!this.active || this.jets.length === 0) return;

      const mobile = isMobile();

      // 1. Soft Shadow on the page (drawn before the jets)
      // Jets as thin lines offset 7px right and 5px down, blurred in --water-shadow at 16% opacity
      ctx.save();
      ctx.shadowColor = "rgba(34, 33, 30, 0.16)";
      ctx.shadowBlur = 6;
      ctx.shadowOffsetX = 7;
      ctx.shadowOffsetY = 5;
      ctx.strokeStyle = "rgba(34, 33, 30, 0.08)";
      ctx.lineWidth = 1.2;

      this.jets.forEach(jet => {
        if (jet.flowTime <= 0) return;
        const maxT = Math.min(jet.flowTime, jet.landTime);
        if (maxT <= 0) return;

        ctx.beginPath();
        const steps = 14;
        for (let s = 0; s <= steps; s++) {
          const t = (s / steps) * maxT;
          const x = jet.Hx + jet.vx * t;
          const y = jet.Hy + jet.vy0 * t + 0.5 * G * t * t;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });
      ctx.restore();

      // 2. The Sheet at the Top (First 22% of fall)
      // Continuous translucent curtain between neighbouring jets, fading to 30% of fall
      const maxSheetRatio = 0.26;
      const validJets = this.jets.filter(j => j.flowTime > 0);
      if (validJets.length >= 2) {
        ctx.save();
        ctx.beginPath();

        // Polygon along top points then back along lower points
        const tSlice = Math.min(0.12, validJets[0].landTime * 0.22);
        validJets.forEach((j, idx) => {
          const t = Math.min(j.flowTime, tSlice);
          const x = j.Hx + j.vx * t;
          const y = j.Hy + j.vy0 * t + 0.5 * G * t * t;
          if (idx === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        });

        // Top line
        for (let idx = validJets.length - 1; idx >= 0; idx--) {
          const j = validJets[idx];
          ctx.lineTo(j.Hx, j.Hy);
        }
        ctx.closePath();

        const sheetGrad = ctx.createLinearGradient(validJets[0].Hx, validJets[0].Hy, validJets[0].Hx, validJets[0].Hy + 40);
        sheetGrad.addColorStop(0, "rgba(150, 200, 216, 0.35)");
        sheetGrad.addColorStop(0.7, "rgba(150, 200, 216, 0.22)");
        sheetGrad.addColorStop(1, "rgba(150, 200, 216, 0.0)");

        ctx.fillStyle = sheetGrad;
        ctx.fill();

        // Thin bright foam line just under the bar
        ctx.beginPath();
        validJets.forEach((j, idx) => {
          if (idx === 0) ctx.moveTo(j.Hx, j.Hy + 2);
          else ctx.lineTo(j.Hx, j.Hy + 2);
        });
        ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
        ctx.lineWidth = 1.2;
        ctx.stroke();

        ctx.restore();
      }

      // 3. Draw each jet with cylinder shading, continuity thinning, breakup beads, and highlights
      this.jets.forEach(jet => {
        if (jet.flowTime <= 0) return;
        const maxT = Math.min(jet.flowTime, jet.landTime);
        if (maxT <= 0) return;

        // Hole width growth from 20% to 100% over 0.4s
        const widthGrowth = Math.min(1, 0.2 + (jet.flowTime / 0.4) * 0.8);
        const w0 = jet.w0 * widthGrowth;

        const steps = 30;
        let prevPoint = null;

        for (let s = 0; s <= steps; s++) {
          const t = (s / steps) * maxT;
          const prog = t / jet.landTime; // 0 to 1

          // Speed v at time t
          const vy = jet.vy0 + G * t;
          const v = Math.hypot(jet.vx, vy);

          // Continuity thinning: w = w0 * sqrt(vy0 / v)
          let w = Math.max(1.1, w0 * Math.sqrt(jet.vy0 / v));

          // Air sway: lateral wobble from smooth noise growing from 0 to 2px
          const sway = noise(jet.seed, this.activeTime) * (prog * 2.0);

          const x = jet.Hx + jet.vx * t + sway;
          const y = jet.Hy + jet.vy0 * t + 0.5 * G * t * t;

          // Section 3.5 Breakup: from 45% of fall, pinches into beads
          if (prog >= 0.45) {
            const wave = Math.sin((y / Math.max(2, w * 5)) + this.activeTime * 14);
            const pinchDepth = Math.min(0.9, (prog - 0.45) * 1.8);
            w *= Math.max(0.2, 1 - pinchDepth * (0.5 + 0.5 * wave));
          }

          if (prevPoint) {
            if (prog >= 0.85) {
              // Last 15%: separate elongated droplets
              const beadCycle = Math.sin((y / 10) + this.activeTime * 18);
              if (beadCycle > 0.15) {
                ctx.save();
                ctx.fillStyle = "rgba(150, 200, 216, 0.75)";
                ctx.beginPath();
                ctx.ellipse(x, y, w * 0.9, w * 2.4, 0, 0, Math.PI * 2);
                ctx.fill();

                // Highlight droplet core
                ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
                ctx.beginPath();
                ctx.arc(x - w * 0.25, y - w * 0.4, Math.max(0.4, w * 0.4), 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
              }
            } else {
              // Main cylinder stream segment
              ctx.save();

              // Left edge --water-light (85%), middle --water (55%), right edge --water-deep (75%)
              ctx.beginPath();
              ctx.moveTo(prevPoint.x, prevPoint.y);
              ctx.lineTo(x, y);

              const strokeGrad = ctx.createLinearGradient(x - w, y, x + w, y);
              strokeGrad.addColorStop(0.0, "rgba(205, 230, 239, 0.85)");
              strokeGrad.addColorStop(0.4, "rgba(150, 200, 216, 0.55)");
              strokeGrad.addColorStop(1.0, "rgba(90, 154, 176, 0.75)");

              ctx.strokeStyle = strokeGrad;
              ctx.lineWidth = w;
              ctx.lineCap = "round";
              ctx.stroke();

              // Section 3.3 Highlight filament of dashes traveling down at v / 6
              const dashPhase = (jet.highlightOffset + y * 0.25) % 18;
              if (dashPhase < 8 && prog < 0.82) {
                ctx.beginPath();
                ctx.moveTo(prevPoint.x - w * 0.35, prevPoint.y);
                ctx.lineTo(x - w * 0.35, y);
                ctx.strokeStyle = "rgba(255, 255, 255, 0.85)";
                ctx.lineWidth = Math.max(0.6, w * 0.28);
                ctx.stroke();
              }

              ctx.restore();
            }
          }

          prevPoint = { x, y };
        }
      });
    }
  }

  // Tilt spring simulation for each card (Section 2 & Section 7)
  function applyCardImpulse(cardIdx) {
    if (cardIdx >= 0 && cardIdx < cardStates.length) {
      const state = cardStates[cardIdx];
      // Wobble impulse when water lands
      state.angularVelocity += state.isOdd ? 0.35 : -0.35;
    }
  }

  function updateCardPhysics(dt) {
    const mobile = isMobile();
    cards.forEach((cardEl, idx) => {
      const state = cardStates[idx];

      // Base tilt toward pour end: Card tilts toward pour end, tips further as basin fills
      // Section 7 Mobile: tilt is 1.8 deg + 0.6 deg * fill
      // Desktop: 2.2 deg + 0.8 deg * fill
      const baseTilt = mobile ? 1.8 : 2.2;
      const extraFillTilt = mobile ? 0.6 : 0.8;
      const targetDeg = (baseTilt + extraFillTilt * state.fill) * (state.isOdd ? 1 : -1);

      // Spring physics: F = -k * (x - target) - c * v
      const springK = 38;
      const damping = 7.5;
      const diff = state.angle - targetDeg;
      const force = -springK * diff - damping * state.angularVelocity;

      state.angularVelocity += force * dt;
      state.angle += state.angularVelocity * dt;

      // Apply transform to DOM card
      cardEl.style.transform = `rotate(${state.angle.toFixed(3)}deg)`;

      // Section 1: Basin water surface counter-rotation
      // Counter-rotated by 60% of card angle + slosh (-0.02 * angularVelocity)
      const counterAngle = -0.6 * state.angle + (-0.02 * state.angularVelocity);
      drawBasinSurface(cardEl, idx, counterAngle, state.fill);
    });
  }

  // Draw basin counter-rotated water line in canvas atop each card (Section 1)
  function drawBasinSurface(cardEl, idx, counterAngleDeg, fill) {
    const basinCanvas = cardEl.querySelector(".design-basin-canvas");
    if (!basinCanvas) return;
    const bCtx = basinCanvas.getContext("2d");
    if (!bCtx) return;

    const w = basinCanvas.width;
    const h = basinCanvas.height;
    bCtx.clearRect(0, 0, w, h);

    const rad = (counterAngleDeg * Math.PI) / 180;
    const midY = h * (0.65 - fill * 0.2); // rises as basin fills

    bCtx.save();
    bCtx.translate(w / 2, midY);
    bCtx.rotate(rad);

    // Water polygon
    bCtx.beginPath();
    bCtx.moveTo(-w, 0);
    bCtx.lineTo(w, 0);
    bCtx.lineTo(w, h * 2);
    bCtx.lineTo(-w, h * 2);
    bCtx.closePath();

    const basinGrad = bCtx.createLinearGradient(0, -6, 0, h);
    basinGrad.addColorStop(0, "rgba(220, 242, 245, 0.85)");
    basinGrad.addColorStop(0.3, "rgba(150, 200, 216, 0.7)");
    basinGrad.addColorStop(1, "rgba(90, 154, 176, 0.85)");

    bCtx.fillStyle = basinGrad;
    bCtx.fill();

    // Surface meniscus line
    bCtx.beginPath();
    bCtx.moveTo(-w, 0);
    bCtx.lineTo(w, 0);
    bCtx.strokeStyle = "rgba(255, 255, 255, 0.9)";
    bCtx.lineWidth = 1.6;
    bCtx.stroke();

    bCtx.restore();
  }

  // SECTION 4 - IMPACT ACROSS THE WIDTH
  function emitImpact(Tx, Ty, dt, targetIdx) {
    // 1) Splash droplets: 1 to 2 droplets per frame
    const count = 1 + (Math.random() < 0.4 ? 1 : 0);
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * (Math.PI / 3); // within 60 deg of straight up
      const speed = 120 + Math.random() * 200; // 120 to 320 px/s
      const size = Math.random() < 0.85 ? (0.7 + Math.random() * 1.5) : (3 + Math.random() * 1.0);
      splashParticles.push({
        x: Tx + (Math.random() - 0.5) * 6,
        y: Ty,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size,
        life: 0.12, // fades 120ms after leaving
        maxLife: 0.12,
        alpha: 0.95
      });
    }

    // 2) Ripples: emit elliptical rings (6 to 1 ratio) taking turns every 0.22s
    if (!emitImpact.lastRippleTime || performance.now() - emitImpact.lastRippleTime > 220) {
      emitImpact.lastRippleTime = performance.now();
      rippleRings.push({
        x: Tx + (Math.random() - 0.5) * 16,
        y: Ty + (Math.random() - 0.5) * 3,
        rx: 2,
        ry: 2 / 6,
        life: 1.4,
        maxLife: 1.4,
        alpha: 0.7
      });
    }

    // 3) Foam: small bubbles across the whole zone
    if (foamBubbles.length < 35 && Math.random() < 0.25) {
      foamBubbles.push({
        x: Tx + (Math.random() - 0.5) * 28,
        y: Ty + (Math.random() - 0.5) * 6,
        size: 1 + Math.random() * 2,
        life: 1.5,
        maxLife: 1.5,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() - 0.5) * 4,
        alpha: 0.9
      });
    }

    // 4) Mist: soft white-blue circles rising 20px over 2s
    if (mistPuffs.length < 18 && Math.random() < 0.08) {
      mistPuffs.push({
        x: Tx + (Math.random() - 0.5) * 36,
        y: Ty,
        r: 10 + Math.random() * 16,
        life: 2.0,
        maxLife: 2.0,
        vy: -10, // rises 20px over 2s
        alpha: 0.11
      });
    }
  }

  function updateParticles(dt) {
    // Splash droplets
    for (let i = splashParticles.length - 1; i >= 0; i--) {
      const p = splashParticles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += G * dt * 0.45;
      p.life -= dt;
      p.alpha = Math.max(0, p.life / p.maxLife);
      if (p.life <= 0) {
        // Falling back makes tiny ripple
        if (Math.random() < 0.5 && rippleRings.length < 24) {
          rippleRings.push({
            x: p.x,
            y: p.y,
            rx: 1.5,
            ry: 0.3,
            life: 0.7,
            maxLife: 0.7,
            alpha: 0.5
          });
        }
        splashParticles.splice(i, 1);
      }
    }

    // Ripples
    for (let i = rippleRings.length - 1; i >= 0; i--) {
      const r = rippleRings[i];
      r.rx += dt * 38;
      r.ry = r.rx / 6;
      r.life -= dt;
      r.alpha = Math.max(0, (r.life / r.maxLife) * 0.7);
      if (r.life <= 0) rippleRings.splice(i, 1);
    }

    // Foam
    for (let i = foamBubbles.length - 1; i >= 0; i--) {
      const b = foamBubbles[i];
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.life -= dt;
      b.alpha = Math.max(0, (b.life / b.maxLife) * 0.9);
      if (b.life <= 0) foamBubbles.splice(i, 1);
    }

    // Mist
    for (let i = mistPuffs.length - 1; i >= 0; i--) {
      const m = mistPuffs[i];
      m.y += m.vy * dt;
      m.r += dt * 3;
      m.life -= dt;
      m.alpha = Math.max(0, (m.life / m.maxLife) * 0.12);
      if (m.life <= 0) mistPuffs.splice(i, 1);
    }
  }

  function drawParticles(ctx) {
    ctx.save();

    // 1. Mist
    mistPuffs.forEach(m => {
      ctx.beginPath();
      ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(205, 230, 239, ${m.alpha})`;
      ctx.fill();
    });

    // 2. Ripples (elliptical with bright line top, darker line below)
    rippleRings.forEach(r => {
      ctx.beginPath();
      ctx.ellipse(r.x, r.y, r.rx, r.ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha * 0.9})`;
      ctx.lineWidth = Math.max(0.7, 2.0 * (r.life / r.maxLife));
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(r.x, r.y + 1, r.rx * 0.95, r.ry * 0.95, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(90, 154, 176, ${r.alpha * 0.6})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    // 3. Foam bubbles
    foamBubbles.forEach(b => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240, 250, 255, ${b.alpha})`;
      ctx.fill();

      // Bubble highlight
      ctx.beginPath();
      ctx.arc(b.x - b.size * 0.3, b.y - b.size * 0.3, Math.max(0.4, b.size * 0.3), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.95})`;
      ctx.fill();
    });

    // 4. Splash droplets
    splashParticles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
      ctx.fill();
    });

    ctx.restore();
  }

  // Section 6: Cascade Sequence
  // Card 1 starts full -> Shower 0 pours to Card 2 -> fills Card 2 -> spills into Shower 1 -> ... -> Pool
  function updateCascadeSequence(dt) {
    // Card 1 is the fountain source tray, always full
    if (cardStates[0]) {
      cardStates[0].fill = 1;
    }

    // Shower 0 (Card 1 -> Card 2) is always active
    if (showers.length > 0 && !showers[0].active) {
      showers[0].active = true;
    }

    // Fill subsequent cards as water arrives
    for (let i = 1; i < 6; i++) {
      const prevShower = showers[i - 1]; // shower landing on Card i
      const nextShower = showers[i];     // shower spilling from Card i
      const state = cardStates[i];

      if (prevShower && prevShower.active) {
        // Card i fills over 1.2s once water lands
        if (state.fill < 1) {
          state.fill = Math.min(1, state.fill + dt * 0.85);
        }

        // Once filled to 85%, water starts spilling into next shower
        if (state.fill >= 0.85 && nextShower && !nextShower.active) {
          nextShower.active = true;
        }
      }
    }
  }

  function resize() {
    if (!section) return;
    dpr = window.devicePixelRatio || 1;
    width = section.clientWidth;
    height = section.clientHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.scale(dpr, dpr);

    showers.forEach(s => s.recalcHoles());
  }

  function initShowers() {
    showers = [];
    // Showers 0..4: Card i -> Card i+1 (Card 1 pours to Card 2, etc.)
    for (let i = 0; i < 5; i++) {
      showers.push(new ShowerSystem(i, i + 1));
    }

    // Shower 5: Card 6 -> Pool
    showers.push(new ShowerSystem(5, 6));

    showers.forEach(s => s.recalcHoles());
  }

  let lastTimestamp = 0;
  function animate(timestamp) {
    if (!lastTimestamp) lastTimestamp = timestamp;
    const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.033);
    lastTimestamp = timestamp;

    ctx.clearRect(0, 0, width, height);

    updateCascadeSequence(dt);
    updateCardPhysics(dt);

    showers.forEach(s => {
      s.update(dt);
      s.draw(ctx);
    });

    updateParticles(dt);
    drawParticles(ctx);

    requestAnimationFrame(animate);
  }

  function init() {
    initShowers();
    resize();

    window.addEventListener("resize", () => {
      resize();
    }, { passive: true });

    window.addEventListener("load", () => {
      resize();
    });

    requestAnimationFrame(animate);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
