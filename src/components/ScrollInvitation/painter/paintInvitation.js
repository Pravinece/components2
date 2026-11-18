import { centerText, centerLines } from './canvasText.js';
import { drawFrame, drawArch, drawDivider, drawSeal } from './ornaments.js';

// Paints the whole card twice:
//   colour pass -> what you see
//   foil pass   -> white wherever gold is printed (the paper shader turns it into shiny foil)
// Both passes run the same layout code, only the palette differs.

// one shared context just to create gradients (they are context-independent)
let gradientCtx = null;
const makeGradient = (x0, y0, x1, y1) => {
  if (!gradientCtx) gradientCtx = document.createElement('canvas').getContext('2d');
  return gradientCtx.createLinearGradient(x0, y0, x1, y1);
};

function makePalette(theme, mode) {
  if (mode === 'foil') {
    return {
      paper: '#000',
      ink: '#000',
      inkSoft: '#000',
      seal: '#000',
      gold: () => '#fff',
      sealFill: () => '#000',
    };
  }
  return {
    paper: theme.paper,
    ink: theme.ink,
    inkSoft: theme.inkSoft,
    seal: theme.seal,
    gold: (x0, y0, x1, y1) => {
      const g = makeGradient(x0, y0, x1, y1);
      g.addColorStop(0, theme.goldDark);
      g.addColorStop(0.35, theme.goldLight);
      g.addColorStop(0.65, theme.gold);
      g.addColorStop(1, theme.goldLight);
      return g;
    },
    sealFill: () => theme.seal,
  };
}

function layout(ctx, P, theme, data, W, H) {
  const cx = W / 2;
  const f = theme.fonts;
  const textW = W - 360;

  drawFrame(ctx, P, W, H);

  // header arch
  drawArch(ctx, P, cx, 130, 460, 400);

  centerText(ctx, data.blessing, cx, 462, {
    font: f.body, size: 40, color: P.inkSoft, style: 'italic', maxWidth: textW,
  });

  centerText(ctx, data.title.toUpperCase(), cx, 544, {
    font: f.display, size: 70, color: P.gold(300, 494, W - 300, 554), spacing: 6, maxWidth: textW,
  });
  drawDivider(ctx, P, cx, 602, 560);

  // hosts
  centerText(ctx, data.hosts, cx, 684, {
    font: f.display, size: 46, color: P.ink, spacing: 1, maxWidth: textW,
  });
  centerLines(ctx, data.invite, cx, 748, 54, {
    font: f.body, size: 44, color: P.ink, style: 'italic', maxWidth: textW,
  });

  // names
  centerText(ctx, data.bride, cx, 978, {
    font: f.script, size: 190, color: P.gold(400, 828, W - 400, 988), maxWidth: textW,
  });
  centerText(ctx, '&', cx, 1068, {
    font: f.body, size: 84, color: P.ink, style: 'italic',
  });
  centerText(ctx, data.groom, cx, 1220, {
    font: f.script, size: 190, color: P.gold(400, 1070, W - 400, 1230), maxWidth: textW,
  });
  centerText(ctx, data.groomParents, cx, 1284, {
    font: f.body, size: 40, color: P.inkSoft, style: 'italic', maxWidth: textW,
  });

  drawDivider(ctx, P, cx, 1352, 560);

  // events
  data.events.forEach((ev, i) => {
    const y = 1418 + i * 162;
    centerText(ctx, ev.name.toUpperCase(), cx, y, {
      font: f.display, size: 42, color: P.gold(400, y - 40, W - 400, y), spacing: 5, maxWidth: textW,
    });
    centerText(ctx, ev.when, cx, y + 58, {
      font: f.body, size: 42, color: P.ink, style: '600', maxWidth: textW,
    });
    centerText(ctx, ev.where, cx, y + 104, {
      font: f.body, size: 38, color: P.inkSoft, style: 'italic', maxWidth: textW,
    });
  });

  // venue + rsvp + seal
  centerText(ctx, data.venue, cx, 1906, {
    font: f.body, size: 42, color: P.ink, style: 'italic', maxWidth: textW,
  });
  centerLines(ctx, data.rsvp, cx, 1962, 44, {
    font: f.body, size: 36, color: P.inkSoft, maxWidth: textW,
  });
  drawSeal(ctx, P, cx, 2092, 58, data.initials, f.display);
}

function paintPass(width, height, theme, data, mode) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const P = makePalette(theme, mode);

  ctx.fillStyle = mode === 'foil' ? '#000' : theme.paper;
  ctx.fillRect(0, 0, width, height);

  layout(ctx, P, theme, data, width, height);
  return canvas;
}

export function paintInvitation({ data, theme, width, height }) {
  return {
    color: paintPass(width, height, theme, data, 'color'),
    foil: paintPass(width, height, theme, data, 'foil'),
  };
}
