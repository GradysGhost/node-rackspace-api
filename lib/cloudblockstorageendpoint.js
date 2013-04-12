exports.CloudBlockStorageEndpoint = function(cbsUrl, token) {
	var url = require('url');
	var rackapi = require('./api.js');
	
	this.token = token;
	this.cbsUrl = url.parse(cbsUrl);
	
	this.reqOpts = {
		port : 443,
		method : 'GET',
		hostname : this.cbsUrl.hostname,
		path : this.cbsUrl.path,
		headers : {
			'X-Auth-Token' : this.token,
			'Accept' : 'application/json'
		}
	};
	
	this.normalizeParams = function(params) {
		return (typeof params === "object" ? rackapi.serializeQueryString(params) : "");
	};
	
	this.createVolume = function(data, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/volumes' + this.normalizeParams(params);
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};
	
	this.volumes = function(callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/volumes';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.volumeDetails = function(volumeId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/volumes/' + volumeId;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.deleteVolume = function(volumeId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/volume/' + volumeId;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.volumeTypes = function(callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/types';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.volumeTypeDetails = function(volumeTypeId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/types/' + volumeTypeId;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.createSnapshot = function(data, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/snapshots' + this.normalizeParams(params);
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};
	
	this.snapshots = function(callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/snapshots';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.snapshotDetails = function(snapshotId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/snapshots/' + snapshotId;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.deleteSnapshot = function(snapshotId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/snapshots/' + snapshotId;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
}