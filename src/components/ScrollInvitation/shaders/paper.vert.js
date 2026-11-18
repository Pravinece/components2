// Bends a flat plane into: straight hanging sheet + Archimedean spiral roll (curling toward the viewer).
// uv.y = 1 is the top of the sheet (pinned), uv.y = 0 is the end that winds up.
export const paperVertex = /* glsl */ `
  uniform float uHeight; // full sheet length
  uniform float uL;      // flat (unrolled) length
  uniform float uRj;     // outer radius of the roll at the joint
  uniform float uK;      // radius change per radian (thickness / 2PI)

  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPos;
  varying float vTurns; // how many turns deep into the roll (0 on the flat part)

  void main() {
    vUv = uv;

    float s = (1.0 - uv.y) * uHeight; // arc length from the top edge
    float d = s - uL;                 // distance past the joint

    vec3 p = position;
    vec3 n = vec3(0.0, 0.0, 1.0);
    float turns = 0.0;

    if (d <= 0.0) {
      p.y = -s;
      p.z = 0.0;
    } else {
      // arc length of spiral: d = rJ*phi - k*phi^2/2  ->  stable closed form
      float disc = max(uRj * uRj - 2.0 * uK * d, 0.0);
      float phi = 2.0 * d / (uRj + sqrt(disc));
      float r = uRj - uK * phi;
      float sp = sin(phi);
      float cp = cos(phi);

      p.y = -uL - r * sp;
      p.z = uRj - r * cp;

      // tangent in (y, z); the printed face points to the roll axis (inside the curl),
      // so the viewer sees the plain reverse side wrapped around the front of the roll
      vec2 t = normalize(vec2(uK * sp - r * cp, uK * cp + r * sp));
      n = vec3(0.0, -t.y, t.x);
      turns = phi / 6.2831853;
    }

    vTurns = turns;
    vNormal = normalize(normalMatrix * n);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vViewPos = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;
