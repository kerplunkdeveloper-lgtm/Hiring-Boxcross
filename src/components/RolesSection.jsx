import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Flame,
  Dumbbell,
  Target,
  UserCheck,
  TrendingUp,
  Sparkles,
  Briefcase,
  Check,
  Clock,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { POSITIONS_LIST } from '../data/hiringData';

const iconMap = {
  Flame,
  Dumbbell,
  Target,
  UserCheck,
  TrendingUp,
  Sparkles,
  Briefcase
};

export default function RolesSection({ onSelectRoleAndApply, selectedRoles = [] }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const categories = ['All', 'Coaching', 'Operations', 'Sales', 'Facility'];

  // Responsive cards per view (1 on mobile, 2 on tablet, 3 on desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter roles based on active category
  const filteredRoles = useMemo(() => {
    return activeFilter === 'All'
      ? POSITIONS_LIST
      : POSITIONS_LIST.filter(r => r.category === activeFilter);
  }, [activeFilter]);

  // Max slide index so the last cardsPerView cards sit flush with right boundary
  const maxIndex = Math.max(0, filteredRoles.length - cardsPerView);
  const isCarouselActive = filteredRoles.length > cardsPerView;

  // Reset index when filter or view size changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeFilter, cardsPerView]);

  // Next & Prev Slide Handlers (Smooth Infinite Loop)
  const handlePrev = useCallback(() => {
    if (!isCarouselActive) return;
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [isCarouselActive, maxIndex]);

  const handleNext = useCallback(() => {
    if (!isCarouselActive) return;
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [isCarouselActive, maxIndex]);

  // Gentle Autoplay (5.5s interval, pauses on hover or user manual pause)
  useEffect(() => {
    if (isPaused || isHovered || !isCarouselActive) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [handleNext, isPaused, isHovered, isCarouselActive]);

  // Touch & Swipe gesture handling
  const handleDragEnd = (_event, info) => {
    if (!isCarouselActive) return;
    const swipeThreshold = 40;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  // Mathematically exact translation for Framer Motion:
  // Track has width = (filteredRoles.length / cardsPerView) * 100% of the viewport container.
  // Each card is (100 / filteredRoles.length)% of the track.
  // Translating by currentIndex * (100 / filteredRoles.length)% moves by exactly currentIndex cards!
  const trackWidthPercent = isCarouselActive 
    ? (filteredRoles.length / cardsPerView) * 100 
    : 100;
  const cardWidthPercent = isCarouselActive 
    ? 100 / filteredRoles.length 
    : 100 / Math.max(1, filteredRoles.length);
  const translatePercent = isCarouselActive 
    ? currentIndex * (100 / filteredRoles.length) 
    : 0;

  return (
    <section 
      id="roles-section" 
      className="py-12 sm:py-20 lg:py-24 bg-black border-t border-b border-neutral-900 relative overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#ccf141]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 gap-4 sm:gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 text-[#ccf141] font-display uppercase tracking-widest text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ccf141] shadow-[0_0_8px_#ccf141] animate-pulse" />
              <span>Roles and Responsibilities</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-5xl uppercase text-white tracking-tight">
              OPEN <span className="text-[#ccf141] text-glow-volt">POSITIONS</span>
            </h2>
          </motion.div>

          {/* Minimalist Filter Pills & Carousel Quick Controls: Horizontally scrollable track on mobile */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 touch-pan-x w-full lg:w-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => {
              const count = cat === 'All' 
                ? POSITIONS_LIST.length 
                : POSITIONS_LIST.filter(r => r.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 select-none flex items-center gap-1.5 shrink-0 ${
                    activeFilter === cat
                      ? 'bg-[#ccf141] text-black shadow-volt-glow font-black'
                      : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeFilter === cat ? 'bg-black/20 text-black font-black' : 'bg-neutral-900 text-neutral-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Quick Next/Prev Controls on Header for Desktop */}
            {isCarouselActive && (
              <div className="hidden sm:flex items-center gap-1.5 ml-2 pl-3 border-l border-neutral-800 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsPaused(p => !p)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs transition-colors border ${
                    isPaused 
                      ? 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white' 
                      : 'bg-[#ccf141]/10 text-[#ccf141] border-[#ccf141]/30'
                  }`}
                  title={isPaused ? "Play Autoplay" : "Pause Autoplay"}
                  aria-label={isPaused ? "Resume Autoplay" : "Pause Autoplay"}
                >
                  {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                </button>

                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-[#ccf141] text-neutral-300 hover:text-[#ccf141] flex items-center justify-center transition-all hover:scale-105"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-[#ccf141] text-neutral-300 hover:text-[#ccf141] flex items-center justify-center transition-all hover:scale-105"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div 
          className="relative group select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Slider Overflow Track */}
          <div className="overflow-hidden rounded-2xl py-2 px-1">
            <motion.div
              drag={isCarouselActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              animate={{ x: `-${translatePercent}%` }}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 28,
                mass: 0.7
              }}
              className={`flex will-change-transform ${isCarouselActive ? 'cursor-grab active:cursor-grabbing' : ''}`}
              style={{ width: `${trackWidthPercent}%` }}
            >
              {filteredRoles.map((role) => {
                const IconComponent = iconMap[role.icon] || Flame;
                const isSelected = selectedRoles.includes(role.id);

                return (
                  <div
                    key={role.id}
                    className="px-2.5 sm:px-3 box-border"
                    style={{ width: `${cardWidthPercent}%` }}
                  >
                    <motion.div
                      whileHover={{ y: -6 }}
                      transition={{ duration: 0.2 }}
                      className={`h-full rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between border backdrop-blur-xl relative overflow-hidden group/card ${
                        isSelected
                          ? 'bg-neutral-950 border-[#ccf141] ring-1 ring-[#ccf141]/60 shadow-volt-glow'
                          : 'bg-neutral-950/90 border-neutral-800/80 hover:border-[#ccf141]/50 hover:shadow-[0_0_30px_rgba(204,241,65,0.08)]'
                      }`}
                    >
                      {/* Subtle accent line on top edge */}
                      <div className={`absolute top-0 left-0 right-0 h-[2px] transition-colors duration-300 ${
                        isSelected ? 'bg-[#ccf141]' : 'bg-transparent group-hover/card:bg-[#ccf141]/40'
                      }`} />

                      <div>
                        {/* Card Top: Icon & Badge */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors border ${
                            isSelected 
                              ? 'bg-[#ccf141] text-black border-[#ccf141]'
                              : 'bg-neutral-900 border-neutral-800 text-[#ccf141] group-hover/card:border-[#ccf141]/40'
                          }`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          
                          <div className="flex items-center gap-1.5">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black text-[#ccf141] border border-[#ccf141]/30">
                              {role.badge}
                            </span>
                          </div>
                        </div>

                        {/* Title & Category Info */}
                        <h3 className="font-display font-black text-xl text-white uppercase tracking-wide group-hover/card:text-[#ccf141] transition-colors">
                          {role.title}
                        </h3>

                        <div className="flex items-center gap-2 mt-1 mb-3 text-xs text-neutral-400">
                          <span className="text-[#ccf141] font-semibold">{role.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-neutral-400">
                            <Clock className="w-3 h-3 text-neutral-500" />
                            {role.experienceNeeded}
                          </span>
                        </div>

                        {/* Role Summary */}
                        <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 min-h-[44px]">
                          {role.summary}
                        </p>

                        {/* Key Skills Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {role.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-0.5 rounded-md bg-neutral-900/90 border border-neutral-800 text-[11px] text-neutral-300 group-hover/card:border-neutral-700 transition-colors"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Action Button */}
                      <div className="pt-4 border-t border-neutral-900">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectRoleAndApply(role.id);
                          }}
                          className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 ${
                            isSelected
                              ? 'bg-[#ccf141] text-black shadow-volt-glow font-black'
                              : 'bg-neutral-900 hover:bg-[#ccf141] text-neutral-200 hover:text-black border border-neutral-800 hover:border-[#ccf141] font-bold'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-4 h-4 stroke-[3]" />
                              <span>Selected in Form</span>
                            </>
                          ) : (
                            <>
                              <span>Select Role & Apply</span>
                              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
                            </>
                          )}
                        </motion.button>
                      </div>

                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Floating Next/Prev Side Arrows for Easy Navigation (Hidden on mobile to prevent overflow) */}
          {isCarouselActive && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                className="hidden sm:flex absolute left-[-16px] sm:left-[-20px] top-1/2 -translate-y-1/2 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-black/95 border border-neutral-800 text-neutral-300 hover:text-[#ccf141] hover:border-[#ccf141] items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 z-20 backdrop-blur-md opacity-80 group-hover:opacity-100"
                aria-label="Previous role slide"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="hidden sm:flex absolute right-[-16px] sm:right-[-20px] top-1/2 -translate-y-1/2 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-black/95 border border-neutral-800 text-neutral-300 hover:text-[#ccf141] hover:border-[#ccf141] items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 active:scale-95 z-20 backdrop-blur-md opacity-80 group-hover:opacity-100"
                aria-label="Next role slide"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </>
          )}
        </div>

        {/* Carousel Bottom Bar: Indicator Dots & Position Counter */}
        {isCarouselActive && (
          <div className="mt-6 sm:mt-8 flex items-center justify-between px-1">
            {/* Dot & Bar Indicators */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx 
                      ? 'w-6 sm:w-8 bg-[#ccf141] shadow-volt-glow' 
                      : 'w-2 bg-neutral-800 hover:bg-neutral-700'
                  }`}
                  aria-label={`Go to slide page ${idx + 1}`}
                />
              ))}
            </div>

            {/* Mobile Thumb Navigation & Slide Counter */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile Arrows */}
              <div className="flex sm:hidden items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 active:text-[#ccf141] active:bg-neutral-800 flex items-center justify-center transition-colors"
                  aria-label="Previous role"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 active:text-[#ccf141] active:bg-neutral-800 flex items-center justify-center transition-colors"
                  aria-label="Next role"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[10px] sm:text-[11px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                <span className="text-[#ccf141]">{currentIndex + 1}</span> / {filteredRoles.length}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
