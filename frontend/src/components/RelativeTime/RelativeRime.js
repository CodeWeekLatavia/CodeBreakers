export default function relativeTime(postTime, locale) {
    const rtf = new Intl.RelativeTimeFormat(locale, {
        localeMatcher: 'best fit',
        numeric: 'auto',
        style: 'long'
    });
    const diff = new Date(postTime).getTime() - new Date().getTime();
    const units = {
        year: 24 * 60 * 60 * 1000 * 365,
        month: 24 * 60 * 60 * 1000 * 365 / 12,
        day: 24 * 60 * 60 * 1000,
        hour: 60 * 60 * 1000,
        minute: 60 * 1000,
        second: 1000
    };
    for (const unit in units) {
        if (Math.abs(diff) > units[unit] || unit === 'seconds') {
            return rtf.format(Math.round(diff / units[unit]), unit);
        }
    }
}