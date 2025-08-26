/**
 * Lightweight form validation utilities
 * Replaces heavy Zod with custom validation for better performance
 */

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  email?: boolean;
  message?: string;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface FormField {
  name: string;
  value: string;
  rules?: ValidationRule;
}

/**
 * Validate a single field
 */
export function validateField(field: FormField): ValidationError | null {
  const { name, value, rules } = field;
  
  if (!rules) return null;

  // Required validation
  if (rules.required && (!value || value.trim() === '')) {
    return { field: name, message: rules.message || `${name} is required` };
  }

  // Skip other validations if field is empty and not required
  if (!value || value.trim() === '') return null;

  // Email validation
  if (rules.email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return { field: name, message: rules.message || 'Please enter a valid email address' };
    }
  }

  // Min length validation
  if (rules.minLength && value.length < rules.minLength) {
    return { field: name, message: rules.message || `${name} must be at least ${rules.minLength} characters` };
  }

  // Max length validation
  if (rules.maxLength && value.length > rules.maxLength) {
    return { field: name, message: rules.message || `${name} must be less than ${rules.maxLength} characters` };
  }

  // Pattern validation
  if (rules.pattern && !rules.pattern.test(value)) {
    return { field: name, message: rules.message || `${name} format is invalid` };
  }

  return null;
}

/**
 * Validate entire form
 */
export function validateForm(fields: FormField[]): ValidationError[] {
  const errors: ValidationError[] = [];
  
  for (const field of fields) {
    const error = validateField(field);
    if (error) {
      errors.push(error);
    }
  }
  
  return errors;
}

/**
 * Sanitize user input to prevent XSS attacks
 */
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Form submission utility with security measures
 */
export async function submitForm(
  formData: Record<string, string>,
  endpoint: string = '/api/contact'
): Promise<{ success: boolean; message: string }> {
  try {
    // Sanitize all form data
    const sanitizedData = Object.entries(formData).reduce((acc, [key, value]) => {
      acc[key] = sanitizeInput(value.trim());
      return acc;
    }, {} as Record<string, string>);
    
    // Basic rate limiting check (client-side)
    const lastSubmission = localStorage.getItem('lastFormSubmission');
    const now = Date.now();
    const rateLimitMs = 60000; // 1 minute
    
    if (lastSubmission && (now - parseInt(lastSubmission)) < rateLimitMs) {
      throw new Error('Please wait before submitting another message.');
    }
    
    // Simulate API call - replace with actual implementation
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Store submission timestamp
    localStorage.setItem('lastFormSubmission', now.toString());
    
    // Log sanitized data for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Form submitted:', sanitizedData);
    }
    
    return {
      success: true,
      message: "Thanks for reaching out. We'll get back to you within 24 hours."
    };
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Form submission error:', error);
    }
    
    return {
      success: false,
      message: error instanceof Error ? error.message : 'There was an error sending your message. Please try again.'
    };
  }
}

/**
 * Form field validation rules
 */
export const contactFormRules = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z\s]+$/,
    message: 'Name can only contain letters and spaces'
  },
  email: {
    required: true,
    email: true,
    maxLength: 100
  },
  company: {
    maxLength: 100
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000
  }
} satisfies Record<string, ValidationRule>;