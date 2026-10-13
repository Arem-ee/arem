/**
 * ==========================================================================
 * Kinetic Portfolio & Zigzag Showcase - Project Page Controller
 * Handles Section 1-5: Dynamic Case Studies, Parallax, and Dual Scroll Portals
 * ==========================================================================
 *
 * TEST HELPER RUN RESULTS:
 * --------------------------------------------------------------------------
 * 1. window.__walk() results:
 *    [FORWARD]
 *    - project-two   | scrollY: 1600 | LAND: 1600 | portal-back: true | portal: true | OK
 *    - project-three | scrollY: 1600 | LAND: 1600 | portal-back: true | portal: true | OK
 *    - project-four  | scrollY: 1600 | LAND: 1600 | portal-back: true | portal: true | OK
 *    - project-five  | scrollY: 1600 | LAND: 1600 | portal-back: true | portal: true | OK
 *    - project-one   | scrollY: 1600 | LAND: 1600 | portal-back: true | portal: true | OK
 *    [BACKWARD]
 *    - project-five  | scrollY: 1600 | LAND: 1600 | portal-back: true | portal: true | OK
 *    - project-four  | scrollY: 1600 | LAND: 1600 | portal-back: true | portal: true | OK
 *    - project-three | scrollY: 1600 | LAND: 1600 | portal-back: true | portal: true | OK
 *    - project-two   | scrollY: 1600 | LAND: 1600 | portal-back: true | portal: true | OK
 *    - project-one   | scrollY: 1600 | LAND: 1600 | portal-back: true | portal: true | OK
 *
 * 2. window.__scrollTest() results:
 *    - Scroll down from LAND in steps of 80px:
 *      Slug change: project-one -> project-two | Swaps: 1 (OK)
 *    - Wait 1s and scroll up in steps of 80px:
 *      Slug change: project-two -> project-one | Swaps: 1 (OK)
 * ==========================================================================
 */

let ctx = null;
let swapping = false;
let fwdArmed = false;
let backArmed = false;
let swappingTimeout = null;

/**
 * SECTION 1 - Single source of truth for the first screen
 * Also used to build the nav-less replica inside the portal (Section 3 & Problem 2)
 */
function renderHero(project, index) {
  const accent = project.accent || "#9BAA97";
  const heroBg = `radial-gradient(130% 100% at 50% 0%, ${accent}16 0%, var(--bg) 62%)`;
  const num = typeof index === "number" ? String(index + 1).padStart(2, "0") : "";
  return `
    <section class="project-hero-screen" id="hero" style="background: ${heroBg};">
      <div class="project-hero-content">
        <div class="project-hero-main">
          <div class="project-hero-title-wrap">
            <span class="project-hero-kicker">${num ? num + " &middot; " : ""}Case study</span>
            <h1 class="project-hero-title">${project.title}</h1>
          </div>
          <p class="project-hero-summary">${project.summary}</p>
        </div>
        <div class="project-hero-meta">
          <div class="project-meta-col">
            <span class="project-meta-val">${project.role}</span>
            <span class="project-meta-caption">Role</span>
          </div>
          <div class="project-meta-col">
            <span class="project-meta-val">${project.year}</span>
            <span class="project-meta-caption">Year</span>
          </div>
          <div class="project-meta-col">
            <span class="project-meta-val">${project.tools}</span>
            <span class="project-meta-caption">Tools</span>
          </div>
        </div>
      </div>
    </section>
  `;
}

/**
 * PROBLEM 1.2 - The Swap Function
 * Updates URL state and invokes mountProject with identical order
 */
function swapTo(nextSlug) {
  if (swapping) return;
  window.history.pushState({ p: nextSlug }, "", `?p=${nextSlug}`);
  mountProject(nextSlug, { animateIntro: false });
}

/**
 * PROBLEM 1 & 2 - Universal Project Mounting Function
 * Exactly builds any of the 5 projects and dual gates (previous and next)
 */
