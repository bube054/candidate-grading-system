"use client";

import React, { useEffect, useState, useMemo, memo } from "react";
import Fuse from "fuse.js";
import ReactPaginate from "react-paginate";
import { CandidateResult, candidateResultKeys } from "@/utils/types";
import { useUIStore } from "@/providers/ui-providers";
import { Heading3, Paragraph2, Info } from "@/app/components/Text";
import { Button } from "@/app/components/Button";
import { Search } from "@/app/components/Search";
import { Input, Checkbox } from "@/app/components/input";
import { FaTable, FaEye, FaDownload } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ViewResults() {
  const {
    results,
    setResults,
    rowsPerPage,
    searchText,
    setSearchText,
    setRowsPerPage,
  } = useUIStore((state) => state);
  const [itemOffset, setItemOffset] = useState(0);
  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  const memoizedResults = useMemo(() => {
    if (debouncedSearchText?.trim()) {
      const fuse = new Fuse(results, {
        keys: candidateResultKeys,
        threshold: 0.4,
      });
      return fuse.search(debouncedSearchText).map((result) => result.item);
    }
    return results;
  }, [debouncedSearchText, results]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [searchText]);

  useEffect(() => {
    setItemOffset(0);
  }, [memoizedResults]);

  const endOffset = itemOffset + rowsPerPage;
  const currentResults = memoizedResults.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(memoizedResults.length / rowsPerPage);
  const selectedResults = currentResults.filter((result) => result.selected);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number(e.target.value));
  };

  const handleSelectAll = () => {
    const allSelected = currentResults.every((result) => result.selected);
    setResults(
      results.map((result) =>
        currentResults.some((r) => r.serviceNumber === result.serviceNumber)
          ? { ...result, selected: !allSelected }
          : result
      )
    );
  };

  const handleToggleSelect = (serviceNumber: number) => {
    setResults(
      results.map((result) =>
        result.serviceNumber === serviceNumber
          ? { ...result, selected: !result.selected }
          : result
      )
    );
  };

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = event.selected * rowsPerPage;
    // handleUnselectAll();
    setItemOffset(newOffset);
  };

  const handleDownloadSingleResult = async (result: CandidateResult) => {
    // downloadSingleResultPdf(result);
    try {
      const response = await fetch("/api/download/single", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Download failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${result.serviceNumber}_${result.name}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      // @ts-expect-error yuoiop
      toast.error(error?.message || "Failed to generate zip");
    }
  };

  const handleDownloadZippedResult = async (results: CandidateResult[]) => {
    // downloadSingleResultPdf(result);
    try {
      const response = await fetch("/api/download/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(results),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Download failed");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "results.zip";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      // @ts-expect-error yuoiop
      toast.error(error?.message || "Failed to generate zip");
    }
  };

  if (results?.length === 0) {
    return <NoResults />;
  }

  return (
    <div className="px-2 sm:px-0 sm:container sm:max-w-6xl sm:mx-auto">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* Move the caption-like content here */}
        <div className="w-full flex justify-between p-2 sm:p-6 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white">
          <div className="flex items-center gap-2">
            <Search
              value={searchText}
              onChange={handleSearchChange}
              className="w-[12rem]"
              placeholder="Search by columns..."
            />
            <Button
              disabled={selectedResults.length === 0}
              onClick={() => handleDownloadZippedResult(selectedResults)}
            >
              <FaDownload size={20} color="#fff" />
              <span className="">Download {selectedResults.length || ""}</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Info>Rows per page:</Info>
            <Input
              value={rowsPerPage}
              onChange={handleRowsPerPageChange}
              className="w-[5rem]"
              type="number"
              step="1"
              min="1"
            />
          </div>
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-sm text-gray-500 bg-gray-50">
            <tr>
              <th scope="col" className="px-2 py-3">
                <Checkbox
                  checked={
                    currentResults.length > 0 &&
                    currentResults.every((r) => r.selected)
                  }
                  // indeterminate={currentResults.some(r => r.selected) && !currentResults.every(r => r.selected)}
                  onChange={handleSelectAll}
                />
              </th>
              <th scope="col" className="px-2 py-3">
                S/N
              </th>
              <th scope="col" className="px-2 py-3">
                Name
              </th>
              <th scope="col" className="px-2 py-3">
                Physical Ed
              </th>
              <th scope="col" className="px-2 py-3">
                Parade
              </th>
              <th scope="col" className="px-2 py-3">
                attendance
              </th>
              <th scope="col" className="px-2 py-3">
                Project
              </th>
              <th scope="col" className="px-2 py-3">
                Examination
              </th>
              <th scope="col" className="px-2 py-3">
                Grand Total
              </th>
              <th scope="col" className="px-2 py-3">
                Grade
              </th>
              <th scope="col" className="px-2 py-3">
                Remark
              </th>
              <th scope="col" className="px-2 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentResults?.map((result, index) => (
              <MemoizedResult
                key={result.serviceNumber}
                result={result}
                striped={index % 2 === 0}
                handleToggleSelect={handleToggleSelect}
                handleDownloadSingleResult={handleDownloadSingleResult}
              />
            ))}
          </tbody>
        </table>

        <div className="flex flex-col gap-y-3 md:flex-row items-center md:justify-between bg-white p-2 sm:p-6">
          <Info>
            Showing {itemOffset + 1} to{" "}
            {Math.min(endOffset, memoizedResults.length)} of{" "}
            {memoizedResults.length}
          </Info>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            forcePage={Math.floor(itemOffset / rowsPerPage)}
            containerClassName="flex items-center justify-center space-x-2 my-4 text-sm"
            pageClassName="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100 text-gray-700 cursor-pointer"
            pageLinkClassName="page-link"
            previousClassName="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100 text-gray-700 cursor-pointer"
            nextClassName="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100 text-gray-700 cursor-pointer"
            breakClassName="text-gray-500 px-2"
            activeClassName="bg-blue-600 text-white border-blue-600"
          />
        </div>
      </div>
    </div>
  );
}

