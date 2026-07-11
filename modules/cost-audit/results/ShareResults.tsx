"use client";

import { useCallback } from "react";
import { Share2, Check } from "lucide-react";
import toast from "react-hot-toast";
import { AnimatedButton } from "@/components/AnimatedButton";

export function ShareResults() {
  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast.success("Link copied to clipboard!");
    }).catch(() => {
      toast.error("Could not copy link. Please copy the URL manually.");
    });
  }, []);

  return (
    <AnimatedButton
      type="button"
      id="cost-scan-share-btn"
      onClick={handleShare}
      variant="outline"
      className="bg-white border-slate-300 hover:bg-slate-50 hover:border-slate-400 text-slate-700 font-bold text-xs shadow-sm h-9 min-w-[150px]"
      aria-label="Copy results link to clipboard"
      text="Share Results"
      icon={<Share2 className="w-3.5 h-3.5" strokeWidth={2} />}
    />
  );
}
