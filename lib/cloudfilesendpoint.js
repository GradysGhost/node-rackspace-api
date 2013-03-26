exports.CloudFilesEndpoint = function(storageUrl, mgmtUrl, token) {
	var https = require('https');
	var url = require('url');
	var rackapi = require('../lib/api.js');

	this.token = token;
	this.storageUrl = url.parse(storageUrl);
	this.mgmtUrl = url.parse(mgmtUrl);

	this.reqOpts = {
		port : 443,
		headers : {
			"X-Auth-Token" : this.token
		}
	};

	this.accountDetails = function(callback) {
		var o = this.reqOpts;
		o.method = "HEAD";
		o.hostname = this.storageUrl.hostname;
		o.path = this.storageUrl.path;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.containers = function(params, callback) {
		// Force JSON where possible
		debugger;
		params = (params ? params : {format:'json'});
		if (params.format != 'xml') {
			params.format = 'json';
		}
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = this.reqOpts;
		o.method = "GET";
		o.hostname = this.storageUrl.hostname;
		o.path = this.storageUrl.path + params;

		rackapi.callApi(o, null, function(res) {
			debugger;
			callback(res);
		});
	};

	this.containerDetails = function(name, callback) {
		var o = this.reqOpts;
		o.method = "HEAD";
		o.hostname = this.storageUrl.hostname;
		o.path = this.storageUrl.path + "/" + name;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

};