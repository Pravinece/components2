import { noiseChunk } from './noise.glsl.js';

// Rods, tubes and finials. One shader, three looks: wood / brass / gold
// (controlled by uMetal + uGrain + two colours).
export const hardwareVertex = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPos;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

export const hardwareFragment = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uHigh;
  uniform float uMetal;  // 0 = matte wood, 1 = polished metal
  uniform float uGrain;  // wood grain strength
  uniform vec3 uLightDir;
  uniform vec3 uLightColor;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPos;

  ${noiseChunk}

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(-vViewPos);
    vec3 L = normalize(uLightDir);
    vec3 H = normalize(L + V);

    float diff = clamp(dot(N, L) * 0.5 + 0.5, 0.0, 1.0);
    diff *= diff;

    // wood grain runs along the cylinder axis (uv.y)
    float grain = fbm(vec2(vUv.x * 14.0, vUv.y * 2.0)) * 0.7 + fbm(vec2(vUv.x * 60.0, vUv.y * 6.0)) * 0.3;
    vec3 wood = mix(uBase * 0.55, uBase * 1.15, grain);
    vec3 albedo = mix(mix(uBase, wood, uGrain), uBase, uMetal);

    vec3 col = albedo * (uLightColor * (0.25 + 0.95 * diff) + 0.1);

    // metal: banded studio reflection
    vec3 R = reflect(-V, N);
    float band = smoothstep(-0.9, 0.9, R.y);
    float horizon = smoothstep(0.0, 0.08, abs(R.y + 0.1));
    vec3 env = mix(uBase * 0.25, uHigh, band) * (0.6 + 0.4 * horizon);
    col = mix(col, env * (0.5 + 0.7 * diff), uMetal * 0.85);

    float spec = pow(max(dot(N, H), 0.0), mix(40.0, 120.0, uMetal));
    col += uLightColor * spec * mix(0.12, 0.7, uMetal);

    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;
