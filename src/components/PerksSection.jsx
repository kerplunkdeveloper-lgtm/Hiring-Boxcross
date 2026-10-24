import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Flame, Zap, Award, HeartHandshake, MapPin } from 'lucide-react';
import { PERKS } from '../data/hiringData';

const iconMap = {
  Trophy,
  Flame,
  Zap,
  Award,
  HeartHandshake,
  MapPin
};

export default function PerksSection() {
  return (
    <section id="perks-section" className="py-12 sm:py-20 bg-black border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 text-[#ccf141] font-display uppercase tracking-widest text-xs font-bold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccf141]" />
            <span>Culture & Benefits</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-5xl uppercase tracking-tight text-white">
            WHY BUILD YOUR CAREER AT <span className="text-[#ccf141]">BOX & CROSS</span>?
          </h2>
          <p className="mt-2.5 sm:mt-3 text-neutral-400 text-xs sm:text-sm px-2">
            Puducherry's benchmark combat and athletic performance arena designed for relentless growth.
          </p>
        </motion.div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {PERKS.map((perk, idx) => {
            const Icon = iconMap[perk.icon] || Trophy;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, borderColor: 'rgba(204, 241, 65, 0.5)' }}
                className="bg-neutral-950/70 rounded-2xl p-4.5 sm:p-6 border border-neutral-900 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#ccf141] mb-3 sm:mb-4">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="font-display font-black text-sm sm:text-base text-white uppercase tracking-wide mb-1 sm:mb-1.5">
                    {perk.title}
                  </h3>
                  <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                    {perk.description}
                  </p>
                </div>

                <div className="mt-4 sm:mt-5 pt-3 border-t border-neutral-900 flex items-center justify-between text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  <span>Arena Standard</span>
                  <span className="text-[#ccf141] font-mono">0{idx + 1}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Minimalist Culture Mantra */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 sm:mt-12 p-5 sm:p-8 rounded-2xl bg-neutral-950 border border-neutral-800 text-center relative overflow-hidden"
        >
          <div className="relative z-10 max-w-xl mx-auto">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#ccf141] mb-1.5">Our Guiding Mantra</p>
            <div className="font-athletic text-2xl sm:text-4xl text-white tracking-widest uppercase">
              "IT'S JUST NEVER ENOUGH."
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed">
              Whether coaching a beginner's first pad round or programming for competitive athletes, BXC is where discipline meets its match.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
