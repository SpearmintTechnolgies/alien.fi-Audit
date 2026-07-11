"use client";
import React from "react";

interface RollingTextProps {
  text: string;
  className?: string;
}

export function RollingText({ text, className = "" }: RollingTextProps) {
  return (
    <span className={`relative overflow-hidden block ${className}`}>
      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
        {text}
      </span>
      <span className="block absolute top-full left-0 w-full text-center transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full" aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
