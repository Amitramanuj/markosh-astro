import { useState, useCallback, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { validateForm, submitForm, contactFormRules, type ValidationError } from '@/lib/form-utils';
import { withErrorBoundary } from '@/components/ErrorBoundary';

// Outcome options route the enquiry to the right service family.
const outcomeOptions = [
  { value: 'build', label: 'Build software or an AI product' },
  { value: 'talent', label: 'Hire technical talent' },
  { value: 'ai-strategy', label: 'Create an AI strategy' },
  { value: 'automation', label: 'Automate a workflow' },
  { value: 'sales-trial', label: 'Try a sales rep for 14 days' },
  { value: 'revenue-pod', label: 'Build a revenue pod' },
  { value: 'combined', label: 'Build a combined tech + sales execution team' },
  { value: 'unsure', label: 'Not sure yet' },
];

const salesOutcomes = ['sales-trial', 'revenue-pod', 'combined'];
const aiOutcomes = ['ai-strategy', 'automation'];

interface FormData {
  name: string;
  email: string;
  company: string;
  outcome: string;
  message: string;
  // Sales-specific (optional, shown for sales outcomes)
  targetCustomer: string;
  avgDealSize: string;
  closerAvailable: string;
  territory: string;
  crm: string;
  salesInterest: string;
  // AI-specific (optional, shown for AI outcomes)
  aiWorkflow: string;
  aiTools: string;
  aiDataReady: string;
  aiScope: string;
  aiBusinessOutcome: string;
}

const emptyForm: FormData = {
  name: '',
  email: '',
  company: '',
  outcome: '',
  message: '',
  targetCustomer: '',
  avgDealSize: '',
  closerAvailable: '',
  territory: '',
  crm: '',
  salesInterest: '',
  aiWorkflow: '',
  aiTools: '',
  aiDataReady: '',
  aiScope: '',
  aiBusinessOutcome: '',
};

// Pre-select the outcome from a ?outcome= query param (e.g. links from
// the trial page use /contact?outcome=sales-trial).
function initialOutcome(): string {
  if (typeof window === 'undefined') return '';
  const param = new URLSearchParams(window.location.search).get('outcome');
  return outcomeOptions.some((o) => o.value === param) ? (param as string) : '';
}

const selectClassName =
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm';

/**
 * Optimized contact form component with lightweight validation
 * Replaces heavy dependencies for better performance
 */
function ContactFormCore() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>(() => ({
    ...emptyForm,
    outcome: initialOutcome(),
  }));

  const showSalesFields = salesOutcomes.includes(formData.outcome);
  const showAiFields = aiOutcomes.includes(formData.outcome);

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
      { name: 'outcome', value: formData.outcome, rules: contactFormRules.outcome },
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
      const result = await submitForm(formData as unknown as Record<string, string>);

      if (result.success) {
        toast({
          title: 'Request Received!',
          description: result.message,
        });

        // Reset form
        setFormData(emptyForm);
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
        <CardDescription>Fill out the form and we will get back to you within one business day.</CardDescription>
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
            <Label htmlFor="email">Work Email *</Label>
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
            <Label htmlFor="outcome">What outcome do you need? *</Label>
            <select
              id="outcome"
              value={formData.outcome}
              onChange={(e) => handleInputChange('outcome', e.target.value)}
              aria-invalid={!!errors.outcome}
              aria-describedby={errors.outcome ? 'outcome-error' : undefined}
              className={`${selectClassName} ${errors.outcome ? 'border-destructive' : ''}`}
            >
              <option value="">Select an outcome…</option>
              {outcomeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.outcome && (
              <p id="outcome-error" className="mt-1 text-sm text-destructive">
                {errors.outcome}
              </p>
            )}
          </div>

          {showSalesFields && (
            <fieldset className="space-y-6 rounded-lg border border-border p-4">
              <legend className="px-1 text-sm font-semibold">About your sales motion</legend>
              <div>
                <Label htmlFor="targetCustomer">Who is your target customer?</Label>
                <Input
                  id="targetCustomer"
                  type="text"
                  placeholder="e.g. HR directors at mid-size staffing firms"
                  value={formData.targetCustomer}
                  onChange={(e) => handleInputChange('targetCustomer', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="avgDealSize">What is your average deal size?</Label>
                <Input
                  id="avgDealSize"
                  type="text"
                  placeholder="e.g. $15,000 / year"
                  value={formData.avgDealSize}
                  onChange={(e) => handleInputChange('avgDealSize', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="closerAvailable">Do you have someone who can close sales calls?</Label>
                <select
                  id="closerAvailable"
                  value={formData.closerAvailable}
                  onChange={(e) => handleInputChange('closerAvailable', e.target.value)}
                  className={selectClassName}
                >
                  <option value="">Select…</option>
                  <option value="yes">Yes — founder, AE, or closer available</option>
                  <option value="no">Not yet</option>
                </select>
              </div>
              <div>
                <Label htmlFor="territory">Which market or territory do you want to target?</Label>
                <Input
                  id="territory"
                  type="text"
                  placeholder="e.g. US Midwest, UK, DACH"
                  value={formData.territory}
                  onChange={(e) => handleInputChange('territory', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="crm">Do you already use a CRM? Which one?</Label>
                <Input
                  id="crm"
                  type="text"
                  placeholder="e.g. HubSpot, Salesforce, none yet"
                  value={formData.crm}
                  onChange={(e) => handleInputChange('crm', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="salesInterest">Are you interested in the 14-day trial or a monthly pod?</Label>
                <select
                  id="salesInterest"
                  value={formData.salesInterest}
                  onChange={(e) => handleInputChange('salesInterest', e.target.value)}
                  className={selectClassName}
                >
                  <option value="">Select…</option>
                  <option value="trial">14-day trial</option>
                  <option value="monthly">Monthly rep or pod</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
            </fieldset>
          )}

          {showAiFields && (
            <fieldset className="space-y-6 rounded-lg border border-border p-4">
              <legend className="px-1 text-sm font-semibold">About your AI goals</legend>
              <div>
                <Label htmlFor="aiWorkflow">What workflow or process do you want to improve?</Label>
                <Input
                  id="aiWorkflow"
                  type="text"
                  placeholder="e.g. manual invoice processing, sales research"
                  value={formData.aiWorkflow}
                  onChange={(e) => handleInputChange('aiWorkflow', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="aiTools">What tools do you currently use?</Label>
                <Input
                  id="aiTools"
                  type="text"
                  placeholder="e.g. Excel, Airtable, HubSpot, custom apps"
                  value={formData.aiTools}
                  onChange={(e) => handleInputChange('aiTools', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="aiDataReady">Do you already have usable data?</Label>
                <select
                  id="aiDataReady"
                  value={formData.aiDataReady}
                  onChange={(e) => handleInputChange('aiDataReady', e.target.value)}
                  className={selectClassName}
                >
                  <option value="">Select…</option>
                  <option value="yes">Yes</option>
                  <option value="partial">Partially / scattered across tools</option>
                  <option value="no">No / not sure</option>
                </select>
              </div>
              <div>
                <Label htmlFor="aiScope">Strategy only, or implementation too?</Label>
                <select
                  id="aiScope"
                  value={formData.aiScope}
                  onChange={(e) => handleInputChange('aiScope', e.target.value)}
                  className={selectClassName}
                >
                  <option value="">Select…</option>
                  <option value="strategy">Strategy only</option>
                  <option value="implementation">Strategy and implementation</option>
                  <option value="unsure">Not sure yet</option>
                </select>
              </div>
              <div>
                <Label htmlFor="aiBusinessOutcome">What business outcome do you want from AI?</Label>
                <Input
                  id="aiBusinessOutcome"
                  type="text"
                  placeholder="e.g. reduce manual work, faster research, better pipeline"
                  value={formData.aiBusinessOutcome}
                  onChange={(e) => handleInputChange('aiBusinessOutcome', e.target.value)}
                />
              </div>
            </fieldset>
          )}

          <div>
            <Label htmlFor="message">Your Message *</Label>
            <Textarea
              id="message"
              placeholder="Tell us about your project, team gap, or sales goals..."
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
