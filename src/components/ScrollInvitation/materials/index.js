import * as THREE from 'three';
import { paperVertex } from '../shaders/paper.vert.js';
import { paperFragment } from '../shaders/paper.frag.js';
import { hardwareVertex, hardwareFragment } from '../shaders/hardware.glsl.js';
import { wallVertex, wallFragment } from '../shaders/wall.glsl.js';

// Key light, in view space: upper-left, towards the viewer.
export const LIGHT_DIR = new THREE.Vector3(-0.45, 0.6, 0.65).normalize();

export function createPaperMaterial({ theme, paper }) {
  return new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    vertexShader: paperVertex,
    fragmentShader: paperFragment,
    uniforms: {
      uMap: { value: null },
      uFoil: { value: null },
      uHasMap: { value: 0 },
      uBack: { value: new THREE.Color(theme.paperBack) },
      uEdge: { value: new THREE.Color(theme.paperEdge).lerp(new THREE.Color('#ffffff'), 0.35) },
      uLightDir: { value: LIGHT_DIR.clone() },
      uLightColor: { value: new THREE.Color(theme.light) },
      uGoldDark: { value: new THREE.Color(theme.goldDark) },
      uGoldLight: { value: new THREE.Color(theme.goldLight) },
      uHeight: { value: paper.height },
      uL: { value: 0 },
      uRj: { value: paper.coreRadius },
      uK: { value: paper.thickness / (Math.PI * 2) },
    },
  });
}

const HARDWARE_LOOKS = {
  wood: { base: '#3a1b0e', high: '#8a5a34', metal: 0.0, grain: 1.0 },
  brass: { base: '#9c6e22', high: '#e9c46a', metal: 1.0, grain: 0.0 },
  gold: { base: '#a87a22', high: '#e8c25a', metal: 1.0, grain: 0.0 },
};

export function createHardwareMaterial(kind, theme) {
  const look = HARDWARE_LOOKS[kind] || HARDWARE_LOOKS.wood;
  return new THREE.ShaderMaterial({
    vertexShader: hardwareVertex,
    fragmentShader: hardwareFragment,
    uniforms: {
      uBase: { value: new THREE.Color(look.base) },
      uHigh: { value: new THREE.Color(look.high) },
      uMetal: { value: look.metal },
      uGrain: { value: look.grain },
      uLightDir: { value: LIGHT_DIR.clone() },
      uLightColor: { value: new THREE.Color(theme.light) },
    },
  });
}

export function createWallMaterial(theme) {
  return new THREE.ShaderMaterial({
    vertexShader: wallVertex,
    fragmentShader: wallFragment,
    uniforms: {
      uColA: { value: new THREE.Color(theme.wallA) },
      uColB: { value: new THREE.Color(theme.wallB) },
      uPattern: { value: new THREE.Color(theme.wallPattern) },
      uRect: { value: new THREE.Vector4(-1, 1, -1, 1) },
      uShadow: { value: 1 },
    },
  });
}
