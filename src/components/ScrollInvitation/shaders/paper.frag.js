import { noiseChunk } from './noise.glsl.js';

// Paper: painted card texture + fibre noise + aged edges + gold foil sheen.
export const paperFragment = /* glsl */ `
  uniform sampler2D uMap;   // painted card (sRGB)
  uniform sampler2D uFoil;  // white where gold foil is printed
  uniform vec3 uBack;       // colour of the reverse side
  uniform vec3 uEdge;       // aged edge tint
  uniform vec3 uLightDir;   // view-space light direction
  uniform vec3 uLightColor;
  uniform vec3 uGoldDark;
  uniform vec3 uGoldLight;
  uniform float uHasMap;

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying float vTurns;

  ${noiseChunk}

  void main() {
    bool front = gl_FrontFacing;
    vec3 N = normalize(vNormal);
    if (!front) N = -N;

    vec3 V = normalize(-vViewPos);
    vec3 Ld = normalize(uLightDir);

    // fibres
    float fibre = fbm(vUv * vec2(220.0, 320.0)) * 0.6 + fbm(vUv * vec2(40.0, 55.0)) * 0.4;
    float mottling = fbm(vUv * 6.0);

    vec3 base;
    float foil = 0.0;
    if (front) {
      vec3 tex = uHasMap > 0.5 ? texture2D(uMap, vUv).rgb : uBack;
      foil = uHasMap > 0.5 ? texture2D(uFoil, vUv).r : 0.0;
      base = tex;
    } else {
      base = uBack;
    }
    base *= 0.93 + 0.14 * fibre;
    base *= 0.94 + 0.1 * mottling;

    // aged edges
    vec2 e = min(vUv, 1.0 - vUv);
    float edge = smoothstep(0.0, 0.035, min(e.x, e.y) + (fibre - 0.5) * 0.012);
    base = mix(base * uEdge, base, edge);

    // wrapped diffuse + soft sky fill
    float ndl = dot(N, Ld);
    float diff = clamp(ndl * 0.5 + 0.5, 0.0, 1.0);
    diff = diff * diff;
    float fill = 0.5 + 0.5 * N.y;
    vec3 lit = base * (uLightColor * (0.4 + 0.8 * diff) + vec3(0.14) * fill);

    // darker the deeper into the roll (visible at the sheet edges)
    lit *= 1.0 - 0.22 * smoothstep(0.0, 4.0, vTurns);

    // gold foil: view dependent gradient + tight highlight
    if (foil > 0.01 && front) {
      vec3 R = reflect(-V, N);
      float g = smoothstep(-0.6, 0.8, R.y + (fibre - 0.5) * 0.6 + R.x * 0.25);
      vec3 gold = mix(uGoldDark, uGoldLight, g) * (0.65 + 0.6 * diff);
      vec3 H = normalize(Ld + V);
      float spec = pow(max(dot(N, H), 0.0), 36.0);
      lit = mix(lit, gold, foil * 0.85) + uLightColor * spec * foil * 0.45;
    }

    // very soft paper sheen
    vec3 H2 = normalize(Ld + V);
    lit += uLightColor * pow(max(dot(N, H2), 0.0), 18.0) * 0.035;

    gl_FragColor = vec4(lit, 1.0);
    #include <colorspace_fragment>
  }
`;
