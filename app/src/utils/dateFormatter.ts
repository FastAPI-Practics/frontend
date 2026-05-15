type DateType = number | string | Date | null | undefined;

export const formatDate = (date: DateType): string | null => {
    const locales = "ru-RU";
    if (!date) {
        return null;
    } else {
        if (['symbol', 'number'].includes(typeof date)) {
            return new Date(date).toLocaleString(locales);
        }
        return date.toLocaleString(locales);
    }
};