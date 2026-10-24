// API Service for BXC Careers & Hiring

const DEFAULT_API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://api.boxandcross.com';

// Get active API Base URL from localStorage or default
export const getApiBaseUrl = () => {
  return localStorage.getItem('bxc_api_base_url') || DEFAULT_API_BASE;
};

// Set active API Base URL (allows toggling between Live and Localhost)
export const setApiBaseUrl = (url) => {
  localStorage.setItem('bxc_api_base_url', url);
};

export const API_ENDPOINTS = {
  LIVE: 'https://api.boxandcross.com',
  LOCAL: 'http://localhost:5000',
};

/**
 * Submit hiring application using FormData (Recommended for PDF resume upload)
 * @param {Object} formState Application data
 * @param {File|null} resumeFile Binary resume file (Max 15MB)
 * @returns {Promise<Object>} Response from BXC server
 */
export const submitHiringApplication = async (formState, resumeFile) => {
  const baseUrl = getApiBaseUrl();
  const endpoint = `${baseUrl}/api/hiring`;

  const formData = new FormData();

  // Section 1: Personal Details
  formData.append('fullName', formState.fullName?.trim() || '');
  formData.append('phone', formState.phone?.trim() || '');
  formData.append('email', formState.email?.trim() || '');
  formData.append('is18Plus', formState.is18Plus ? 'true' : 'false');
  formData.append('currentLocation', formState.currentLocation?.trim() || '');

  // Section 2: Positions
  formData.append('positions', JSON.stringify(formState.positions || []));
  if (formState.otherPosition && formState.positions?.includes('Other')) {
    formData.append('otherPosition', formState.otherPosition.trim());
  }

  // Section 3: Experience & Qualifications
  if (formState.highestEducation) {
    formData.append('highestEducation', formState.highestEducation);
  }
  if (formState.totalExperience) {
    formData.append('totalExperience', formState.totalExperience);
  }
  if (formState.previousCompany) {
    formData.append('previousCompany', formState.previousCompany.trim());
  }
  if (formState.certifications) {
    formData.append('certifications', formState.certifications.trim());
  }
  if (formState.skillsDescription) {
    formData.append('skillsDescription', formState.skillsDescription.trim());
  }
  if (formState.languagesKnown && formState.languagesKnown.length > 0) {
    formData.append('languagesKnown', JSON.stringify(formState.languagesKnown));
  }
  if (formState.coachingExperience && formState.coachingExperience.length > 0) {
    formData.append('coachingExperience', JSON.stringify(formState.coachingExperience));
  }

  // Section 4: Availability & Expectations
  if (formState.currentEmploymentStatus) {
    formData.append('currentEmploymentStatus', formState.currentEmploymentStatus);
  }
  if (formState.whenCanYouJoin) {
    formData.append('whenCanYouJoin', formState.whenCanYouJoin);
  }
  if (formState.preferredShift) {
    formData.append('preferredShift', formState.preferredShift);
  }
  if (formState.expectedSalary) {
    formData.append('expectedSalary', formState.expectedSalary.trim());
  }
  formData.append('willingToWorkInPuducherry', formState.willingToWorkInPuducherry ? 'true' : 'false');

  // Section 5: Resume & Portfolio
  if (resumeFile) {
    formData.append('resume', resumeFile); // Key MUST be 'resume'
  } else if (formState.resumeUrl) {
    formData.append('resumeUrl', formState.resumeUrl.trim());
  }

  if (formState.portfolioLink) {
    formData.append('portfolioLink', formState.portfolioLink.trim());
  }
  if (formState.certificatesUrl) {
    formData.append('certificatesUrl', formState.certificatesUrl.trim());
  }
  if (formState.additionalInfo) {
    formData.append('additionalInfo', formState.additionalInfo.trim());
  }

  // Section 6: Declaration
  formData.append('declarationAgreed', formState.declarationAgreed ? 'true' : 'false');

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      // Notice: Never set 'Content-Type': 'multipart/form-data' manually,
      // the browser automatically sets it with the boundary!
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || `Submission failed with status: ${response.status}`);
    }

    return result;
  } catch (error) {
    // If server was unreachable or network failure
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error(`Unable to connect to BXC server at ${baseUrl}. Please check your internet connection or verify the backend server is running.`);
    }
    throw error;
  }
};

/**
 * Fetch role definitions and options from helper endpoint if available
 */
export const fetchRoleOptions = async () => {
  const baseUrl = getApiBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/hiring/roles`, { method: 'GET' });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Using offline role options:', err.message);
  }
  return null;
};
