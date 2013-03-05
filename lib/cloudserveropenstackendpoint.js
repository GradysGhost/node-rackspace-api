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

	this.servers = function(params, callback) {
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/detail" + params;

		rackapi.callApi(o, null, function(res) {
			callback(res.servers);
		});
	};

	this.images = function(params, callback) {
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = this.reqOpts;
		o.path = this.url.pathname + "/images" + params;

		rackapi.callApi(o, null, function(res) {
			callback(res.images);
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

	this.imageDetails = function(id, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/images/" + id;

		rackapi.callApi(o, null, function(res) {
			callback(res.image);
		});
	};

	this.create = function(params, data, callback) {
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers" + params;
		o.method = "POST";

		rackapi.callApi(o, data, function(res) {
			callback(res.server);
		});
	};

	this.serverDetails = function(id, callback) {
		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/" + id;

		rackapi.callApi(o, null, function(res) {
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

	this.serverIPs = function(id, network, callback) {
		network = (typeof network === "undefined" ? "" : "/" + network);

		var o = this.reqOpts;
		o.path = this.url.pathname + "/servers/" + id + "/ips" + network;

		rackapi.callApi(o, null, function(res) {
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

	this.changePassword = function(id, password, callback) {
		var data = {
			"changePassword" : {
				"adminPass" : password
			}
		};
		this.serverAction(id, data, callback);
	};

	this.reboot = function(id, hard, callback) {
		var data = {
			"reboot" : {}
		};
		if (hard) {
			data.type = "HARD";
		} else {
			data.type = "SOFT";
		}
		this.serverAction(id, data, callback);
	};

}
