/* * * * *
 * Rackspace Node.js API Library
 *   api.js
 *
 *   This object (Api) represents an entry point to the Rackspace Cloud API via
 *   the authentication gate and service catalog.
 * * */

exports.serializeQueryString = function(values) {
	var qsArr = [];
	for (var key in values) {
		qsArr.push(key + "=" + values[key])
	}
	return "?" + qsArr.join("&");
};

exports.callApi = function(opts, data, callback) {
	data = (typeof data === "undefined" ? "" : data);

	var o = {
		port: 443,
		headers: {
			"Content-Type": "application/json"
		}
	};

	for (var opt in opts) {
		o[opt] = opts[opt];
	}

	if (data) {
		o.headers['Content-Length'] = data.length;
	} else {
		delete o.headers['Content-Length'];
	}

	var content = "";

	var req = require('https').request(o, function(res) {
		var content = "";
		res.on('data', function(chunk) {
			content += chunk;
		});
		res.on('end', function() {
			if (res.statusCode >= 200 && res.statusCode < 300) {
				try {
					var obj = {
						"headers" : res.headers,
						"body" : JSON.parse(content)
					};
					callback(obj);
				} catch (e) {
					var obj = {
						"headers" : res.headers,
						"body" : content,
						"error" : e
					};
					callback(obj);
				}
			} else {
				console.log("Error calling the API. Got HTTP status " + res.statusCode);
				console.log("Data: " + content);
			}
		});
	});
	if (data) {
		req.end(data);
	} else {
		req.end();
	}
	req.on('error', function(e) {
		console.log("Error calling the API: " + e);
	});
};

exports.Api = function(username, password, authType, authEndpoint) {
	this.username = username;
	this.password = password;
	this.authType = (authType == "api" ? "api" : "password");
	this.authEndpoint = (authEndpoint.toLowerCase() == "uk" ? "lon.identity.api.rackspacecloud.com" : "identity.api.rackspacecloud.com");
	this.access = {};

	this.serializeQueryString = function(values) {
		var qsArr = [];
		for (var key in values) {
			qsArr.push(key + "=" + values[key])
		}
		return "?" + qsArr.join("&");
	};

	this.authenticate = function(callback) {
		if (!this.username) {
			return {"success":false, "message":"No username was supplied"};
		} else if (!this.password) {
			var ret = {"success":false};
			if (this.authType == "api") {
				ret.message = "Authentication type is \"api\", but no API key supplied.";
			} else {
				ret.message = "Authentication type is \"password\", but no password was supplied.";
			}
			return ret;
		} else {
			var data = '{"auth":{"';
			switch (this.authType) {
				case "password":
					data += 'passwordCredentials":{"username":"' + this.username + '", "password":"' + this.password + '"}}}';
					break;
				case "api":
					data += 'RAX-KSKEY:apiKeyCredentials":{"username":"' + this.username + '", "apiKey":"' + this.password + '"}}}';
					break;
			}

			var o = {
				path : "/v2.0/tokens",
				method : "POST",
				hostname: this.authEndpoint
			};

			exports.callApi(o, data, function(res) {
				var CSOSE = require('./cloudserveropenstackendpoint.js');
				var jsonContent = res.body.access;
				this.access = jsonContent;
				var apiObjects = {
					"cloudServersOpenStack": {}
				};
				var serviceObjects = {};

				for (var i in jsonContent.serviceCatalog) {
					switch (jsonContent.serviceCatalog[i].name) {
						case "cloudServersOpenStack":
							if (!serviceObjects.cloudServersOpenStack)
								serviceObjects.cloudServersOpenStack = {};
							for (var j in jsonContent.serviceCatalog[i].endpoints) {
								serviceObjects.cloudServersOpenStack[jsonContent.serviceCatalog[i].endpoints[j].region] =
									new CSOSE.CloudServerOpenStackEndpoint(
										jsonContent.token,
										jsonContent.serviceCatalog[i].endpoints[j].publicURL
									);
							}
							break;
					}
				}
				callback(jsonContent, serviceObjects);
			});
		}
	};
}
