import {format, parse} from "date-fns";
import {nl} from "date-fns/locale";


export function formatDate(dateString) {
    const dateObj = parse(dateString, 'yyyy-MM-dd', new Date());
    return format(dateObj, 'd MMMM, yyyy', {locale: nl});
}

export function formatDateTime(dateString) {
    const dateObj = parse(dateString, "yyyy-MM-dd'T'HH:mm:ss", new Date());
    return format(dateObj, "d MMMM, yyyy, HH:mm", {locale: nl});
}
