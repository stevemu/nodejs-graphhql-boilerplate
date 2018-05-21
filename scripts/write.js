let fs = require("fs");
const uuid = require('uuid/v4');
let r = require("rethinkdbdash")({ servers: [{ host: "localhost", port: 28015 }] });

async function run() {

  // read from db.json
  let file = fs.readFileSync("db.json", "utf8");
  let oldDb = JSON.parse(file);
  // console.log(oldDb);





  // students
  // console.log('working on students...');

  // console.log('deleting students table');
  // await r.db("Metro").table("Students").delete();

  // console.log('converting');
  // let newStudents = oldDb.students.map((item) => {
  //   let { note, ...newItem } = item; // omit field
  //   newItem = {
  //     ...newItem,
  //     id: String(newItem.id),
  //     call: newItem.call == "Y" ? true : false,
  //     firstDay: r.ISO8601(newItem.firstDay),
  //     dob: r.ISO8601(newItem.dob),
  //     learnerPermitExp: r.ISO8601(newItem.learnerPermitExp)
  //   }
  //   return newItem;
  // })

  // console.log('inserting to db');
  // await r.db("Metro").table("Students").insert(newStudents);





  // appointments

  console.log('working on appointments...');

  console.log('deleting appointments table');
  await r.db("Metro").table("Appointments").delete();

  console.log('converting');
  let newAppointments = oldDb.appointments.map((item) => {
    let {fee, teacherName, ...newItem} = item;
    // let {...newItem} = item;
    newItem = {
      ...newItem,
      id: String(newItem.id),
      date: r.ISO8601(newItem.date),
      studentId: String(newItem.studentId),
      instructorName: teacherName
    }
    return newItem;
  })

  console.log('inserting to db');
  await r.db("Metro").table("Appointments").insert(newAppointments);



  // instructors

  // console.log('working on instructors...');

  // console.log('deleting instructors table');
  // await r.db("Metro").table("Instructors").delete();

  // console.log('converting');
  // let newInstructors = oldDb.teachers.map((item) => {
  //   // console.log(item);
  //   let newItem = {
  //     ...item,
  //     id: uuid()
  //   }
  //   return newItem;
  // })

  // console.log(newInstructors);

  // console.log('inserting to db');
  // await r.db("Metro").table("Instructors").insert(newInstructors);




  // cars

  // console.log('working on cars...');

  // console.log('deleting cars table');
  // await r.db("Metro").table("Cars").delete();

  // console.log('converting');
  // let newCars = oldDb.cars.map((item) => {
  //   let newItem = {
  //     ...item,
  //     id: uuid()
  //   }
  //   return newItem;
  // })

  // console.log('inserting to db');
  // await r.db("Metro").table("Cars").insert(newCars);



  process.exit();
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

run().then().catch((err) => {
  console.log(err);
})