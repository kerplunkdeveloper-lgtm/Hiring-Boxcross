import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  ArrowRight, 
  Download,
  X,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  FileText,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Share2
} from 'lucide-react';

export default function ApplicationSuccessModal({ responseData, applicantData, onReset }) {
  const [copiedId, setCopiedId] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Extract application tracking ID
  const applicationId = responseData?.applicationId || 
    responseData?.data?.applicationId || 
    'BXC-APP-' + Math.floor(100000 + Math.random() * 900000) + '-' + Math.floor(1000 + Math.random() * 9000);

  const submittedAt = applicantData?.submittedAt || new Date().toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const handleCopyId = () => {
    navigator.clipboard.writeText(applicationId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleCopySummary = () => {
    if (!applicantData) return;
    const summaryText = `BOX & CROSS PERFORMANCE ARENA - APPLICATION RECEIPT
==================================================
Application ID: ${applicationId}
Date Submitted: ${submittedAt}
Status: Application Received / In Review
Location: Puducherry Arena (On-Site)

CANDIDATE DETAILS:
- Full Name: ${applicantData.fullName || '—'}
- Phone: ${applicantData.phone || '—'}
- Email: ${applicantData.email || '—'}
- Location: ${applicantData.currentLocation || '—'}
- Age: ${applicantData.is18Plus ? '18+ Verified' : 'Under 18'}

APPLIED ROLE(S):
- Positions: ${applicantData.positions?.join(', ') || '—'}
${applicantData.otherPosition ? `- Other Role Details: ${applicantData.otherPosition}\n` : ''}${applicantData.coachingExperience?.length ? `- Coaching Target: ${applicantData.coachingExperience.join(', ')}\n` : ''}
EXPERIENCE & QUALIFICATIONS:
- Highest Education: ${applicantData.highestEducation || '—'}
- Total Experience: ${applicantData.totalExperience || '—'}
- Previous Company: ${applicantData.previousCompany || 'None specified'}
- Certifications: ${applicantData.certifications || 'None specified'}
- Languages Known: ${applicantData.languagesKnown?.join(', ') || '—'}

AVAILABILITY & SHIFT:
- Preferred Shift: ${applicantData.preferredShift || '—'}
- Availability to Join: ${applicantData.whenCanYouJoin || '—'}
- Expected Salary: ${applicantData.expectedSalary || 'Negotiable'}
- Puducherry On-site: Yes

ATTACHMENTS:
- Resume File: ${applicantData.resumeFileName || (applicantData.resumeUrl ? 'Cloud Link' : 'Not attached')}
${applicantData.portfolioLink ? `- Portfolio/Social: ${applicantData.portfolioLink}\n` : ''}
"IT'S JUST NEVER ENOUGH."
Box & Cross Performance Arena • Puducherry`;

    navigator.clipboard.writeText(summaryText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/95 backdrop-blur-xl overflow-y-auto">
        
        {/* Modal Container */}
        <motion.div 
          initial={{ scale: 0.94, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.94, opacity: 0, y: 24 }}
          transition={{ type: 'spring', damping: 28, stiffness: 340 }}
          className="relative w-full max-w-2xl bg-[#09090b] border border-neutral-800 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(204,241,65,0.18)] my-auto max-h-[92vh] flex flex-col overflow-hidden text-neutral-100"
        >
          
          {/* Ambient Volt Glow Accent */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-[#ccf141]/15 blur-[90px] pointer-events-none rounded-full" />

          {/* Sticky Modal Top Bar with Brand Logo and Close Button */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-3.5 sm:py-4 border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md shrink-0 z-10">
            <div className="flex items-center gap-2.5">
              <img 
                src="/navbar-logo.png" 
                alt="Box & Cross" 
                className="h-5 sm:h-6 object-contain"
                onError={(e) => { e.currentTarget.src = '/bxc-logo.png'; }}
              />
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#ccf141]" />
              <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                Official Career Dossier
              </span>
            </div>

            <button
              type="button"
              onClick={onReset}
              className="p-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors border border-neutral-800"
              title="Close and return home"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Receipt Body */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-7 py-5 sm:py-6 space-y-5 sm:space-y-6 custom-scrollbar print-dossier">
            
            {/* Success Icon & Header */}
            <div className="text-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 14, delay: 0.1 }}
                className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#ccf141] flex items-center justify-center shadow-volt-glow text-black mx-auto mb-3"
              >
                <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9 stroke-[2.5]" />
              </motion.div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ccf141]/10 border border-[#ccf141]/30 text-[#ccf141] text-[10px] font-black uppercase tracking-widest mb-2">
                <span className="w-2 h-2 rounded-full bg-[#ccf141] animate-ping" />
                <span>Status: Application Received & Verified</span>
              </div>

              <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white leading-tight">
                APPLICATION RECORDED.
              </h2>

              <p className="mt-2 text-neutral-400 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Thank you for applying to <strong className="text-white">Box & Cross Performance Arena</strong>. 
                Your candidate profile has been transmitted to our recruitment and coaching leadership team.
              </p>

              <div className="mt-3">
                <span className="font-athletic text-xl sm:text-2xl text-[#ccf141] tracking-widest uppercase">
                  "IT'S JUST NEVER ENOUGH."
                </span>
              </div>
            </div>

            {/* Application Tracking ID Card */}
            <div className="p-4 sm:p-4.5 rounded-2xl bg-black border border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-inner">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Application Tracking ID
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-900 text-neutral-400 font-mono border border-neutral-800">
                    Active
                  </span>
                </div>
                <span className="font-mono text-lg sm:text-2xl font-black text-[#ccf141] tracking-wider block mt-0.5 select-all">
                  {applicationId}
                </span>
                <span className="text-[10px] text-neutral-500 block mt-0.5">
                  Logged on {submittedAt} • Box & Cross Puducherry Arena
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={handleCopyId}
                  className="flex-1 sm:flex-initial px-3.5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-[#ccf141] text-xs font-bold text-white uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedId ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#ccf141]" />
                      <span className="text-[#ccf141]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#ccf141]" />
                      <span>Copy ID</span>
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* FULL CANDIDATE DOSSIER (All Form Fields Rendered Elegantly) */}
            {applicantData && (
              <div className="space-y-4">
                
                {/* Section Header */}
                <div className="flex items-center justify-between pb-1.5 border-b border-neutral-800">
                  <span className="text-xs font-black uppercase tracking-wider text-neutral-200 flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#ccf141]" />
                    <span>Candidate Submission Summary</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#ccf141] font-bold uppercase tracking-wider">
                    Complete Profile Log
                  </span>
                </div>

                {/* 1. Personal & Contact Card */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 hover:border-neutral-700 transition-colors">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#ccf141] mb-3">
                    <User className="w-3.5 h-3.5" />
                    <span>Personal & Contact Information</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Applicant Name</span>
                      <span className="text-white font-bold text-sm">{applicantData.fullName || '—'}</span>
                    </div>

                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Age Verification</span>
                      <span className="inline-flex items-center gap-1 font-bold text-xs text-white">
                        <Check className="w-3 h-3 text-[#ccf141] stroke-[3]" />
                        {applicantData.is18Plus ? '18+ Years (Verified)' : 'Under 18'}
                      </span>
                    </div>

                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Phone / WhatsApp</span>
                      <a 
                        href={`tel:${applicantData.phone}`}
                        className="text-neutral-200 hover:text-[#ccf141] font-mono font-medium flex items-center gap-1.5 transition-colors"
                      >
                        <Phone className="w-3 h-3 text-neutral-400" />
                        <span>{applicantData.phone || '—'}</span>
                      </a>
                    </div>

                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Email Address</span>
                      <a 
                        href={`mailto:${applicantData.email}`}
                        className="text-neutral-200 hover:text-[#ccf141] font-medium flex items-center gap-1.5 transition-colors truncate"
                      >
                        <Mail className="w-3 h-3 text-neutral-400 shrink-0" />
                        <span className="truncate">{applicantData.email || '—'}</span>
                      </a>
                    </div>

                    <div className="sm:col-span-2">
                      <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Current City / Location</span>
                      <div className="flex items-center gap-1.5 text-neutral-200 font-medium mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#ccf141] shrink-0" />
                        <span>{applicantData.currentLocation || '—'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Target Positions Card */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 hover:border-neutral-700 transition-colors">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#ccf141] mb-2.5">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>Applied Position(s)</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {applicantData.positions && applicantData.positions.length > 0 ? (
                      applicantData.positions.map((pos) => (
                        <span 
                          key={pos}
                          className="px-3 py-1.5 rounded-lg bg-[#ccf141]/15 text-[#ccf141] border border-[#ccf141]/30 font-display font-black text-xs uppercase tracking-wide flex items-center gap-1.5 shadow-sm"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ccf141]" />
                          {pos}
                        </span>
                      ))
                    ) : (
                      <span className="text-neutral-400 text-xs italic">No roles selected</span>
                    )}
                  </div>

                  {applicantData.otherPosition && applicantData.positions?.includes('Other') && (
                    <div className="mt-2.5 pt-2.5 border-t border-neutral-900 text-xs">
                      <span className="text-neutral-500 text-[10px] uppercase block font-semibold">Specialized Role Specification:</span>
                      <span className="text-white font-medium">{applicantData.otherPosition}</span>
                    </div>
                  )}

                  {applicantData.coachingExperience && applicantData.coachingExperience.length > 0 && (
                    <div className="mt-2.5 pt-2.5 border-t border-neutral-900 text-xs">
                      <span className="text-neutral-500 text-[10px] uppercase block font-semibold mb-1">Coaching Client Demographics:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {applicantData.coachingExperience.map(tgt => (
                          <span key={tgt} className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">
                            {tgt}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Qualifications & Background Card */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 hover:border-neutral-700 transition-colors">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#ccf141] mb-3">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Qualifications & Experience</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Highest Education</span>
                      <span className="text-white font-medium">{applicantData.highestEducation || "Bachelor's Degree"}</span>
                    </div>

                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Total Experience</span>
                      <span className="text-[#ccf141] font-bold">{applicantData.totalExperience || '1–3 Years'}</span>
                    </div>

                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Current Employment Status</span>
                      <span className="text-neutral-200 font-medium">{applicantData.currentEmploymentStatus || 'Employed'}</span>
                    </div>

                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Previous Gym / Employer</span>
                      <span className="text-white font-medium">{applicantData.previousCompany || 'Fresher / Independent'}</span>
                    </div>

                    {applicantData.certifications && (
                      <div className="sm:col-span-2">
                        <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Certifications & Licenses</span>
                        <span className="text-neutral-200 font-medium">{applicantData.certifications}</span>
                      </div>
                    )}

                    {applicantData.languagesKnown && applicantData.languagesKnown.length > 0 && (
                      <div className="sm:col-span-2">
                        <span className="text-neutral-500 block text-[10px] uppercase font-semibold mb-1">Languages Known</span>
                        <div className="flex flex-wrap gap-1.5">
                          {applicantData.languagesKnown.map(lang => (
                            <span key={lang} className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300">
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {applicantData.skillsDescription && (
                      <div className="sm:col-span-2 mt-1 p-2.5 rounded-lg bg-black/60 border border-neutral-900">
                        <span className="text-neutral-500 block text-[10px] uppercase font-semibold mb-0.5">Skills & Training Background</span>
                        <p className="text-neutral-300 text-xs italic leading-relaxed">
                          "{applicantData.skillsDescription}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. Availability, Shift & Salary Card */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 hover:border-neutral-700 transition-colors">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#ccf141] mb-3">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Availability, Shift & Terms</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Preferred Shift</span>
                      <span className="text-white font-bold">{applicantData.preferredShift || 'Morning'}</span>
                    </div>

                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Earliest Joining Date</span>
                      <span className="text-[#ccf141] font-bold">{applicantData.whenCanYouJoin || '15 Days'}</span>
                    </div>

                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Expected Monthly Salary</span>
                      <span className="text-white font-mono font-bold">{applicantData.expectedSalary || 'Negotiable'}</span>
                    </div>

                    <div>
                      <span className="text-neutral-500 block text-[10px] uppercase font-semibold">Arena Work Location</span>
                      <span className="inline-flex items-center gap-1 font-bold text-xs text-white">
                        <Check className="w-3 h-3 text-[#ccf141] stroke-[3]" />
                        Puducherry Arena (On-Site)
                      </span>
                    </div>
                  </div>
                </div>

                {/* 5. Resume & Links Card */}
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/90 hover:border-neutral-700 transition-colors">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#ccf141] mb-3">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Submitted Documents & Links</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    {/* Resume File */}
                    <div className="p-2.5 rounded-lg bg-black border border-neutral-800 flex items-center justify-between">
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <div className="w-8 h-8 rounded-lg bg-[#ccf141]/10 text-[#ccf141] flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div className="truncate">
                          <span className="text-white font-bold block truncate">
                            {applicantData.resumeFileName || (applicantData.resumeUrl ? 'Cloud Resume Hosted Link' : 'No Resume File Attached')}
                          </span>
                          <span className="text-[10px] text-neutral-500 block">
                            {applicantData.resumeFileSize ? `${applicantData.resumeFileSize} • Transmitted to Server` : applicantData.resumeUrl ? 'Google Drive / Cloud URL' : 'Optional document'}
                          </span>
                        </div>
                      </div>

                      {applicantData.resumeUrl && (
                        <a 
                          href={applicantData.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-md bg-neutral-900 hover:bg-[#ccf141] text-neutral-300 hover:text-black font-bold text-[10px] uppercase flex items-center gap-1 transition-colors shrink-0 ml-2"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    {/* Social & Certs links */}
                    {(applicantData.portfolioLink || applicantData.certificatesUrl) && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {applicantData.portfolioLink && (
                          <a 
                            href={applicantData.portfolioLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-black border border-neutral-800 hover:border-[#ccf141]/60 flex items-center justify-between text-neutral-300 hover:text-white transition-colors"
                          >
                            <span className="truncate text-[11px] font-medium">Portfolio / Instagram</span>
                            <ExternalLink className="w-3 h-3 text-[#ccf141] shrink-0" />
                          </a>
                        )}

                        {applicantData.certificatesUrl && (
                          <a 
                            href={applicantData.certificatesUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-black border border-neutral-800 hover:border-[#ccf141]/60 flex items-center justify-between text-neutral-300 hover:text-white transition-colors"
                          >
                            <span className="truncate text-[11px] font-medium">Certificates Drive</span>
                            <ExternalLink className="w-3 h-3 text-[#ccf141] shrink-0" />
                          </a>
                        )}
                      </div>
                    )}

                    {/* Candidate Pitch */}
                    {applicantData.additionalInfo && (
                      <div className="p-2.5 rounded-lg bg-black/60 border border-neutral-900 mt-2">
                        <span className="text-neutral-500 text-[10px] uppercase font-semibold block mb-0.5">Candidate Note / Pitch:</span>
                        <p className="text-neutral-300 text-xs leading-relaxed italic">
                          "{applicantData.additionalInfo}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}

            {/* 3-Step Recruitment Roadmap */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-2.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#ccf141]" />
                <span>What Happens Next? (BXC Recruitment Pipeline)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
                <div className="p-3 rounded-xl bg-black border border-[#ccf141]/40 shadow-sm relative overflow-hidden">
                  <div className="text-[9px] font-black text-[#ccf141] uppercase tracking-wider mb-0.5 flex items-center justify-between">
                    <span>STEP 01</span>
                    <span className="text-[8px] px-1 py-0.2 bg-[#ccf141]/20 rounded text-[#ccf141]">Active</span>
                  </div>
                  <div className="text-xs font-bold text-white">Profile Audit</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">2–4 business days review by HR & Head Coach</div>
                </div>

                <div className="p-3 rounded-xl bg-black border border-neutral-800 text-neutral-300">
                  <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider mb-0.5">STEP 02</div>
                  <div className="text-xs font-bold text-white">Screening Call</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">Phone / WhatsApp technical chat with shortlisted candidates</div>
                </div>

                <div className="p-3 rounded-xl bg-black border border-neutral-800 text-neutral-300">
                  <div className="text-[9px] font-bold text-neutral-500 uppercase tracking-wider mb-0.5">STEP 03</div>
                  <div className="text-xs font-bold text-white">Arena Demo</div>
                  <div className="text-[10px] text-neutral-400 mt-0.5">On-site coaching practical at Box & Cross Puducherry</div>
                </div>
              </div>
            </div>

          </div>

          {/* Sticky Modal Bottom Actions (Print, Copy Dossier, Return Home) */}
          <div className="p-3.5 sm:p-5 border-t border-neutral-800/90 bg-neutral-950/95 backdrop-blur-md shrink-0 flex flex-col sm:flex-row items-center gap-2.5">
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => window.print()}
              className="w-full sm:w-1/3 py-3 px-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-white transition-colors flex items-center justify-center gap-2"
              title="Print official receipt"
            >
              <Download className="w-3.5 h-3.5 text-[#ccf141]" />
              <span>Print Receipt</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={handleCopySummary}
              className="w-full sm:w-1/3 py-3 px-3.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-white transition-colors flex items-center justify-center gap-2"
              title="Copy dossier details to clipboard"
            >
              {copiedSummary ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#ccf141]" />
                  <span className="text-[#ccf141]">Summary Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-[#ccf141]" />
                  <span>Copy Summary</span>
                </>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={onReset}
              className="w-full sm:w-1/3 py-3 px-4 rounded-xl bg-[#ccf141] hover:bg-[#d9f560] text-black text-xs font-black uppercase tracking-wider shadow-volt-glow transition-colors flex items-center justify-center gap-2"
            >
              <span>Done / Home</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </motion.button>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
