// Static constants and data for BXC Careers

export const POSITIONS_LIST = [
  {
    id: "Boxing Coach",
    title: "Boxing Coach",
    category: "Coaching",
    icon: "Flame",
    badge: "Core Role",
    experienceNeeded: "1+ Years",
    summary: "Lead boxing fundamentals, pad-work conditioning, high-energy mitt drills, and technical sparring preparation.",
    skills: ["Mitt Work", "Heavy Bag Drills", "Footwork", "Sparring Safety", "Conditioning"],
    isCoaching: true
  },
  {
    id: "Strength & Conditioning Coach",
    title: "Strength & Conditioning Coach",
    category: "Coaching",
    icon: "Dumbbell",
    badge: "High Demand",
    experienceNeeded: "1+ Years",
    summary: "Design and coach athletic performance, compound barbell lifting, plyometrics, and functional mobility programming.",
    skills: ["Barbell Mechanics", "Periodization", "Mobility", "MetCon", "Injury Prevention"],
    isCoaching: true
  },
  {
    id: "Personal Trainer",
    title: "Personal Trainer",
    category: "Coaching",
    icon: "Target",
    badge: "Member Centric",
    experienceNeeded: "1+ Years",
    summary: "Deliver personalized 1-on-1 transformation coaching, body composition analysis, and tailored client workout journeys.",
    skills: ["1-on-1 Coaching", "Form Correction", "Client Motivation", "Nutritional Basics"],
    isCoaching: true
  },
  {
    id: "Front Desk Executive",
    title: "Front Desk Executive",
    category: "Operations",
    icon: "UserCheck",
    badge: "Frontline Face",
    experienceNeeded: "0–2 Years",
    summary: "Welcome athletes and guests, handle desk check-ins, manage scheduling, inquiries, and deliver hospitable arena experiences.",
    skills: ["Communication", "Guest Hospitality", "CRM / Software", "Multi-tasking"],
    isCoaching: false
  },
  {
    id: "Membership / Sales Executive",
    title: "Membership / Sales Executive",
    category: "Sales",
    icon: "TrendingUp",
    badge: "Growth Engine",
    experienceNeeded: "1+ Years",
    summary: "Tour prospective athletes, explain memberships, follow up on leads, and drive arena community growth.",
    skills: ["Consultative Sales", "Lead Calling", "Conversion", "Customer Relations"],
    isCoaching: false
  },
  {
    id: "Housekeeping / Maintenance",
    title: "Housekeeping / Maintenance",
    category: "Facility",
    icon: "Sparkles",
    badge: "Crucial Arena Standard",
    experienceNeeded: "0+ Years",
    summary: "Maintain spotless training floors, sanitize equipment, manage locker rooms, and ensure high safety and hygiene standards.",
    skills: ["Sanitization", "Equipment Care", "Attention to Detail", "Reliability"],
    isCoaching: false
  },
  {
    id: "Other",
    title: "Other Position",
    category: "Specialized",
    icon: "Briefcase",
    badge: "Open Call",
    experienceNeeded: "Any",
    summary: "Have another skill to offer BXC (Physiotherapist, Content Creator, Nutritionist, Arena Manager)? Pitch us your role.",
    skills: ["Unique Value", "Fitness Passion"],
    isCoaching: false
  }
];

export const EDUCATION_OPTIONS = [
  "Bachelor's Degree",
  "Master's Degree",
  "Diploma / Vocational Certificate",
  "High School",
  "Other"
];

export const EXPERIENCE_OPTIONS = [
  "0–1 Years",
  "1–3 Years",
  "3–5 Years",
  "5+ Years"
];

export const LANGUAGE_OPTIONS = [
  "Tamil",
  "English",
  "Hindi",
  "French",
  "Malayalam",
  "Telugu"
];

export const COACHING_TARGETS = [
  "Beginners",
  "Amateur Athletes",
  "Competitive Athletes"
];

export const EMPLOYMENT_STATUS_OPTIONS = [
  "Employed",
  "Unemployed",
  "Freelancer",
  "Student"
];

export const JOINING_OPTIONS = [
  "Immediately",
  "15 Days",
  "30 Days",
  "Other"
];

export const SHIFT_OPTIONS = [
  { value: "Morning", label: "Morning Shift", timing: "05:30 AM – 01:30 PM" },
  { value: "Evening", label: "Evening Shift", timing: "01:30 PM – 09:30 PM" },
  { value: "Flexible", label: "Flexible / Split Shift", timing: "Adaptable Hours" }
];

export const PERKS = [
  {
    icon: "Trophy",
    title: "Elite Performance Facility",
    description: "Train and coach in Puducherry's benchmark combat and functional fitness arena with world-class gear."
  },
  {
    icon: "Flame",
    title: "Uncompromising Culture",
    description: "\"IT'S JUST NEVER ENOUGH.\" Work with disciplined coaches and athletes who push every single day."
  },
  {
    icon: "Zap",
    title: "Competitive Compensation",
    description: "Attractive base pay plus performance incentives, personal training splits, and bonus upside."
  },
  {
    icon: "Award",
    title: "Coach Development & Upskilling",
    description: "Regular technical workshops, boxing drill clinics, certifications assistance, and career mobility."
  },
  {
    icon: "HeartHandshake",
    title: "Vibrant Community",
    description: "Be the cornerstone of a close-knit, supportive fitness tribe where hard work is celebrated."
  },
  {
    icon: "MapPin",
    title: "Prime Puducherry Location",
    description: "Central, easily accessible arena environment designed for peak energy and focused training."
  }
];

export const FAQS = [
  {
    q: "Where is Box & Cross located and is on-site presence required?",
    a: "Box & Cross Performance Arena is based in Puducherry, India. All coaching, front-desk, and facility roles require working on-site to ensure authentic interaction and coaching standards."
  },
  {
    q: "Can I apply for more than one role?",
    a: "Yes! You can select multiple roles in Section 2 (for example, Boxing Coach and Personal Trainer). Our hiring team will review your application for all selected roles."
  },
  {
    q: "What file formats are accepted for the resume?",
    a: "We accept PDF, DOC, DOCX, JPG, and PNG up to 15MB. PDF is preferred. If you do not have a file handy, you can also paste a Google Drive or LinkedIn link in Section 5."
  },
  {
    q: "How does the selection process work after submitting?",
    a: "After submitting, you'll receive an Application ID. Our talent team reviews applications within 2–4 business days. Shortlisted candidates are invited for an initial call followed by an in-person arena tour and practical coaching demonstration."
  },
  {
    q: "What if I am from outside Puducherry?",
    a: "Candidates from outside Puducherry are welcome to apply provided you are ready to relocate and work on-site."
  }
];
