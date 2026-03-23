interface SectionLabelProps {
    children: React.ReactNode;
}

// A stylized section header with an orange line and uppercase text.
export function SectionLabel({ children }: SectionLabelProps) {
    return (
        <p
            className="text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-3"
            style={{ color: '#f97316', letterSpacing: '0.18em' }}
        >
            <span className="block w-5 h-px bg-orange-500" />
            {children}
            <span
                className="block flex-1 h-px"
                style={{ background: 'linear-gradient(to right, rgba(249,115,22,0.4), transparent)' }}
            />
        </p>
    );
}