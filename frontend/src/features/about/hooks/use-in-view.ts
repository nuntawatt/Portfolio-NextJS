import { useEffect, useRef, useState } from 'react';

// useInView: Hook สำหรับตรวจสอบว่าองค์ประกอบ (Element) อยู่ในหน้าจอแสดงผลหรือไม่โดยใช้ IntersectionObserver (จะหยุดสังเกตการณ์เมื่อแสดงในหน้าจอแล้วครั้งแรก)
export function useInView<T extends HTMLElement = HTMLDivElement>(
    threshold = 0.15,
): [React.RefObject<T | null>, boolean] {
    // ref: อ้างอิงถึง Element ที่ต้องการตรวจสอบ
    const ref = useRef<T | null>(null);
    // inView: สถานะว่า Element นั้นปรากฏในหน้าจอแล้วหรือยัง
    const [inView, setInView] = useState(false);

    // เริ่มสังเกตการณ์การแสดงผลของ Element บนหน้าจอ
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