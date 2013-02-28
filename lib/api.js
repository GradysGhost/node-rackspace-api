function _inArray(needle, haystack) {
	for (var i = 0; i < haystack.length; ++i)
		if (haystack[i] == needle)
			return true;
	return false;
}

exports.integer = 42;

exports.Api = function(username, password, authType, authEndpoint, apiEndpoint, uaString) {
	this.https = require('https');
	this.username = username;
	this.password = password;
	this.authType = (authType == "api" ? "api" : "password");
	this.authEndpoint = (authEndpoint.toLowerCase() == "uk" ? "lon.identity.api.rackspacecloud.com" : "identity.api.rackspacecloud.com");
	this.apiEndpoint = (_inArray(apiEndpoint.toLowerCase(), ["dfw", "ord", "lon"]) ? apiEndpoint.toLowerCase() : "dfw");
	this.uaString = (typeof uaString === "string" ? uaString : "Rackspace Cloud API Node.js Library");

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
			// Form API/HTTP request
			var data = '{"auth":{"';
			switch (this.authType) {
				case "password":
					data += 'passwordCredentials":{"username":"' + this.username + '", "password":"' + this.password + '"}}}';
					break;
				case "api":
					data += 'RAX-KSKEY:apiKeyCredentials":{"username":"' + this.username + '", "apiKey":"' + this.password + '"}}}';
					break;
			}
			var reqOpts = {
				hostname : this.authEndpoint,
				port : 443,
				path : "/v2.0/tokens",
				method : "POST",
				headers : {
					"User-Agent" : this.uaString,
					"Content-Type" : "application/json",
					"Content-Length" : data.length
				}
			};
			var req = this.https.request(reqOpts, function(res) {
				if (res.statusCode == 200) {
					var content = "";
					res.on("data", function(chunk) {
						content += chunk;
					});
					res.on("end", function() {
						var jsonContent = JSON.parse(content).access;
						callback(jsonContent.token, jsonContent.user);
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
