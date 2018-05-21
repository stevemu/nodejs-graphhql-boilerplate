let fs = require("fs");
let moment = require("moment");

const { Client, Pool } = require("pg");

const pool = new Pool({
  user: "metroschool",
  host: "10.211.55.25",
  database: "metroschool",
  password: "metro3edc4rfv5tgbschool",
  port: 5788
})

async function run() {

  let res;

  // students
  res = await pool.query('select * from students');
  // console.log(res.rows);

  // transform students
  let students = res.rows.map((val) => {

    let student = {
      id: val.student_id,
      firstDay: val.firstday,
      lastName: val.last_name,
      sex: val.sex,
      address: val.address,
      zip: val.zip,
      dob: val.bod,
      learnerPermitNo: val.learn_permit_no,
      learnerPermitExp: val.learn_permit_exp,
      homePhone: val.home_telephone,
      discontinue: val.discountine,
      passTest: val.pass_test,
      note: val.note,
      notes: val.notes,
      call: val.call
    }

    return student;
  })

  // console.log(students);

  // appointments

  res = await pool.query('select * from appointment');
  // console.log(res.rows);

  let appointments = res.rows.map((item) => {

    // console.log(item);
    let newDate = transformDateAndTime(item.dates, item.times);
    // console.log(newDate);

    let appointment = {
      id: item.appointment_id,
      date: newDate,
      studentName: item.student_last_name,
      car: item.car,
      teacherName: item.teacher_last_name,
      fee: item.fee,
      location: item.location,
      notes: item.notes,
      studentId: item.student_id,
      studentPhone: item.student_phone,
      learnerPermitNo: item.learn_permit_no
    };

    return appointment;
  })

  // console.log(appointments);

  // cars
  res = await pool.query("select * from car");

  let cars = res.rows.map((item) => {
    return {
      no: item.car_no
    }
  });

  // console.log(cars);

  // teachers
  res = await pool.query("select * from teachers");

  let teachers = res.rows.map((item) => {
    return {
      name: item.name
    }
  });

  // put all in one obj
  let db = {
    appointments,
    teachers,
    students,
    cars
  }

  // write to file
  fs.writeFileSync("db.json", JSON.stringify(db, null, "  "), 'utf8');

  // close the postgress pool
  pool.end();

}


function transformDateAndTime(date, time) {

  // console.log(date);
  // console.log(time);
  // convert date to moment date
  let newDate = moment(date, "MM/DD/YY");

  // console.log(newDate);
  // convert time to moment date
  let t = moment(time);
  let hour = t.hour();
  let minute = t.minute();

  // put min and hour to newDate
  newDate.hour(hour);
  newDate.minute(minute);

  // this is the new date string that have both date and time
  let newDateString = newDate.utc().format();
  return newDateString;
}

run().then().catch((err) => {
  console.log(err);
});