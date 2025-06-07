import React from "react";
import { twMerge } from "tailwind-merge";

export const Button = ({
  children,
  className,
  onClick,
  disabled,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        "flex gap-1 sm:gap-2 justify-center items-center bg-green-600 rounded-lg px-2 sm:px-4 py-2 font-normal text-xs sm:text-sm md:text-base text-center text-white",
        onClick && "cursor-pointer",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const DownloadButton = ({
  children,
  className,
  href,
  download,
}: {
  children?: React.ReactNode;
  className?: string;
  href?: string;
  download?: boolean;
}) => {
  return (
    <a
      className={twMerge(
        "inline-flex gap-1 sm:gap-2 justify-center items-center bg-green-600 rounded-lg px-2 sm:px-4 py-2 font-normal text-xs sm:text-sm md:text-base text-center text-white",
        href && "cursor-pointer",
        className
      )}
      href={href}
      download={download}
    >
      {children}
    </a>
  );
};
