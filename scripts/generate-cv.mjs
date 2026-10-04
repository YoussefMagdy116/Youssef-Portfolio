/**
 * Generates a minimal, valid placeholder PDF at public/Youssef_CV.pdf.
 * Replace that file with the real CV (same filename) — no rebuild needed.
 *
 * Run: node scripts/generate-cv.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outPath = resolve(root, "public", "Youssef_CV.pdf");

const lines = [
  ["Youssef Mohamed Abdelmaksoud", 22, 720],
  ["Junior Cybersecurity Analyst — Giza, Egypt", 13, 694],
  ["", 10, 660],
  ["PLACEHOLDER CV", 13, 646],
  ["This is a stand-in document so the download link works.", 11, 624],
  ["Replace it with the real CV, keeping the filename:", 11, 606],
  ["public/Youssef_CV.pdf", 11, 588],
];

let content = "";
for (const [text, size, y] of lines) {
  if (!text) continue;
  const escaped = text.replace(/([()\\])/g, "\\$1");
  content += `BT /F1 ${size} Tf 64 ${y} Td (${escaped}) Tj ET\n`;
}

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  `<< /Length ${Buffer.byteLength(content)} >>\nstream\n${content}endstream`,
];

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(Buffer.byteLength(pdf, "latin1"));
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});

const xrefStart = Buffer.byteLength(pdf, "latin1");
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const off of offsets) {
  pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, Buffer.from(pdf, "latin1"));
console.log(`Wrote ${outPath}`);
