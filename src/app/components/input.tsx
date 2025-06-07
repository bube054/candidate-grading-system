import React from "react";
import { twMerge } from "tailwind-merge";

export const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={twMerge(
        "rounded-lg border border-gray-300 flex items-center px-2 sm:px-3 py-2 gap-1 sm:gap-2 grow outline-none font-normal text-sm sm:text-base leading-6 tracking-normal text-left placeholder:text-[#adaebc]",
        className
      )}
    />
  );
};

export const Checkbox = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      type="checkbox"
      className={twMerge(
        "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm cursor-pointer",
        className
      )}
    />
  );
};
