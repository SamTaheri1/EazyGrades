import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

// VistaGrades masters reserve the bottom 52 points for the copyright footer.
// Personalization happens only on a per-request in-memory copy of the master.
export async function personalizePdf(bytes, email) {
  if (typeof email !== 'string' || email.length > 254 || !/^[\x21-\x7e]+@[^@]+$/.test(email)) {
    throw new Error('A valid signup email is required to personalize a PDF.');
  }
  const pdf = await PDFDocument.load(bytes, { updateMetadata: false });
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const text = `© 2026 VistaGrades. | Licensed to: ${email}`;
  const color = rgb(10 / 255, 15 / 255, 28 / 255);
  for (const [index, page] of pdf.getPages().entries()) {
    const { x, y, width, height } = page.getCropBox();
    if (width < 400 || height < 200 || page.getRotation().angle !== 0) {
      throw new Error('The PDF does not support the VistaGrades footer layout.');
    }
    const margin = 56;
    const available = width - margin * 2;
    let size = 7;
    let lines;
    // Character wrapping preserves long email addresses without truncation.
    do {
      lines = [''];
      for (const character of text) {
        const last = lines.length - 1;
        if (font.widthOfTextAtSize(lines[last] + character, size) > available) lines.push(character);
        else lines[last] += character;
      }
      if (lines.length <= 3) break;
      size -= 0.25;
    } while (size >= 6);
    if (lines.length > 3) throw new Error('The signup email does not fit the PDF footer.');
    page.drawRectangle({ x, y, width, height: 52, color: rgb(1, 1, 1) });
    lines.forEach((line, row) => page.drawText(line, { x: x + (width - font.widthOfTextAtSize(line, size)) / 2, y: y + 24 + (lines.length - 1 - row) * 9, size, font, color }));
    const notice = 'For personal study use only. Redistribution, resale, or sharing is not permitted.';
    page.drawText(notice, { x: x + (width - font.widthOfTextAtSize(notice, 7)) / 2, y: y + 12, size: 7, font, color });
    const number = String(index + 1);
    page.drawText(number, { x: x + width - margin - font.widthOfTextAtSize(number, 7), y: y + 12, size: 7, font, color });
  }
  return Buffer.from(await pdf.save());
}
