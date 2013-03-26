exports.CloudServerOpenStackEndpoint = function(token, url) {
	var https = require('https');
	var rackapi = require('../lib/api.js');

	this.token = token;
	this.url = require('url').parse(url);

	this.reqOpts = {
		hostname: this.url.hostname,
		port: 443,
		headers: {
			"Content-Type": "application/json",
			"X-Auth-Token": this.token.id
		}
	};
	
	this.images = function(params, callback) {
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = this.reqOpts;
		o.path = this.url.path + "/images" + params;
		o.method = "GET";

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.imageDetails = function(id, callback) {
		var o = this.reqOpts;
		o.path = this.url.path + "/images/" + id;
		o.method = "GET";

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.deleteImage = function(id, callback) {
		var o = this.reqOpts;
		o.path = this.url.path + "/images/" + id;
		o.method = "DELETE";

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.flavors = function(params, callback) {
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = this.reqOpts;
		o.path = this.url.path + "/flavors" + params;
		o.method = "GET";

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.flavorDetails = function(id, callback) {
		var o = this.reqOpts;
		o.path = this.url.path + "/flavors/" + id;
		o.method = "GET";

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.servers = function(params, callback) {
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = this.reqOpts;
		o.path = this.url.path + "/servers/detail" + params;
		o.method = "GET";

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.serverDetails = function(id, callback) {
		var o = this.reqOpts;
		o.path = this.url.path + "/servers/" + id;
		o.method = "GET";

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.serverIPs = function(id, network, callback) {
		network = (typeof network === "undefined" ? "" : "/" + network);

		var o = this.reqOpts;
		o.path = this.url.path + "/servers/" + id + "/ips" + network;
		o.method = "GET";

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.createServer = function(data, callback) {
		var o = this.reqOpts;
		o.path = this.url.path + "/servers"
		o.method = "POST";

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.updateServer = function(id, params, data, callback) {
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = this.reqOpts;
		o.path = this.url.path + "/servers/" + id + params;
		o.method = "PUT";

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.deleteServer = function(id, callback) {
		var o = this.reqOpts;
		o.path = this.url.path + "/servers/" + id;
		o.method = "DELETE";

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.serverAction = function(id, data, callback) {
		var o = this.reqOpts;
		o.path = this.url.path + "/servers/" + id + "/action";
		o.method = "POST";

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.volumes = function(id, callback) {
		var o = this.reqOpts;
		o.path = this.url.path + "/servers/" + id + "/os-volume_attachments"
		o.method = "GET";

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.volumeDetails = function(id, attachmentId, callback) {
		var o = this.reqOpts;
		o.path = this.url.path + "/servers/" + id + "/os-volume_attachments/" + attachmentId;
		o.method = "GET";

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.attachVolume = function(id, params, data, callback) {
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = this.reqOpts;
		o.path = this.url.path + "/servers/" + id + "/os-volume_attachments" + params;
		o.method = "POST";

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.detachVolume = function(id, attachmentId, callback) {
		var o = this.reqOpts;
		o.path = this.url.path + "/servers/" + id + "/os-volume_attachments/" + attachmentId;
		o.method = "DELETE";

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.metadata = function(id, data, callback) {
		var o = this.reqOpts;
		o.path = this.url.path + "/servers/" + id + "/metadata";
		o.method = "GET";

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.setMetadata = function(id, data, callback) {
		var o = this.reqOpts;
		o.path = this.url.path + "/servers/" + id + "/metadata";
		o.method = "PUT";

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.updateMetadata = function(id, data, callback) {
		var o = this.reqOpts;
		o.path = this.url.path + "/servers/" + id + "/metadata";
		o.method = "POST";

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.getMetadataItem = function(id, key, callback) {
		var o = this.reqOpts;
		o.path = this.url.path + "/servers/" + id + "/metadata/" + key;
		o.method = "GET";

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.setMetadataItem = function(id, key, callback) {
		var o = this.reqOpts;
		o.path = this.url.path + "/servers/" + id + "/metadata/" + key;
		o.method = "PUT";

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.deleteMetadataItem = function(id, key, callback) {
		var o = this.reqOpts;
		o.path = this.url.path + "/servers/" + id + "/metadata/" + key;
		o.method = "DELETE";

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
}
