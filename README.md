`rackspace-api` is a Node.js module to help you interface the Rackspace Cloud API in your code.

## How to use it
It's still in it's infancy right now, so you shouldn't use this in production. All the same, it should work with a standard `require`:

    var rackApi = require("./lib/api.js")

Then get yourself an instance.

	var api = new rackApi(username, password, authType, authEndpoint, apiEndpoint, uaString);

 * _`username`_ - Your Rackspace Cloud username
 * _`password`_ - Depending on the `authType` value, this should either be your password or API key
 * _`authType`_ - Either "api" or "password"; defaults to "password"
 * _`authEndpoint`_ - Either "us" or "uk"; defaults to "us"
 * _`apiEndpoint`_ - One of "dfw", "ord", or "lon", to indicate the data center
 * _`uaString`_ - Optional, the user agent string to present to the server

This will create a new Api object, which has but one member function at the moment. That is `authenticate`;

    `api.authenticate(callback);`

 * _`callback`_ - A callback function taking two arguments:
   * _`token`_ - An authentication token
   * _`user`_ - Your user object

There is more to come with this, but as stated above, this is still in very early development.
