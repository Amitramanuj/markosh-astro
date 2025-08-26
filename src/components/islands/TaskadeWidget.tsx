import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    TaskadeEmbed?: {
      AgentPublicChatPopup: {
        init: (config: { 
          publicAgentId: string;
          theme?: string;
          preferences?: {
            theme: string;
            hideBranding: boolean;
          };
        }) => void;
      };
    };
  }
}

export default function TaskadeWidget() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Use Intersection Observer to detect when the widget should be loaded
    // This implements lazy loading for performance optimization
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            setIsVisible(true);
            loadTaskadeWidget();
          }
        });
      },
      {
        // Load when the bottom 20% of the viewport is reached
        rootMargin: '0px 0px 20% 0px',
        threshold: 0
      }
    );

    // Create a target element to observe (bottom of the page)
    const target = document.createElement('div');
    target.style.position = 'absolute';
    target.style.bottom = '0';
    target.style.height = '1px';
    target.style.width = '1px';
    target.style.pointerEvents = 'none';
    document.body.appendChild(target);

    observer.observe(target);

    return () => {
      observer.disconnect();
      if (target.parentNode) {
        target.parentNode.removeChild(target);
      }
    };
  }, [isLoaded]);

  const loadTaskadeWidget = () => {
    if (isLoaded || scriptRef.current) return;

    // Set system preference to light mode before loading Taskade
    // This ensures the widget matches the site theme
    if (typeof window !== 'undefined') {
      // Remove any existing dark mode classes or attributes
      document.documentElement.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark');
      document.body.classList.add('light');
    }

    // Create and load the Taskade embed script
    const script = document.createElement('script');
    script.src = 'https://assets.taskade.com/embeds/latest/taskade-embed.min.js';
    script.async = true;
    script.defer = true; // Additional performance optimization
    
    script.onload = () => {
      // Initialize the widget after script loads
      if (window.TaskadeEmbed?.AgentPublicChatPopup) {
        try {
          window.TaskadeEmbed.AgentPublicChatPopup.init({
            publicAgentId: '01K1H8Z4KAY5587YF56CR3V3F0',
            theme: 'light', // Set to light theme to match site
            preferences: {
              theme: 'light',
              hideBranding: false
            }
          });
          setIsLoaded(true);
        } catch (error) {
          console.error('Failed to initialize Taskade widget:', error);
        }
      } else {
        console.warn('TaskadeEmbed not available after script load');
      }
    };

    script.onerror = () => {
      console.error('Failed to load Taskade widget script');
    };

    // Store reference for cleanup
    scriptRef.current = script;
    document.head.appendChild(script);
  };

  // Cleanup function to remove script when component unmounts
  useEffect(() => {
    return () => {
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, []);

  // This component doesn't render anything visible - the widget is handled by Taskade's script
  // The widget will appear as a floating button in the bottom-right corner
  return null;
}