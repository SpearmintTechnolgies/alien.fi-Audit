"use client";
import React from "react";
import { RollingText } from "./RollingText";
import { MagneticWrapper } from "./MagneticWrapper";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
}

export function AnimatedButton({ text, icon, variant = "primary", className = "", ...props }: AnimatedButtonProps) {
  let variantClasses = "";
  switch (variant) {
    case "primary":
      variantClasses = "bg-[#000] text-white hover:bg-[#222]";
      break;
    case "secondary":
      variantClasses = "bg-[#96EE52] text-[#15182B] hover:bg-[#85DF41]";
      break;
    case "outline":
      variantClasses = "bg-transparent border border-[#000] text-[#000] hover:bg-gray-50";
      break;
  }

  return (
    <MagneticWrapper>
      <button
        className={`group px-5 py-2.5 text-sm font-bold rounded-lg transition-colors inline-flex items-center gap-2 ${variantClasses} ${className}`}
        {...props}
      >
        <RollingText text={text} />
        {icon && (
          <span className="block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1 group-hover:-translate-y-1">
            {icon}
          </span>
        )}
      </button>
    </MagneticWrapper>
  );
}
