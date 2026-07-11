"use client";
import React from "react";
import Link, { LinkProps } from "next/link";
import { RollingText } from "./RollingText";
import { MagneticWrapper } from "./MagneticWrapper";

interface AnimatedLinkProps extends LinkProps {
  text: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "nav";
  className?: string;
}

export function AnimatedLink({ text, icon, variant = "primary", className = "", ...props }: AnimatedLinkProps) {
  let variantClasses = "";
  switch (variant) {
    case "primary":
      variantClasses = "bg-[#000] text-white hover:bg-[#222] px-5 py-2.5 rounded-lg";
      break;
    case "secondary":
      variantClasses = "bg-[#96EE52] text-[#15182B] hover:bg-[#85DF41] px-5 py-2.5 rounded-lg";
      break;
    case "outline":
      variantClasses = "bg-transparent border border-[#000] text-[#000] hover:bg-gray-50 px-5 py-2.5 rounded-lg";
      break;
    case "nav":
      variantClasses = "text-sm text-gray-700 hover:text-gray-900";
      break;
  }

  return (
    <MagneticWrapper>
      <Link
        className={`group text-sm font-bold transition-colors inline-flex items-center gap-2 ${variantClasses} ${className}`}
        {...props}
      >
        <RollingText text={text} />
        {icon && (
          <span className="block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1 group-hover:-translate-y-1">
            {icon}
          </span>
        )}
      </Link>
    </MagneticWrapper>
  );
}
