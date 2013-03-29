exports.CloudFilesCDNEndpoint = function(mgmtUrl, token) {
	var url = require('url');
	var rackapi = require('./api.js');

	this.mgmtUrl = (mgmtUrl === null ? null : url.parse(mgmtUrl));
	this.token = token;

	this.normalizeParams = function(params) {
		// Force JSON where possible, but allow it to be overridden
		params = (params ? params : {format:'json'});
		if (params.format != 'xml') {		  
			params.format = 'json';			
		}									  
		return (typeof params === "object" ? rackapi.serializeQueryString(params) : "");
	};

	this.reqOpts = {
		port : 443,
		hostname : this.mgmtUrl.hostname,
		path : '/',
		headers : {
			'X-Auth-Token' : this.token
		}
	};

	this.containers = function(params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'GET';
		o.path = this.mgmtUrl.path + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.containerDetails = function(container, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'HEAD';
		o.path = this.mgmtUrl.path + '/' + container + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.enable = function(container, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'PUT';
		o.path = this.mgmtUrl.path + '/' + container + this.normalizeParams(params);
		o.headers['X-CDN-Enabled'] = 'True';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.disable = function(container, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'PUT';
		o.path = this.mgmtUrl.path + '/' + container + this.normalizeParams(params);
		o.headers['X-CDN-Enabled'] = 'False';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
};
