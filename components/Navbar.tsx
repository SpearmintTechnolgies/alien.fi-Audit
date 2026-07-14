"use client";

import { useState } from "react";
import { ChevronDown, ArrowUpRight, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { BrandLogo } from "./BrandLogo";
import { AnimatedLink } from "./AnimatedLink";
import { RollingText } from "./RollingText";
import { MagneticWrapper } from "./MagneticWrapper";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const parentUrl = "https://alien-fi-pied.vercel.app";

  return (
    <header className="sticky top-0 z-50 bg-[#9BED58] border-b border-black/10">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-[85px]">
          <a href={`${parentUrl}/`} className="flex items-end h-full hover:opacity-90 transition-opacity pb-0">
            <BrandLogo size={95} showText={false} />
          </a>

          {/* Nav Links */}
          <div className="hidden lg:flex gap-4 xl:gap-6 items-center">
            <MagneticWrapper>
              <a href={`${parentUrl}/`} className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors group">
                <RollingText text="Home" />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <a href={`${parentUrl}/services`} className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors group">
                <RollingText text="Services" />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <div className="relative group/menu">
                <button className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors flex items-center gap-1 py-4 group">
                  <RollingText text="AI Audit" />
                  <ChevronDown className="w-3 h-3 transition-transform group-hover/menu:rotate-180" />
                </button>
                <div className="absolute top-[85%] left-0 w-60 bg-[#FAFAFA] rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-[#EAEAEA] opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-200 transform translate-y-2 group-hover/menu:translate-y-0 z-50 overflow-hidden py-3">
                  <a href="/ai/cost-scan" className="block px-6 py-2.5 text-[13px] font-semibold text-[#666666] hover:bg-[#F0F0F0] hover:text-[#1a1a1a] transition-colors font-mono">
                    AI Cost Audit
                  </a>
                  <a href="/ai/opportunity-scan" className="block px-6 py-2.5 text-[13px] font-semibold text-[#666666] hover:bg-[#F0F0F0] hover:text-[#1a1a1a] transition-colors font-mono">
                    AI Opportunity Audit
                  </a>
                </div>
              </div>
            </MagneticWrapper>
            
            <MagneticWrapper>
              <a href={`${parentUrl}/platform`} className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors group">
                <RollingText text="Platform" />
              </a>
            </MagneticWrapper>
            
            <MagneticWrapper>
              <a href={`${parentUrl}/industries`} className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors group">
                <RollingText text="Industries" />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <a href={`${parentUrl}/solutions`} className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors group">
                <RollingText text="Solutions" />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <a href={`${parentUrl}/case-studies`} className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors group">
                <RollingText text="Case Studies" />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <a href={`${parentUrl}/about`} className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors group">
                <RollingText text="About" />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <a href={`${parentUrl}/blog`} className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors group">
                <RollingText text="Blog" />
              </a>
            </MagneticWrapper>

            <MagneticWrapper>
              <a href={`${parentUrl}/contact`} className="text-sm font-semibold text-[#1a1a1a] hover:opacity-70 transition-colors group">
                <RollingText text="Contact" />
              </a>
            </MagneticWrapper>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <AnimatedLink
              href={`${parentUrl}/contact#about-you`}
              text="Start a project"
              icon={<ArrowUpRight className="w-4 h-4" />}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-[#15182B] hover:bg-[#15182B]/5 rounded-lg"
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
            className="lg:hidden py-4 border-t border-[#15182B]/10 max-h-[calc(100vh-85px)] overflow-y-auto"
          >
            <nav className="flex flex-col gap-4 pb-10">
              <AnimatedLink href={`${parentUrl}/`} text="HOME" className="w-full justify-center text-center font-mono text-xs" onClick={() => setIsMenuOpen(false)} />
              <AnimatedLink href={`${parentUrl}/services`} text="SERVICES" className="w-full justify-center text-center font-mono text-xs" onClick={() => setIsMenuOpen(false)} />
              
              <div className="text-center font-mono text-xs font-bold text-[#1a1a1a] mt-2 mb-1">AI AUDITS</div>
              <AnimatedLink href="/ai/cost-scan" text="AI COST AUDIT" className="w-full justify-center text-center font-mono text-xs text-[#666666]" onClick={() => setIsMenuOpen(false)} />
              <AnimatedLink href="/ai/opportunity-scan" text="AI OPPORTUNITY AUDIT" className="w-full justify-center text-center font-mono text-xs text-[#666666]" onClick={() => setIsMenuOpen(false)} />
              
              <AnimatedLink href={`${parentUrl}/platform`} text="PLATFORM" className="w-full justify-center text-center font-mono text-xs mt-2" onClick={() => setIsMenuOpen(false)} />
              <AnimatedLink href={`${parentUrl}/industries`} text="INDUSTRIES" className="w-full justify-center text-center font-mono text-xs" onClick={() => setIsMenuOpen(false)} />
              <AnimatedLink href={`${parentUrl}/solutions`} text="SOLUTIONS" className="w-full justify-center text-center font-mono text-xs" onClick={() => setIsMenuOpen(false)} />
              <AnimatedLink href={`${parentUrl}/case-studies`} text="CASE STUDIES" className="w-full justify-center text-center font-mono text-xs" onClick={() => setIsMenuOpen(false)} />
              <AnimatedLink href={`${parentUrl}/about`} text="ABOUT" className="w-full justify-center text-center font-mono text-xs" onClick={() => setIsMenuOpen(false)} />
              <AnimatedLink href={`${parentUrl}/blog`} text="BLOG" className="w-full justify-center text-center font-mono text-xs" onClick={() => setIsMenuOpen(false)} />
              <AnimatedLink href={`${parentUrl}/contact`} text="CONTACT" className="w-full justify-center text-center font-mono text-xs" onClick={() => setIsMenuOpen(false)} />
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}
