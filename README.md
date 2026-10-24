# Box & Cross Performance Arena (BXC) — Career Application Platform

A React + Vite + Tailwind CSS landing page and hiring application platform for **Box & Cross Performance Arena (BXC)** in Puducherry.

> **Arena Guiding Mantra:**  
> *"IT'S JUST NEVER ENOUGH."*

---

## 🥊 Features

- **High-Impact Athletic Aesthetic**: Custom dark theme with BXC Carbon, Electric Crimson, and Championship Gold accents, glassmorphic cards, and athletic typography (Outfit, Inter, Bebas Neue).
- **Comprehensive 6-Section Application Form**:
  - **Section 1 — Personal Details**: Full Name, Mobile/WhatsApp, Email, Age (18+ confirmation), Current Location (with quick pick chips).
  - **Section 2 — Position Applying For**: Multi-select role cards with badges, "Other" role specifications, and **Copy Selected Roles** button.
  - **Section 3 — Experience & Qualifications**: Education, Experience brackets, Previous company, Certifications, Skills description, Languages checkboxes, and dynamic **Coaching Screening Question** ("Do you have experience coaching beginners, amateur athletes or competitive athletes?").
  - **Section 4 — Availability & Expectations**: Current employment status, notice period / joining timeline, preferred shift selection (Morning, Evening, Flexible), expected salary, on-site Puducherry confirmation.
  - **Section 5 — Resume & Portfolio**: Drag-and-drop resume upload (PDF, DOC, DOCX, JPG, PNG up to 15MB) with file size validation, hosted resume URL fallback, portfolio/Instagram link, certificates drive link, and additional notes.
  - **Section 6 — Final Confirmation**: Mandatory declaration agreement and high-energy submit button (`APPLY TO JOIN BXC`).
- **Autosave to LocalStorage**: Candidates' draft is automatically saved locally, preventing accidental data loss if the browser refreshes.
- **Form Completion Experience**: Shows the official confirmation screen with the generated `BXC-APP-...` Application ID, 1-click ID copy, candidate summary, and recruitment roadmap.
- **Backend API Integration**:
  - Connects to `https://api.boxandcross.com/api/hiring` via `multipart/form-data` (with binary resume file) or JSON fallback.
  - Built-in **Environment Switcher** in the navbar/footer to toggle between **Live Production** (`https://api.boxandcross.com`) and **Local Development** (`http://localhost:5000`) with live ping test.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
The app will launch at `http://localhost:3000`.

### 3. Build for Production
```bash
npm run build
```

---

## 📡 Backend API Reference

- **Production Endpoint**: `POST https://api.boxandcross.com/api/hiring`
- **Local Dev Endpoint**: `POST http://localhost:5000/api/hiring`
- **Roles Helper Endpoint**: `GET https://api.boxandcross.com/api/hiring/roles`

### Data Submitted (via `FormData`):
- `fullName`: string
- `phone`: string
- `email`: string
- `is18Plus`: `"true"`
- `currentLocation`: string
- `positions`: JSON stringified array, e.g. `["Boxing Coach", "Personal Trainer"]`
- `otherPosition`: string (if "Other" is selected)
- `highestEducation`: string
- `totalExperience`: string
- `previousCompany`: string
- `certifications`: string
- `skillsDescription`: string
- `languagesKnown`: JSON stringified array, e.g. `["Tamil", "English"]`
- `coachingExperience`: JSON stringified array, e.g. `["Beginners", "Competitive Athletes"]`
- `currentEmploymentStatus`: string
- `whenCanYouJoin`: string
- `preferredShift`: string
- `expectedSalary`: string
- `willingToWorkInPuducherry`: `"true"`
- `resume`: Binary file (PDF, DOC, DOCX, JPG, PNG - Max 15MB)
- `resumeUrl`: string (if file not attached)
- `portfolioLink`: string
- `certificatesUrl`: string
- `additionalInfo`: string
- `declarationAgreed`: `"true"`
