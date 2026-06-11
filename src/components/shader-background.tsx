"use client";

import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;

  // Simplex-ish value noise
  vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }

  float noise(vec2 p) {
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    float m = step(a.y, a.x);
    vec2 o = vec2(m, 1.0 - m);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash(i)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
    return dot(n, vec3(70.0));
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      v += amp * noise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 p = (uv - 0.5) * aspect;

    float t = uTime * 0.04;
    vec2 q = vec2(fbm(p + t), fbm(p - t + 3.1));
    vec2 r = vec2(fbm(p + q + vec2(1.7, 9.2) + 0.15 * t), fbm(p + q + vec2(8.3, 2.8) - 0.12 * t));
    float f = fbm(p + r);

    // Pointer-driven warm glow
    vec2 mp = (uPointer - 0.5) * aspect;
    float glow = 0.10 / (length(p - mp) + 0.18);

    vec3 base = vec3(0.07, 0.065, 0.085);          // deep indigo-black
    vec3 mid = vec3(0.12, 0.10, 0.16);             // muted violet
    vec3 gold = vec3(0.85, 0.66, 0.20);            // accent #e8c450-ish

    vec3 col = mix(base, mid, smoothstep(-0.2, 0.8, f));
    col += gold * pow(clamp(f, 0.0, 1.0), 2.5) * 0.32;
    col += gold * glow * 0.18;

    // Vignette so edges stay calm
    float vig = smoothstep(1.25, 0.35, length(p));
    col *= 0.55 + 0.45 * vig;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Plane() {
  const matRef = React.useRef<THREE.ShaderMaterial>(null);
  const pointer = React.useRef(new THREE.Vector2(0.5, 0.5));
  const target = React.useRef(new THREE.Vector2(0.5, 0.5));

  const uniforms = React.useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  React.useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      target.current.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    const mat = matRef.current;
    if (!mat) return;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    mat.uniforms.uResolution.value.set(state.size.width, state.size.height);
    pointer.current.lerp(target.current, 0.05);
    mat.uniforms.uPointer.value.copy(pointer.current);
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function ShaderBackground() {
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (reduceMotion || !mounted) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 opacity-70 [mask-image:radial-gradient(120%_120%_at_50%_0%,black,transparent_85%)]"
    >
      <Canvas
        gl={{ antialias: false, alpha: false, powerPreference: "low-power" }}
        dpr={[1, 1.5]}
        frameloop="always"
      >
        <Plane />
      </Canvas>
    </div>
  );
}
