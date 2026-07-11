"use client";

import { useState } from "react";
import { ChevronDown, ArrowUpRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { BrandLogo } from "./BrandLogo";
import { AnimatedLink } from "./AnimatedLink";
import { RollingText } from "./RollingText";
import { MagneticWrapper } from "./MagneticWrapper";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#9BED58] border-b border-black/10">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-[85px]">
          <a href="/" className="flex items-end h-full hover:opacity-90 transition-opacity pb-0">
            <BrandLogo size={95} showText={false} />
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex gap-6 items-center">
            <MagneticWrapper>
              <div className="relative group/menu">
                <a href="/#services" className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors flex items-center gap-1 py-4 group">
                  <RollingText text="Services" />
                  <ChevronDown className="w-3 h-3 transition-transform group-hover/menu:rotate-180" />
                </a>
                <div className="absolute top-[85%] left-0 w-60 bg-[#FAFAFA] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#EAEAEA] opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 transform translate-y-2 group-hover/menu:translate-y-0 z-50 overflow-hidden py-3">
                  {[
                    "AI Agents",
                    "AI Copilots",
                    "AI Implementation",
                    "AI Strategy",
                    "Custom Models",
                    "Managed AI",
                    "RAG Accelerator",
                    "AI Training",
                    "AI Governance"
                  ].map((item, idx) => (
                    <a key={idx} href={`/#${item.toLowerCase().replace(/ /g, '-')}`} className="block px-6 py-2.5 text-[13px] font-semibold text-[#666666] hover:bg-[#F0F0F0] hover:text-[#1a1a1a] transition-colors font-mono">
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </MagneticWrapper>
            
            <MagneticWrapper>
              <a href="/#platform" className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors flex items-center gap-1 group">
                <RollingText text="Platform" />
                <ChevronDown className="w-3 h-3" />
              </a>
            </MagneticWrapper>
            
            <MagneticWrapper>
              <a href="/#industries" className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors group">
                <RollingText text="Industries" />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <a href="/#solutions" className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors group">
                <RollingText text="Solutions" />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <a href="/#case-studies" className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors flex items-center gap-1 group">
                <RollingText text="Case Studies" />
                <ChevronDown className="w-3 h-3" />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <a href="/#about" className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors flex items-center gap-1 group">
                <RollingText text="About" />
                <ChevronDown className="w-3 h-3" />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <a href="/#blog" className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors group">
                <RollingText text="Blog" />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <a href="/#contact" className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors group">
                <RollingText text="Contact" />
              </a>
            </MagneticWrapper>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <AnimatedLink
              href="/#audit-cards"
              text="Start a project"
              icon={<ArrowUpRight className="w-4 h-4" />}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-[#15182B] hover:bg-[#15182B]/5 rounded-lg"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-[#15182B]/10"
          >
            <nav className="flex flex-col gap-4">
              <AnimatedLink
                href="/#audit-cards"
                text="START AUDIT"
                className="w-full justify-center text-center font-mono text-xs"
                onClick={() => setIsMenuOpen(false)}
              />
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}
