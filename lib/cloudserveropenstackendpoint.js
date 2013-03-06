exports.CloudServerOpenStackEndpoint = function(token, url) {
	var https = require('https');
	var rackapi = require('../lib/api.js');

	this.token = token;
	this.url = require('url').parse(url);

	this.reqOpts = {
		hostname: this.url.hostname,
		port: 443,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			"X-Auth-Token": this.token.id
		}
	};
	
	this.images = function(params, callback) {
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = this.reqOpts;
		o.path = this.url.pathname + "/images" + params;

		rackapi.callApi(o, null, function(res) {
			callback(res.images);
		});
	};
	
	this.imageDetails = function(id, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/images/" + id;

		rackapi.callApi(o, null, function(res) {
			callback(res.image);
		});
	};

	this.deleteImage = function(id, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/images/" + id;
		o.method = "DELETE";

		rackapi.callApi(o, null, function(res) {
			callback(res.image);
		});
	};
	
	this.flavors = function(params, callback) {
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = this.reqOpts;
		o.path = this.url.pathname + "/flavors" + params;

		rackapi.callApi(o, null, function(res) {
			callback(res.flavors);
		});
	};
	
	this.flavorDetails = function(id, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/flavors/" + id;

		rackapi.callApi(o, null, function(res) {
			callback(res.flavor);
		});
	};

	this.servers = function(params, callback) {
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/detail" + params;

		rackapi.callApi(o, null, function(res) {
			callback(res.servers);
		});
	};

	this.serverDetails = function(id, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/" + id;

		rackapi.callApi(o, null, function(res) {
			callback(res.server);
		});
	};
	
	this.serverIPs = function(id, network, callback) {
		network = (typeof network === "undefined" ? "" : "/" + network);

		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/" + id + "/ips" + network;

		rackapi.callApi(o, null, function(res) {
			callback(res.addresses);
		});
	};

	this.createServer = function(params, data, callback) {
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers" + params;
		o.method = "POST";

		rackapi.callApi(o, data, function(res) {
			callback(res.server);
		});
	};

	this.updateServer = function(id, params, data, callback) {
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/" + id + params;
		o.method = "PUT";

		rackapi.callApi(o, data, function(res) {
			callback(res.server);
		});
	};

	this.deleteServer = function(id, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/" + id;
		o.method = "DELETE";

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.serverAction = function(id, data, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/" + id + "/action";
		o.method = "POST";

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.volumes = function(id, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/" + id + "/os-volume_attachments"

		rackapi.callApi(o, data, function(res) {
			callback(res.volumeAttachments);
		});
	};

	this.volumeDetails = function(id, attachmentId, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/" + id + "/os-volume_attachments/" + attachmentId;

		rackapi.callApi(o, data, function(res) {
			callback(res.volumeAttachment);
		});
	};
	
	this.attachVolume = function(id, params, data, callback) {
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/" + id + "/os-volume_attachments" + params;
		o.method = "POST";

		rackapi.callApi(o, data, function(res) {
			callback(res.volumeAttachment);
		});
	};

	this.detachVolume = function(id, attachmentId, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/" + id + "/os-volume_attachments/" + attachmentId;
		o.method = "DELETE";

		rackapi.callApi(o, data, function(res) {
			callback(res);
		};
	});

	this.metadata = function(id, data, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/" + id + "/metadata";

		rackapi.callApi(o, data, function(res) {
			callback(res.metadata);
		};
	});

	this.setMetadata = function(id, data, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/" + id + "/metadata";
		o.method = "PUT";

		rackapi.callApi(o, data, function(res) {
			callback(res.metadata);
		)};
	};

	this.updateMetadata = function(id, data, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/" + id + "/metadata";
		o.method = "POST";

		rackapi.callApi(o, data, function(res) {
			callback(res.metadata);
		});
	};

	this.getMetadataItem = function(id, key, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/" + id + "/metadata/" + key;

		rackapi.callApi(o, data, function(res) {
			callback(res.metadata);
		});
	};

	this.setMetadataItem = function(id, key, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/" + id + "/metadata/" + key;
		o.method = "PUT";

		rackapi.callApi(o, data, function(res) {
			callback(res.metadata);
		});
	};

	this.deleteMetadataItem = function(id, key, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/" + id + "/metadata/" + key;
		o.method = "DELETE";

		rackapi.callApi(o, data, function(res) {
			callback(res.metadata);
		});
	};
}
