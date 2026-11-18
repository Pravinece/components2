import * as THREE from 'three';

// All end-cap geometries are lathes around the Y axis, then rotated onto X by <Hardware />.
// Profile points are (radius, height) with height 0 = where the cap meets the rod.

const v = (x, y) => new THREE.Vector2(x, y);

function lathe(points, segments = 40) {
  return new THREE.LatheGeometry(points, segments);
}

// Ornate royal finial: collar rings, bulb, neck, tip
export function makeFinial(r) {
  return lathe([
    v(0.001, 0),
    v(r * 1.9, 0),
    v(r * 1.9, r * 0.35),
    v(r * 1.35, r * 0.5),
    v(r * 1.35, r * 0.8),
    v(r * 1.8, r * 0.95),
    v(r * 2.3, r * 1.5),
    v(r * 2.4, r * 2.2),
    v(r * 2.1, r * 3.0),
    v(r * 1.3, r * 3.6),
    v(r * 0.75, r * 3.95),
    v(r * 0.75, r * 4.3),
    v(r * 1.05, r * 4.5),
    v(r * 0.7, r * 5.2),
    v(r * 0.25, r * 5.9),
    v(0.001, r * 6.2),
  ]);
}

// Flared brass end cap for tubes
export function makeFlareCap(r) {
  return lathe([
    v(0.001, 0),
    v(r * 1.18, 0),
    v(r * 1.18, r * 0.3),
    v(r * 1.05, r * 0.38),
    v(r * 1.05, r * 0.6),
    v(r * 1.3, r * 0.75),
    v(r * 1.3, r * 1.1),
    v(r * 1.0, r * 1.3),
    v(r * 0.5, r * 1.45),
    v(0.001, r * 1.5),
  ]);
}

// Simple turned knob
export function makeKnob(r) {
  return lathe([
    v(0.001, 0),
    v(r * 1.5, 0),
    v(r * 1.6, r * 0.5),
    v(r * 1.3, r * 1.2),
    v(r * 0.6, r * 1.7),
    v(0.001, r * 1.8),
  ]);
}

export const CAP_BUILDERS = { finial: makeFinial, flare: makeFlareCap, knob: makeKnob };
