import { useCallback, useEffect, useRef } from 'react';

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
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const hasInitializedRef = useRef(false);

  const loadTaskadeWidget = useCallback(() => {
    if (hasInitializedRef.current || scriptRef.current) {
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.taskade.com/embeds/latest/taskade-embed.min.js';
    script.async = true;
    script.defer = true;

    script.onload = () => {
      const widget = window.TaskadeEmbed?.AgentPublicChatPopup;

      if (widget) {
        try {
          widget.init({
            publicAgentId: '01K1H8Z4KAY5587YF56CR3V3F0',
            theme: 'light',
            preferences: {
              theme: 'light',
              hideBranding: false,
            },
          });
          hasInitializedRef.current = true;
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

    scriptRef.current = script;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadTaskadeWidget();
          }
        });
      },
      {
        rootMargin: '0px 0px 20% 0px',
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [loadTaskadeWidget]);

  useEffect(() => {
    return () => {
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={sentinelRef}
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '1px',
        height: '1px',
        opacity: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
