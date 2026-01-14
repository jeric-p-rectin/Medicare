'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions extends IntersectionObserverInit {
  triggerOnce?: boolean;
}

export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const { triggerOnce = true, threshold = 0.1, ...observerOptions } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, ...observerOptions }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, triggerOnce, observerOptions]);

  return { ref, isVisible };
}

// Hook for staggered animations (multiple children)
export function useStaggerAnimation(itemCount: number, baseDelay: number = 100) {
  const { ref, isVisible } = useScrollAnimation();

  const getDelayStyle = (index: number) => ({
    transitionDelay: isVisible ? `${index * baseDelay}ms` : '0ms',
  });

  return { ref, isVisible, getDelayStyle };
}
