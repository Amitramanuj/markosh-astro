import { useState, useCallback } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(50, { message: 'Name must be less than 50 characters.' })
    .regex(/^[a-zA-Z\s]+$/, { message: 'Name can only contain letters and spaces.' }),
  email: z.string()
    .email({ message: 'Please enter a valid email address.' })
    .max(100, { message: 'Email must be less than 100 characters.' }),
  company: z.string()
    .max(100, { message: 'Company name must be less than 100 characters.' })
    .optional(),
  message: z.string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(1000, { message: 'Message must be less than 1000 characters.' }),
});

/**
 * Core contact form component with all heavy dependencies
 * This is lazy-loaded to reduce initial bundle size
 */
export default function ContactFormCore() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });

  const onSubmit = useCallback(async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Simulate form submission - in real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log form data for development
      console.log('Form submitted:', values);
      
      // Show success toast
      toast({
        title: 'Message Sent Successfully!',
        description: "Thanks for reaching out. We'll get back to you within 24 hours.",
      });
      
      // Reset form after successful submission
      form.reset();
    } catch (error) {
      // Handle submission errors
      console.error('Form submission error:', error);
      
      toast({
        title: 'Submission Failed',
        description: 'There was an error sending your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [toast, form]);

  return (
    <Card className="bg-secondary/50">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Send us a message</CardTitle>
        <CardDescription>Fill out the form and we will get back to you shortly.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your Company Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your project or staffing needs..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full btn-gradient font-semibold" 
              size="lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}