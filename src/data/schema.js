import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `

type Query {
  students: [Student]
  appointments: [Appointment]
}

type Student {
  address: String
  call: Boolean
  discontinue: Boolean
  dob: String
  firstDay: String
  homePhone: String
  id: ID
  lastName: String
  learnerPermitExp: String
  learnerPermitNo: String
  notes: String
  passTest: String
  sex: String
  zip: String
}

type Appointment {
  car: String
  date: String
  id: ID
  learnerPermitNo: String
  location: String
  notes: String
  studentId: ID
  studentName: String
  studentPhone: String
  instructorName: String
}

type Mutation {
	login(password: String!, username: String!): AuthPayload!
}

type User {
  id: ID
  username: String
}

type AuthPayload {
  token: String!
  user: User!
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
