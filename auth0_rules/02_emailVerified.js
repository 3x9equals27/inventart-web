function emailVerified(user, context, callback) {
  if (!user.email_verified) {
    return callback(
      new UnauthorizedError('email_not_verified')
    );
  } else {
    return callback(null, user, context);
  }
}