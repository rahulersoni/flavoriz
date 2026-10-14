export function MetaItem({ icon: Icon, label, value }) {
    return (
        <div className="flex min-w-0 items-start gap-3">
            <div className="grid size-10 shrink-0 place-items-center rounded-full bg-accent text-primary-hover">
                <Icon size={17} strokeWidth={1.8} />
            </div>

            <div>
                <p className="text-[11px] text-soft">{label}</p>
                <p className="mt-0.5 text-sm font-bold">{value}</p>
            </div>
        </div>
    );
}