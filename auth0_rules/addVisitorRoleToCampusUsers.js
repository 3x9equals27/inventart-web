function addPermissionToEmailsEndingWith(user, context, callback) {
	var atSomething = '';
	var permission = '';
	var apiIdentifier = '';

	if(user.email_verified && user.email.endsWith(atSomething)){
	  var ManagementClient = require('auth0@2.34.1').ManagementClient;
	  var management = new ManagementClient({
		token: auth0.accessToken,
		domain: auth0.domain
	  });
	  var params =  { id : user.user_id};
	  var data = {
		"permissions" : [
		  {
			"permission_name" : permission,
			"resource_server_identifier" : apiIdentifier
		  }
		]
	  };

	  management.assignPermissionsToUser(params, data, function (err) {
		if (err) {
		  // Handle error.
		}
		// User assigned permissions.
	  });
	}
  return callback(null, user, context);
}
