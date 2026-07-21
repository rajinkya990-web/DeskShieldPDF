import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const release = new URL("../release/deskshield-pdf-extension/", import.meta.url);

test("extension package is a valid local Manifest V3 test build", async () => {
  const manifest = JSON.parse(await readFile(new URL("manifest.json", release), "utf8"));
  assert.equal(manifest.manifest_version, 3);
  assert.equal(manifest.name, "DeskShield PDF Viewer");
  assert.equal(manifest.background.service_worker, "background.js");
  assert.equal(manifest.permissions, undefined);

  await Promise.all([
    access(new URL("viewer.html", release)),
    access(new URL("viewer.css", release)),
    access(new URL("viewer.js", release)),
    access(new URL("vendor/pdf.mjs", release)),
    access(new URL("vendor/pdf.worker.mjs", release)),
    access(new URL("sample/camera-privacy-demo.pdf", release)),
    access(new URL("../deskshield-pdf-extension.zip", release)),
  ]);
});

test("extension keeps PDF processing local and includes all privacy modes", async () => {
  const [html, script] = await Promise.all([
    readFile(new URL("viewer.html", release), "utf8"),
    readFile(new URL("viewer.js", release), "utf8"),
  ]);

  assert.match(html, /type="file"[^>]+accept="application\/pdf,\.pdf"/);
  assert.match(script, /file\.arrayBuffer\(\)/);
  assert.match(script, /chrome\.runtime\.getURL\("vendor\/pdf\.worker\.mjs"\)/);
  assert.match(script, /method: "clarity"/);
  assert.match(script, /state\.method === "window"/);
  assert.match(script, /state\.method === "bands"/);
  assert.doesNotMatch(script, /https?:\/\//);
});