import * as pdfjs from "./vendor/pdf.mjs";

pdfjs.GlobalWorkerOptions.workerSrc = chrome.runtime.getURL("vendor/pdf.worker.mjs");

const elements = {
  file: document.querySelector("#file"),
  demo: document.querySelector("#demo"),
  fullscreen: document.querySelector("#fullscreen"),
  filename: document.querySelector("#filename"),
  previous: document.querySelector("#previous"),
  next: document.querySelector("#next"),
  pageNumber: document.querySelector("#page-number"),
  pageCount: document.querySelector("#page-count"),
  zoomOut: document.querySelector("#zoom-out"),
  zoomIn: document.querySelector("#zoom-in"),
  zoomValue: document.querySelector("#zoom-value"),
  deskControls: document.querySelector("#desk-controls"),
  privacyToggle: document.querySelector("#privacy-toggle"),
  windowControls: document.querySelector("#window-controls"),
  strength: document.querySelector("#strength"),
  strengthLabel: document.querySelector("#strength-label"),
  strengthValue: document.querySelector("#strength-value"),
  rateControl: document.querySelector("#rate-control"),
  rate: document.querySelector("#rate"),
  shape: document.querySelector("#shape"),
  size: document.querySelector("#size"),
  sizeValue: document.querySelector("#size-value"),
  stage: document.querySelector("#stage"),
  pdfCanvas: document.querySelector("#pdf-canvas"),
  privacyCanvas: document.querySelector("#privacy-canvas"),
  status: document.querySelector("#status"),
  statusDot: document.querySelector("#status-dot"),
};

const state = {
  mode: "near",
  method: "clarity",
  clarity: 72,
  windowClarity: 100,
  bandStrength: 100,
  rate: 60,
  shape: "ellipse",
  size: 100,
  page: 1,
  pages: 1,
  zoom: 100,
  lens: { x: 0, y: 0 },
};

let pdfDocument;
let loadingTask;
let renderTask;
let renderVersion = 0;
let textureCanvas;
let overlayDirty = true;
let bandFrame = 0;
let lastBandFrame = 0;

const pdfContext = elements.pdfCanvas.getContext("2d");
const privacyContext = elements.privacyCanvas.getContext("2d");

function setStatus(message, ready = false) {
  elements.status.textContent = message;
  elements.status.parentElement.title = message;
  elements.statusDot.classList.toggle("ready", ready);
}

function currentStrength() {
  if (state.method === "clarity") return state.clarity;
  if (state.method === "window") return state.windowClarity;
  return state.bandStrength;
}

function updateUi() {
  document.querySelectorAll("[data-method]").forEach((button) => {
    button.classList.toggle("active", button.dataset.method === state.method);
  });

  const protectedMode = state.mode === "near";
  elements.privacyToggle.checked = protectedMode;
  elements.deskControls.classList.toggle("hidden", !protectedMode);
  elements.windowControls.classList.toggle("hidden", state.method !== "window");
  elements.rateControl.classList.toggle("hidden", state.method !== "bands");
  elements.rate.disabled = state.method !== "bands";

  const labels = { clarity: "Clarity", window: "Window", bands: "Strength" };
  elements.strengthLabel.textContent = labels[state.method];
  elements.strength.value = currentStrength();
  elements.strengthValue.textContent = currentStrength() + "%";
  elements.rate.value = state.rate;
  elements.shape.value = state.shape;
  elements.size.value = state.size;
  elements.sizeValue.textContent = state.size + "%";
  elements.pageNumber.textContent = state.page;
  elements.pageCount.textContent = state.pages;
  elements.zoomValue.textContent = state.zoom + "%";
  elements.previous.disabled = state.page <= 1;
  elements.next.disabled = state.page >= state.pages;
  elements.zoomOut.disabled = state.zoom <= 60;
  elements.zoomIn.disabled = state.zoom >= 180;
  overlayDirty = true;
}

