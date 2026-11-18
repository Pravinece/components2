// Roll geometry shared by the vertex shader uniforms, the hardware (rods) and the camera.
//
// Model: the sheet hangs from y = 0. A flat part of length L hangs straight down;
// the remaining length D = height - L is wound into a spiral in front of the sheet.
// The spiral is Archimedean: radius shrinks by k per radian going inwards,
// k = thickness / 2PI, and the innermost turn sits on the core of radius coreRadius.

const TWO_PI = Math.PI * 2;

export const clamp01 = (v) => Math.min(1, Math.max(0, v));

export function getRollState({ progress, height, coreRadius, thickness }) {
  const u = clamp01(progress);
  const k = thickness / TWO_PI;
  const L = u * height; // flat (unrolled) length
  const D = height - L; // length still wound up
  const rJ = Math.sqrt(coreRadius * coreRadius + 2 * k * D); // outer radius at the joint

  return {
    k,
    L,
    D,
    rJ,
    centerY: -L, // roll axis
    centerZ: rJ,
    bottomY: -L - rJ, // lowest point of the roll
  };
}
