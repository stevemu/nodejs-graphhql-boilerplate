import { combineResolvers } from 'apollo-resolvers';

import Metro from './Metro';
import Auth from './auth';

/*
  This combines our multiple resolver definition
  objects into a single definition object
*/
const resolvers = combineResolvers([
  Metro,
  Auth
]);

export default resolvers;