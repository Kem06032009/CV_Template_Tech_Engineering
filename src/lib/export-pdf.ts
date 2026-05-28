import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const MARGIN_MM = 8;

/** Tìm phần tử CV có thể chụp được (không display:none) */
export function getCvElementForExport(): HTMLElement | null {
  const preview = document.getElementById("cv-preview");
  if (preview && isElementRenderable(preview)) {
    return preview;
  }

  const print = document.getElementById("cv-print");
  if (print) {
    return print;
  }

  return preview;
}

function isElementRenderable(el: HTMLElement): boolean {
  const rect = el.getBoundingClientRect();
  if (rect.width < 10 || rect.height < 10) return false;
  let node: HTMLElement | null = el;
  while (node) {
    const style = getComputedStyle(node);
    if (style.display === "none" || style.visibility === "hidden") {
      return false;
    }
    node = node.parentElement;
  }
  return true;
}

/** Tạm bỏ zoom/ẩn để html2canvas chụp đúng */
function prepareForCapture(root: HTMLElement): () => void {
  const cleanups: Array<() => void> = [];

  const wrappers = [root, ...Array.from(root.querySelectorAll<HTMLElement>("*"))];
  for (const el of [root, ...wrappers]) {
    if (el.classList.contains("cv-print-only")) {
      const prev = el.getAttribute("style") ?? "";
      el.style.cssText = [
        "position:fixed",
        "left:0",
        "top:0",
        "width:210mm",
        "max-width:100vw",
        "z-index:99999",
        "display:block",
        "visibility:visible",
        "opacity:1",
        "background:#ffffff",
        "pointer-events:none",
      ].join(";");
      cleanups.push(() => {
        if (prev) el.setAttribute("style", prev);
        else el.removeAttribute("style");
      });
    }
  }

  const viewport = root.closest(".cv-scale-viewport") as HTMLElement | null;
  if (viewport) {
    const prevZoom = viewport.style.zoom;
    const prevTransform = viewport.style.transform;
    viewport.style.zoom = "1";
    viewport.style.transform = "none";
    cleanups.push(() => {
      viewport.style.zoom = prevZoom;
      viewport.style.transform = prevTransform;
    });
  }

  const paper = root.classList.contains("cv-paper")
    ? root
    : (root.querySelector(".cv-paper") as HTMLElement | null);
  if (paper) {
    const prevBg = paper.style.backgroundColor;
    paper.style.backgroundColor = "#ffffff";
    cleanups.push(() => {
      paper.style.backgroundColor = prevBg;
    });
  }

  return () => {
    for (let i = cleanups.length - 1; i >= 0; i--) cleanups[i]();
  };
}

export async function exportToPDF(
  element: HTMLElement,
  filename = "cv.pdf",
): Promise<void> {
  const restore = prepareForCapture(element);

  try {
    element.scrollIntoView({ block: "start" });
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const canvas = await html2canvas(element, {
      scale: Math.min(2, window.devicePixelRatio || 1.5),
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      imageTimeout: 15000,
      onclone: (clonedDoc) => {
        const cloned = clonedDoc.getElementById(element.id);
        if (!cloned) return;
        cloned.style.boxShadow = "none";
        cloned.style.border = "none";
        const hidden = clonedDoc.querySelector(".cv-print-only") as HTMLElement | null;
        if (hidden) hidden.style.display = "block";
      },
    });

    if (canvas.width === 0 || canvas.height === 0) {
      throw new Error("Không chụp được nội dung CV (kích thước 0).");
    }

    const imgData = canvas.toDataURL("image/png");
    if (!imgData || imgData === "data:,") {
      throw new Error("Không tạo được ảnh từ CV.");
    }

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const contentWidth = A4_WIDTH_MM - MARGIN_MM * 2;
    const contentHeight = A4_HEIGHT_MM - MARGIN_MM * 2;
    const imgHeightMm = (canvas.height * contentWidth) / canvas.width;

    let heightLeft = imgHeightMm;
    let position = MARGIN_MM;

    pdf.addImage(
      imgData,
      "PNG",
      MARGIN_MM,
      position,
      contentWidth,
      imgHeightMm,
      undefined,
      "FAST",
    );
    heightLeft -= contentHeight;

    while (heightLeft > 0) {
      pdf.addPage();
      position = MARGIN_MM - (imgHeightMm - heightLeft);
      pdf.addImage(
        imgData,
        "PNG",
        MARGIN_MM,
        position,
        contentWidth,
        imgHeightMm,
        undefined,
        "FAST",
      );
      heightLeft -= contentHeight;
    }

    pdf.save(filename);
  } finally {
    restore();
  }
}

export async function exportCvToPdfFile(filename: string): Promise<void> {
  const el = getCvElementForExport();
  if (!el) {
    throw new Error("Không tìm thấy CV trên trang. Hãy đợi trang tải xong.");
  }
  await exportToPDF(el, filename);
}
