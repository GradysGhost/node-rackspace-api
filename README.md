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

The `serviceObjects` object should contain various instances of the following object types in the form of the type's name in camel case, followed by an ALL-CAPS object representing a data center. For example, to build a server in the DFW data center, you would execute something like...

    serviceObjects.cloudServerOpenStackEndpoint.DFW.createServer(data, callback);

Additionally, each of these objects' functions accepts a `callback` value. That function, in all cases except where noted otherwise, is a response object. That object will contain the following members:

 * `headers` - An object representing the HTTP response headers
 * `body` - An object containing the API response
 * `error` - Only present when an error is returned; contains that error object

### CloudServerOpenStackEndpoint

This documentation refers to `params` and `data` values frequently. In all cases, refer to the [Rackspace Cloud Servers API Documentation](http://docs.rackspace.com/servers/api/v2/cs-devguide/content/ch_api_operations.html). `params` always refers to options to be passed along with GET requests in the URL query string. `data` always refers to a stringified JSON object to be passed in the request body.

Furthermore, `id` variables are often called for. This documentation will list what ID each of those variables needs to be, since it varies, but in all cases, you can get the ID of that object by running the relevant list function. For example, `imageDetails` needs an image ID, which you can gather by calling the `images` function first.

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

### CloudFilesEndpoint

This object lets you access and manipulate Cloud Files containers and their contents. This is true of all containers, regardless of their CDN-enabledness.

In all of the following functions, the `params` variable is an object full of key/value pairs which will be translated into a query string for the ultimate API call. You can use this to filter the results of many queries, or force an XML response. If you do not force an XML response, these functions will force a JSON response so it can be objectified in the callback. Documentation on how to use this can be found [here](http://docs.rackspace.com/files/api/v1/cf-devguide/content/Storage_Account_Services-d1e977.html).

To force an XML response, set params to:

    { 'format' : 'xml' }

#### accountDetails (callback)

_Returns a list of account details_

#### containers (params, callback)

_Retrieves a list of all containers in the account_

#### containerDetails (name, callback)

_Gets a full list of details for the container called `name`_

#### createContainer (name, params, callback)

_Creates a new container called `name`_

#### deleteContainer (name, params, callback)

_If it's empty, deletes the container called `name`_

#### setContainerMetadata (name, data, params, callback)

_Sets any number of metadata keys on the container called `name`_

 * `data` is an object in the form of `{ 'key1':'value1', 'key2':'value2', ..., 'keyN':'valueN' }`

#### containerList (name, params, callback)

_Lists the contents of the container called `name`_

#### get (container, object, params, callback)

_Downloads the file called `object` in the container called `container`. Check the response headers for MIME-type info_

#### put (container, object, data, params, callback)

_Stores `data` in an object called `object` in container `container`_

#### copy (from, to, params, callback)

_Performs a server-side copy of an object and its metadata_

 * `from` and `to` are the source and destination objects, respectively, both in the form of `'container/object'`. For example, to specify the object `image.jpg` in the container `mywebsite` you'd pass `'mywebsite/image.jpg'`.

#### delete (container, object, params, callback)

_Deletes the object called `object` from the container called `container`._

#### objectDetails (container, object, params, callback)

_Retrieves the full details of the object `object` in the container `container`_

#### setObjectMetadata (container, object, data, params, callback)

_Sets any number of metadata keys on the object called `object` in the container `container`_

 * `data` is an object in the form of `{ 'key1':'value1', 'key2':'value2', ..., 'keyN':'valueN' }`

### CloudFilesCDNEndpoint

This object lets you manage the CDN-specific portions of your Cloud Files content.

In all of the following functions, the `params` variable is an object full of key/value pairs which will be translated into a query string for the ultimate API call. You can use this to filter the results of many queries, or force an XML response. If you do not force an XML response, these functions will force a JSON response so it can be objectified in the callback. Documentation on how to use this can be found [here](http://docs.rackspace.com/files/api/v1/cf-devguide/content/Storage_Account_Services-d1e977.html).

To force an XML response, set params to:

    { 'format' : 'xml' }

#### containers (params, callback)

_Lists all containers that are CDN-enabled_

#### containerDetails (container, params, callback)

_Retrieves the details of the container called `container`._

This function is redundant with `CloudFilesEndpoint.containerDetails`, and is present in its erroneousness for the sake of usability alone.

#### enable (container, params, callback)

_Enables CDN availability on the container called `container`_

#### disable (container, params, callback)

_Disabled CDN availability on `container`_

### CloudDNSEndpoint

This exposes the Cloud DNS API.

For valid options to the `params` and `data` objects in the following examples, refer to [the documentation](http://docs.rackspace.com/cdns/api/v1.0/cdns-devguide/content/API_Operations-d1e2264.html), please.

#### limits (callback)

_Retrieves limits placed on your Cloud DNS account_

#### limitTypes (callback)

_Retrieves info about different types of limits on your account_

#### getLimit (limit, callback)

_Returns the value of the limit called `limit`_

#### domains (params, callback)

_Gets a list of all of your domains_

#### domainDetails (domainId, params, callback)

_Shows details about the domain with an id (not a domain anme) of `domainId`_

#### domainChanges (domainId, params, callback)

_Lists changes made to the domain with id `domainId`_

 * It's worth looking at the documentation to learn about the `since` parameter for this. [(Reference)](http://docs.rackspace.com/cdns/api/v1.0/cdns-devguide/content/List_Domain_Changes.html)

#### exportDomain (domainId, callback)

_Begins the process of exporting a domain. This produces a Job ID, which you can use to check the status of this asynchronous request._

#### jobStatus (jobId, params, callback)

_Retrieves the status of a job. When the `param` key called `showDetails` is `'true'` and the status is `'COMPLETED'`, it returns the request response as well._

#### createDomain (data, callback)

_Creates the domain(s) specified in `data`_

#### importDomain (data, callback)

_Imports the domain from a BIND 9 file, previously exported with `exportDomain`_

#### modifyDomain (domainId, data, callback)

_Uses the object in `data` to modify a stored domain (or multiple domains)_

 * If `domainId` is `null`, the request is processed as a multi-domain edit. Otherwise, specify the Domain ID of the one you wish to modify.

#### removeDomain (domainId, params, callback)

_Removes a domain from your Cloud DNS account_

#### subdomains (domainId, params, callback)

_Lists all subdomains of the domain with ID `domainId`_

#### records (domainId, params, callback)

_Gets a list of all records in the domain specified by `domainId`_

#### recordDetails (domainId, recordId, params, callback)

_Shows the details of the record specified by `recordId`, and which belongs to the domain with ID `domainId`_

#### addRecord (domainId, data, params, callback)

_Adds a record (or some) defined in `data` to the domain with ID `domainId`_

#### modifyRecord (domainId, recordId, data, callback)

_Modifies a record with ID `recordId` in domain with ID `domainId`, as defined by `data`_

#### removeRecord (domainId, recordId, params, callback)

_Deletes the record specified_

#### ptrs (service, params, callback)

_Lists PTR records on your account_

_*In the case all five of these PTR functions, the followng two statements are true:*_

 * `service` is a service name like `'cloudServersOpenStack'`
 * `params` here needs an `'href'` key with a service URL. [See the API docs.](http://docs.rackspace.com/cdns/api/v1.0/cdns-devguide/content/ReverseDNS-123457000.html)

#### ptrDetails (service, recordId, params, callback)

_Shows the details of a PTR record_

#### addPtr (data, callback)

_Adds a PTR record as defined in `data`_

#### modifyPtr (data, callback)

_Modifies an existing PTR record in a manner described in `data`_

#### removePtr (service, params, callback)

_Deletes a PTR record from the specified `service`_

### CloudLoadBalancersEndpoint

This object works with Cloud Load Balancers, naturally.

Many of the functions in this library allow you specify more than one object at a time in the URL by passing a repeated `id` parameter. For context, see the documentation. One example of this can be found in the [Remove Metadata documentation](http://docs.rackspace.com/loadbalancers/api/v1.0/clb-devguide/content/Remove_Metadata-d1e2675.html), where you can specify multiple metadata IDs. The functions bound to API calls like this (`deleteMetadata`, in this example) are capable of handling this for you, but also for just specifying a single ID. See the documentation below to see how to work with each case of this.

In all cases, `lbId`, `nodeId`, and `metaId` are the IDs of the load balancer, node, and metadata item to affect. `data` is an object, the details of which you should verify in the [Load Balancer API Documentation](http://docs.rackspace.com/loadbalancers/api/v1.0/clb-devguide/content/Overview-d1e82.html). `params` is an object which will be converted to a query string for the request.

#### loadBalancers (callback)

_Lists all load balancers on the account_

#### loadBalancerDetails (lbId, callback)

_Gets the details of the specified load balancer._

#### createLoadBalancer (data, callback)

_Creates the load balancer defined by `data`_

#### updateLoadBalancer (lbId, data, callback)

_Updates the configuration of a load balancer_

#### deleteLoadBalancer (lbId, callback)

_Deletes the specified load balancer_

#### errorPage (lbId, callback)

_Retrieves the contents of the load balancer's error page_

#### setErrorPage (lbId, content, callback)

_Sets the contents of the load balancer's error page to `content`_

#### deleteErrorPage (lbId, callback)

_Removes the error page configuration from the load balancer_

#### stats (lbId, callback)

_Lists load balancer statistics_

#### nodes (lbId, callback)

_Lists nodes behind the load balancer_

#### nodeDetails (lbId, nodeId, callback)

_Gets a node's configuration_

#### addNode (lbId, data, callback)

_Adds a node to the load balancer, as described by `data`_

#### deleteNode (lbId, nodeId, params, callback)

_Removes a node from the load balancer configuration. Has no effect on any Cloud Servers the node may represent._

#### serviceEvents (lbId, callback)

_Retrieves a log of events that have occurred on all nodes_

#### ips (lbId, callback)

_Lists all IP addresses associated with the load balancer_

#### allowedDomains (callback)

_Lists domains allowed access to the load balancer_

#### addIp (lbId, isPublic, callback)

_Adds the IP that `data` describes to the load balancer. Note that this will always produce an IPv6 address._

 * `isPublic` - When `true`, the IP is Internet-facing. Otherwise, it's a ServiceNet IP.

#### deleteIp (lbId, ipId, params, callback)

_Deletes the specified IP address from the specified load balancer._

#### billableLoadBalancers (params, callback)

_Gets a list of load balancers in a billable state_

#### accountUsage (params, callback)

_Reports overall load balancer usage_

#### historialLoadBalancerUsage (lbId, params, callback)

_Reports usage of a load balancer over time. Use `params` to control time range._

#### currentLoadBalancerUsage (lbId, params, callback)

_Reports current usage of a load balancer_

#### accessList (lbId, callback)

_Returns the load balancer's access list_

#### addNetworkItem (lbId, data, callback)

_Adds a network item to the load balancer's access list_

#### deleteNetworkItem (lbId, netItemId, callback)

_Removes a network item defined by `netItemId` from the load balancer's access list_

#### deleteAccessList (lbId, params, callback)

_Completely deletes the full access list from the load balancer_

#### healthMonitor (lbId, callback)

_Gets the details of the load balancer's health monitor configuration_

#### updateHealthMonitor (lbId, data, callback)

_Updates the load balancer's health monitor configuration as described by `data`_

#### deleteHealthMonitor (lbId, callback)

_Clears the health monitor config from a load balancer_

#### sessionPersistence (lbId, callback)

_Retrieves the session persistence configuration for the load balancer_

#### enableSessionPersistence (lbId, callback)

_Turns on session persistence_

#### disableSessionPersistence (lbId, callback)

_Turns off session persistence_

#### connectionLogging (lbId, callback)

_Gets the connection logging status_

#### setConnectionLogging (lbId, enabled, callback)

_Enables or disables connection logging_

 * `enabled` - `true` or `false` to enable or disable connection logging

#### throttle (lbId, callback)

_Gets the throttling config_

#### updateThrottle (lbId, data, callback)

_Sets the throttling config_

#### deleteThrottle (lbId, callback)

_Removes all throttling configuration_

#### contentCaching (lbId, callback)

_Retrieves the caching config_

#### setContentCaching (lbId, enabled, callback)

_Enables or disables content caching_

 * `enabled` - `true` or `false` to enable or disable connection logging

#### protocols (callback)

_Shows protocols supported by load balancers_

#### algorithms (callback)

_Shows algorithms supported by load balancers_

#### termination (lbId, callback)

_Gets the SSL termination configuration_

#### updateTermination (lbId, data, callback)

_Sets the SSL termination config to what's described in `data`_

#### metadata (lbId, metaId, nodeId, callback)

_Retrieves metadata associated with the specified resource(s)._

This function can get metadata for a single load balancer or node, or multiple load balancers or nodes. Here's a list of things you can do and how to do it, but you should refer to the [documentation](http://docs.rackspace.com/loadbalancers/api/v1.0/clb-devguide/content/List_Metadata-d1e2218.html) to understand the hows and whys:

_Retrieve metadata for a single load balancer with ID `42`:_

    metadata('42', null, null, function(){});

_Get details for a specific load balancer metadata object:_

    metadata('41', '2', null, function(){});

_Get a list of metadata objects associated with a particular node behind a load balancer:_

    metadata('41', null, '3', function(){});

_Get details for a specific node's metadata object_

    metadata('41', '2', '3', function(){});

#### addMetadata (lbId, nodeId, data, callback)

_Adds metadata from `data` to a load balancer or a node behind one_

To add metadata to a load balancer, set `nodeId` to `null`. To add it to a node, specify both a `lbId` and `nodeId`.

#### updateMetadata (lbId, metaId, nodeId, data, callback)

_Updates the metadata on a load balancer or node_

To update a load balancer's metadata, set `nodeId` to `null`. To update a node's metadata, provide a `nodeId`. To specify which metadata object, also supply a `metaId`.

#### deleteMetadata (lbId, metaId, nodeId, params, callback)

_Deletes metadata associated with a load balancer or node_

 * To delete a single metadata object from a load balancer, provide a `metaId`, but leave `nodeId` set to `null`.
 * To delete a single object from a node, provide both a `metaId` and a `nodeId`.
 * To delete multiple metadata objects from a load balancer, set `metaId` and `nodeId` to `null`. Also stick an array called `id` in `params` like in the example below.
 * To delete multiple objects from a node, provide a `nodeId`, but a `null` `metaId`. Put an array called `id` in `params` like in the example below.

The following example shows how to delete multiple metadata objects from a load balancer at once:

    deleteMetadata('42', null, null, {'id':[metaId1, metaId2, metaIdN]}, function(){});

## Work In Progress
There is more to come with this, but as stated above, this is still in very early development.
