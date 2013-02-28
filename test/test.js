var username = "";  // Your Rackspace Cloud username
var password = "";  // Either your password or your API key
var authType = "api";  // Either "api" or "password", defaults to "password"
var authEndpoint = "us";  // Either "us" or "uk", defaults to "us"
var apiEndpoint = "dfw";  // Lowercased endpoint name, like "dfw" or "ord"

var rackApi = require('../rackspace-api/lib/api.js');
var api = new rackApi.Api(username, password, authType, authEndpoint, apiEndpoint);
api.authenticate(function(token, user) {
	console.log("Token ID: " + token.id);
});
