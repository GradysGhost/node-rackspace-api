`rackspace-api` is a Node.js module to help you interface the Rackspace Cloud API in your code.

## Disclaimer

This is an unofficial library, created without Rackspace's official support.

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

Additionally, each `callback` value is a function that accepts a response object. That object will contain the following members:

 * `headers` - An object representing the HTTP response headers
 * `body` - An object containing the API response
 * `error` - Only present when an error is returned; contains that error object

#### images (params, callback)

_Gets a list of images._

#### imageDetails (id, callback)

_Retrieves the details of the image specified by `id`._

 * `id` is the image ID.

#### deleteImage (id, callback)

_Deletes the specified image._

 * `id` is the image ID.

#### flavors (params, callback)

_Gets a list of server flavors._

#### flavorDetails (id, callback)

_Retrieves the details of the flavor specified by `id`._

 * `id` is the flavor ID.

#### servers (params, callback)

_Gets a list of servers at this endpoint._

#### serverDetails (id, callback)

_Retrieves the details of the server specified by `id`._

 * `id` is the server ID.

#### serverIPs (id, network, callback)

_Retrieves a list of IP addresses associated with a server and network interface._

 * `id` is the server ID.
 * `network` is the network ID.

#### createServer (data, callback)

_Provisions a new OpenStack server._

#### updateServer (id, params, data, callback)

_Updates a server's properties._

 * `id` is the server ID.

#### deleteServer (id, callback)

_Deletes a server instance._

 * `id` is the server ID.

#### serverAction (id, data, callback)

_Executes an action on the specified server, such as issuing a reboot or updating the admin password._

 * `id` is the server ID.

#### volumes (id, callback)

_Gets a list of the block storage volumes attached to the specified server._

 * `id` is the server ID.

#### volumeDetails (id, attachmentID, callback)

_Retrieves the details for the specified attached volume._

 * `id` is the server ID.
 * `attachmentID` is the volume attachment ID.

#### attachVolume (id, params, data, callback)

_Attaches a block storage volume to the specified server._

 * `id` is the server ID.

#### detachVolume (id, attachmentId, callback)

_Detaches a block storage volume from the specified server._

 * `id` is the server ID.
 * `attachmentID` is the volume attachment ID.

#### metadata (id, data, callback)

_Gets a list of all metadata items for the specified server._

 * `id` is the server ID.

#### setMetadata (id, data, callback)

_Sets a metadata item on the specified server._

 * `id` is the server ID.

#### updateMetadata (id, data, callback)

_Updates a metadata item on the specified server._

 * `id` is the server ID.

#### getMetadataItem (id, key, callback)

_Retrieves a specific metadata item for the specified server._

 * `id` is the server ID.
 * `key` is the metadata key whose value should be retrieved.

#### setMetadataItem (id, key, callback)

_Sets a specific metadata item for the specified server._

 * `id` is the server ID.
 * `key` is the metadata key whose value should be set.


#### deleteMetadataItem (id, key, callback)

_Deletes a specific metadata item from the specified server._

 * `id` is the server ID.
 * `key` is the metadata key whose value should be deleted.

There is more to come with this, but as stated above, this is still in very early development.
