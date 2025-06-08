"use client";

import React, { useRef } from "react";
import { useUIStore } from "@/providers/ui-providers";
import toast from "react-hot-toast";
import {
  Heading1,
  Heading2,
  Heading3,
  Paragraph2,
} from "@/app/components/Text";
import { DownloadButton, Button } from "@/app/components/Button";
import { FaDownload } from "react-icons/fa6";
import { FaFileUpload } from "react-icons/fa";
import {
  validateResults,
  validateCandidateResultExcelResultFilename,
} from "@/utils/validators";
import { generateCandidateResultExcelResultFilename } from "@/utils/generators";
import * as XLSX from "xlsx";

export default function UploadExcelFile() {
  const { setResults } = useUIStore((state) => state);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) return;
    const filename = file.name.split(".")[0];

    const [valid, message] =
      validateCandidateResultExcelResultFilename(filename);

    if (!valid) {
      toast.error(message);
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as (
        | string
        | number
      )[][];

      // console.log({ json });
      const [valid, message, results] = validateResults(filename, json);

      if (!valid) {
        toast.error(message);
        return;
      } else {
        toast.success("File inserted successfully");
      }

      setResults(results);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="px-2 sm:px-0">
      <div className="sm:container sm:max-w-7xl sm:mx-auto items-start bg-white rounded-xl p-2 sm:p-6">
        <div className="flex items-center justify-between sm:container sm:max-w-7xl sm:mx-auto mb-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <div>
              <Heading1 className="mb-1 sm:mb-0">Upload Results Here</Heading1>
              <Heading2 className="max-w-[12rem] sm:max-w-none">
                Upload the Excel file containing student results data
              </Heading2>
            </div>
          </div>
          <DownloadButton
            download
            href="/assets/CSTCK_2025_8TH_ASC.xlsx"
            className="bg-[#2563eb]"
          >
            <FaDownload color="#fff" size={20} className="hidden sm:inline" />
            <span className="">Download</span>
          </DownloadButton>
        </div>
        <label
          htmlFor="dropzone-file"
          className="flex flex-col gap-y-3 items-center border-gray-300 p-0 rounded-lg border-2 border-solid py-6"
        >
          <FaFileUpload color="#9ca3af" size={30} className="animate-bounce" />
          <Heading3>Drop the file here</Heading3>
          <Paragraph2>or click to browse and select file</Paragraph2>
          <Paragraph2 className="text-center">
            File name format:{" "}
            <span className="font-bold">CSTCK_YYYY_No_ASC</span> e.g{" "}
            {generateCandidateResultExcelResultFilename()}
          </Paragraph2>
          <input
            ref={fileInputRef}
            id="dropzone-file"
            type="file"
            accept=".xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            className="hidden"
            // onChange={handleFileChange}
            onInput={handleFileChange}
          />
          <Button onClick={handleChooseFile} className="cursor-pointer">
            Choose File
          </Button>
          <Paragraph2>
            Supported formats:{" "}
            <span className="font-bold">.xlsx, .xls (Max 10MB)</span>{" "}
          </Paragraph2>
        </label>
      </div>
    </div>
  );
}