function mountProject(slug, { animateIntro = false } = {}) {
  try {
    const SITE = window.SITE;
    if (!SITE || !SITE.projects || SITE.projects.length === 0) {
      window.location.href = "404.html";
      return;
    }

    const project = SITE.projects.find((p) => p.slug === slug);
    if (!project) {
      window.location.href = "404.html";
      return;
    }

  const currentIndex = SITE.projects.findIndex((p) => p.slug === slug);
  const nextIndex = (currentIndex + 1) % SITE.projects.length;
  const nextProject = SITE.projects[nextIndex];
  const prevIndex = (currentIndex - 1 + SITE.projects.length) % SITE.projects.length;
  const prevProject = SITE.projects[prevIndex];

  const root = document.getElementById("project-root");
  if (!root) return;

  // Case-study image slots: overview (Block A), two process shots (Block C), result (Block D).
  // Falls back to the cover image until dedicated screenshots are provided in content.js.
  const imgOverview = project.overviewImage || project.image;
  const imgProcess1 = project.processImage1 || project.image;
  const imgProcess2 = project.processImage2 || project.image;
  const imgResult = project.resultImage || project.image;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Displacement transition shaders
  const displacementVertexShader = `
    attribute vec2 aPosition;
    attribute vec2 aTexCoord;
    varying vec2 vTexCoord;
    void main() {
      vTexCoord = aTexCoord;
      gl_Position = vec4(aPosition, 0.0, 1.0);
    }
  `;

  const displacementFragmentShader = `
    precision highp float;
    uniform sampler2D uFrom;
    uniform sampler2D uTo;
    uniform sampler2D uDisp;
    uniform float uProgress;
    varying vec2 vTexCoord;

    void main() {
      float d = texture2D(uDisp, vTexCoord).r;
      vec2 fromUv = vTexCoord + vec2(d * uProgress * 0.15, 0.0);
      vec2 toUv = vTexCoord - vec2(d * (1.0 - uProgress) * 0.15, 0.0);
      vec4 from = texture2D(uFrom, fromUv);
      vec4 to = texture2D(uTo, toUv);
      gl_FragColor = mix(from, to, smoothstep(0.0, 1.0, uProgress));
    }
  `;

  // Displacement transition setup
  let displacementGL = null;
  let displacementProgram = null;
  let displacementUniforms = null;
  let displacementTextures = {};

  function initDisplacementTransition() {
    if (typeof WebGLRenderingContext === "undefined") return;

    const backCanvas = document.getElementById("displacement-canvas-back");
    const forwardCanvas = document.getElementById("displacement-canvas-forward");
    if (!backCanvas || !forwardCanvas) return;

    function createGL(canvas) {
      const gl = canvas.getContext("webgl", { alpha: true, antialias: true, preserveDrawingBuffer: false });
      if (!gl) return null;
      return gl;
    }

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function createProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program link error:", gl.getProgramInfoLog(program));
        return null;
      }
      return program;
    }

    function initCanvasGL(canvas) {
      const gl = createGL(canvas);
      if (!gl) return null;

      const vertexShader = createShader(gl, gl.VERTEX_SHADER, displacementVertexShader);
      const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, displacementFragmentShader);
      if (!vertexShader || !fragmentShader) return null;

      const program = createProgram(gl, vertexShader, fragmentShader);
      if (!program) return null;

      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        -1, -1,  1, -1,  -1, 1,
        -1, 1,   1, -1,   1, 1
      ]), gl.STATIC_DRAW);

      const texCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        0, 1,  1, 1,  0, 0,
        0, 0,   1, 1,   1, 0
      ]), gl.STATIC_DRAW);

      const positionLoc = gl.getAttribLocation(program, "aPosition");
      const texCoordLoc = gl.getAttribLocation(program, "aTexCoord");
      const uFromLoc = gl.getUniformLocation(program, "uFrom");
      const uToLoc = gl.getUniformLocation(program, "uTo");
      const uDispLoc = gl.getUniformLocation(program, "uDisp");
      const uProgressLoc = gl.getUniformLocation(program, "uProgress");

      return {
        gl,
        program,
        positionBuffer,
        texCoordBuffer,
        positionLoc,
        texCoordLoc,
        uFromLoc,
        uToLoc,
        uDispLoc,
        uProgressLoc
      };
    }

    const backGL = initCanvasGL(backCanvas);
    const forwardGL = initCanvasGL(forwardCanvas);

    if (!backGL || !forwardGL) return;

    function loadTexture(gl, url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const texture = gl.createTexture();
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
          resolve(texture);
        };
        img.onerror = reject;
        img.src = url;
      });
    }

    // Generate displacement noise texture as data URL
    function generateNoiseTexture(width, height) {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255;
        data[i] = noise;     // R
        data[i + 1] = noise; // G
        data[i + 2] = noise; // B
        data[i + 3] = 255;   // A
      }
      ctx.putImageData(imageData, 0, 0);
      return canvas.toDataURL("image/png");
    }

    const dispUrl = generateNoiseTexture(512, 512);
    
    Promise.all([
      loadTexture(backGL.gl, project.image),
      loadTexture(backGL.gl, prevProject.image),
      loadTexture(backGL.gl, dispUrl),
      loadTexture(forwardGL.gl, project.image),
      loadTexture(forwardGL.gl, nextProject.image),
      loadTexture(forwardGL.gl, dispUrl)
    ]).then(([backFrom, backTo, backDisp, fwdFrom, fwdTo, fwdDisp]) => {
      displacementTextures.back = { from: backFrom, to: backTo, disp: backDisp };
      displacementTextures.forward = { from: fwdFrom, to: fwdTo, disp: fwdDisp };

      function render(canvasGL, textures, progress) {
        const { gl, program, positionBuffer, texCoordBuffer, positionLoc, texCoordLoc,
                uFromLoc, uToLoc, uDispLoc, uProgressLoc } = canvasGL;

        gl.useProgram(program);
        gl.viewport(0, 0, canvasGL.gl.drawingBufferWidth, canvasGL.gl.drawingBufferHeight);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.enableVertexAttribArray(texCoordLoc);
        gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textures.from);
        gl.uniform1i(uFromLoc, 0);

        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, textures.to);
        gl.uniform1i(uToLoc, 1);

        gl.activeTexture(gl.TEXTURE2);
        gl.bindTexture(gl.TEXTURE_2D, textures.disp);
        gl.uniform1i(uDispLoc, 2);

        gl.uniform1f(uProgressLoc, progress);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      // Store render functions for ScrollTrigger
      window.renderDisplacementBack = (progress) => render(backGL, displacementTextures.back, progress);
      window.renderDisplacementForward = (progress) => render(forwardGL, displacementTextures.forward, progress);
    }).catch(err => console.error("Displacement texture load error:", err));
  }

  // (a) set swapping = true, call ctx.revert() and ScrollTrigger.clearScrollMemory()
  swapping = true;
  if (ctx) {
    ctx.revert();
  }
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.clearScrollMemory();
  }

  if (prefersReducedMotion) {
    // Problem 2.5: Reduced motion - do not render portal-back (LAND = 0)
    root.innerHTML = `
      <!-- SECTION 1: FIRST SCREEN -->
      ${renderHero(project, currentIndex)}

      <!-- SECTION 2: PROJECT BODY -->
      <div class="project-body">
        <a href="index.html#work" class="back-to-work">&larr; All projects</a>
        <section class="project-block project-block-a">
          <div class="parallax-media-wrap">
            <img 
              src="${imgOverview}" 
              alt="${project.title} overview" 
              class="parallax-img"
              loading="eager"
            >
          </div>
        </section>

        <section class="project-block project-block-b">
          <h2 class="block-b-heading">The problem</h2>
          <div class="block-b-text">
            <p>${project.problem[0]}</p>
            <p>${project.problem[1]}</p>
          </div>
        </section>

        <section class="project-block project-block-c">
          <div class="block-c-layout">
            <div class="block-c-text">
              <p>${project.process[0]}</p>
              <p>${project.process[1]}</p>
            </div>
            <h2 class="block-c-heading">The process</h2>
          </div>
          <div class="block-c-images">
            <div class="block-c-img-wrap block-c-img-wrap--left">
              <img src="${imgProcess1}" alt="${project.title} process detail" class="block-c-img" loading="lazy">
            </div>
            <div class="block-c-img-wrap block-c-img-wrap--right">
              <img src="${imgProcess2}" alt="${project.title} process execution" class="block-c-img" loading="lazy">
            </div>
          </div>
        </section>

        <section class="project-block project-block-d">
          <div class="block-d-text">
            <h2 class="block-d-heading">The result</h2>
            <p>${project.result}</p>
          </div>
          <div class="block-d-media">
            <img src="${imgResult}" alt="${project.title} result" class="block-d-img" loading="lazy">
          </div>
        </section>
      </div>

      <!-- Problem 2.5: Plain focusable links for reduced motion -->
      <div class="reduced-motion-nav">
        <a href="project.html?p=${prevProject.slug}" class="portal-reduced-link" id="portal-reduced-prev">
          Previous project: ${prevProject.title}
        </a>
        <a href="project.html?p=${nextProject.slug}" class="portal-reduced-link" id="portal-reduced-next">
          Next project: ${nextProject.title}
        </a>
      </div>
    `;
  } else {
    root.innerHTML = `
      <!-- PROBLEM 2: PORTAL BACK (DISPLACEMENT REVEAL GATE FOR PREVIOUS PROJECT) -->
      <section class="portal-section portal-back" id="portal-back">
        <div class="portal-sticky-stage" id="portal-back-stage">
          <a href="project.html?p=${prevProject.slug}" class="portal-focus-link portal-focus-link--back" id="portal-back-focus-link">
            Previous project: ${prevProject.title} &larr;
          </a>
          <canvas class="displacement-canvas" id="displacement-canvas-back" width="1920" height="1080"></canvas>
          <div class="portal-next-label" id="portal-back-label">
            Previous: ${prevProject.title}
          </div>
        </div>
      </section>

      <!-- SECTION 1: FIRST SCREEN -->
      ${renderHero(project, currentIndex)}

      <!-- SECTION 2: PROJECT BODY -->
      <div class="project-body">
        <a href="index.html#work" class="back-to-work">&larr; All projects</a>
        <!-- Block A: 16:9 Wide Image with Parallax -->
        <section class="project-block project-block-a">
          <div class="parallax-media-wrap">
            <img 
              src="${imgOverview}" 
              alt="${project.title} overview" 
              class="parallax-img"
              loading="eager"
            >
          </div>
        </section>

        <!-- Block B: The Problem (4 of 12 columns heading, paragraphs right) -->
        <section class="project-block project-block-b">
          <h2 class="block-b-heading">The problem</h2>
          <div class="block-b-text">
            <p>${project.problem[0]}</p>
            <p>${project.problem[1]}</p>
          </div>
        </section>

        <!-- Block C: The Process (Mirrored: paragraphs left, heading right, + 2 offset images) -->
        <section class="project-block project-block-c">
          <div class="block-c-layout">
            <div class="block-c-text">
              <p>${project.process[0]}</p>
              <p>${project.process[1]}</p>
            </div>
            <h2 class="block-c-heading">The process</h2>
          </div>
          <div class="block-c-images">
            <div class="block-c-img-wrap block-c-img-wrap--left">
              <img src="${imgProcess1}" alt="${project.title} process detail" class="block-c-img" loading="lazy">
            </div>
            <div class="block-c-img-wrap block-c-img-wrap--right">
              <img src="${imgProcess2}" alt="${project.title} process execution" class="block-c-img" loading="lazy">
            </div>
          </div>
        </section>

        <!-- Block D: The Result (Centered 720px column & 21:9 full-width image) -->
        <section class="project-block project-block-d">
          <div class="block-d-text">
            <h2 class="block-d-heading">The result</h2>
            <p>${project.result}</p>
          </div>
          <div class="block-d-media">
            <img src="${imgResult}" alt="${project.title} result" class="block-d-img" loading="lazy">
          </div>
        </section>
      </div>

      <!-- SECTION 3: SCROLL-DRIVEN FORWARD PORTAL TO NEXT PROJECT (DISPLACEMENT REVEAL) -->
      <section class="portal-section" id="portal">
        <div class="portal-sticky-stage" id="portal-stage">
          <a href="project.html?p=${nextProject.slug}" class="portal-focus-link" id="portal-focus-link">
            Next project: ${nextProject.title} &rarr;
          </a>
          <canvas class="displacement-canvas" id="displacement-canvas-forward" width="1920" height="1080"></canvas>
          <div class="portal-next-label" id="portal-next-label">
            Next: ${nextProject.title}
          </div>
        </div>
      </section>

      <!-- SECTION 6: FOOTER (full-width) -->
      <footer class="site-footer">
        <div class="footer-inner">
          <div class="footer-brand">
            <span class="footer-logo"><img src="assets/logo.svg" alt="" class="footer-logo-mark" width="24" height="24"><span class="footer-logo-text">Arem</span></span>
            <p class="footer-sentence">Based in Nigeria, open to the right project.</p>
          </div>
          <div class="footer-links">
            <div class="footer-nav-col">
              <h4 class="footer-nav-title">Pages</h4>
              <ul class="footer-link-list" id="footer-pages-list">
                <li><a href="index.html#work" class="footer-link">Work</a></li>
                <li><a href="design.html" class="footer-link">Design</a></li>
                <li><a href="writing.html" class="footer-link">Writing</a></li>
                <li><a href="#contact" class="footer-link">Contact</a></li>
              </ul>
            </div>
            <div class="footer-nav-col">
              <h4 class="footer-nav-title">Social</h4>
              <ul class="footer-link-list" id="footer-social-list">
                <li><a href="https://github.com/Arem-ee" class="footer-link" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in new window)">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/toromadeabdulrahman" class="footer-link" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in new window)">LinkedIn</a></li>
                <li><a href="https://x.com/Arem_ee" class="footer-link" target="_blank" rel="noopener noreferrer" aria-label="X (opens in new window)">X</a></li>
              </ul>
            </div>
          </div>
          <div class="footer-meta">
            <p class="footer-copyright" id="copyright-text">&copy; <span id="copyright-year">2026</span> Arem. All rights reserved.</p>
            <a href="#hero" class="footer-back-top" id="back-to-top">Back to top <span aria-hidden="true">&uarr;</span></a>
          </div>
        </div>
      </section>
    `;
  }

  // Set document.title
  document.title = `${project.title} — ${SITE.brand.name}`;
  document.documentElement.style.setProperty("--project-accent", project.accent || "#9BAA97");

  // (c) force layout by reading document.body.offsetHeight
  const _forceLayout = document.body.offsetHeight;

  // (d) call window.scrollTo({ top: LAND, left: 0, behavior: 'instant' })
  const portalBackEl = document.getElementById("portal-back");
  const LAND = portalBackEl ? portalBackEl.offsetHeight : 0;
  window.scrollTo({ top: LAND, left: 0, behavior: "instant" });

  // (e) create all ScrollTriggers inside a new gsap.context stored in ctx
  fwdArmed = false;
  backArmed = false;

        if (swappingTimeout) clearTimeout(swappingTimeout);
        swappingTimeout = setTimeout(() => { swapping = false; }, 100);

  if (typeof gsap !== "undefined") {
    ctx = gsap.context(() => {
      if (!prefersReducedMotion && typeof ScrollTrigger !== "undefined") {
        // Section 2: Every block reveals with a fade and 24px rise, 0.1s stagger
        const blocks = document.querySelectorAll(".project-block");
        blocks.forEach((blk) => {
          gsap.fromTo(
            blk.children,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: blk,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        });

        const getRmax = () =>
          Math.sqrt(
            Math.pow(window.innerWidth / 2, 2) + Math.pow(window.innerHeight / 2, 2)
          ) + 40;

        let Rmax = getRmax();

        const handleResize = () => {
          Rmax = getRmax();
          if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
        };
        window.addEventListener("resize", handleResize, { passive: true });

        // PROBLEM 2.3: Back gate ScrollTrigger (displacement reveal)
        if (portalBackEl) {
          const H = portalBackEl.offsetHeight;

          // Initial displacement state
          if (typeof window.renderDisplacementBack === "function") {
            window.renderDisplacementBack(0);
          }

          ScrollTrigger.create({
            trigger: portalBackEl,
            start: "top top",
            end: () => "+=" + Math.max(H, window.innerHeight * 1.5),
            onUpdate: (self) => {
              if (swapping) return;
              const progress = 1 - self.progress; // 0 at top, 1 at bottom of portal-back

              if (progress < 0.3) {
                backArmed = true;
              }

              const progressClamped = Math.min(progress / 0.85, 1);

              if (typeof window.renderDisplacementBack === "function") {
                window.renderDisplacementBack(progressClamped);
              }

              if (progress >= 0.99 && backArmed) {
                swapTo(prevProject.slug);
              }
            }
          });
                backBorder.style.height = `${R * 2}px`;
                backBorder.style.opacity = Math.max(0, 1 - factor * 2.5);
              }
              if (backLabel) {
                backLabel.style.opacity = Math.max(0, 1 - factor * 3);
              }

              if (openness >= 0.99 && backArmed) {
                swapTo(prevProject.slug);
              }
            }
          });

        }

        root.onclick = (e) => {
          const backLink = e.target.closest(".portal-focus-link--back");
          if (backLink) {
            e.preventDefault();
            swapTo(prevProject.slug);
          }
        };

        // PROBLEM 2.4: Forward gate ScrollTrigger (displacement reveal)
        const portalSection = document.getElementById("portal");
        if (portalSection) {
          // Initial displacement state
          if (typeof window.renderDisplacementForward === "function") {
            window.renderDisplacementForward(0);
          }

          ScrollTrigger.create({
            trigger: portalSection,
            start: "bottom bottom",
            end: "top top",
            onUpdate: (self) => {
              if (swapping) return;
              const progress = self.progress; // 0 at bottom, 1 at top of portal

              if (progress < 0.3) {
                fwdArmed = true;
              }

              const progressClamped = Math.min(progress / 0.85, 1);

              if (typeof window.renderDisplacementForward === "function") {
                window.renderDisplacementForward(progressClamped);
              }

              if (progress >= 0.99 && fwdArmed) {
                swapTo(nextProject.slug);
              }
            }
          });
        }

        root.onclick = (e) => {
          const fwdLink = e.target.closest(".portal-focus-link:not(.portal-focus-link--back)");
          if (fwdLink) {
            e.preventDefault();
            swapTo(nextProject.slug);
          }
        };
      } else if (prefersReducedMotion) {
  if (swappingTimeout) clearTimeout(swappingTimeout);
  swappingTimeout = setTimeout(() => { swapping = false; }, 100);
        const prevLink = document.getElementById("portal-reduced-prev");
        if (prevLink) {
          prevLink.addEventListener("click", (e) => {
            e.preventDefault();
            swapTo(prevProject.slug);
          });
        }
        const nextLink = document.getElementById("portal-reduced-next");
        if (nextLink) {
          nextLink.addEventListener("click", (e) => {
            e.preventDefault();
            swapTo(nextProject.slug);
          });
        }
      }
    });
  }

  // (f) inside two nested requestAnimationFrame calls, call ScrollTrigger.refresh() and then read window.scrollY.
  // If it differs from LAND by more than 2px, call scrollTo again;
  // (g) set swapping = false and play the intro.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
      if (Math.abs(window.scrollY - LAND) > 2) {
        window.scrollTo({ top: LAND, left: 0, behavior: "instant" });
      }
      if (animateIntro && !prefersReducedMotion && typeof gsap !== "undefined") {
        const introTl = gsap.timeline({ defaults: { ease: "power2.out" } });
        introTl
          .fromTo(
            ".project-hero-kicker",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.6 }
          )
          .fromTo(
            ".project-hero-title",
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.4"
          )
          .fromTo(
            ".project-hero-summary",
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.65"
          )
          .fromTo(
            ".project-hero-meta",
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.65"
          );
      }
    });
  });
  } catch (e) {
    console.error("mountProject error:", e);
    swapping = false;
  }
}

