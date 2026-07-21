import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("web viewer exposes a practical local PDF workflow", async () => {
  const [page, layout] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
  ]);

  assert.match(page, /type="file" accept="application\/pdf,\.pdf"/);
  assert.match(page, /file\.arrayBuffer\(\)/);
  assert.match(page, /className="page-count"><strong>\{pageNumber\}/);
  assert.match(page, /setZoom/);
  assert.match(page, /Seated-user clarity/);
  assert.match(page, /Mouse-over window/);
  assert.match(page, /Rolling bands/);
  assert.match(page, /className="compact-toolbar"/);
  assert.match(page, /type="checkbox" checked=\{mode === "near"\}/);
  assert.match(layout, /DeskShield PDF/);
});

test("web viewer uses a version-matched local PDF.js worker", async () => {
  const [packageJson, page] = await Promise.all([
    readFile(new URL("package.json", root), "utf8"),
    readFile(new URL("app/page.tsx", root), "utf8"),
  ]);
  const packageData = JSON.parse(packageJson);
  assert.equal(packageData.dependencies["pdfjs-dist"], "^6.1.200");
  assert.match(page, /workerSrc = "\/pdfjs\/pdf\.worker\.mjs"/);
});