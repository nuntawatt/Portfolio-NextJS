import { useEffect, useRef, useState } from 'react';

// Custom hook that returns a ref and a boolean indicating if the element is in view.
export function useInView<T extends HTMLElement = HTMLDivElement>(
    threshold = 0.15,
): [React.RefObject<T | null>, boolean] {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold },
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, inView];
}