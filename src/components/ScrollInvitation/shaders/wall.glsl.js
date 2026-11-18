import { noiseChunk } from './noise.glsl.js';

// Backdrop wall: velvet gradient, faint damask lattice, spotlight and the
// soft drop-shadow of the sheet + roll (rectangle SDF, no shadow maps needed).
export const wallVertex = /* glsl */ `
  varying vec2 vPos;
  void main() {
    vPos = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const wallFragment = /* glsl */ `
  uniform vec3 uColA;
  uniform vec3 uColB;
  uniform vec3 uPattern;
  uniform vec4 uRect;   // xMin, xMax, yMin, yMax of the paper (world)
  uniform float uShadow;

  varying vec2 vPos;

  ${noiseChunk}

  float sdBox(vec2 p, vec2 c, vec2 h) {
    vec2 q = abs(p - c) - h;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0);
  }

  // repeating diamond + rosette motif
  float damask(vec2 p) {
    vec2 cell = vec2(0.9, 1.4);
    vec2 g = mod(p, cell) - cell * 0.5;
    vec2 g2 = mod(p + cell * 0.5, cell) - cell * 0.5;
    float d1 = abs(g.x) / 0.22 + abs(g.y) / 0.38;
    float m1 = 1.0 - smoothstep(0.95, 1.0, d1);
    float ring = smoothstep(0.02, 0.0, abs(length(g2) - 0.17) - 0.006);
    float dot2 = 1.0 - smoothstep(0.03, 0.04, length(g2));
    float ring1 = smoothstep(0.015, 0.0, abs(d1 - 0.78) - 0.012);
    return clamp(ring1 * 0.8 + m1 * 0.15 + ring * 0.7 + dot2, 0.0, 1.0);
  }

  void main() {
    // velvet gradient with spotlight behind the paper
    float spot = exp(-dot(vPos * vec2(0.22, 0.12), vPos * vec2(0.22, 0.12)));
    vec3 col = mix(uColB, uColA, 0.25 + 0.75 * spot);

    float pat = damask(vPos);
    col = mix(col, uPattern, pat * 0.12 * (0.4 + spot));

    // cloth texture
    col *= 0.9 + 0.2 * fbm(vPos * 18.0);

    // soft paper shadow, offset away from the light (upper-left)
    vec2 c = vec2((uRect.x + uRect.y) * 0.5 + 0.22, (uRect.z + uRect.w) * 0.5 - 0.2);
    vec2 h = vec2((uRect.y - uRect.x) * 0.5, (uRect.w - uRect.z) * 0.5);
    float sd = sdBox(vPos, c, h);
    float sh = 1.0 - smoothstep(-0.15, 0.55, sd);
    col *= 1.0 - uShadow * sh * 0.75;

    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;
