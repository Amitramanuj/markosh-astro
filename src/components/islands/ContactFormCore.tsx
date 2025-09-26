import { useState, useCallback, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { validateForm, submitForm, contactFormRules, type ValidationError } from '@/lib/form-utils';
import { withErrorBoundary } from '@/components/ErrorBoundary';

interface FormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

/**
 * Optimized contact form component with lightweight validation
 * Replaces heavy dependencies for better performance
 */
function ContactFormCore() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleInputChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const handleSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validate form
    const fieldsToValidate = [
      { name: 'name', value: formData.name, rules: contactFormRules.name },
      { name: 'email', value: formData.email, rules: contactFormRules.email },
      { name: 'company', value: formData.company, rules: contactFormRules.company },
      { name: 'message', value: formData.message, rules: contactFormRules.message },
    ];

    const validationErrors = validateForm(fieldsToValidate);

    if (validationErrors.length > 0) {
      const errorMap = validationErrors.reduce((acc, error) => {
        acc[error.field] = error.message;
        return acc;
      }, {} as Record<string, string>);
      
      setErrors(errorMap);
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await submitForm(formData);
      
      if (result.success) {
        toast({
          title: 'Message Sent Successfully!',
          description: result.message,
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          message: '',
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: 'Submission Failed',
        description: error instanceof Error ? error.message : 'Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, toast]);

  return (
    <Card className="bg-secondary/50">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Send us a message</CardTitle>
        <CardDescription>Fill out the form and we will get back to you shortly.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={errors.name ? 'border-destructive' : ''}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-destructive">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={errors.email ? 'border-destructive' : ''}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-destructive">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="company">Company (Optional)</Label>
            <Input
              id="company"
              type="text"
              placeholder="Your Company Inc."
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              aria-invalid={!!errors.company}
              aria-describedby={errors.company ? 'company-error' : undefined}
              className={errors.company ? 'border-destructive' : ''}
            />
            {errors.company && (
              <p id="company-error" className="mt-1 text-sm text-destructive">
                {errors.company}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="message">Your Message *</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your project or staffing needs..."
              className={`min-h-[120px] ${errors.message ? 'border-destructive' : ''}`}
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'message-error' : undefined}
            />
            {errors.message && (
              <p id="message-error" className="mt-1 text-sm text-destructive">
                {errors.message}
              </p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full btn-gradient font-semibold" 
            size="lg"
            disabled={isSubmitting}
            aria-describedby="submit-status"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="mr-2 h-5 w-5 animate-spin"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </Button>
          
          <div id="submit-status" className="sr-only" aria-live="polite">
            {isSubmitting ? 'Submitting form...' : 'Form ready to submit'}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

// Export component with error boundary
export default withErrorBoundary(ContactFormCore, 
  <Card className="bg-destructive/10 border-destructive/20">
    <CardContent className="p-6 text-center">
      <h3 className="text-lg font-semibold text-destructive mb-2">Form Unavailable</h3>
      <p className="text-sm text-muted-foreground">
        The contact form is currently unavailable. Please refresh the page or contact us directly.
      </p>
    </CardContent>
  </Card>
);