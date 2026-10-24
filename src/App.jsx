import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RolesSection from './components/RolesSection';
import PerksSection from './components/PerksSection';
import HiringProcessSection from './components/HiringProcessSection';
import HiringForm from './components/HiringForm';
import FAQSection from './components/FAQSection';
import ApplicationSuccessModal from './components/ApplicationSuccessModal';
import ApiConfigModal from './components/ApiConfigModal';

export default function App() {
  const [selectedRoleForForm, setSelectedRoleForForm] = useState(null);
  const [successData, setSuccessData] = useState(null);
  const [applicantSnapshot, setApplicantSnapshot] = useState(null);
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [currentApiEndpoint, setCurrentApiEndpoint] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isInFormView, setIsInFormView] = useState(false);

  // Smooth scroll progress bar with physics spring
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  // Track scroll position to show floating "Back to Top" button & mobile quick action
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset;
      setShowScrollTop(scrollY > 400);

      const formEl = document.getElementById('apply-form');
      if (formEl) {
        const rect = formEl.getBoundingClientRect();
        const inForm = rect.top <= window.innerHeight * 0.75 && rect.bottom >= window.innerHeight * 0.25;
        setIsInFormView(inForm);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Offset-aware smooth scroll helper (accounts for sticky navbar)
  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const navHeight = 70;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // When applicant clicks a role in RolesSection
  const handleSelectRoleAndApply = (roleTitle) => {
    setSelectedRoleForForm(roleTitle);
    scrollToSection('apply-form');
  };

  // Form submission callback
  const handleSubmissionSuccess = (apiResponse, formDataState) => {
    setSuccessData(apiResponse);
    setApplicantSnapshot(formDataState);
    setSelectedRoleForForm(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset modal state
  const handleResetSuccessModal = () => {
    setSuccessData(null);
    setApplicantSnapshot(null);
    setSelectedRoleForForm(null);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col font-sans selection:bg-[#ccf141] selection:text-black overflow-x-hidden">
      
      {/* Top Reading / Scroll Progress Bar with Framer Motion Spring */}
      <motion.div 
        style={{ scaleX }} 
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-[#ccf141] origin-left z-50 shadow-volt-glow pointer-events-none" 
      />

      {/* Top Navigation */}
      <Navbar 
        onScrollToSection={scrollToSection}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero 
          onApplyClick={() => scrollToSection('apply-form')}
          onViewRolesClick={() => scrollToSection('roles-section')}
        />

        {/* Roles Section - 3 Card Carousel Slider with Loop & Framer Motion */}
        <RolesSection 
          onSelectRoleAndApply={handleSelectRoleAndApply}
          selectedRoles={selectedRoleForForm ? [selectedRoleForForm] : []}
        />

        {/* The 6-Section Career Application Form */}
        <HiringForm 
          initialSelectedRole={selectedRoleForForm}
          onSubmissionSuccess={handleSubmissionSuccess}
        />

        {/* Arena Culture & Benefits */}
        <PerksSection />

        {/* Recruitment Pipeline Process */}
        <HiringProcessSection 
          onApplyClick={() => scrollToSection('apply-form')}
        />

        {/* FAQs */}
        <FAQSection />
      </main>

      {/* Official Bottom Brand Marker */}
      <footer className="py-8 border-t border-neutral-900 bg-black text-center select-none pb-20 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center gap-2">
          <img src="/navbar-logo.png" alt="Box & Cross" className="h-5 opacity-70 object-contain" />
          <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">
            Box & Cross Performance Arena • Puducherry • Careers
          </p>
          <p className="text-[9px] text-neutral-600 font-mono tracking-wider">
            "IT'S JUST NEVER ENOUGH."
          </p>
        </div>
      </footer>

      {/* Mobile Floating 1-Tap Quick Apply Pill */}
      <AnimatePresence>
        {showScrollTop && !isInFormView && !successData && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="sm:hidden fixed bottom-4 left-3.5 right-16 z-30"
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection('apply-form')}
              className="w-full py-2.5 px-3.5 rounded-2xl bg-neutral-950/95 backdrop-blur-xl border border-[#ccf141]/50 text-white shadow-[0_0_25px_rgba(204,241,65,0.22)] flex items-center justify-between"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="w-2 h-2 rounded-full bg-[#ccf141] shadow-[0_0_8px_#ccf141] animate-pulse shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-200 truncate">Hiring Coaches & Staff</span>
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-[#ccf141] text-black font-display font-black text-[10px] uppercase tracking-wider shrink-0 shadow-volt-glow">
                Apply Now →
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-4 sm:bottom-6 right-3.5 sm:right-6 z-40 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-[#ccf141] text-black shadow-volt-glow flex items-center justify-center font-black transition-colors"
            title="Scroll to top"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Success Modal upon Form Submission */}
      {successData && (
        <ApplicationSuccessModal 
          responseData={successData}
          applicantData={applicantSnapshot}
          onReset={handleResetSuccessModal}
        />
      )}

      {/* Backend API Environment Switcher */}
      <ApiConfigModal 
        isOpen={isApiModalOpen}
        onClose={() => setIsApiModalOpen(false)}
        onApiChanged={(newUrl) => setCurrentApiEndpoint(newUrl)}
      />

    </div>
  );
}