async function loadDocument(source, filename) {
  setStatus("Loading PDFâ€¦");
  elements.filename.textContent = filename;
  elements.filename.title = filename;
  state.page = 1;
  try {
    renderTask?.cancel();
    await loadingTask?.destroy();
    loadingTask = pdfjs.getDocument(source);
    pdfDocument = await loadingTask.promise;
    state.pages = pdfDocument.numPages;
    await renderPage();
  } catch (error) {
    setStatus(error instanceof Error ? error.message : "The PDF could not be opened.");
  }
}

async function renderPage() {
  if (!pdfDocument) return;
  const version = ++renderVersion;
  setStatus("Rendering PDFâ€¦");
  renderTask?.cancel();

  try {
    const page = await pdfDocument.getPage(state.page);
    const base = page.getViewport({ scale: 1 });
    const fittedWidth = Math.min(1000, Math.max(560, elements.stage.clientWidth - 48));
    const viewport = page.getViewport({ scale: (fittedWidth / base.width) * (state.zoom / 100) });

    elements.pdfCanvas.width = Math.round(viewport.width);
    elements.pdfCanvas.height = Math.round(viewport.height);
    elements.privacyCanvas.width = elements.pdfCanvas.width;
    elements.privacyCanvas.height = elements.pdfCanvas.height;
    state.lens = { x: elements.pdfCanvas.width / 2, y: elements.pdfCanvas.height * 0.3 };

    renderTask = page.render({
      canvas: elements.pdfCanvas,
      canvasContext: pdfContext,
      viewport,
    });
    await renderTask.promise;
    if (version !== renderVersion) return;
    prepareTexture();
    setStatus("PDF ready Â· processed locally", true);
    updateUi();
  } catch (error) {
    if (error?.name !== "RenderingCancelledException") {
      setStatus(error instanceof Error ? error.message : "The page could not be rendered.");
    }
  }
}

function prepareTexture() {
  const { width, height } = elements.pdfCanvas;
  if (!width || !height) return;
  const source = pdfContext.getImageData(0, 0, width, height);
  textureCanvas = document.createElement("canvas");
  textureCanvas.width = width;
  textureCanvas.height = height;
  const context = textureCanvas.getContext("2d");
  const texture = context.createImageData(width, height);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4;
      const luminance =
        source.data[index] * 0.2126 +
        source.data[index + 1] * 0.7152 +
        source.data[index + 2] * 0.0722;
      const ink = Math.min(1, Math.max(0, (232 - luminance) / 92));
      const paper = ((x >> 1) & 1) === 0 ? [196, 196, 196] : [124, 124, 124];
      const glyph = ((y >> 1) & 1) === 0 ? [104, 194, 166] : [216, 126, 154];
      const meanAssist = ink * 16;
      texture.data[index] = Math.max(0, paper[0] * (1 - ink) + glyph[0] * ink - meanAssist);
      texture.data[index + 1] = Math.max(0, paper[1] * (1 - ink) + glyph[1] * ink - meanAssist);
      texture.data[index + 2] = Math.max(0, paper[2] * (1 - ink) + glyph[2] * ink - meanAssist);
      texture.data[index + 3] = 255;
    }
  }
  context.putImageData(texture, 0, 0);
  overlayDirty = true;
}

function cutWindow() {
  const context = privacyContext;
  const { width } = elements.privacyCanvas;
  const { x, y } = state.lens;
  const scale = state.size / 100;

  context.save();
  context.globalCompositeOperation = "destination-out";
  context.globalAlpha = state.windowClarity / 100;
  context.fillStyle = "#000";

  if (state.shape === "rectangle") {
    context.fillRect(x - 380 * scale, y - 92 * scale, 760 * scale, 184 * scale);
  } else if (state.shape === "row") {
    context.fillRect(0, y - 76 * scale, width, 152 * scale);
  } else {
    const radiusX = (state.shape === "circle" ? 165 : 430) * scale;
    const radiusY = (state.shape === "circle" ? 165 : 90) * scale;
    context.translate(x, y);
    context.scale(radiusX, radiusY);
    const gradient = context.createRadialGradient(0, 0, 0, 0, 0, 1);
    gradient.addColorStop(0, "rgba(0,0,0,1)");
    gradient.addColorStop(0.72, "rgba(0,0,0,1)");
    gradient.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = gradient;
    context.beginPath();
    context.arc(0, 0, 1, 0, Math.PI * 2);
    context.fill();
  }
  context.restore();
}

