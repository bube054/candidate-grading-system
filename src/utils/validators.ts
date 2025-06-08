import { FIXED_FILE_HEADERS } from "./constants";
import { CandidateResult } from "./types";
import { generateCandidateResultExamNumber } from "./generators";

const validateserviceNumber = (
  serviceNumber: string | number
): [boolean, string] => {
  if (typeof serviceNumber == "string")
    return [
      false,
      "Invalid serial number type: recieved string, required number",
    ];

  if (serviceNumber <= 0)
    return [false, "Invalid serial number: recieved 0, required > 0"];

  return [true, ""];
};

const validateCSTCKNumber = (number: string | number): [boolean, string] => {
  if (typeof number == "string")
    return [
      false,
      "Invalid CSTCK Number type: recieved string, required number",
    ];

  if (number <= 0)
    return [false, "Invalid STCK Number: recieved 0, required > 0"];

  return [true, ""];
};

const validateName = (name: string | number): [boolean, string] => {
  if (typeof name != "string")
    return [false, "Invalid name type: recieved number, required string"];

  if (name?.trim().length == 0)
    return [false, "Invalid name: recieved empty string"];

  return [true, ""];
};

const validateNumber = (number: string | number): [boolean, string] => {
  if (typeof number != "number")
    return [false, "Invalid number type: recieved string, required number"];

  if (number <= 0) return [false, "Invalid number: recieved 0, required > 0"];

  return [true, ""];
};

const validateGrade = (grade: string | number): [boolean, string] => {
  if (typeof grade != "string")
    return [false, "Invalid grade type: recieved number, required string"];

  if (!/^[A-Z]$/.test(grade)) {
    return [false, `Invalid grade: recieved invalid string`];
  }

  return [true, ""];
};

const validateRemark = (remark: string | number): [boolean, string] => {
  if (typeof remark != "string")
    return [false, "Invalid remark type: recieved number, required string"];

  if (remark?.trim().length == 0)
    return [false, "Invalid remark: recieved empty string"];

  return [true, ""];
};

export const validateResults = (
  filename: string,
  data: (number | string)[][]
): [boolean, string, CandidateResult[]] => {
  if (data.length === 0) return [false, "No data found", []];
  const columnAmount = FIXED_FILE_HEADERS.length;

  // validate column header
  const headers = data[0];
  const results = data.slice(1);

  if (headers.length != columnAmount)
    return [
      false,
      `Invalid column amount: recieved ${headers.length}, required ${columnAmount}`,
      [],
    ];

  for (const [index, header] of headers.entries()) {
    if (typeof header !== "string") return [false, "Invalid header type", []];

    const FIXED_FILE_HEADER = FIXED_FILE_HEADERS[index];

    if (
      !FIXED_FILE_HEADER?.toLocaleLowerCase()?.startsWith(
        header?.replace(/\s*\(\d+\)$/, "").toLocaleLowerCase()
      )
    ) {
      return [
        false,
        `Invalid header: recieved ${header}, required ${FIXED_FILE_HEADER}`,
        [],
      ];
    }
  }

  const candidateResults: CandidateResult[] = [];

  const examNumber = generateCandidateResultExamNumber(filename);

  for (const [i, row] of results?.entries()) {
    const candidateResult: CandidateResult = { selected: false };
    for (const [j, value] of row?.entries()) {
      const positionMessage = `At ${i + 2} row, ${j + 1} column. `;
      switch (j) {
        case 0: {
          candidateResult.CSTCKNumber = value as number;
          candidateResult.examNumber = examNumber;
          const [isValidCSTCK, CSTCKMessage] = validateCSTCKNumber(value);
          if (!isValidCSTCK)
            return [false, positionMessage.concat(CSTCKMessage), []];
          break;
        }
        case 1: {
          candidateResult.name = value as string;
          const [isValidName, nameMessage] = validateName(value);
          if (!isValidName)
            return [false, positionMessage.concat(nameMessage), []];
          break;
        }
        case 2: {
          candidateResult.serviceNumber = value as number;
          const [isValidSerial, serialMessage] = validateserviceNumber(value);
          if (!isValidSerial)
            return [false, positionMessage.concat(serialMessage), []];
          break;
        }
        case 3: {
          candidateResult.physicalEducation = value as number;
          break;
        }
        case 4: {
          candidateResult.parade = value as number;
          break;
        }
        case 5: {
          candidateResult.classAttendance = value as number;
          break;
        }
        case 6: {
          candidateResult.commandantTest = value as number;
          break;
        }
        case 7: {
          candidateResult.confidBuld = value as number;
          break;
        }
        case 8: {
          candidateResult.industrialAttachment = value as number;
          break;
        }
        case 9: {
          candidateResult.project = value as number;
          break;
        }
        case 10: {
          candidateResult.examination = value as number;
          break;
        }
        case 11: {
          candidateResult.grandTotal = value as number;
          const [isValid, message] = validateNumber(value);
          if (!isValid) return [false, positionMessage.concat(message), []];
          break;
        }
        case 12: {
          candidateResult.gradeObtained = value as string;
          const [isValid, message] = validateGrade(value);
          if (!isValid) return [false, positionMessage.concat(message), []];
          break;
        }
        case 13: {
          candidateResult.remark = value as string;
          const [isValid, message] = validateRemark(value);
          if (!isValid) return [false, positionMessage.concat(message), []];
          break;
        }
        default:
          return [false, "Something went wrong", []];
      }
    }

    candidateResults.push(candidateResult);
  }

  // return data.length > 0 && data[0].length > 0;
  return [true, "", candidateResults];
};

export const validateCandidateResultExcelResultFilename = (
  filename: string
): [boolean, string] => {
  const regex = /^CSTCK_\d{4}_(0?[1-9]|[12][0-9]|3[01])(ST|ND|RD|TH)?_ASC$/;

  if (!regex.test(filename)) {
    return [false, `Invalid filename: received ${filename}`];
  }

  return [true, ""];
};
