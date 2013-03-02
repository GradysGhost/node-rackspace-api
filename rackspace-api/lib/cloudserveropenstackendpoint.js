exports.CloudServerOpenStackEndpoint = function(token, url) {
	this.https = require('https');

	this.token = token;
	this.url = require('url').parse(url);

	this.reqOpts = {
		hostname: this.url.hostname,
		port: 443,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Auth-Token": token.id
		} 
	};

	this.listServers = function(callback, params) {
		params = (typeof params === "object" ? _serializeQueryString(params) : "");
		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/detail" + params;
		var content = "";

		var req = this.https.request(o, function(res) {
			var content = "";
			res.on('data', function(chunk) {
				content += chunk;
			});
			res.on('end', function() {
				if (res.statusCode == 200) {
					callback(JSON.parse(content).servers);
				} else {
					console.log("Error getting server list. Got HTTP status " + res.statusCode);
				}
			});
		});
		req.end();
		req.on('error', function(e) {
			console.log("Error getting server list: " + e);
		});
	};

	this.listImages = function(callback, params) {
		params = (typeof params === "object" ? _serializeQueryString(params) : "");
		var o = this.reqOpts;
		o.path = this.url.pathname + "/images" + params;
		var content = "";

		var req = this.https.request(o, function(res) {
			res.on('data', function(chunk) {
				content += chunk;
			});
			res.on('end', function() {
				if (res.statusCode == 200) {
					callback(JSON.parse(content).images);
				} else {
					console.log("Error getting image list. Got HTTP status " + res.statusCode);
				}
			});
		});
		req.end();
		req.on('error', function(e) {
			console.log("Error getting image list: " + e);
		});
	};

	this.listFlavors = function(callback, params) {
		params = (typeof params === "object" ? _serializeQueryString(params) : "");
		var o = this.reqOpts;
		o.path = this.url.pathname + "/flavors" + params;
		var content = "";
		
		var req = this.https.request(o, function(res) {
			res.on('data', function(chunk) {
				content += chunk;
			});  
			res.on('end', function() {
				if (res.statusCode == 200) {
					callback(JSON.parse(content).flavors);
				} else {
					console.log("Error getting flavor list. Got HTTP status " + res.statusCode);
				}
			});
		});
		req.end();
		req.on('error', function(e) {
			console.log("Error getting flavor list: " + e); 
		});
	};

	this.flavorDetails = function(id, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/flavors/" + id;
		var content = "";

		var req = this.https.request(o, function(res) {
			res.on('data', function(chunk) {
				content += chunk;
			});
			res.on('end', function() {
				if (res.statusCode == 200) {
					callback(JSON.parse(content).flavor);
				} else {
					console.log("Error getting flavor details. Got HTTP status " + res.statusCode);
				}
			});
		});
		req.end();
		req.on('error', function(e) {
			console.log("Error getting flavor details: " + e);
		});
	};

	this.imageDetails = function(id, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/images/" + id;
		var content = "";

		var req = this.https.request(o, function(res) {
			var content = "";
			res.on('data', function(chunk) {
				content += chunk;
			});
			res.on('end', function() {
				if (res.statusCode == 200) {
					callback(JSON.parse(content).image);
				} else {
					console.log("Error getting image details. Got HTTP status " + res.statusCode);
				}
			});
		});
		req.end();
		req.on('error', function(e) {
			console.log("Error getting image details: " + e);
		});
	}
}
