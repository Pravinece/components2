// Colour + font themes. Each variant in variants.js points at one of these.
// All colours are plain sRGB hex strings.

const FONTS = {
  display: '"Cinzel Decorative", "Cinzel", "Trajan Pro", Georgia, serif',
  body: '"Cormorant Garamond", "EB Garamond", Georgia, serif',
  script: '"Great Vibes", "Snell Roundhand", "Apple Chancery", cursive',
};

// Families that must be loaded before the card is painted onto a canvas.
export const FONT_FAMILIES = ['Cinzel Decorative', 'Cormorant Garamond', 'Great Vibes'];

export const THEMES = {
  // Mughal court: ivory parchment, burgundy ink, antique gold on a maroon wall
  royal: {
    fonts: FONTS,
    paper: '#f3e6c8',
    paperEdge: '#b98a4e',
    paperBack: '#d9c096',
    ink: '#5a1424',
    inkSoft: '#7a3a42',
    gold: '#b8862b',
    goldLight: '#f0cf7a',
    goldDark: '#7a5413',
    seal: '#8d1220',
    wallA: '#5b1022',
    wallB: '#1f0610',
    wallPattern: '#c9973a',
    light: '#fff1d6',
  },
  // Cooler ivory + deep emerald
  emerald: {
    fonts: FONTS,
    paper: '#f1ead2',
    paperEdge: '#a8915a',
    paperBack: '#d4c8a0',
    ink: '#0f3d33',
    inkSoft: '#3f6a5e',
    gold: '#b48a2e',
    goldLight: '#efd584',
    goldDark: '#76591a',
    seal: '#0f4a3a',
    wallA: '#0f3a30',
    wallB: '#04140f',
    wallPattern: '#c8a24a',
    light: '#fff6df',
  },
  // Midnight navy with warm cream paper
  midnight: {
    fonts: FONTS,
    paper: '#f4ecd9',
    paperEdge: '#a98d63',
    paperBack: '#d6cbb0',
    ink: '#1b2a52',
    inkSoft: '#4a5a86',
    gold: '#b8892f',
    goldLight: '#f1d284',
    goldDark: '#785717',
    seal: '#7b1020',
    wallA: '#17234a',
    wallB: '#060a1c',
    wallPattern: '#c9a04c',
    light: '#fff3da',
  },
};
