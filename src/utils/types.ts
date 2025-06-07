export interface CandidateResult {
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
  examNumber?: number
  selected?: boolean
}

export const candidateResultKeys = [
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
