// Tiny text helpers for the card painter.

/** Draw one centred line, shrinking the font so it never exceeds maxWidth. */
export function centerText(ctx, text, x, y, { font, size, color, maxWidth, spacing = 0, style = '' }) {
  let s = size;
  const setFont = () => {
    ctx.font = `${style} ${s}px ${font}`.trim();
    ctx.letterSpacing = `${spacing}px`;
  };
  setFont();
  if (maxWidth) {
    while (ctx.measureText(text).width > maxWidth && s > 12) {
      s -= 2;
      setFont();
    }
  }
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';
  // letterSpacing adds trailing space after the last glyph; nudge back to stay optically centred
  ctx.fillText(text, x + spacing / 2, y);
  ctx.letterSpacing = '0px';
  return s;
}

/** Draw several lines (split on \n) and return the y of the last baseline. */
export function centerLines(ctx, text, x, y, lineHeight, opts) {
  const lines = String(text).split('\n');
  lines.forEach((line, i) => centerText(ctx, line, x, y + i * lineHeight, opts));
  return y + (lines.length - 1) * lineHeight;
}
