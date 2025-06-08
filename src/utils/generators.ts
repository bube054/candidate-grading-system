// import 

export const generateCandidateResultExcelResultFilename = () => {
  const day = new Date().getDate();
  let suffix = "TH";

  if (day === 1 || day === 21 || day === 31) {
    suffix = "ST";
  } else if (day === 2 || day === 22) {
    suffix = "ND";
  } else if (day === 3 || day === 23) {
    suffix = "RD";
  }

  return `CSTCK_${new Date().getFullYear()}_${day}${suffix}_ASC`;
};

export const generateCandidateResultExamNumber = (filename: string) => {
  return filename.replace("_ASC", " - ASC").replaceAll("_", "/");  
}