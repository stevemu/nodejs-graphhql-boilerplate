const bcrypt = require('bcryptjs');

async function run() {

  let hashed = bcrypt.hashSync("a", 8);
  console.log(hashed); //$2a$08$iOvansja4V7Q/17435ftK.MnT0tv7w0q17FGwVVcowet6jrIONI7S

  let isValid = bcrypt.compareSync("a", hashed);
  console.log(isValid);

  process.exit();
}

run().then().catch((err) => {
  console.log(err);
})