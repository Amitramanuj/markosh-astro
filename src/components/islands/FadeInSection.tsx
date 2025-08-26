import { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function FadeInSection({ 
  children, 
  className
}: FadeInSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Memoized callback to minimize re-renders and optimize performance
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Immediately unobserve to prevent unnecessary callbacks
        if (observerRef.current && entry.target) {
          observerRef.current.unobserve(entry.target);
        }
      }
    });
  }, []);

  useEffect(() => {
    // Match Next.js version exactly with threshold 0.1
    observerRef.current = new IntersectionObserver(handleIntersection, { 
      threshold: 0.1,
      // Add rootMargin for better performance - trigger slightly before element is visible
      rootMargin: '0px 0px -10px 0px'
    });

    const currentElement = sectionRef.current;
    if (currentElement && observerRef.current) {
      observerRef.current.observe(currentElement);
    }

    // Cleanup function to prevent memory leaks
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [handleIntersection]);

  return (
    <div
      ref={sectionRef}
      className={cn(
        // Match Next.js version exactly: transition-opacity ease-in duration-700
        'transition-opacity ease-in duration-700',
        isVisible ? 'opacity-100' : 'opacity-0',
        className
      )}
    >
      {children}
    </div>
  );
}