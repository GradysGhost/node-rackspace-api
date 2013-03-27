exports.CloudFilesEndpoint = function(storageUrl, mgmtUrl, token) {
	var https = require('https');
	var url = require('url');
	var rackapi = require('../lib/api.js');

	this.token = token;
	this.storageUrl = url.parse(storageUrl);
	debugger;
	this.mgmtUrl = (mgmtUrl === null ? null : url.parse(mgmtUrl));

	this.reqOpts = {
		port : 443,
		headers : {
			"X-Auth-Token" : this.token
		}
	};

	this.accountDetails = function(callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = "HEAD";
		o.hostname = this.storageUrl.hostname;
		o.path = this.storageUrl.path;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.containers = function(params, callback) {
		// Force JSON where possible
		params = (params ? params : {format:'json'});
		if (params.format != 'xml') {
			params.format = 'json';
		}
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = rackapi.clone(this.reqOpts);
		o.method = "GET";
		o.hostname = this.storageUrl.hostname;
		o.path = this.storageUrl.path + params;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.containerDetails = function(name, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = "HEAD"; o.hostname = this.storageUrl.hostname;
		o.path = this.storageUrl.path + "/" + name;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.createContainer = function(name, params, callback) {
		params = (params ? params : {format:'json'});
		if (params.format != 'xml') {
			params.format = 'json';
		}
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = rackapi.clone(this.reqOpts);
		o.method = "PUT";
		o.hostname = this.storageUrl.hostname;
		o.path = this.storageUrl.path + "/" + name + params;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.deleteContainer = function(name, params, callback) {
		params = (params ? params : {format:'json'});
		if (params.format != 'xml') {
			params.format = 'json';
		}
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = rackapi.clone(this.reqOpts);
		o.method = "DELETE";
		o.hostname = this.storageUrl.hostname;
		o.path = this.storageUrl.path + "/" + name + params;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.setContainerMetadata = function(name, data, params, callback) {
		params = (params ? params : {format:'json'});
		if (params.format != 'xml') {
			params.format = 'json';
		}
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = rackapi.clone(this.reqOpts);
		o.method = "POST";
		o.hostname = this.storageUrl.hostname;
		o.path = this.storageUrl.path + "/" + name + params;

		for (var key in data) {
			o.headers['X-Container-Meta-' + key] = data[key];
		}

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.containerList = function(name, params, callback) {
		params = (params ? params : {format:'json'});
		if (params.format != 'xml') {
			params.format = 'json';
		}
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = rackapi.clone(this.reqOpts);
		o.method = "GET";
		o.hostname = this.storageUrl.hostname;
		o.path = this.storageUrl.path + "/" + name + params;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.get = function(container, object, params, callback) {
		params = (params ? params : {format:'json'});
		if (params.format != 'xml') {
			params.format = 'json';
		}
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = rackapi.clone(this.reqOpts);
		o.method = "GET";
		o.hostname = this.storageUrl.hostname;
		o.path = this.storageUrl.path + "/" + container + "/" + object + params;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.put = function(container, object, data, params, callback) {
		params = (params ? params : {format:'json'});
		if (params.format != 'xml') {
			params.format = 'json';
		}
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = rackapi.clone(this.reqOpts);
		o.method = "PUT";
		o.hostname = this.storageUrl.hostname;
		o.path = this.storageUrl.path + "/" + container + "/" + object + params;

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.copy = function(container, from, to, params, callback) {
		
	};

	


};
