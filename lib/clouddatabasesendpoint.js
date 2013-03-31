exports.CloudDatabasesEndpoint = function(dbsUrl, token) {
	var url = require('url');
	var rackapi = require('./api.js');

	this.token = token;
	this.dbsUrl = url.parse(dbsUrl);

	this.reqOpts = {
		port : 443,
		method : 'GET',
		hostname : this.dbsUrl.hostname,
		path : this.dbsUrl.path,
		headers : {
			'X-Auth-Token' : this.token,
			'Accept' : 'application/json'
		}
	};

	this.normalizeParams = function(params) {
		return (typeof params === "object" ? rackapi.serializeQueryString(params) : "");
	};  

	this.flavors = function(params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/flavors' + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.flavorDetails = function(flavorId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/flavors/' + flavorId + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.createInstance = function(data, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/instances' + this.normalizeParams(params);
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.instances = function(params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/instances' + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.instanceDetails = function(instanceId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/instances/' + instanceId + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.deleteInstance = function(instanceId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/instances/' + instanceId + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.enableRoot = function(instanceId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/instances/' + instanceId + '/root' + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.rootStatus = function(instanceId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/instances/' + instanceId + '/root' + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.restartInstance = function(instanceId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/instances/' + instanceId + '/action' + this.normalizeParams(params);
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, JSON.stringify({'restart':{}}), function(res) {
			callback(res);
		});
	};

	this.resizeInstance = function(instanceId, flavorId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/instances/' + instanceId + '/action' + this.normalizeParams(params);
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, JSON.stringify({'resize':{'flavorRef' : this.reqOpts.path + '/flavors/' + flavorId}}), function(res) {
			callback(res);
		});
	};

	this.resizeInstanceVolume = function(instanceId, size, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/instances/' + instanceId + '/action' + this.normalizeParams(params);
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, JSON.stringify({'resize':{'volume' : {'size':size}}}), function(res) {
			callback(res);
		});
	};

	this.createDatabase = function(instanceId, data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/instances/' + instanceId + '/databases';
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.databases = function(instanceId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/instances/' + instanceId + '/databases' + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.deleteDatabase= function(instanceId, dbName, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/instances/' + instanceId + '/databaes/' + dbName + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.createUser = function(instanceId, data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/instances/' + instanceId + '/users' + '/databases';
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.users = function(instanceId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/instances/' + instanceId + '/users' + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.changePassword = function(instanceId, data, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'PUT';
		o.path += '/instances/' + instanceId + '/users' + this.normalizeParams(params);
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};

	this.userDetails = function(instanceId, username, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/instances/' + instanceId + '/users/' + username + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.deleteUser = function(instanceId, username, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/instances/' + instanceId + '/users/' + username + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.userAccessDetails = function(instanceId, username, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/instances/' + instanceId + '/users/' + username + '/databases' + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.grantAccess = function(instanceId, username, dbs, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'PUT';
		o.path += '/instances/' + instanceId + '/users/' + username + '/databases' + this.normalizeParams(params);
		o.headers['Content-Type'] = 'application/json';

		var data = {'databases' : []};
		for (var db in dbs)
			data.databases.push({'name':dbs[db]});

		rackapi.callApi(o, JSON.stringify(data), function(res) {
			callback(res);
		});
	};

	this.revokeAccess = function(instanceId, username, dbName, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/instances/' + instanceId + '/users/' + username + '/databases/' + dbName + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

};
