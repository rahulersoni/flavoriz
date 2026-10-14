export function Stat({ icon: Icon, value, label }) {
    return (
        <div className="flex items-center gap-2">
            <Icon size={17} className="text-primary" />

            <div>
                <div className="text-sm font-bold text-text">{value}</div>
                <div className="text-[11px] text-soft">{label}</div>
            </div>
        </div>
    );
}