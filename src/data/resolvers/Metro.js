import { isAuthenticatedResolver } from './acl';
import {APP_CONSTANTS} from '../../config';
let {STUDENTS, APPOINTMENTS, DB} = APP_CONSTANTS;
import {v4 as uuid} from 'uuid';
import moment from 'moment';

export default {
  Query: {
    students: async (parent, params, {r}) => {
      let students = await r.db(DB).table(STUDENTS);
      // transform date to ISO strings
      students = students.map((item) => {
        // console.log(item);
        return {
          ... item,
          dob: moment(item.dob).utc().format(),
          firstDay: moment(item.dob).utc().format(),
          learnerPermitExp: moment(item.dob).utc().format()
        }
      })
      return students;
    },
    appointments: async (parent, params, {r}) => {
      let items = await r.db(DB).table(APPOINTMENTS);
      // transform date to ISO strings
      items = items.map((item) => {
        // console.log(item);
        return {
          ... item,
          date: moment(item.date).utc().format()
        }
      })
      return items;
    },
    
  },
  Mutation: {
  }

}