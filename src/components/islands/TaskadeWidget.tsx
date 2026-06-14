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
    // Load the chat widget once — on the first user interaction or after a
    // short idle delay, whichever comes first. This keeps the heavy embed
    // script off the initial render path while guaranteeing the button shows
    // up everywhere (the old version only loaded once you scrolled to the
    // very bottom of the page, so on long mobile pages it never appeared).
    let loaded = false;
    const events: Array<keyof WindowEventMap> = [
      'pointerdown',
      'touchstart',
      'keydown',
      'scroll',
    ];

    const trigger = () => {
      if (loaded) return;
      loaded = true;
      cleanup();
      loadTaskadeWidget();
    };

    const timer = window.setTimeout(trigger, 3500);

    function cleanup() {
      window.clearTimeout(timer);
      events.forEach((event) => window.removeEventListener(event, trigger));
    }

    events.forEach((event) =>
      window.addEventListener(event, trigger, { once: true, passive: true })
    );

    return cleanup;
  }, [loadTaskadeWidget]);

  useEffect(() => {
    return () => {
      if (scriptRef.current && document.head.contains(scriptRef.current)) {
        document.head.removeChild(scriptRef.current);
        scriptRef.current = null;
      }
    };
  }, []);

  // No visible markup — the Taskade embed injects its own floating button.
  return null;
}
