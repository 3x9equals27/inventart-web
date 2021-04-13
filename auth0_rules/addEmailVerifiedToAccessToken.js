function addEmailVerifiedToAccessToken(user, context, callback) {
  // This rule adds the authenticated user's email verification status to the access token.
  var namespace = '';
  context.accessToken[namespace + 'verified'] = user.email_verified;
  return callback(null, user, context);
}