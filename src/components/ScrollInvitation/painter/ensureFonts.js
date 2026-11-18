// Canvas text silently falls back to a default font if the web font isn't loaded yet,
// so wait for each family (with a timeout so a blocked font never blocks the card).

export async function ensureFonts(families, timeoutMs = 4000) {
  if (typeof document === 'undefined' || !document.fonts) return;

  const start = Date.now();
  const loadAll = () =>
    Promise.all(
      families.flatMap((f) => [
        document.fonts.load(`400 48px "${f}"`),
        document.fonts.load(`600 48px "${f}"`),
        document.fonts.load(`italic 400 48px "${f}"`),
      ]),
    ).catch(() => {});

  // the stylesheet that declares the @font-face rules may still be arriving, so retry briefly
  while (Date.now() - start < timeoutMs) {
    await loadAll();
    if (families.every((f) => document.fonts.check(`400 48px "${f}"`))) return;
    await new Promise((r) => setTimeout(r, 150));
  }
}
