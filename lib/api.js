global._serializeQueryString = function(values) {
	var qsArr = [];
	for (var key in values) {
		qsArr.push(key + "=" + values[key])
	}
	return "?" + qsArr.join("&");
};

exports.Api = function(username, password, authType, authEndpoint) {
	this.https = require('https');
	this.username = username;
	this.password = password;
	this.authType = (authType == "api" ? "api" : "password");
	this.authEndpoint = (authEndpoint.toLowerCase() == "uk" ? "lon.identity.api.rackspacecloud.com" : "identity.api.rackspacecloud.com");
	this.reqOpts = {
		hostname: this.authEndpoint,
		port: 443,
		path: "/v2.0/tokens",
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		}
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

			var o = this.reqOpts;
			o.headers["Content-Length"] = data.length;

			var req = this.https.request(o, function(res) {
				if (res.statusCode == 200) {
					var content = "";
					res.on("data", function(chunk) {
						content += chunk;
					});
					res.on("end", function() {
						var CSOSE = require('./cloudserveropenstackendpoint.js');
						var jsonContent = JSON.parse(content).access;
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
			});
			req.end(data);
			req.on('error', function(e) {
				console.log("[ERR] Could not complete request to authentication server. - \"" + e + "\"");
			});
		}
	}
};
