// One entry per invitation style. Sizes are in world units (1 unit ~ 1 metre-ish,
// the camera frames everything automatically so only the ratios matter).
//
//  paper.width / height  -> size of the unrolled sheet (ratio must match painter canvas)
//  paper.thickness       -> how tightly the paper winds (bigger = fatter roll)
//  paper.coreRadius      -> radius of the rod / tube the paper winds onto
//  top / bottom          -> hardware at the hanging edge and at the rolling edge
//    material: 'wood' | 'brass' | 'gold'
//    cap:      'finial' | 'flare' | 'knob'   (capMaterial: same options as material)

export const VARIANTS = {
  // Royal decree: carved dark-wood rods with gold finials at both ends
  farman: {
    label: 'Farman',
    theme: 'royal',
    paper: { width: 3.4, height: 5.0, thickness: 0.03, coreRadius: 0.075 },
    top: { radius: 0.055, material: 'wood', cap: 'finial', capMaterial: 'gold' },
    bottom: { radius: 0.075, material: 'wood', cap: 'finial', capMaterial: 'gold' },
  },

  // Plain rolled scroll: just paper around a slim dowel, no hanger
  rolled: {
    label: 'Rolled Scroll',
    theme: 'midnight',
    paper: { width: 3.4, height: 5.0, thickness: 0.03, coreRadius: 0.035 },
    top: null,
    bottom: { radius: 0.035, material: 'wood', cap: 'knob', capMaterial: 'wood' },
  },

  // Brass tube core: paper winds onto a fat polished tube with flared caps
  tube: {
    label: 'Scroll with Tube',
    theme: 'emerald',
    paper: { width: 3.4, height: 5.0, thickness: 0.03, coreRadius: 0.15 },
    top: { radius: 0.07, material: 'brass', cap: 'flare', capMaterial: 'brass' },
    bottom: { radius: 0.15, material: 'brass', cap: 'flare', capMaterial: 'brass' },
  },
};

export const DEFAULT_VARIANT = 'farman';

// Canvas texture size. Must keep the same ratio as paper.width / paper.height.
export const TEXTURE_SIZE = { width: 1536, height: 2260 };
