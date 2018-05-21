import {createResolver} from 'apollo-resolvers';
import {createError, isInstance} from 'apollo-errors';


// Mask any internal errors
const UnknownError = createError('UnknownError', {
  message: "An unknown error has occurred"
})

const AuthenticationRequiredError = createError('AuthenticationRequiredError', {
  message: 'You must be logged in to do this'
});

// const ForbiddenError = createError('ForbiddenError', {
//   message: 'You are not allowed to do this'
// });

export const baseResolver = createResolver(
  //incoming requests will pass through this resolver like a no-op
  null,

  /*
    Only mask outgoing errors that aren't already apollo-errors,
    such as ORM errors etc
  */
  (root, args, context, error) => isInstance(error) ? error : new UnknownError()
);

export const isAuthenticatedResolver = baseResolver.createResolver(
  // Extract the user from context (undefined if non-existent)
  (root, args, {user}) => {
    if (!user) throw new AuthenticationRequiredError();
  }
);
