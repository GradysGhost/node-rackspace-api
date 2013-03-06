`rackspace-api` is a Node.js module to help you interface the Rackspace Cloud API in your code.

## How to get it

### With npm

    npm install rackspace-api

### With git

Clone this repository:

    git clone https://github.com/GradysGhost/node-rackspace-api.git

## How to use it

It's still in it's infancy right now, so you shouldn't use this in production. All the same, it should work with a standard `require`:

    var rackApi = require("rackspace-api");

Then get yourself an instance.

    var api = new rackApi.Api(username, password, authType, authEndpoint);

 * `username` - Your Rackspace Cloud username
 * `password` - Depending on the `authType` value, this should either be your password or API key
 * `authType` - Either `"api"` or `"password"`; defaults to `"password"`
 * `authEndpoint` - Either `"us"` or `"uk"`; defaults to `"us"`

This will create a new `Api` object.

### Api

    api.authenticate(callback)

 * `callback` - A callback function taking two arguments:
   * `jsonContent` - The JSON response from the authentication server (see http://docs.rackspace.com/servers/api/v2/cs-devguide/content/auth-response-description.html)
   * `serviceObjects` - An object containing other objects, each one a code object representing a Rackspace Cloud API service endpoint, as described below

### CloudServerOpenStackEndpoint

This object gets created internally when calling `Api.authenticate`. This documentation refers to `params` and `data` values frequently. In all cases, refer to the [Rackspace Cloud Servers API Documentation](http://docs.rackspace.com/servers/api/v2/cs-devguide/content/ch_api_operations.html). `params` always refers to options to be passed along with GET requests in the URL query string. `data` always refers to a stringified JSON object to be passed in the request body.

Furthermore, `id` variables are often called for. This documentation will list what ID each of those variables needs to be, since it varies, but in all cases, you can get the ID of that object by running the relevant list function. For example, `imageDetails` needs an image ID, which you can gather by calling the `images` function first.

#### images (params, callback)

_Gets a list of images._

callback` is a function that accepts an `images` array.

#### imageDetails (id, callback)

_Retrieves the details of the image specified by `id`._

`id` is the ID of the image.

`callback` is a function that accepts an `image` object.

#### servers (params, callback)

_Gets a list of servers at this endpoint._

`callback` is a function that accepts a `servers` array.


 * `flavors (params, callback)` - Same as above.
 * `flavorDetails (id, callback)` - Retrieves the details of the flavor specified by `id`. A list of flavor IDs can be retrieved with `listFlavors`.
 * `create (params, data, callback) - Provisions a new server. See valid parameters and data objects [here](http://docs.rackspace.com/servers/api/v2/cs-devguide/content/CreateServers.html).

There is more to come with this, but as stated above, this is still in very early development.
