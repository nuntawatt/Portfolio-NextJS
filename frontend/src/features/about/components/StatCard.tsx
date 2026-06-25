'use client';

import { ICON_MAP } from '../icons/icon';
import { useInView } from '../hooks/useInView';
import { useCountUp } from '../hooks/useCountUp';
import type { StatItem } from '../types/about';
import { useTranslation } from '@/shared/providers/LanguageProvider';

interface StatCardProps {
    stat: StatItem;
}

// StatCard: คอมโพเนนต์การ์ดแสดงตัวเลขค่าสถิติที่จะนับเลขอัพแบบแอนิเมชันเมื่อเลื่อนมาเห็นการ์ด
export function StatCard({ stat }: StatCardProps) {
    // ดึงฟังก์ชันแปลภาษา
    const { t } = useTranslation();
    // ใช้สปายตรวจสอบว่าการ์ดอยู่ในมุมมองหน้าจอหรือไม่ (Threshold: 0.4)
    const [ref, inView] = useInView<HTMLDivElement>(0.4);
    // ทำอนิเมชันนับเลขขึ้นตามค่าที่ระบุเมื่อคอมโพเนนต์เริ่มแสดงบนจอ
    const count = useCountUp(stat.value, inView);
    // แสดงไอคอนตามไอคอนคีย์ที่กำหนด
    const Icon = ICON_MAP[stat.iconKey];

    return (
        <div
            className="relative rounded-2xl p-6 flex flex-col items-center gap-3 overflow-hidden bg-card/60 border border-border backdrop-blur-xl transition-colors duration-300"
        >
            {/* icon badge */}
            {Icon && (
                <div className="p-2.5 rounded-xl border border-border bg-card text-muted-foreground transition-colors">
                    <Icon />
                </div>
            )}

            {/* animated number */}
            <div ref={ref} className="text-center">
                <p className="font-black leading-none text-4xl text-gradient">
                    {count}
                    {stat.suffix}
                </p>
                <p className="text-xs font-semibold uppercase tracking-widest mt-1 text-muted-foreground transition-colors"
                    style={{ letterSpacing: '0.12em' }}
                >
                    {t(stat.labelKey) || stat.label}
                </p>
            </div>
        </div>
    );
}