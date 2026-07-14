"use client";

import { MagneticWrapper } from "@/components/MagneticWrapper";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import * as motion from "framer-motion/client";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f8f9fa] via-[#eef2f3] to-[#e4eedb] p-6 md:p-12 flex flex-col justify-center items-center">
      <div className="max-w-6xl w-full mx-auto space-y-12">
        {/* Top Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono font-semibold text-gray-500 tracking-wider">START HERE</span>
              <span className="bg-black text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b4f464]"></span> NEW
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-mono font-bold text-black tracking-tighter uppercase leading-none">
              AI AUDITS
            </h1>
          </div>
          <div className="max-w-xs text-left md:text-right">
            <p className="text-gray-500 text-sm font-sans leading-relaxed">
              Two fast, scoped engagements before the full roadmap.
            </p>
          </div>
        </div>

        {/* Cards Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-[2rem] border border-gray-200/80 overflow-hidden bg-[#f3f4fa] shadow-xl shadow-gray-200/50">
          
          {/* Card 1: Cost Audit */}
          <div className="p-10 md:p-12 border-b md:border-b-0 md:border-r border-gray-200/80 flex flex-col h-full bg-gradient-to-br from-white/40 to-transparent">
            <div className="flex justify-between items-start mb-8">
              <span className="bg-[#b4f464] text-black text-[10px] font-bold font-mono px-3 py-1.5 rounded-full uppercase tracking-wider">
                5-10 Day Turnaround
              </span>
              <span className="text-[#b4f464] font-mono font-bold text-sm">01</span>
            </div>
            
            <h2 className="text-3xl font-mono font-bold text-black mb-4 tracking-tight">AI Cost Audit</h2>
            <p className="text-gray-500 text-[13px] font-sans leading-relaxed mb-8">
              A full accounting of what AI is actually costing you—compute, tooling, vendor contracts, engineering hours—and exactly where it's wasted.
            </p>
            
            <ul className="space-y-3 mb-12 flex-1">
              {[
                "Infra & vendor spend",
                "Tooling overlap",
                "Headcount allocation",
                "Savings roadmap"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-mono text-gray-500 tracking-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b4f464]"></span>
                  {item}
                </li>
              ))}
            </ul>

            <MagneticWrapper>
              <Link href="/ai/cost-scan" className="w-full block">
                <div className="bg-black text-white rounded-xl py-4 px-6 w-full flex justify-center items-center gap-2 hover:bg-gray-900 transition-colors font-mono text-xs font-bold uppercase tracking-wider">
                  Start a cost audit
                  <ArrowUpRight className="w-4 h-4 text-[#b4f464]" />
                </div>
              </Link>
            </MagneticWrapper>
          </div>

          {/* Card 2: Opportunity Audit */}
          <div className="p-10 md:p-12 flex flex-col h-full bg-gradient-to-br from-white/40 to-transparent">
            <div className="flex justify-between items-start mb-8">
              <span className="bg-[#b4f464] text-black text-[10px] font-bold font-mono px-3 py-1.5 rounded-full uppercase tracking-wider">
                5-10 Day Turnaround
              </span>
              <span className="text-[#b4f464] font-mono font-bold text-sm">02</span>
            </div>
            
            <h2 className="text-3xl font-mono font-bold text-black mb-4 tracking-tight">AI Opportunity Audit</h2>
            <p className="text-gray-500 text-[13px] font-sans leading-relaxed mb-8">
              A structured scan of your data, workflows, and product surface to find where AI creates new value—not just efficiency.
            </p>
            
            <ul className="space-y-3 mb-12 flex-1">
              {[
                "Use case discovery",
                "Data readiness",
                "Competitive scan",
                "Prioritized roadmap"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-mono text-gray-500 tracking-tight">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b4f464]"></span>
                  {item}
                </li>
              ))}
            </ul>

            <MagneticWrapper>
              <Link href="/ai/opportunity-scan" className="w-full block">
                <div className="bg-black text-white rounded-xl py-4 px-6 w-full flex justify-center items-center gap-2 hover:bg-gray-900 transition-colors font-mono text-xs font-bold uppercase tracking-wider">
                  Start an opportunity audit
                  <ArrowUpRight className="w-4 h-4 text-[#b4f464]" />
                </div>
              </Link>
            </MagneticWrapper>
          </div>
          
        </div>
      </div>
    </main>
  );
}