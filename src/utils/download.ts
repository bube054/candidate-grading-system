import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import JSZip from "jszip";
import { CandidateResult } from "@/utils/types";

export const createResultPdf = async (
  template: ArrayBuffer,
  result: CandidateResult,
  origin = ""
) => {
  const url = `${origin}/assets/result_template.pdf`;
  // const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());
  // const existingPdfBytes = template;

  const pdfDoc = await PDFDocument.load(template);

  const TR = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const TRB = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  const { width, height } = firstPage.getSize();

  firstPage.drawText(`${result.name}`, {
    x: width * 0.36,
    y: height * 0.670,
    size: 14,
    font: TR,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.serviceNumber}`, {
    x: width * 0.36,
    y: height * 0.640,
    size: 14,
    font: TR,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.examNumber}/${result.CSTCKNumber}`, {
    x: width * 0.36,
    y: height * 0.610,
    size: 14,
    font: TR,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.physicalEducation}`, {
    x: width * 0.419,
    y: height * 0.512,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.parade}`, {
    x: width * 0.419,
    y: height * 0.482,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.classAttendance}`, {
    x: width * 0.419,
    y: height * 0.452,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.commandantTest}`, {
    x: width * 0.419,
    y: height * 0.422,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.confidBuld}`, {
    x: width * 0.419,
    y: height * 0.392,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.industrialAttachment}`, {
    x: width * 0.419,
    y: height * 0.362,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.project}`, {
    x: width * 0.419,
    y: height * 0.332,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.examination}`, {
    x: width * 0.419,
    y: height * 0.302,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.grandTotal}`, {
    x: width * 0.419,
    y: height * 0.272,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.gradeObtained}`, {
    x: width * 0.419,
    y: height * 0.242,
    size: 14,
    font: TRB,
    color: rgb(0, 0, 0),
  });

  firstPage.drawText(`${result.remark}`, {
    x: width * 0.36,
    y: height * 0.212,
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
