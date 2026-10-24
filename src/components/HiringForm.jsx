import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Check, 
  CheckCircle, 
  CheckSquare, 
  Square, 
  Upload, 
  FileText, 
  Trash2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Clock,
  Sparkles,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { 
  POSITIONS_LIST, 
  EDUCATION_OPTIONS, 
  EXPERIENCE_OPTIONS, 
  JOINING_OPTIONS, 
  SHIFT_OPTIONS 
} from '../data/hiringData';
import { submitHiringApplication } from '../api/hiringApi';

const STORAGE_KEY = 'bxc_hiring_form_compact_v1';

const INITIAL_STATE = {
  // 1. Profile
  fullName: '',
  phone: '',
  email: '',
  is18Plus: true,
  currentLocation: '',
  
  // 2. Roles
  positions: [],
  otherPosition: '',
  coachingExperience: [],

  // 3. Experience & Availability
  highestEducation: "Bachelor's Degree",
  totalExperience: '1–3 Years',
  previousCompany: '',
  certifications: '',
  skillsDescription: '',
  languagesKnown: ['Tamil', 'English'],
  preferredShift: 'Morning',
  whenCanYouJoin: '15 Days',
  expectedSalary: '',
  willingToWorkInPuducherry: true,

  // 4. Documents & Submit
  resumeUrl: '',
  portfolioLink: '',
  certificatesUrl: '',
  additionalInfo: '',
  declarationAgreed: false
};

const STEPS = [
  { id: 1, title: 'Profile', short: 'Profile', icon: User },
  { id: 2, title: 'Role', short: 'Role', icon: Briefcase },
  { id: 3, title: 'Availability', short: 'Availability', icon: Clock },
  { id: 4, title: 'Submit', short: 'Submit', icon: ShieldCheck }
];

