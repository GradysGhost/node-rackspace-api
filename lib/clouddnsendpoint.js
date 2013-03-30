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
		o.path += '/domains' + this.normalizeParams(params);

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

	this.exportDomain = function(domainId, callback) {
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
			callback(res);
		});
	};

	this.createDomain = function(data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/domains';
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.importDomain = function(data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/domains/import';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.modifyDomain = function(domainId, data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/domains';
		if (domainId != null)
			o.path += '/' + domainId;

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.removeDomain = function(domainId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/domains';
		if (domainId != null)
			o.path += '/' + domainId;
		o.path += this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.subdomains = function(domainId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/domains/' + domainId + '/subdomains' + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.records = function(domainId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/domains/' + domainId + '/records' + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.recordDetails = function(domainId, recordId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/domains/' + domainId + '/records/' + recordId + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.addRecord = function(domainId, data, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/domains/' + domainId + '/records' + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.modifyRecord = function(domainId, recordId, data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'PUT';
		o.path += '/domains/' + domainId + '/records';
		if (recordId != null)
			o.path += '/' + recordId;

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.removeRecord = function(domainId, recordId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/domains';
		if (recordId != null)
			o.path += '/' + recordId;
		o.path += this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.ptrs = function(service, params, callback) {
		var o = rackapi.clone(thi.reqOpts);
		o.path += '/rdns/' + service + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.ptrDetails = function(service, recordId, params, callback) {
		var o = rackapi.clone(thi.reqOpts);
		o.path += '/rdns/' + service + '/' + recordId + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.addPtr = function(data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/rdns';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.modifyPtr = function(data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'PUT';
		o.path += '/rdns';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.removePTR = function(service, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/rdns/' + service + this.normalizeParams(params);

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};
};
