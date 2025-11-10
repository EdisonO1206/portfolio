

export function parseDate(iso: string){
    if (!iso) return '';
    const date = new Date(iso);
    return date.toISOString().split('T')[0];
}