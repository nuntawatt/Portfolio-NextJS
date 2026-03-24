interface SectionLabelProps {
    children: React.ReactNode;
}

// A stylized section header with an orange line and uppercase text.
export function SectionLabel({ children }: SectionLabelProps) {
    return (
        <p className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-3 text-orange-500"
            style={{ letterSpacing: '0.18em' }}
        >
            <span className="block w-5 h-px bg-orange-500" />
            {children}
            <span
                className="block flex-1 h-px bg-gradient-to-r from-orange-500/40 to-transparent"
            />
        </p>
    );
}