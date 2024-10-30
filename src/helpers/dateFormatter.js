import {format, parse} from "date-fns";
import {nl} from "date-fns/locale";

// export function formatPublishDate(dateString) {
//     const parsedDate = parse(dateString, 'dd-MM-yyyy', new Date());
//     return format(parsedDate, 'd MMMM, yyyy', {locale: nl});
// }

export function formatPublishDate(publishDate) {
    const dateObj = parse(publishDate, "dd-MM-yyyy", new Date());
    return format(dateObj, "d MMMM, yyyy", {locale: nl});
}


export function formatOpenDate(dateString) {
    const parsedDate = parse(dateString, 'dd-MM-yyyy', new Date());
    return format(parsedDate, 'd MMMM, yyyy', {locale: nl});
}

export function formatClosingDate(dateString) {
    const parsedDate = parse(dateString, 'dd-MM-yyyy', new Date());
    return format(parsedDate, 'd MMMM, yyyy', {locale: nl});
}

export function formatDateDob(dob) {
    const dateObj = parse(dob, "dd-MM-yyyy", new Date());
    return format(dateObj, "d MMMM, yyyy", {locale: nl});
}
