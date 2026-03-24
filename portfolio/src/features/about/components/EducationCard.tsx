import { TiltCard } from './TiltCard';
import { GraduationCap } from '../icons/Icon';

export function EducationCard() {
    return (
        <TiltCard
            className="rounded-2xl p-5 overflow-hidden bg-white/60 dark:bg-white/[0.025] border border-orange-200/60 dark:border-orange-500/[0.18] backdrop-blur-xl transition-colors duration-300"
        >
            <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-orange-100 dark:bg-gradient-to-br dark:from-orange-500/20 dark:to-orange-600/10 text-orange-500 transition-colors">
                    <GraduationCap />
                </div>

                <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-0.5 text-orange-500"
                        style={{ letterSpacing: '0.12em' }}
                    >
                        Education
                    </p>
                    <p className="font-bold text-sm text-gray-900 dark:text-white leading-snug transition-colors">
                        B.Sc. Computer &amp; Information Science
                    </p>
                    <p className="text-xs mt-0.5 text-gray-500 dark:text-gray-500 transition-colors">
                        Khon Kaen University · GPAX 3.21 · May 2026
                    </p>
                </div>
            </div>
        </TiltCard>
    );
}