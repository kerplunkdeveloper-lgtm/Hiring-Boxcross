import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { FAQS } from '../data/hiringData';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq-section" className="py-12 sm:py-20 bg-black border-t border-neutral-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 text-[#ccf141] font-display uppercase tracking-widest text-xs font-bold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccf141]" />
            <span>Applicant Inquiries</span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
            FREQUENTLY ASKED <span className="text-[#ccf141]">QUESTIONS</span>
          </h2>
          <p className="mt-2 text-neutral-400 text-xs sm:text-sm px-2">
            Common questions regarding interviewing, shifts, and coaching at Box & Cross.
          </p>
        </motion.div>

        <div className="space-y-2 sm:space-y-2.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-neutral-950/70 rounded-xl border border-neutral-900 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-3.5 sm:p-5 text-left flex items-center justify-between gap-3 hover:bg-neutral-900/50 transition-colors"
                >
                  <span className="font-display font-bold text-xs sm:text-base text-white pr-2">
                    {faq.q}
                  </span>
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 shrink-0">
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className={`w-3.5 h-3.5 ${isOpen ? 'text-[#ccf141]' : ''}`} />
                    </motion.div>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-3.5 pb-3.5 pt-1 sm:px-5 sm:pb-4 text-neutral-400 text-xs sm:text-sm leading-relaxed border-t border-neutral-900/70">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
