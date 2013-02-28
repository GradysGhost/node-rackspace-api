var rackApi = require('../lib/api.js');
var api = new rackApi.Api("gradysghost", "T3nt@cl3s", "password", "us", "dfw");
api.authenticate(function(token, user) {
	console.log("Token ID: " + token.id);
});