function drawStaticOverlay() {
  const { width, height } = elements.privacyCanvas;
  privacyContext.clearRect(0, 0, width, height);
  if (state.mode === "off" || !textureCanvas) return;

  privacyContext.save();
  privacyContext.globalAlpha = state.method === "clarity" ? 1 - state.clarity / 100 : 1;
  privacyContext.drawImage(textureCanvas, 0, 0);
  privacyContext.restore();
  if (state.method === "window") cutWindow();
}

function animate(now) {
  requestAnimationFrame(animate);
  const { width, height } = elements.privacyCanvas;

  if (state.mode === "near" && state.method === "bands") {
    if (now - lastBandFrame < 1000 / state.rate) return;
    lastBandFrame = now;
    bandFrame += 1;
    privacyContext.clearRect(0, 0, width, height);
    const band = 7;
    const phase = (bandFrame * 3) % (band * 4);
    privacyContext.fillStyle = `rgba(3,8,18,${state.bandStrength / 100})`;
    for (let y = -phase; y < height; y += band * 4) {
      privacyContext.fillRect(0, y, width, band * 2);
    }
    return;
  }

  if (overlayDirty) {
    overlayDirty = false;
    drawStaticOverlay();
  }
}
requestAnimationFrame(animate);

elements.privacyToggle.addEventListener("change", () => {
  state.mode = elements.privacyToggle.checked ? "near" : "off";
  updateUi();
});
document.querySelectorAll("[data-method]").forEach((button) => {
  button.addEventListener("click", () => {
    state.method = button.dataset.method;
    updateUi();
  });
});

elements.strength.addEventListener("input", () => {
  const value = Number(elements.strength.value);
  if (state.method === "clarity") state.clarity = value;
  else if (state.method === "window") state.windowClarity = value;
  else state.bandStrength = value;
  updateUi();
});
elements.rate.addEventListener("change", () => {
  state.rate = Number(elements.rate.value);
  updateUi();
});
elements.shape.addEventListener("change", () => {
  state.shape = elements.shape.value;
  updateUi();
});
elements.size.addEventListener("input", () => {
  state.size = Number(elements.size.value);
  updateUi();
});
elements.stage.addEventListener("pointermove", (event) => {
  if (state.mode !== "near" || state.method !== "window") return;
  const rect = elements.pdfCanvas.getBoundingClientRect();
  state.lens = {
    x: ((event.clientX - rect.left) * elements.pdfCanvas.width) / rect.width,
    y: ((event.clientY - rect.top) * elements.pdfCanvas.height) / rect.height,
  };
  overlayDirty = true;
});

elements.file.addEventListener("change", async () => {
  const file = elements.file.files?.[0];
  if (!file) return;
  if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
    setStatus("Choose a PDF file.");
    return;
  }
  await loadDocument({ data: new Uint8Array(await file.arrayBuffer()) }, file.name);
});
elements.demo.addEventListener("click", () => {
  elements.file.value = "";
  loadDocument({ url: chrome.runtime.getURL("sample/camera-privacy-demo.pdf") }, "camera-privacy-demo.pdf");
});
elements.fullscreen.addEventListener("click", () => document.documentElement.requestFullscreen?.());
elements.previous.addEventListener("click", async () => {
  if (state.page > 1) {
    state.page -= 1;
    updateUi();
    await renderPage();
  }
});
elements.next.addEventListener("click", async () => {
  if (state.page < state.pages) {
    state.page += 1;
    updateUi();
    await renderPage();
  }
});
elements.zoomOut.addEventListener("click", async () => {
  state.zoom = Math.max(60, state.zoom - 10);
  updateUi();
  await renderPage();
});
elements.zoomIn.addEventListener("click", async () => {
  state.zoom = Math.min(180, state.zoom + 10);
  updateUi();
  await renderPage();
});

updateUi();
loadDocument({ url: chrome.runtime.getURL("sample/camera-privacy-demo.pdf") }, "camera-privacy-demo.pdf");
