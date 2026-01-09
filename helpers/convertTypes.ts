export function stringToBoolean(value: any): boolean {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value === 1;
    if (!value) return false;

    return String(value).toLowerCase() === "true";
}

export function stringToDate(value: string | undefined): Date | null {
    if (!value) return null;

    const date = new Date(value);

    return isNaN(date.getTime()) ? null : date;
}

export function shortDate(dateString: string | null) {
    if (!dateString) return ''
    return dateString.split('T')[0]
}