import React from "react";
import { twMerge } from "tailwind-merge";

export const Heading1 = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1
      className={twMerge(
        "font-bold text-base sm:text-lg md:text-xl leading-none md:leading-7 tracking-normal text-gray-900",
        className
      )}
    >
      {children}
    </h1>
  );
};

export const Heading2 = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <h2
      className={twMerge(
        "font-normal text-sm sm:text-base leading-none md:leading-5 tracking-normal text-gray-500",
        className
      )}
    >
      {children}
    </h2>
  );
};

export const Heading3 = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={twMerge(
        "font-bold text-sm sm:text-base leading-none md:leading-5 tracking-normal text-black",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const Paragraph1 = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={twMerge(
        "font-normal text-base leading-none md:leading-6 tracking-normal text-gray-600",
        className
      )}
    >
      {children}
    </p>
  );
};

export const Paragraph2 = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={twMerge(
        "font-normal text-sm sm:text-base leading-none md:leading-5 tracking-normal text-gray-500",
        className
      )}
    >
      {children}
    </p>
  );
};

export const Info = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={twMerge(
        "font-normal text-xs sm:text-sm sm:leading-5 leading-none md:tracking-normal text-left text-gray-500",
        className
      )}
    >
      {children}
    </p>
  );
};
