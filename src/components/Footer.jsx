import React from 'react';
import { Flame, MapPin, Mail, Globe } from 'lucide-react';

export default function Footer({ onScrollToSection, onOpenApiModal }) {
  return (
    <footer className="bg-black border-t border-neutral-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-neutral-900">
          
          {/* Col 1: Brand & Slogan */}
          <div className="md:col-span-1 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center text-[#ccf141] shadow-volt-glow">
                <Flame className="w-5 h-5" />
              </div>
              <span className="font-display font-black tracking-wider text-lg text-white uppercase">
                BOX <span className="text-[#ccf141]">&</span> CROSS
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Box & Cross Performance Arena is Puducherry's premier combat and functional conditioning facility.
            </p>

            <div className="pt-1">
              <span className="font-athletic text-base text-[#ccf141] tracking-widest uppercase block">
                "IT'S JUST NEVER ENOUGH."
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-300">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <button
                  onClick={() => onScrollToSection('roles-section')}
                  className="hover:text-[#ccf141] transition-colors"
                >
                  Open Roles
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('apply-form')}
                  className="hover:text-[#ccf141] transition-colors"
                >
                  Application Form (6 Steps)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('perks-section')}
                  className="hover:text-[#ccf141] transition-colors"
                >
                  Culture & Perks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('process-section')}
                  className="hover:text-[#ccf141] transition-colors"
                >
                  Hiring Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('faq-section')}
                  className="hover:text-[#ccf141] transition-colors"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Arena Info */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-300">
              Arena Location
            </h4>
            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#ccf141] shrink-0 mt-0.5" />
                <span>Box & Cross Performance Arena, Puducherry — 605001</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#ccf141] shrink-0" />
                <span>careers@boxandcross.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>www.boxandcross.com</span>
              </div>
            </div>
          </div>

          {/* Col 4: Backend API Status */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-neutral-300">
              Recruitment API
            </h4>
            <p className="text-xs text-neutral-400">
              Submissions post directly to BXC talent services.
            </p>
            <button
              onClick={onOpenApiModal}
              className="w-full py-2 px-3 rounded-lg bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-xs font-bold text-neutral-300 hover:text-white flex items-center justify-between transition-colors"
            >
              <span className="font-mono text-[11px]">api.boxandcross.com</span>
              <span className="w-2 h-2 rounded-full bg-[#ccf141]" />
            </button>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Box & Cross Performance Arena.
          </div>
          <div className="text-neutral-400 font-medium">
            Discipline • Performance • Community
          </div>
        </div>

      </div>
    </footer>
  );
}
