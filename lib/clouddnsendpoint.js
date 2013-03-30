exports.CloudDNSEndpoint = function(dnsUrl, token) {
	var url = require('url');
	var rackapi = require('./api.js');

	this.token = token;
	this.dnsUrl = url.parse(dnsUrl);

	this.reqOpts = {
		method : 'GET',
		hostname : this.dnsUrl.hostname,
		port : 443,
		path : this.dnsUrl.path,
		headers : {
			'X-Auth-Token' : this.token
		}
	};

	this.normalizeParams = function(params) {
		return (typeof params === "object" ? rackapi.serializeQueryString(params) : "");
	}; 

	this.limits = function(callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/limits';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.limitTypes = function(callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/limits/types';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.getLimit = function(limitType, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/limits/' + limitType;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.domains = function(params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/domains/' + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.domainDetails = function(domainId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/domains/' + domainId + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.domainChanges = function(domainId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/domains/' + domainId + '/changes' + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.beginExportDomain = function(domainId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/domains/' + domainId + '/export';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.jobStatus = function(jobId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/status/' + jobId + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			return(res);
		});
	};
};
