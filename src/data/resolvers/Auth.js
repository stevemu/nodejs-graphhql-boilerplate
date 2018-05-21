const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
import {APP_CONSTANTS} from '../../config';
let {USERS, DB} = APP_CONSTANTS;

const login = async (parent, { username, password }, { r, secret }) => {
  //let user = await models.one(APP_CONSTANTS.USERS, {username});
  let users = await r.db(DB).table(USERS).filter(username);
  let user = users[0];

  console.log(user);
  if (!user) {
    throw new Error(`No such user found for username: ${username}`)
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    throw new Error('Invalid password')
  }

  return {
    token: jwt.sign({ userId: user.id }, secret),
    user,
  }
}


export default {
  Mutation: {
    login
  }
}