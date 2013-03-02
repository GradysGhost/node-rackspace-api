`rackspace-api` is a Node.js module to help you interface the Rackspace Cloud API in your code.

## How to get it
Clone this repository:

    git clone https://github.com/GradysGhost/node-rackspace-api.git ~/node-rackspace-api

Copy the module directory to your destination project:

    cp -r ~/node-rackspace-api/rackspace-api ~/your-project/nodemodules

## How to use it
It's still in it's infancy right now, so you shouldn't use this in production. All the same, it should work with a standard `require`:

    var rackApi = require("rackspace-api");

Then get yourself an instance.

    var api = new rackApi(username, password, authType, authEndpoint);

 * `username` - Your Rackspace Cloud username
 * `password` - Depending on the `authType` value, this should either be your password or API key
 * `authType` - Either `"api"` or `"password"`; defaults to `"password"`
 * `authEndpoint` - Either `"us"` or `"uk"`; defaults to `"us"`

This will create a new Api object.

### `Api`

    api.authenticate(callback)

 * `callback` - A callback function taking two arguments:
   * `jsonContent` - The JSON response from the authentication server containing (see http://docs.rackspace.com/servers/api/v2/cs-devguide/content/auth-response-description.html)
   * `serviceObjects` - An object containing other objects, each one a code object representing a Rackspace Cloud API service endpoint, as described below

### `CloudServerOpenStackEndpoint`

This object gets created internally when calling `Api.authenticate`.

 * `listServers (callback, params)` - Gets a list of servers at this endpoint
   * `callback` - The function to call when the transaction completes. Accepts one argument, `servers`, which is a list of servers.
   * `params` - Parameters as described in http://docs.rackspace.com/servers/api/v2/cs-devguide/content/List\_Servers-d1e2078.html
 * `listImages (callback, params)` - Same as `listServers`, but with images
 * `listFlavors (callback, params)` - Same as above.
 * `flavorDetails (id, callback)` - Retrieves the details of the flavor specified by `id`. A list of flavor IDs can be retrieved with `listFlavors`.
 * `imageDetails (id, callback)` - Retrieves the details of the image specified by `id`. A list of image IDs can be retrieved with `listImages`.

There is more to come with this, but as stated above, this is still in very early development.
