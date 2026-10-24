import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, MapPin, Clock, Zap, ShieldCheck } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Hero({ onApplyClick, onViewRolesClick }) {
  const statCards = [
    {
      icon: MapPin,
      title: 'Location',
      value: 'Puducherry',
      subtitle: 'On-Site Arena',
      duration: '4s'
    },
    {
      icon: Clock,
      title: 'Application',
      value: '3–5 Minutes',
      subtitle: 'Fast Submission',
      duration: '4.8s'
    },
    {
      icon: Zap,
      title: 'Shifts',
      value: 'Morning / Evening',
      subtitle: 'Flexible Options',
      duration: '5.2s'
    },
    {
      icon: ShieldCheck,
      title: 'Response',
      value: '2–4 Days',
      subtitle: 'Fast Review',
      duration: '4.4s'
    }
  ];

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-black py-12 sm:py-20 md:py-28">
      
      {/* Real Box & Cross Arena Image Background with Cinematic Dark Overlays */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{ backgroundImage: `url('/hero-bg.jpg')` }}
      >
        {/* Dark Vignette & Gradient Overlays for High Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/75 to-black" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/55 to-black" />
        
        {/* Subtle Volt Neon Glow in Center matching gym lighting */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[550px] h-[220px] sm:h-[350px] bg-[#ccf141]/10 blur-[100px] sm:blur-[130px] pointer-events-none rounded-full" />
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
      >
        
        {/* Minimal Volt Pill */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 sm:gap-2.5 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-full bg-black/90 backdrop-blur-md border border-neutral-800 shadow-volt-glow mb-4 sm:mb-6">
          <img src="/bxc-logo.png" alt="BXC Logo" className="w-3.5 h-3.5 sm:w-4 sm:h-4 object-contain" />
          <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-widest text-[#ccf141]">
            BOX & CROSS ARENA • PUDUCHERRY
          </span>
        </motion.div>

        {/* Responsive Headline */}
        <motion.h1 variants={itemVariants} className="font-display font-black text-3xl sm:text-5xl lg:text-7xl uppercase tracking-tight text-white leading-tight">
          JOIN THE <span className="text-[#ccf141] text-glow-volt">BXC SQUAD</span>
        </motion.h1>

        {/* Official Slogan */}
        <motion.div variants={itemVariants} className="mt-3 sm:mt-4 flex items-center justify-center">
          <span className="font-athletic text-xl sm:text-3xl md:text-4xl text-[#ccf141] tracking-widest uppercase">
            "IT'S JUST NEVER ENOUGH."
          </span>
        </motion.div>

        {/* Minimalist Short Description */}
        <motion.p variants={itemVariants} className="mt-3 sm:mt-4 text-xs sm:text-base text-neutral-300 max-w-lg mx-auto font-normal leading-relaxed px-2">
          Discipline. Performance. Community. We're hiring coaches, trainers, and arena staff in Puducherry.
        </motion.p>

        {/* Action Triggers - Mobile Full Width Buttons */}
        <motion.div variants={itemVariants} className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onApplyClick}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#ccf141] hover:bg-[#d9f560] text-black font-display font-black text-xs uppercase tracking-wider rounded-xl shadow-volt-glow transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Apply to Join BXC</span>
            <ArrowDown className="w-4 h-4 stroke-[3]" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewRolesClick}
            className="w-full sm:w-auto px-6 py-3.5 bg-black/85 hover:bg-neutral-900/90 backdrop-blur-md border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white font-display font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>Explore 6+ Open Roles</span>
            <ArrowUpRight className="w-4 h-4 text-neutral-400" />
          </motion.button>
        </motion.div>

        {/* 4 Stat Cards: Optimized for 2x2 Grid on Mobile and 4 Columns on Desktop */}
        <motion.div variants={itemVariants} className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5 text-left">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div 
                key={card.title}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="relative p-[1.5px] overflow-hidden rounded-2xl group shadow-md hover:shadow-volt-glow"
              >
                {/* Smooth Continuous Spinning Neon Volt Border Beam */}
                <div 
                  className="absolute inset-[-200%] animate-border-spin bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_270deg,rgba(204,241,65,0.3)_315deg,#ccf141_360deg)] will-change-transform pointer-events-none opacity-85 group-hover:opacity-100 transition-opacity" 
                  style={{ animationDuration: card.duration }}
                />

                {/* Inner Card Content */}
                <div className="relative h-full w-full bg-black/95 backdrop-blur-xl rounded-[15px] p-2.5 sm:p-3.5 text-left border border-neutral-800/70 group-hover:border-transparent transition-colors">
                  <div className="flex items-center gap-1.5 text-[#ccf141] mb-1">
                    <Icon className="w-3.5 h-3.5 text-[#ccf141] shrink-0" />
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-neutral-400 truncate">{card.title}</span>
                  </div>
                  <div className="text-white font-bold text-xs sm:text-sm tracking-tight truncate">{card.value}</div>
                  <div className="text-neutral-500 text-[9px] sm:text-[10px] mt-0.5 truncate">{card.subtitle}</div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </motion.div>

      {/* Bottom Fade to Solid Black */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}
