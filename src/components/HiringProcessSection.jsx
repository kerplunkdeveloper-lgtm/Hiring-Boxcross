import React from 'react';
import { motion } from 'framer-motion';
import { FileCheck, PhoneCall, Dumbbell, Award, ArrowUpRight } from 'lucide-react';

export default function HiringProcessSection({ onApplyClick }) {
  const steps = [
    {
      num: '01',
      title: 'Online Application',
      duration: '3–5 Mins',
      desc: 'Submit your details, selected roles, experience, and CV.',
      icon: FileCheck
    },
    {
      num: '02',
      title: 'Phone Screening',
      duration: '15 Mins',
      desc: 'Brief call to discuss background, shift preferences, and expectations.',
      icon: PhoneCall
    },
    {
      num: '03',
      title: 'Arena Practical Demo',
      duration: '45 Mins',
      desc: 'On-site demo at Puducherry arena: padwork, workout delivery or front-desk scenario.',
      icon: Dumbbell
    },
    {
      num: '04',
      title: 'Offer & Onboarding',
      duration: 'Welcome',
      desc: 'Compensation agreement, roster planning, and official BXC apparel kit.',
      icon: Award
    }
  ];

  return (
    <section id="process-section" className="py-12 sm:py-20 bg-black border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 text-[#ccf141] font-display uppercase tracking-widest text-xs font-bold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccf141]" />
            <span>Recruitment Pipeline</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-5xl uppercase tracking-tight text-white">
            HIRING <span className="text-[#ccf141]">PROCESS</span>
          </h2>
          <p className="mt-2.5 sm:mt-3 text-neutral-400 text-xs sm:text-sm px-2">
            Fast, transparent, and focused on practical coaching and performance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, borderColor: 'rgba(204, 241, 65, 0.5)' }}
                className="bg-neutral-950/70 rounded-2xl p-4 sm:p-5 border border-neutral-900 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="font-display font-black text-xl sm:text-2xl text-neutral-600 group-hover:text-[#ccf141] transition-colors">
                      {step.num}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black text-[#ccf141] border border-[#ccf141]/30">
                      {step.duration}
                    </span>
                  </div>

                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#ccf141] mb-2.5 sm:mb-3">
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="font-display font-black text-sm sm:text-base text-white uppercase tracking-wide mb-1 sm:mb-1.5">
                    {step.title}
                  </h3>

                  <p className="text-neutral-400 text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 sm:mt-5 pt-3 border-t border-neutral-900 flex items-center justify-between text-[10px] text-neutral-500 uppercase tracking-widest">
                  <span>Phase {step.num}</span>
                  <span className="text-[#ccf141] font-medium">Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-10 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onApplyClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-[#ccf141] hover:border-[#ccf141]/50 transition-all shadow-sm"
          >
            <span>Proceed to Application</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}