function Result({
  result,
  striped,
  handleToggleSelect,
  handleDownloadSingleResult,
}: {
  result: CandidateResult;
  striped: boolean;
  handleToggleSelect: (serviceNumber: number) => void;
  handleDownloadSingleResult: (result: CandidateResult) => void;
}) {
  return (
    <tr
      className={`${
        striped ? "bg-gray-100" : "bg-white"
      } border-b border-gray-200`}
    >
      <th className="px-2 py-2 font-medium text-gray-600 whitespace-nowrap">
        <Checkbox
          checked={result.selected}
          onChange={() => handleToggleSelect(result.serviceNumber!)}
        />
      </th>
      <th className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap">
        {result.serviceNumber}
      </th>
      <th className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap">
        {result.name}
      </th>
      <th className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap">
        {result.physicalEducation}
      </th>
      <th className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap">
        {result.parade}
      </th>
      <th className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap">
        {result.classAttendance}
      </th>
      <th className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap">
        {result.project}
      </th>
      <th className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap">
        {result.examination}
      </th>
      <th className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap">
        {result.grandTotal}
      </th>
      <th className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap">
        {result.gradeObtained}
      </th>
      <th className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap">
        {result.remark}
      </th>
      <th className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap flex gap-2">
        <FaEye color="#2563eb" className="cursor-pointer" />
        <FaDownload
          onClick={() => handleDownloadSingleResult(result)}
          color="#16a34a"
          className="cursor-pointer"
        />
      </th>
    </tr>
  );
}

const MemoizedResult = memo(Result);

function NoResults() {
  return (
    <div className="px-2 sm:px-0 sm:container sm:max-w-6xl sm:mx-auto items-center flex flex-col gap-y-3">
      <span className="bg-[#F3F4F6] w-12 h-12 rounded-full flex items-center justify-center">
        <FaTable size={20} color="#9CA3AF" />
      </span>
      <Heading3>No data available</Heading3>
      <Paragraph2>Upload an Excel file to view candidates results</Paragraph2>
    </div>
  );
}
