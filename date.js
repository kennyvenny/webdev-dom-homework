export function formatDate(date) {
    if (date == undefined) return;
    let dateNew = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear() - 2000;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (dateNew < 10) {
        dateNew = "0" + dateNew;
    }
    if (month < 10) {
        month = "0" + month;
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return dateNew + "." + month + "." + year + " " + hours + ":" + minutes;
};