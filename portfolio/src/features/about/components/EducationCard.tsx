import { TiltCard } from './TiltCard';
import { GraduationCap } from '../icons/Icon';

export function EducationCard() {
    return (
        <TiltCard
            className="rounded-2xl p-5 overflow-hidden"
            style={{
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(249,115,22,0.18)',
                backdropFilter: 'blur(16px)',
            }}
        >
            <div className="flex items-center gap-4">
                <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                        background: 'linear-gradient(135deg, rgba(249,115,22,0.2), rgba(234,88,12,0.1))',
                        color: '#f97316',
                    }}
                >
                    <GraduationCap />
                </div>

                <div>
                    <p
                        className="text-xs font-bold uppercase tracking-widest mb-0.5"
                        style={{ color: '#f97316', letterSpacing: '0.12em' }}
                    >
                        Education
                    </p>
                    <p className="font-bold text-sm text-white leading-snug">
                        B.Sc. Computer & Information Science
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>
                        Khon Kaen University · GPAX 3.21 · May 2026
                    </p>
                </div>
            </div>
        </TiltCard>
    );
}