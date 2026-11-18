// Decorative vector ornaments drawn with the 2D canvas API.
// `P` is the paint palette from paintInvitation.js:
//   P.gold(x0, y0, x1, y1) -> fillStyle/strokeStyle (gradient in colour pass, white in foil pass)
//   P.ink / P.inkSoft / P.seal -> flat colours (black in the foil pass)

function diamond(ctx, x, y, r) {
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.lineTo(x + r * 0.7, y);
  ctx.lineTo(x, y + r);
  ctx.lineTo(x - r * 0.7, y);
  ctx.closePath();
  ctx.fill();
}

function dot(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

/** Double gold frame with corner flourishes. */
export function drawFrame(ctx, P, W, H) {
  const o = 54;
  const i = 86;
  ctx.strokeStyle = P.gold(0, 0, W, H);
  ctx.lineWidth = 10;
  ctx.strokeRect(o, o, W - o * 2, H - o * 2);
  ctx.lineWidth = 3;
  ctx.strokeRect(i, i, W - i * 2, H - i * 2);

  ctx.fillStyle = P.gold(0, 0, W, H);
  const corners = [
    [i, i, 1, 1],
    [W - i, i, -1, 1],
    [i, H - i, 1, -1],
    [W - i, H - i, -1, -1],
  ];
  corners.forEach(([x, y, sx, sy]) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(sx, sy);
    ctx.lineWidth = 4;
    ctx.strokeStyle = P.gold(0, 0, 120, 120);
    // nested quarter arcs
    [34, 58, 82].forEach((r) => {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI / 2);
      ctx.stroke();
    });
    diamond(ctx, 36, 36, 14);
    dot(ctx, 100, 14, 6);
    dot(ctx, 14, 100, 6);
    ctx.restore();
  });
}

/** Eight- or twelve-petal rosette. */
export function drawRosette(ctx, P, cx, cy, r, petals = 12) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.fillStyle = P.gold(-r, -r, r, r);
  for (let n = 0; n < petals; n += 1) {
    ctx.save();
    ctx.rotate((n / petals) * Math.PI * 2);
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.62, r * 0.17, r * 0.38, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  ctx.fillStyle = P.seal;
  dot(ctx, 0, 0, r * 0.3);
  ctx.fillStyle = P.gold(-r, -r, r, r);
  dot(ctx, 0, 0, r * 0.18);
  ctx.strokeStyle = P.gold(-r, -r, r, r);
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, r * 1.02, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function archPath(ctx, cx, top, w, bottom, spring) {
  const L = cx - w / 2;
  const R = cx + w / 2;
  const hh = spring - top;
  ctx.beginPath();
  ctx.moveTo(L, bottom);
  ctx.lineTo(L, spring);
  ctx.bezierCurveTo(L, spring - hh * 0.62, cx - w * 0.2, top + hh * 0.42, cx, top);
  ctx.bezierCurveTo(cx + w * 0.2, top + hh * 0.42, R, spring - hh * 0.62, R, spring);
  ctx.lineTo(R, bottom);
}

/** Pointed Mughal arch (mehrab) framing a rosette. */
export function drawArch(ctx, P, cx, top, w, bottom) {
  const spring = top + (bottom - top) * 0.52;
  ctx.strokeStyle = P.gold(cx - w / 2, top, cx + w / 2, bottom);
  ctx.lineWidth = 8;
  archPath(ctx, cx, top, w, bottom, spring);
  ctx.stroke();
  ctx.lineWidth = 3;
  archPath(ctx, cx, top + 26, w - 52, bottom, spring + 8);
  ctx.stroke();

  drawRosette(ctx, P, cx, spring + 22, 78);
  ctx.fillStyle = P.gold(cx - 30, top, cx + 30, top + 80);
  diamond(ctx, cx, top + 60, 18);
}

/** Horizontal rule with a diamond in the middle. */
export function drawDivider(ctx, P, cx, y, w) {
  const g = P.gold(cx - w / 2, y, cx + w / 2, y);
  ctx.fillStyle = g;
  ctx.strokeStyle = g;
  ctx.lineWidth = 3;
  [-1, 1].forEach((side) => {
    ctx.beginPath();
    ctx.moveTo(cx + side * 34, y);
    ctx.lineTo(cx + side * w / 2, y);
    ctx.stroke();
    dot(ctx, cx + side * (w / 2 + 14), y, 5);
    dot(ctx, cx + side * 56, y, 4);
  });
  diamond(ctx, cx, y, 16);
}

/** Red wax seal with a gold rim and initials. */
export function drawSeal(ctx, P, cx, cy, r, initials, font) {
  ctx.save();
  ctx.translate(cx, cy);

  // irregular wax blob
  ctx.beginPath();
  const n = 28;
  for (let k = 0; k <= n; k += 1) {
    const a = (k / n) * Math.PI * 2;
    const rr = r * (1 + 0.045 * Math.sin(a * 7) + 0.025 * Math.sin(a * 13 + 1));
    const x = Math.cos(a) * rr;
    const y = Math.sin(a) * rr;
    if (k === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = P.sealFill(r);
  ctx.fill();

  ctx.strokeStyle = P.gold(-r, -r, r, r);
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.78, 0, Math.PI * 2);
  ctx.stroke();
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.68, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = P.gold(-r, -r, r, r);
  ctx.font = `${Math.round(r * 0.62)}px ${font}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(initials, 0, r * 0.04);
  ctx.restore();
}
