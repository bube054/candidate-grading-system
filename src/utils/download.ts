import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import JSZip from "jszip";
import { CandidateResult } from "@/utils/types";

export const createResultPdf = async (result: CandidateResult, origin = "") => {
  const url = `${origin}/assets/result_template.pdf`;
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const TR = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const TRB = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const { width, height } = firstPage.getSize();

  firstPage.drawText(`${result.name}`, {
    x: width * 0.36,
    y: height * 0.71,
    size: 14,
    font: TR,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.serviceNumber}`, {
    x: width * 0.36,
    y: height * 0.67,
    size: 14,
    font: TR,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.examNumber || "CSTCK/2025/30TH - ASC/001"}`, {
    x: width * 0.36,
    y: height * 0.633,
    size: 14,
    font: TR,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.physicalEducation}`, {
    x: width * 0.419,
    y: height * 0.535,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.parade}`, {
    x: width * 0.419,
    y: height * 0.505,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.classAttendance}`, {
    x: width * 0.419,
    y: height * 0.475,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.commandantTest}`, {
    x: width * 0.419,
    y: height * 0.443,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.confidBuld}`, {
    x: width * 0.419,
    y: height * 0.411,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.industrialAttachment}`, {
    x: width * 0.419,
    y: height * 0.379,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.project}`, {
    x: width * 0.419,
    y: height * 0.347,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.examination}`, {
    x: width * 0.419,
    y: height * 0.315,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.grandTotal}`, {
    x: width * 0.419,
    y: height * 0.283,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.gradeObtained}`, {
    x: width * 0.419,
    y: height * 0.251,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.remark}`, {
    x: width * 0.36,
    y: height * 0.219,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  const pdfBytes = await pdfDoc.save();


  return pdfBytes;
};

export const createResultsZip = async (
  files: Uint8Array[],
  names: string[]
) => {
  const zip = new JSZip();

  // const buffers = ;

  files.forEach((data, idx) => {
    zip.file(names[idx] || `file-${idx + 1}.pdf`, data);
  });

  const zipContent = await zip.generateAsync({ type: "uint8array" });

  // saveAs(zipBlob, "results.zip");
  return zipContent;
};
