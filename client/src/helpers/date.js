// helper function i wrote to convert timestamps

export const formatDate = (timestamp) => {
    var date = new Date(timestamp);
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var amPM = 'AM';

    // add a zero if minutes less than 10
    if (minutes < 10) {
    minutes = '0' + minutes;
    }
    // adjust to 12 hour clock (even though military is better!)
    if (hour > 12) {
        amPM = 'PM';
        hour -= 12;
    }
    // adjust to PM for lunchtime 12
    if (hour === 12) {
        amPM = 'PM';
    }
    // adjust to 12 for midnight
    if (hour === 0) {
        hour = 12;
    }

    // format time string
    var time = `${month}/${day}/${year} at ${hour}:${minutes} ${amPM}`;

    return time;
}