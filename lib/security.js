// Security utilities and configurations

// Input sanitization
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input

  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
}

// Validate email
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate Egyptian phone number
export function isValidEgyptianPhone(phone) {
  const phoneRegex = /^(\+20|0)?1[0125][0-9]{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Validate password strength
export function validatePassword(password) {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  const errors = []

  if (password.length < minLength) {
    errors.push(`كلمة المرور يجب أن تكون ${minLength} أحرف على الأقل`)
  }
  if (!hasUpperCase) {
    errors.push('يجب أن تحتوي على حرف كبير')
  }
  if (!hasLowerCase) {
    errors.push('يجب أن تحتوي على حرف صغير')
  }
  if (!hasNumbers) {
    errors.push('يجب أن تحتوي على رقم')
  }
  if (!hasSpecialChar) {
    errors.push('يجب أن تحتوي على رمز خاص')
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength: calculatePasswordStrength(password),
  }
}

function calculatePasswordStrength(password) {
  let strength = 0
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[a-z]/.test(password)) strength++
  if (/\d/.test(password)) strength++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++

  if (strength <= 2) return 'weak'
  if (strength <= 4) return 'medium'
  return 'strong'
}

// CSRF Token generation (for forms)
export function generateCSRFToken() {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Rate limiting helper (client-side)
const rateLimitMap = new Map()

export function checkRateLimit(key, maxAttempts = 5, windowMs = 60000) {
  const now = Date.now()
  const record = rateLimitMap.get(key)

  if (!record) {
    rateLimitMap.set(key, { attempts: 1, firstAttempt: now })
    return { allowed: true, remaining: maxAttempts - 1 }
  }

  if (now - record.firstAttempt > windowMs) {
    rateLimitMap.set(key, { attempts: 1, firstAttempt: now })
    return { allowed: true, remaining: maxAttempts - 1 }
  }

  if (record.attempts >= maxAttempts) {
    const retryAfter = Math.ceil((record.firstAttempt + windowMs - now) / 1000)
    return { allowed: false, retryAfter }
  }

  record.attempts++
  return { allowed: true, remaining: maxAttempts - record.attempts }
}

// XSS prevention for user-generated content
export function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, m => map[m])
}

// Secure headers configuration (for API routes)
export const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-XSS-Protection': '1; mode=block',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
}

// Content Security Policy
export const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' blob: data: https:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://www.google-analytics.com https://www.facebook.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`.replace(/\s{2,}/g, ' ').trim()
