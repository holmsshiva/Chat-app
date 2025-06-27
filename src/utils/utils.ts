export const getTimeFromDateTime = (dateString?: string): string => {
    const date = new Date(dateString || new Date().toISOString());
    return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
    }).format(date);
};