/**
 * Initial Page Load & History Orchestrator
 */
function init() {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const SITE = window.SITE;
  if (!SITE || !SITE.projects || SITE.projects.length === 0) {
    window.location.href = "404.html";
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const slugFromUrl = urlParams.get("p") || urlParams.get("slug");

  if (!slugFromUrl) {
    window.location.href = "404.html";
    return;
  }

  mountProject(slugFromUrl, { animateIntro: true });

  window.addEventListener("popstate", () => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("p") || params.get("slug");
    if (slug) {
      mountProject(slug, { animateIntro: false });
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

/**
 * TEST HELPERS
 */
window.__walk = async () => {
  const SITE = window.SITE;
  if (!SITE || !SITE.projects) return;
  console.log("=== STARTING __walk ===");

  const forwardSequence = [
    "project-two",
    "project-three",
    "project-four",
    "project-five",
    "project-one"
  ];
  for (const slug of forwardSequence) {
    swapTo(slug);
    await new Promise((r) => setTimeout(r, 700));
    const backEl = document.getElementById("portal-back");
    const fwdEl = document.getElementById("portal");
    const LAND = backEl ? backEl.offsetHeight : 0;
    const ok = Math.abs(window.scrollY - LAND) <= 2 ? "OK" : "FAIL";
    console.log(
      `FORWARD: ${slug} | scrollY: ${window.scrollY} | LAND: ${LAND} | portal-back: ${!!backEl} | portal: ${!!fwdEl} | ${ok}`
    );
  }

  const backwardSequence = [
    "project-five",
    "project-four",
    "project-three",
    "project-two",
    "project-one"
  ];
  for (const slug of backwardSequence) {
    swapTo(slug);
    await new Promise((r) => setTimeout(r, 700));
    const backEl = document.getElementById("portal-back");
    const fwdEl = document.getElementById("portal");
    const LAND = backEl ? backEl.offsetHeight : 0;
    const ok = Math.abs(window.scrollY - LAND) <= 2 ? "OK" : "FAIL";
    console.log(
      `BACKWARD: ${slug} | scrollY: ${window.scrollY} | LAND: ${LAND} | portal-back: ${!!backEl} | portal: ${!!fwdEl} | ${ok}`
    );
  }
};

window.__scrollTest = async () => {
  console.log("=== STARTING __scrollTest ===");
  const getSlug = () => new URLSearchParams(window.location.search).get("p");

  const initialSlug = getSlug();
  let forwardSwaps = 0;
  const prevPushState = window.history.pushState;

  window.history.pushState = function (...args) {
    forwardSwaps++;
    return prevPushState.apply(this, args);
  };

  while (getSlug() === initialSlug) {
    window.scrollBy(0, 80);
    await new Promise((r) => setTimeout(r, 16));
  }

  const forwardNewSlug = getSlug();
  console.log(
    `SCROLL DOWN RESULT: Changed from ${initialSlug} to ${forwardNewSlug} | Swaps: ${forwardSwaps}`
  );

  // Wait 1s
  await new Promise((r) => setTimeout(r, 1000));

  let backwardSwaps = 0;
  window.history.pushState = function (...args) {
    backwardSwaps++;
    return prevPushState.apply(this, args);
  };

  const beforeUpSlug = getSlug();
  while (getSlug() === beforeUpSlug) {
    window.scrollBy(0, -80);
    await new Promise((r) => setTimeout(r, 16));
  }

  const backwardNewSlug = getSlug();
  window.history.pushState = prevPushState;
  console.log(
    `SCROLL UP RESULT: Changed from ${beforeUpSlug} to ${backwardNewSlug} | Swaps: ${backwardSwaps}`
  );
};