export default function HiringForm({ initialSelectedRole, onSubmissionSuccess }) {
  const [formData, setFormData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...INITIAL_STATE, ...JSON.parse(saved) };
    } catch (e) {
      // ignore storage error
    }
    return INITIAL_STATE;
  });

  const [activeStep, setActiveStep] = useState(1);
  const [resumeFile, setResumeFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const fileInputRef = useRef(null);
  const formCardRef = useRef(null);

  // Smooth scroll to top of form
  const scrollToFormTop = () => {
    if (formCardRef.current) {
      const navHeight = 70;
      const elementPosition = formCardRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
    }
  };

  // Sync draft (removes storage when form is clean/reset)
  useEffect(() => {
    try {
      const isClean = !formData.fullName && !formData.phone && !formData.email && (!formData.positions || formData.positions.length === 0);
      if (isClean) {
        localStorage.removeItem(STORAGE_KEY);
      } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      }
    } catch (e) {}
  }, [formData]);

  // Handle role auto-select from carousel
  useEffect(() => {
    if (initialSelectedRole) {
      setFormData(prev => ({
        ...prev,
        positions: prev.positions.includes(initialSelectedRole)
          ? prev.positions
          : [...prev.positions, initialSelectedRole]
      }));
      setActiveStep(2);
      setTimeout(scrollToFormTop, 40);
    }
  }, [initialSelectedRole]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (errorMessage) setErrorMessage('');
  };

  const togglePosition = (posId) => {
    setFormData(prev => {
      const exists = prev.positions.includes(posId);
      const nextPositions = exists
        ? prev.positions.filter(p => p !== posId)
        : [...prev.positions, posId];
      return { ...prev, positions: nextPositions };
    });
    if (fieldErrors.positions) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next.positions;
        return next;
      });
    }
    if (errorMessage) setErrorMessage('');
  };

  // Validation logic
  const validateStep = (stepNumber) => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const phoneDigits = (formData.phone || '').replace(/\D/g, '');

    if (stepNumber === 1) {
      if (!formData.fullName || formData.fullName.trim().length < 2) {
        errors.fullName = 'Full Name is required (minimum 2 characters).';
      }
      if (!formData.phone || phoneDigits.length < 10) {
        errors.phone = 'Valid 10-digit mobile number required.';
      }
      if (!formData.email || !emailRegex.test(formData.email.trim())) {
        errors.email = 'Valid email address required (name@example.com).';
      }
      if (!formData.currentLocation || formData.currentLocation.trim().length < 2) {
        errors.currentLocation = 'Current city or town is required.';
      }
      if (formData.is18Plus !== true) {
        errors.is18Plus = 'You must be 18+ to apply at Box & Cross Arena.';
      }
    }

    if (stepNumber === 2) {
      if (!formData.positions || formData.positions.length === 0) {
        errors.positions = 'Please select at least one role.';
      }
      if (formData.positions?.includes('Other') && (!formData.otherPosition || formData.otherPosition.trim().length < 2)) {
        errors.otherPosition = 'Please specify details for Other role.';
      }
    }

    if (stepNumber === 4) {
      if (!formData.declarationAgreed) {
        errors.declarationAgreed = 'You must confirm the applicant declaration.';
      }
    }

    return errors;
  };

  const handleNext = () => {
    const errors = validateStep(activeStep);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage(Object.values(errors)[0]);
      setTimeout(scrollToFormTop, 40);
      return;
    }
    setFieldErrors({});
    setErrorMessage('');
    if (activeStep < 4) {
      setActiveStep(prev => prev + 1);
      setTimeout(scrollToFormTop, 40);
    }
  };

  const handlePrev = () => {
    setErrorMessage('');
    if (activeStep > 1) {
      setActiveStep(prev => prev - 1);
      setTimeout(scrollToFormTop, 40);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      alert('File size exceeds 15MB. Please upload a smaller file or link Google Drive.');
      return;
    }
    setResumeFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Final checks across required steps
    for (const stepNum of [1, 2, 4]) {
      const errs = validateStep(stepNum);
      if (Object.keys(errs).length > 0) {
        setFieldErrors(errs);
        setErrorMessage(Object.values(errs)[0]);
        setActiveStep(stepNum);
        setTimeout(scrollToFormTop, 40);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const response = await submitHiringApplication(formData, resumeFile);
      
      // Capture candidate data snapshot for the success receipt modal
      const applicantSnapshot = {
        ...formData,
        resumeFileName: resumeFile?.name || (formData.resumeUrl ? 'Cloud Resume Hosted Link' : null),
        resumeFileSize: resumeFile?.size ? (resumeFile.size / (1024 * 1024)).toFixed(2) + ' MB' : null,
        submittedAt: new Date().toLocaleString('en-IN', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }),
      };

      // 1. Clear saved draft from localStorage
      localStorage.removeItem(STORAGE_KEY);

      // 2. Completely reset form state back to initial empty state
      setFormData(INITIAL_STATE);
      setResumeFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setFieldErrors({});
      setErrorMessage('');
      setActiveStep(1);

      // 3. Show success receipt modal with captured snapshot
      if (onSubmissionSuccess) {
        onSubmissionSuccess(response, applicantSnapshot);
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setErrorMessage(err.message || 'Submission failed. Please check connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply-form" ref={formCardRef} className="py-12 sm:py-20 bg-black relative overflow-hidden">
      
      {/* Dark Brick Wall Arena Background with Lighting & Gradient Overlays */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: `url('/form-bg.png')` }}
      >
        {/* Soft Vignette and Edge Gradients to blend into pitch black top and bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/40 to-black" />
        
        {/* Subtle Volt Neon Glow in center to match Box & Cross brand aesthetics */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[300px] sm:h-[450px] bg-[#ccf141]/8 blur-[120px] pointer-events-none rounded-full" />
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Compact Form Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-[#ccf141] text-[10px] font-bold uppercase tracking-widest mb-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccf141] animate-pulse" />
            <span>Careers • Puducherry Arena</span>
          </div>

          <h2 className="font-display font-black text-2xl sm:text-4xl uppercase tracking-tight text-white">
            APPLY TO <span className="text-[#ccf141] text-glow-volt">BOX & CROSS</span>
          </h2>
        </div>

        {/* Minimalist 4-Segmented Stepper Dock */}
        <div className="mb-6 p-1.5 rounded-2xl bg-neutral-950/80 backdrop-blur-xl border border-neutral-800/90 flex items-center justify-between gap-1 shadow-2xl">
          {STEPS.map((step) => {
            const isActive = activeStep === step.id;
            const isCompleted = activeStep > step.id;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => {
                  if (step.id < activeStep) setActiveStep(step.id);
                  else if (step.id > activeStep) handleNext();
                }}
                className={`flex-1 py-2 px-1.5 rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs select-none ${
                  isActive
                    ? 'bg-[#ccf141] text-black font-black shadow-volt-glow'
                    : isCompleted
                    ? 'bg-neutral-900 text-neutral-300 font-bold border border-neutral-800'
                    : 'text-neutral-500 font-medium hover:text-neutral-300'
                }`}
              >
                <span className={`w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold ${
                  isActive ? 'bg-black text-[#ccf141]' : isCompleted ? 'bg-[#ccf141]/20 text-[#ccf141]' : 'bg-neutral-800'
                }`}>
                  {isCompleted ? '✓' : `0${step.id}`}
                </span>
                <span className="text-[11px] uppercase tracking-wider font-bold truncate">
                  {step.short}
                </span>
              </button>
            );
          })}
        </div>

        {/* Error Alert Banner */}
        <AnimatePresence>
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-500/60 flex items-center gap-2.5 text-red-200 text-xs shadow-md"
            >
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
              <span className="font-medium">{errorMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card Form Body */}
        <form onSubmit={handleSubmit} className="bg-neutral-950/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-7 border border-neutral-800/80 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative overflow-hidden">
          
          <AnimatePresence mode="wait">

            {/* STEP 1: CANDIDATE PROFILE */}
            {activeStep === 1 && (
              <motion.div
                key="step-1"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-neutral-900">
                  <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#ccf141]" />
                    <span>01. Personal Details</span>
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">Step 1 of 4</span>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                    Full Name <span className="text-[#ccf141]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className={`w-full px-3.5 py-2.5 bg-black border rounded-xl text-white placeholder-neutral-500 focus:outline-none transition-all text-base sm:text-sm font-medium ${
                      fieldErrors.fullName
                        ? 'border-red-500 bg-red-950/20 focus:border-red-500 ring-1 ring-red-500'
                        : 'border-neutral-800 focus:border-[#ccf141]'
                    }`}
                  />
                  {fieldErrors.fullName && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-medium">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{fieldErrors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Phone & Email Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Mobile / WhatsApp <span className="text-[#ccf141]">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="e.g. 9876543210"
                      className={`w-full px-3.5 py-2.5 bg-black border rounded-xl text-white placeholder-neutral-500 focus:outline-none transition-all text-base sm:text-sm font-mono ${
                        fieldErrors.phone
                          ? 'border-red-500 bg-red-950/20 focus:border-red-500 ring-1 ring-red-500'
                          : 'border-neutral-800 focus:border-[#ccf141]'
                      }`}
                    />
                    {fieldErrors.phone && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{fieldErrors.phone}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Email Address <span className="text-[#ccf141]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="e.g. rahul@gmail.com"
                      className={`w-full px-3.5 py-2.5 bg-black border rounded-xl text-white placeholder-neutral-500 focus:outline-none transition-all text-base sm:text-sm ${
                        fieldErrors.email
                          ? 'border-red-500 bg-red-950/20 focus:border-red-500 ring-1 ring-red-500'
                          : 'border-neutral-800 focus:border-[#ccf141]'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{fieldErrors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Location & Age Confirmation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Current Location <span className="text-[#ccf141]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.currentLocation}
                      onChange={(e) => handleChange('currentLocation', e.target.value)}
                      placeholder="e.g. Puducherry, Chennai"
                      className={`w-full px-3.5 py-2.5 bg-black border rounded-xl text-white placeholder-neutral-500 focus:outline-none transition-all text-base sm:text-sm ${
                        fieldErrors.currentLocation
                          ? 'border-red-500 bg-red-950/20 focus:border-red-500 ring-1 ring-red-500'
                          : 'border-neutral-800 focus:border-[#ccf141]'
                      }`}
                    />
                    {fieldErrors.currentLocation && (
                      <p className="mt-1 text-xs text-red-400 flex items-center gap-1 font-medium">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{fieldErrors.currentLocation}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Age Verification <span className="text-[#ccf141]">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2 h-[42px]">
                      <button
                        type="button"
                        onClick={() => handleChange('is18Plus', true)}
                        className={`rounded-xl text-xs font-bold uppercase tracking-wider border flex items-center justify-center gap-1.5 transition-all ${
                          formData.is18Plus === true
                            ? 'bg-[#ccf141]/15 border-[#ccf141] text-[#ccf141] shadow-volt-glow'
                            : 'bg-black border-neutral-800 text-neutral-400'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>18+ Years</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleChange('is18Plus', false)}
                        className={`rounded-xl text-xs font-bold uppercase tracking-wider border flex items-center justify-center transition-all ${
                          formData.is18Plus === false
                            ? 'bg-neutral-800 border-neutral-700 text-white'
                            : 'bg-black border-neutral-800 text-neutral-400'
                        }`}
                      >
                        <span>Under 18</span>
                      </button>
                    </div>
                    {fieldErrors.is18Plus && (
                      <p className="mt-1 text-xs text-red-400 font-medium">{fieldErrors.is18Plus}</p>
                    )}
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-4 mt-2 border-t border-neutral-900 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleNext}
                    className="w-full sm:w-auto px-6 py-3 bg-[#ccf141] hover:bg-[#d9f560] text-black font-display font-black text-xs uppercase tracking-wider rounded-xl shadow-volt-glow flex items-center justify-center gap-2"
                  >
                    <span>Next: Select Role</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </motion.button>
                </div>

              </motion.div>
            )}

            {/* STEP 2: APPLIED POSITION */}
            {activeStep === 2 && (
              <motion.div
                key="step-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-neutral-900">
                  <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-[#ccf141]" />
                    <span>02. Select Role(s)</span>
                  </span>
                  <span className="text-xs font-mono font-bold text-[#ccf141]">
                    {formData.positions.length} Selected
                  </span>
                </div>

                {fieldErrors.positions && (
                  <p className="text-xs text-red-400 font-medium flex items-center gap-1 bg-red-950/40 p-2.5 rounded-xl border border-red-500/50">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{fieldErrors.positions}</span>
                  </p>
                )}

                {/* Compact Role Selection Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {POSITIONS_LIST.map((pos) => {
                    const isSelected = formData.positions.includes(pos.id);
                    return (
                      <div
                        key={pos.id}
                        onClick={() => togglePosition(pos.id)}
                        className={`p-3 rounded-xl border cursor-pointer select-none transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#ccf141]/15 border-[#ccf141] text-white shadow-volt-glow'
                            : 'bg-black border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#ccf141] shrink-0" />
                          ) : (
                            <Square className="w-4 h-4 text-neutral-600 shrink-0" />
                          )}
                          <span className="text-xs font-bold uppercase tracking-wide truncate">
                            {pos.title}
                          </span>
                        </div>

                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase shrink-0 ${
                          isSelected ? 'bg-[#ccf141] text-black' : 'bg-neutral-900 text-neutral-500'
                        }`}>
                          {pos.category}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Other role specification */}
                {formData.positions.includes('Other') && (
                  <div className="p-3 rounded-xl bg-black border border-[#ccf141]/50">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-[#ccf141] mb-1">
                      Specify Other Position Details <span className="text-[#ccf141]">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.otherPosition}
                      onChange={(e) => handleChange('otherPosition', e.target.value)}
                      placeholder="e.g. Sports Physiotherapist, Media Lead, Dietitian"
                      className="w-full px-3 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccf141] text-xs font-medium"
                    />
                    {fieldErrors.otherPosition && (
                      <p className="mt-1 text-xs text-red-400 font-medium">{fieldErrors.otherPosition}</p>
                    )}
                  </div>
                )}

                {/* Bottom Controls */}
                <div className="pt-4 mt-2 border-t border-neutral-900 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleNext}
                    className="flex-1 sm:flex-initial px-6 py-3 bg-[#ccf141] hover:bg-[#d9f560] text-black font-display font-black text-xs uppercase tracking-wider rounded-xl shadow-volt-glow flex items-center justify-center gap-2"
                  >
                    <span>Next: Experience & Shift</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </motion.button>
                </div>

              </motion.div>
            )}

            {/* STEP 3: EXPERIENCE & SHIFT */}
            {activeStep === 3 && (
              <motion.div
                key="step-3"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-neutral-900">
                  <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#ccf141]" />
                    <span>03. Experience & Availability</span>
                  </span>
                  <span className="text-[10px] font-mono text-neutral-500">Step 3 of 4</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Experience */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Total Experience
                    </label>
                    <select
                      value={formData.totalExperience}
                      onChange={(e) => handleChange('totalExperience', e.target.value)}
                      className="w-full px-3 py-2.5 bg-black border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-[#ccf141] text-xs font-medium cursor-pointer"
                    >
                      {EXPERIENCE_OPTIONS.map(exp => (
                        <option key={exp} value={exp} className="bg-neutral-950 text-white">
                          {exp}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Education */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Highest Qualification
                    </label>
                    <select
                      value={formData.highestEducation}
                      onChange={(e) => handleChange('highestEducation', e.target.value)}
                      className="w-full px-3 py-2.5 bg-black border border-neutral-800 rounded-xl text-white focus:outline-none focus:border-[#ccf141] text-xs font-medium cursor-pointer"
                    >
                      {EDUCATION_OPTIONS.map(edu => (
                        <option key={edu} value={edu} className="bg-neutral-950 text-white">
                          {edu}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Shift */}
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Preferred Arena Shift
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {SHIFT_OPTIONS.map((shift) => (
                        <button
                          key={shift.value}
                          type="button"
                          onClick={() => handleChange('preferredShift', shift.value)}
                          className={`py-2 px-1 rounded-xl text-center border transition-all ${
                            formData.preferredShift === shift.value
                              ? 'bg-[#ccf141] text-black border-[#ccf141] font-bold shadow-volt-glow'
                              : 'bg-black border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          <div className="text-xs font-black uppercase">{shift.label}</div>
                          <div className="text-[9px] opacity-80 mt-0.5 truncate">{shift.timing}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Joining Time */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      When Can You Join?
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['Immediate', '15 Days', '1 Month'].map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleChange('whenCanYouJoin', opt)}
                          className={`py-2 text-[11px] font-bold rounded-lg border transition-all ${
                            formData.whenCanYouJoin === opt
                              ? 'bg-[#ccf141] text-black border-[#ccf141]'
                              : 'bg-black border-neutral-800 text-neutral-400'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Expected Salary */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Expected Monthly Salary
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#ccf141] font-bold text-xs">₹</span>
                      <input
                        type="text"
                        value={formData.expectedSalary}
                        onChange={(e) => handleChange('expectedSalary', e.target.value)}
                        placeholder="e.g. ₹35,000 / month"
                        className="w-full pl-7 pr-3 py-2 bg-black border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccf141] text-xs font-medium"
                      />
                    </div>
                  </div>

                  {/* Previous Gym / Work */}
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Previous Gym / Employer (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.previousCompany}
                      onChange={(e) => handleChange('previousCompany', e.target.value)}
                      placeholder="e.g. Cult.fit, Gold's Gym, Independent Trainer"
                      className="w-full px-3.5 py-2 bg-black border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccf141] text-xs"
                    />
                  </div>
                </div>

                {/* Bottom Controls */}
                <div className="pt-4 mt-2 border-t border-neutral-900 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-2.5 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={handleNext}
                    className="flex-1 sm:flex-initial px-6 py-3 bg-[#ccf141] hover:bg-[#d9f560] text-black font-display font-black text-xs uppercase tracking-wider rounded-xl shadow-volt-glow flex items-center justify-center gap-2"
                  >
                    <span>Next: Resume & Finish</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </motion.button>
                </div>

              </motion.div>
            )}

            {/* STEP 4: RESUME & CONFIRMATION */}
            {activeStep === 4 && (
              <motion.div
                key="step-4"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between pb-2 border-b border-neutral-900">
                  <span className="text-xs font-black uppercase tracking-wider text-white flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#ccf141]" />
                    <span>04. Resume & Transmit</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#ccf141] font-bold">Ready</span>
                </div>

                {/* Resume Upload Pill */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Attach Resume / CV (PDF, DOCX, TXT, Image — Max 15MB)
                  </label>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {!resumeFile ? (
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-3.5 rounded-xl border border-dashed border-neutral-800 hover:border-[#ccf141] bg-black/60 hover:bg-neutral-950 flex items-center justify-between cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 group-hover:border-[#ccf141] flex items-center justify-center text-neutral-400 group-hover:text-[#ccf141] transition-colors">
                          <Upload className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-[#ccf141] transition-colors">
                            Tap to attach resume file
                          </p>
                          <p className="text-[10px] text-neutral-500">PDF, DOCX, TXT, or Image</p>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-1 bg-neutral-900 text-neutral-300 rounded border border-neutral-800">
                        Browse
                      </span>
                    </div>
                  ) : (
                    <div className="p-3 rounded-xl bg-black border border-[#ccf141] shadow-volt-glow flex items-center justify-between">
                      <div className="flex items-center gap-2.5 truncate">
                        <FileText className="w-4 h-4 text-[#ccf141] shrink-0" />
                        <div className="truncate">
                          <p className="text-xs font-bold text-white truncate">{resumeFile.name}</p>
                          <p className="text-[9px] text-neutral-400">
                            {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • Ready
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setResumeFile(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                        className="p-1.5 rounded-lg bg-neutral-900 hover:bg-red-950 text-neutral-400 hover:text-red-400 transition-colors ml-2"
                        title="Remove file"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Cloud link fallback */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Or Paste Google Drive / Portfolio Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.resumeUrl}
                    onChange={(e) => handleChange('resumeUrl', e.target.value)}
                    placeholder="https://drive.google.com/file/..."
                    className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-[#ccf141] text-xs font-medium"
                  />
                </div>

                {/* 1-Line Applicant Declaration */}
                <div 
                  onClick={() => handleChange('declarationAgreed', !formData.declarationAgreed)}
                  className={`p-3 rounded-xl border cursor-pointer select-none transition-all flex items-start gap-2.5 ${
                    fieldErrors.declarationAgreed
                      ? 'border-red-500 bg-red-950/20'
                      : formData.declarationAgreed
                      ? 'bg-[#ccf141]/10 border-[#ccf141] text-white shadow-volt-glow'
                      : 'bg-black border-neutral-800 hover:border-neutral-700 text-neutral-300'
                  }`}
                >
                  {formData.declarationAgreed ? (
                    <CheckSquare className="w-4 h-4 text-[#ccf141] shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-neutral-600 shrink-0 mt-0.5" />
                  )}
                  <span className="text-xs leading-snug">
                    I confirm that the entered application details are accurate and agree to be contacted by the BXC hiring team. <span className="text-[#ccf141]">*</span>
                  </span>
                </div>

                {/* Final Submit & Back Buttons */}
                <div className="pt-4 mt-2 border-t border-neutral-900 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-3.5 px-5 bg-[#ccf141] hover:bg-[#d9f560] text-black font-display font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-volt-glow transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting...</span>
                      </>
                    ) : (
                      <>
                        <span>APPLY TO JOIN BXC ARENA</span>
                        <ArrowRight className="w-4 h-4 stroke-[3]" />
                      </>
                    )}
                  </motion.button>
                </div>

              </motion.div>
            )}

          </AnimatePresence>

        </form>

      </div>
    </section>
  );
}
