export interface CandidateResult {
  CSTCKNumber?: number
  serviceNumber?: number
  name?: string
  physicalEducation?: number
  parade?: number
  classAttendance?: number
  commandantTest?: number
  confidBuld?: number
  industrialAttachment?: number
  project?: number
  examination?: number
  grandTotal?: number
  gradeObtained?: string
  remark?: string
  examNumber?: string
  selected?: boolean
}

export const candidateResultKeys = [
  "CSTCKNumber",
  "serviceNumber",
  "name",
  "physicalEducation",
  "parade",
  "classAttendance",
  "commandantTest",
  "confidBuld",
  "industrialAttachment",
  "project",
  "examination",
  "grandTotal",
  "gradeObtained",
  "remark",
  "selected",
]
