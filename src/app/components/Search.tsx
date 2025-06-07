import React from "react";
import { twMerge } from "tailwind-merge";
import { CiSearch } from "react-icons/ci";

export const Search = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <div className="rounded-lg border border-gray-300 flex items-center px-3 py-2 gap-2">
      <CiSearch size={20} color="#9CA3AF" />
      <input
        {...props}
        type="search"
        className={twMerge(
          "grow outline-none font-normal text-base leading-6 tracking-normal text-left placeholder:text-[#adaebc]",
          className
        )}
      />
    </div>
  );
};
