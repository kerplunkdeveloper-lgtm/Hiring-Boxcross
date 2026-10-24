import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar({ onScrollToSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Roles', target: 'roles-section' },
    { name: 'Culture', target: 'perks-section' },
    { name: 'Process', target: 'process-section' },
    { name: 'FAQ', target: 'faq-section' },
  ];

  const handleNavClick = (target) => {
    setMobileMenuOpen(false);
    onScrollToSection(target);
  };

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 w-full bg-black/85 backdrop-blur-xl border-b border-neutral-900 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Navbar Brand Logo */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group py-1"
          >
            <img 
              src="/navbar-logo.png" 
              alt="BOX CROSS Performance Arena" 
              className="h-7 sm:h-9 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(204,241,65,0.25)] group-hover:drop-shadow-[0_0_20px_rgba(204,241,65,0.5)] transition-all duration-300"
            />
            <div className="hidden lg:flex flex-col border-l border-neutral-800 pl-3">
              <span className="text-[10px] tracking-widest text-neutral-300 font-bold uppercase">
                PERFORMANCE ARENA
              </span>
              <span className="text-[9px] tracking-wider text-[#ccf141] font-mono">
                PUDUCHERRY • CAREERS
              </span>
            </div>
          </motion.div>

          {/* Desktop Nav - Minimalist */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.target)}
                className="text-xs uppercase font-bold tracking-widest text-neutral-400 hover:text-[#ccf141] transition-colors duration-200"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Right Action button */}
          <div className="hidden md:flex items-center gap-3">
            {/* Primary Apply CTA with Framer Motion hover/tap */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => handleNavClick('apply-form')}
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-black tracking-wider text-black uppercase transition-colors duration-200 bg-[#ccf141] hover:bg-[#d9f560] rounded-xl shadow-volt-glow"
            >
              <span className="flex items-center gap-1.5">
                Apply Now
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </span>
            </motion.button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-200 active:scale-95 transition-transform"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#ccf141]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-b border-neutral-800/80 bg-black/95 backdrop-blur-2xl px-4 pt-3 pb-5 space-y-3 overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.target)}
                  className="text-left px-3.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-[#ccf141] hover:bg-neutral-900/60 active:bg-neutral-900 flex items-center justify-between transition-colors"
                >
                  <span>{link.name}</span>
                  <span className="text-[#ccf141] text-xs font-mono">→</span>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-neutral-900 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('apply-form')}
                className="w-full py-3.5 bg-[#ccf141] text-black font-black tracking-wider rounded-xl uppercase shadow-volt-glow flex items-center justify-center gap-2 text-xs active:scale-[0.99] transition-transform"
              >
                <span>Apply to Join BXC</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
