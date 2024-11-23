import { Buffer } from 'buffer';

// Sanitize user input to prevent XSS
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};

// Validate email format
export const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// Password strength checker
export const checkPasswordStrength = (password) => {
  const checks = {
    length: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumbers: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const strength = Object.values(checks).filter(Boolean).length;

  return {
    score: strength,
    checks,
    isStrong: strength >= 4,
    feedback: {
      suggestions: [
        !checks.length && 'Use at least 8 characters',
        !checks.hasUpperCase && 'Add uppercase letters',
        !checks.hasLowerCase && 'Add lowercase letters',
        !checks.hasNumbers && 'Add numbers',
        !checks.hasSpecialChar && 'Add special characters',
      ].filter(Boolean),
    },
  };
};

// Token handling
export const tokenUtils = {
  // Securely store token
  setToken: (token) => {
    try {
      if (!token) return;
      const encodedToken = Buffer.from(token).toString('base64');
      sessionStorage.setItem('auth_token', encodedToken);
    } catch (error) {
      console.error('Error storing token:', error);
    }
  },

  // Retrieve token
  getToken: () => {
    try {
      const encodedToken = sessionStorage.getItem('auth_token');
      if (!encodedToken) return null;
      return Buffer.from(encodedToken, 'base64').toString('ascii');
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  },

  // Clear token
  clearToken: () => {
    try {
      sessionStorage.removeItem('auth_token');
    } catch (error) {
      console.error('Error clearing token:', error);
    }
  },
};

// Rate limiting for API calls
export class RateLimiter {
  constructor(maxRequests = 100, timeWindow = 60000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = new Map();
  }

  checkLimit(key) {
    const now = Date.now();
    const windowStart = now - this.timeWindow;
    
    // Clean up old requests
    this.requests.forEach((timestamp, reqKey) => {
      if (timestamp < windowStart) {
        this.requests.delete(reqKey);
      }
    });

    // Get requests in current window
    const requestsInWindow = Array.from(this.requests.values())
      .filter(timestamp => timestamp > windowStart)
      .length;

    if (requestsInWindow >= this.maxRequests) {
      return false;
    }

    this.requests.set(key + now, now);
    return true;
  }
}

// CSRF Token management
export const csrfUtils = {
  generateToken: () => {
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    sessionStorage.setItem('csrf_token', token);
    return token;
  },

  validateToken: (token) => {
    return token === sessionStorage.getItem('csrf_token');
  },
};

// Secure data encryption/decryption (for sensitive data in memory)
export const encryptionUtils = {
  // Simple encryption for non-critical data
  encrypt: (text, key) => {
    try {
      return Buffer.from(text).toString('base64');
    } catch (error) {
      console.error('Encryption error:', error);
      return null;
    }
  },

  // Simple decryption for non-critical data
  decrypt: (encryptedText, key) => {
    try {
      return Buffer.from(encryptedText, 'base64').toString('ascii');
    } catch (error) {
      console.error('Decryption error:', error);
      return null;
    }
  },
};
