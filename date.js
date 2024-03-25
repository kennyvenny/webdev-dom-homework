import {
    format
} from "date-fns";

export function formatDate(date) {
    if (date == undefined) return;
    
    return format(date, "yyyy-MM-dd hh.mm.ss");
};