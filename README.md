
# DeskShield PDF

DeskShield PDF is a local-first PDF viewer that adds visual privacy controls for ordinary office monitors. It is designed for corporate situations where an authorized user must keep a document open while reducing casual shoulder surfing, long-distance reading, unnecessary disclosure during screen sharing, and some mobile-camera captures.

The project contains a working web viewer, a Chrome/Edge Manifest V3 extension, a synthetic demonstration PDF, automated build checks, a camera-test protocol, and a full technical manual.

![DeskShield mouse-window mode](docs/assets/deskshield-window-rectangle-doc.png)

## Why this project exists

Access control determines who may open a document. It does not control how much of an already-open page remains continuously visible. DeskShield treats visual disclosure as a PDF-viewer control:

- **Clarity:** applies a tunable whole-page privacy texture while preserving a comfortable seated-user setting.
- **Mouse window:** reveals only an oval, rectangle, full row, or spotlight under the pointer.
- **Rolling bands:** animates opaque bands at 20, 30, or 60 fps to disrupt some rolling-shutter phone-camera captures.
- **Unprotected:** provides the required control condition for honest comparisons.

## Important limitation

DeskShield is a visual risk-reduction experiment, not a promise of camera-proof text.

A close camera, optical zoom, burst or HDR fusion, long exposure, synchronized shutter, a favorable video frame, an operating-system screenshot, or a compromised endpoint may recover content. Results depend on the monitor, refresh cadence, camera sensor, exposure, lens, distance, angle, lighting, browser compositor, and image-processing pipeline.

Use DeskShield with access control, screen locking, DLP/DRM, meeting controls, physical privacy practices, and organizational policy.

## Included deliverables

- Local web PDF viewer
- Chrome/Edge Manifest V3 extension source
- Ready-to-test extension ZIP
- Arbitrary local PDF opening, page navigation, zoom, and fullscreen
- Clarity, Mouse window, Rolling bands, and Unprotected modes
- Synthetic camera-test PDF
- Automated web and extension validation
- Camera-test protocol
- Product and technical manual with screenshots
- Devpost submission draft and Codex Session ID

## Quick start: web viewer

Requirements:

- Windows 10 or 11
- Node.js 22.13 or newer
- npm

From the repository root:

    npm install
    npm run dev

Open the local URL printed by the development server. Choose **Open** for any local PDF or use the included demo.

The selected PDF is read as local bytes by this application. DeskShield does not intentionally upload it.

## Build and test

    npm install
    npm run build
    npm run build:extension
    npm test

The extension build script copies the installed PDF.js module and its matching worker into the extension package. No CDN is required by the packaged extension at runtime.

## Install the Chrome/Edge extension

A ready-made test build is available at:

- **release/deskshield-pdf-extension.zip**
- **release/deskshield-pdf-extension/**

Installation:

1. Extract the ZIP.
2. Open **chrome://extensions** or **edge://extensions**.
3. Enable **Developer mode**.
4. Choose **Load unpacked**.
5. Select the extracted **deskshield-pdf-extension** folder.
6. Click the DeskShield extension icon.
7. Open a local PDF or use the bundled synthetic sample.

The extension requests no host or optional permissions. It uses an explicit file picker and does not automatically replace the browser's built-in PDF handler.

## Privacy modes

| Mode | Primary use | Main control |
| --- | --- | --- |
| Unprotected | Baseline and comparison capture | Privacy off |
| Clarity | Continuous seated reading | 0-100% seated-user clarity |
| Mouse window | Dynamic partial disclosure and screen sharing | Shape, size, and window clarity |
| Rolling bands | Long-distance mobile-camera experiments | 0-100% strength and 20/30/60 fps |

## Project structure

    app/                          Web viewer UI and overlay implementation
    extension-src/                Manifest V3 extension source
    public/                       Synthetic PDF and local PDF.js assets
    scripts/build-extension.ps1   Reproducible extension packager
    tests/                        Web-output and extension validation
    release/                      Ready-to-test unpacked extension and ZIP
    docs/CAMERA_TEST_PLAN.md       Manual hardware test protocol
    docs/DeskShield_PDF_Product_Technical_Manual.docx
    SUBMISSION.md                 Devpost draft and completion checklist
    GITHUB_REPOSITORY_GUIDE.md    Exact repository publishing instructions

## Validation

Automated checks verify that:

- the web project compiles;
- the extension is Manifest V3;
- the package contains PDF.js and a version-matched worker;
- arbitrary PDFs are opened from local bytes;
- all privacy methods are included;
- no network URL is embedded in the extension runtime.

Camera resistance requires manual testing on named phones and monitors. Follow [the camera-test protocol](docs/CAMERA_TEST_PLAN.md) and retain the Unprotected baseline, protected captures, settings, distances, and repeated trials.

## Hackathon disclosure

DeskShield was built with Codex assistance for research, threat modeling, product decisions, PDF.js integration, viewer implementation, extension packaging, debugging, documentation, and validation design. The privacy effects running in the viewer are deterministic graphics techniques; the product is not presented as runtime AI.

Required Codex /feedback Session ID for the core project thread:

**019f8260-a814-7962-8a2c-b9e4a291273c**

The full submission draft and remaining checklist are in [SUBMISSION.md](SUBMISSION.md).

## Repository and license

Use this folder as the root of a dedicated **deskshield-pdf** repository. Do not upload **node_modules**, local build caches, logs, document QA renders, or LibreOffice profile files.

Before making the repository public, select and add a license. MIT is a simple option for a public hackathon repository; Apache-2.0 is an alternative when an explicit patent grant is preferred. If the repository remains private, share access with the judging accounts required by the official rules.

See [GITHUB_REPOSITORY_GUIDE.md](GITHUB_REPOSITORY_GUIDE.md) for the exact repository contents, settings, release assets, and publishing commands.
