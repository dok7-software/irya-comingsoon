"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Recreación del shader "Bands" de Framer con los controles de la auditoría:
 * un campo de color animado (3 colores) visto a través de una rejilla de lentes
 * cilíndricas verticales, que es lo que produce las bandas de luz.
 */
const config = {
  seed: 178,
  speed: 0.27,
  lensScale: 3.4,
  lensSpacingX: 0.79,
  lensRadius: 0.54,
  dispersionStrength: 0.02,
  /** Resolución interna respecto al tamaño CSS: el campo es suave y así se ahorra GPU. */
  renderScale: 0.5,
} as const;

const vertexSource = `
attribute vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
`;

const fragmentSource = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uSeed;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;

const float LENS_SCALE = ${config.lensScale.toFixed(2)};
const float LENS_SPACING_X = ${config.lensSpacingX.toFixed(2)};
const float LENS_RADIUS = ${config.lensRadius.toFixed(2)};
const float DISPERSION = ${config.dispersionStrength.toFixed(3)};

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 3; i++) {
    value += amplitude * noise(p);
    p = p * 2.03 + vec2(17.0, 9.0);
    amplitude *= 0.5;
  }
  return value;
}

/* Campo de color con distorsión de dominio: manchas grandes que fluyen despacio. */
float field(vec2 p) {
  vec2 q = p * vec2(0.85, 0.55) + uSeed;
  vec2 warp = vec2(
    fbm(q + vec2(0.0, uTime * 0.6)),
    fbm(q + vec2(5.2, -uTime * 0.5))
  );
  return fbm(q + 1.7 * warp + vec2(uTime * 0.3, 0.0));
}

vec3 palette(float v) {
  /* Predomina el color base; el tercero solo asoma en los picos del campo. */
  v = smoothstep(0.32, 0.82, v);
  vec3 color = mix(uColor0, uColor1, smoothstep(0.05, 0.7, v));
  return mix(color, uColor2, 0.85 * smoothstep(0.7, 1.0, v));
}

void main() {
  /* rotation: 180deg en Framer */
  vec2 p = -(gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;

  /* Rejilla de lentes verticales (lensSpacingY ≈ 0: solo columnas). */
  float bands = LENS_SCALE / LENS_SPACING_X * 4.0;
  float cell = p.x * bands;
  float local = fract(cell) - 0.5;
  float center = (floor(cell) + 0.5) / bands;

  /* Refracción de la lente cilíndrica: cada banda muestra una copia invertida y ampliada. */
  float n = clamp(local / LENS_RADIUS, -1.0, 1.0);
  vec2 lookup = vec2(center - n * 1.6 / bands, p.y);

  /* Dispersión cromática: cada canal se refracta un poco distinto. */
  vec2 disp = vec2(DISPERSION * n, 0.0);
  vec3 color = vec3(
    palette(field(lookup + disp)).r,
    palette(field(lookup)).g,
    palette(field(lookup - disp)).b
  );

  /* Volumen de cada lente: centro más claro, bordes más oscuros. */
  color *= 0.84 + 0.26 * (1.0 - n * n);
  color *= mix(1.0, 0.72, smoothstep(0.4, 0.5, abs(local)));

  gl_FragColor = vec4(color, 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const value = Number.parseInt(hex.slice(1), 16);
  return [((value >> 16) & 255) / 255, ((value >> 8) & 255) / 255, (value & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

type BandsShaderProps = {
  /** Tres colores hex: base, medio y brillo. */
  colors: [string, string, string];
  className?: string;
};

/** Canvas WebGL; aparece con un fundido solo si el shader compila (si no, queda el fondo CSS). */
export function BandsShader({ colors, className }: BandsShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  const [c0, c1, c2] = colors;

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!canvas || !gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentSource);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // Un triángulo que cubre toda la pantalla.
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniform = (name: string) => gl.getUniformLocation(program, name);
    const uResolution = uniform("uResolution");
    const uTime = uniform("uTime");
    gl.uniform1f(uniform("uSeed"), config.seed * 0.137);
    gl.uniform3fv(uniform("uColor0"), hexToRgb(c0));
    gl.uniform3fv(uniform("uColor1"), hexToRgb(c1));
    gl.uniform3fv(uniform("uColor2"), hexToRgb(c2));

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio, 2) * config.renderScale;
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let visible = true;
    let elapsed = 0;
    let last = performance.now();

    const draw = (now: number) => {
      elapsed += Math.min(now - last, 100) / 1000;
      last = now;
      gl.uniform1f(uTime, elapsed * config.speed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      draw(now);
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };

    const start = () => {
      if (reducedMotion || frame) return;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };

    resize();
    draw(performance.now());
    setReady(true);
    start();

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);

    // Solo se anima mientras está en pantalla y la pestaña visible.
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    intersection.observe(canvas);
    const onVisibility = () => !document.hidden && visible && start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.deleteBuffer(buffer);
    };
  }, [c0, c1, c2]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn(
        "absolute inset-0 size-full transition-opacity duration-700 ease-framer",
        ready ? "opacity-100" : "opacity-0",
        className,
      )}
    />
  );
}
