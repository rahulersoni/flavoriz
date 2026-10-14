export function getDaysAsMember(createdAt) {
    if (!createdAt) return 0;

    const registeredDate = new Date(createdAt);

    if (Number.isNaN(registeredDate.getTime())) return 0;

    const today = new Date();

    registeredDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return Math.max(
        0,
        Math.floor(
            (today.getTime() - registeredDate.getTime()) /
            (1000 * 60 * 60 * 24)
        )
    );
}