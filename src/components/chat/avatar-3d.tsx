"use client";

import { useEffect, useRef } from "react";
import type { BufferGeometry, Material } from "three";

interface Avatar3DProps {
  size: number;
  speaking?: boolean;
  paused?: boolean;
}

function Avatar3D({ size, speaking = false, paused = false }: Avatar3DProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const speakingRef = useRef(speaking);
  const pausedRef = useRef(paused);

  useEffect(() => {
    speakingRef.current = speaking;
    pausedRef.current = paused;
  }, [speaking, paused]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let frame = 0;
    let cleanup: (() => void) | null = null;

    import("three").then((THREE) => {
      if (disposed || !host) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 10);
      camera.position.set(0, 0.05, 3.4);
      camera.lookAt(0, 0, 0);

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setClearColor(0x000000, 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(size, size);
      host.appendChild(renderer.domElement);

      const skin = new THREE.MeshStandardMaterial({
        color: 0x6b4632,
        roughness: 0.7,
      });
      const dark = new THREE.MeshStandardMaterial({
        color: 0x111111,
        roughness: 0.9,
      });
      const hairMat = new THREE.MeshStandardMaterial({
        color: 0x0d0d0d,
        roughness: 0.85,
      });
      const white = new THREE.MeshStandardMaterial({
        color: 0xf2ede4,
        roughness: 0.4,
      });
      const pupil = new THREE.MeshStandardMaterial({
        color: 0x131313,
        roughness: 0.3,
      });
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        roughness: 0.35,
        metalness: 0.5,
      });
      const yellow = new THREE.MeshStandardMaterial({
        color: 0xf5c518,
        roughness: 0.5,
      });

      const root = new THREE.Group();
      scene.add(root);

      const add = (
        geo: BufferGeometry,
        mat: Material,
        x = 0,
        y = 0,
        z = 0
      ) => {
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(x, y, z);
        root.add(mesh);
        return mesh;
      };

      // hoodie body + collar
      const body = new THREE.SphereGeometry(1, 32, 24);
      const bodyMesh = add(body, dark, 0, -0.74, -0.05);
      bodyMesh.scale.set(1.15, 0.8, 0.95);

      const collar = new THREE.TorusGeometry(0.5, 0.15, 14, 40);
      const collarMesh = add(collar, dark, 0, -0.3, -0.04);
      collarMesh.rotation.x = Math.PI / 2.1;

      // head
      const headGeo = new THREE.SphereGeometry(0.62, 32, 28);
      const headMesh = add(headGeo, skin, 0, 0.18, 0);
      headMesh.scale.set(0.95, 1.02, 0.98);

      // short hair cap
      const hairGeo = new THREE.SphereGeometry(
        0.65,
        32,
        24,
        0,
        Math.PI * 2,
        0,
        Math.PI * 0.55
      );
      const hairMesh = add(hairGeo, hairMat, 0, 0.22, -0.02);
      hairMesh.scale.set(1.0, 0.92, 1.03);
      hairMesh.rotation.x = -0.22;

      // ears + nose
      const earGeo = new THREE.SphereGeometry(0.09, 16, 12);
      add(earGeo, skin, -0.58, 0.16, 0.02);
      add(earGeo, skin, 0.58, 0.16, 0.02);
      add(new THREE.SphereGeometry(0.06, 16, 12), skin, 0, 0.12, 0.63);

      // eyes (grouped for blinking)
      const makeEye = (side: number) => {
        const g = new THREE.Group();
        g.position.set(side * 0.22, 0.26, 0.52);
        const w = new THREE.Mesh(
          new THREE.SphereGeometry(0.105, 20, 16),
          white
        );
        w.scale.set(1, 1, 0.6);
        const p = new THREE.Mesh(
          new THREE.SphereGeometry(0.048, 16, 12),
          pupil
        );
        p.position.z = 0.075;
        g.add(w, p);
        root.add(g);
        return g;
      };
      const eyeL = makeEye(-1);
      const eyeR = makeEye(1);

      // brows
      const browGeo = new THREE.BoxGeometry(0.2, 0.035, 0.03);
      const browL = add(browGeo, hairMat, -0.22, 0.43, 0.56);
      browL.rotation.z = -0.08;
      const browR = add(browGeo, hairMat, 0.22, 0.43, 0.56);
      browR.rotation.z = 0.08;

      // glasses
      const rimGeo = new THREE.TorusGeometry(0.155, 0.02, 12, 32);
      add(rimGeo, frameMat, -0.22, 0.26, 0.62);
      add(rimGeo, frameMat, 0.22, 0.26, 0.62);
      const bridge = add(
        new THREE.CylinderGeometry(0.015, 0.015, 0.14, 10),
        frameMat,
        0,
        0.28,
        0.63
      );
      bridge.rotation.z = Math.PI / 2;
      const templeGeo = new THREE.BoxGeometry(0.025, 0.025, 0.45);
      add(templeGeo, frameMat, -0.48, 0.29, 0.3);
      add(templeGeo, frameMat, 0.48, 0.29, 0.3);

      // mouth
      const mouth = add(
        new THREE.BoxGeometry(0.17, 0.05, 0.02),
        new THREE.MeshStandardMaterial({ color: 0x3a2318, roughness: 0.6 }),
        0,
        -0.04,
        0.63
      );

      // hoodie strings (yellow accent)
      const stringGeo = new THREE.CylinderGeometry(0.013, 0.013, 0.26, 8);
      const tipGeo = new THREE.SphereGeometry(0.024, 10, 8);
      for (const side of [-1, 1]) {
        const s = add(stringGeo, yellow, side * 0.1, -0.52, 0.42);
        s.rotation.x = 0.12;
        add(tipGeo, yellow, side * 0.1, -0.66, 0.45);
      }

      // lights
      scene.add(new THREE.AmbientLight(0xffffff, 1.1));
      const key = new THREE.DirectionalLight(0xffffff, 1.6);
      key.position.set(1.4, 2, 2.6);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xfff2cf, 0.5);
      fill.position.set(-2, 0.4, 1.2);
      scene.add(fill);

      // animation state
      const clock = new THREE.Clock();
      let nextBlink = 2 + Math.random() * 2.5;
      let blinkStart = -1;

      const tick = () => {
        frame = requestAnimationFrame(tick);
        if (pausedRef.current || document.hidden) return;

        const t = clock.getElapsedTime();

        // idle sway + bob
        root.rotation.y = Math.sin(t * 0.55) * 0.24;
        root.rotation.x = Math.sin(t * 0.8) * 0.04;
        root.position.y = Math.sin(t * 1.4) * 0.035;

        // talking
        if (speakingRef.current) {
          mouth.scale.y = 1 + Math.abs(Math.sin(t * 13)) * 1.8;
          root.rotation.x += Math.sin(t * 6) * 0.02;
        } else {
          mouth.scale.y = 1;
        }

        // blinking
        if (t >= nextBlink && blinkStart < 0) {
          blinkStart = t;
          nextBlink = t + 2.6 + Math.random() * 2.6;
        }
        if (blinkStart >= 0) {
          const p = (t - blinkStart) / 0.14;
          const closed = p < 0.5 ? 1 - p * 2 : (p - 0.5) * 2;
          const sy = Math.max(0.08, Math.min(1, closed));
          eyeL.scale.y = sy;
          eyeR.scale.y = sy;
          if (p >= 1) {
            blinkStart = -1;
            eyeL.scale.y = 1;
            eyeR.scale.y = 1;
          }
        }

        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(frame);
        renderer.dispose();
        scene.traverse((obj) => {
          const mesh = obj as { geometry?: BufferGeometry; material?: Material };
          if (mesh.geometry) mesh.geometry.dispose();
          if (mesh.material) mesh.material.dispose();
        });
        if (renderer.domElement.parentElement === host) {
          host.removeChild(renderer.domElement);
        }
      };
    });

    return () => {
      disposed = true;
      if (cleanup) cleanup();
    };
  }, [size]);

  return (
    <div
      ref={hostRef}
      style={{ width: size, height: size }}
      aria-hidden="true"
      className="pointer-events-none overflow-hidden rounded-full"
    />
  );
}

export { Avatar3D };