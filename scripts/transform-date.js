let moment = require("moment");

let date = "12/16/14";
let time = "1899-12-30T14:00:00.000Z"

// should get 9am of 12/16/14

// convert date to moment date
let newDate = moment(date, "MM/DD/YY");

// convert time to moment date
let t = moment(time);
let hour = t.hour();
let minute = t.minute();

// put min and hour to newDate
newDate.hour(hour);
newDate.minute(minute);

// this is the new date string that have both date and time
let newDateString = newDate.utc().format();
