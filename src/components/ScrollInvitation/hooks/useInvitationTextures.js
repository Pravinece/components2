import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { paintInvitation } from '../painter/paintInvitation.js';
import { ensureFonts } from '../painter/ensureFonts.js';
import { FONT_FAMILIES } from '../config/themes.js';
import { TEXTURE_SIZE } from '../config/variants.js';

function toTexture(canvas, { srgb, anisotropy }) {
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.anisotropy = anisotropy;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = true;
  tex.needsUpdate = true;
  return tex;
}

/**
 * Paints the invitation to two canvases (colour + gold-foil mask) once the web
 * fonts are ready, and returns them as textures. Returns null until then.
 */
export function useInvitationTextures({ data, theme }) {
  const gl = useThree((s) => s.gl);
  const [textures, setTextures] = useState(null);

  useEffect(() => {
    let cancelled = false;
    let created = [];

    (async () => {
      await ensureFonts(FONT_FAMILIES);
      if (cancelled) return;

      const { color, foil } = paintInvitation({ data, theme, ...TEXTURE_SIZE });
      const anisotropy = gl.capabilities.getMaxAnisotropy();
      const map = toTexture(color, { srgb: true, anisotropy });
      const foilMap = toTexture(foil, { srgb: false, anisotropy });
      created = [map, foilMap];
      setTextures({ map, foil: foilMap });
    })();

    return () => {
      cancelled = true;
      created.forEach((t) => t.dispose());
      setTextures(null);
    };
  }, [data, theme, gl]);

  return textures;
}
