exports.CloudFilesEndpoint = function(storageUrl, token) {
	var url = require('url');
	var rackapi = require('./api.js');

	this.token = token;
	this.storageUrl = url.parse(storageUrl);

	this.reqOpts = {
		port : 443,
		hostname : this.storageUrl.hostname,
		headers : {
			"X-Auth-Token" : this.token
		}
	};

	this.accountDetails = function(callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = "HEAD";
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
		o.path = this.storageUrl.path + params;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.containerDetails = function(name, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = "HEAD";
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
		o.path = this.storageUrl.path + "/" + container + "/" + object + params;

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.copy = function(from, to, params, callback) {
		params = (params ? params : {format:'json'});
		if (params.format != 'xml') {
			params.format = 'json';
		}
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = rackapi.clone(this.reqOpts);
		o.method = "PUT";
		o.path = this.storageUrl.path + "/" + to + params;
		o.headers['X-Copy-From'] = "/" + from;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.delete = function(container, object, params, callback) {
		params = (params ? params : {format:'json'});
		if (params.format != 'xml') {
			params.format = 'json';
		}
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = rackapi.clone(this.reqOpts);
		o.method = "DELETE";
		o.path = this.storageUrl.path + "/" + container + "/" + object + params;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.objectDetails = function(container, object, params, callback) {
		params = (params ? params : {format:'json'});
		if (params.format != 'xml') {
			params.format = 'json';
		}
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = rackapi.clone(this.reqOpts);
		o.method = "HEAD";
		o.path = this.storageUrl.path + "/" + container + "/" + object + params;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.setObjectMetadata = function(container, object, data, params, callback) {
		params = (params ? params : {format:'json'});
		if (params.format != 'xml') {
			params.format = 'json';
		}
		params = (typeof params === "object" ? rackapi.serializeQueryString(params) : "");

		var o = rackapi.clone(this.reqOpts);
		o.method = "POST";
		o.path = this.storageUrl.path + "/" + container + "/" + object + params;

		for (var key in data) {
			o.headers['X-Object-Meta-' + key] = data[key];
		}

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

};
