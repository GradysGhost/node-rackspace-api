exports.CloudLoadBalancersEndpoint = function(lbUrl, token) {
	var rackapi = require('./api.js');
	var url = require('url');

	this.lbUrl = url.parse(lbUrl);
	this.token = token;
	
	this.normalizeParams = function(params) {
		return (typeof params === "object" ? rackapi.serializeQueryString(params) : "");
	};

	this.reqOpts = {
		port : 443,
		hostname : this.lbUrl.hostname,
		path : this.lbUrl.path,
		method : 'GET',
		headers : {
			'X-Auth-Token' : this.token
		}
	};

	this.loadBalancers = function(callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};

	this.loadBalancerDetails = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/' + lbId;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.createLoadBalancer = function(data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/loadbalancers';
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};
	
	this.updateLoadBalancer = function(lbId, data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'PUT';
		o.path += '/loadbalancers/' + lbId;
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};
	
	this.deleteLoadBalancer = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/loadbalancers/' + lbId;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.errorPage = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/' + lbId + '/errorpage';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.setErrorPage = function(lbId, content, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'PUT';
		o.path += '/loadbalancers/' + lbId + '/errorpage';
		o.headers['Content-Type'] = 'application/json';
		
		var data = {'errorpage' : {'content' : content} };

		rackapi.callApi(o, JSON.stringify(data), function(res) {
			callback(res);
		});
	};
	
	this.deleteErrorPage = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/loadbalancers/' + lbId + '/errorpage';
		
		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.stats = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/' + lbId + '/stats';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.nodes = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/' + lbId + '/nodes';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.nodeDetails = function(lbId, nodeId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/' + lbId + '/nodes/' + nodeId;

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.addNode = function(lbId, data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/loadbalancers/' + lbId + '/nodes';
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};
	
	this.updateNode = function(lbId, nodeId, data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'PUT';
		o.path += '/loadbalancers/' + lbId + '/nodes/' + nodeId;
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};
	
	this.deleteNode = function(lbId, nodeId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/loadbalancers/' + lbId + '/nodes' + this.normalizeParams(params);
		
		if (nodeId != null)
			o.path += '/' + nodeId;
		
		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.serviceEvents = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/' + lbId + '/nodes/events';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.ips = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/' + lbId + '/virtualips';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.allowedDomains = function(callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/alloweddomains';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.addIp = function(lbId, isPublic, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/loadbalancers/' + lbId + '/virtualips';
		
		var data = {
			'type' : (isPublic ? 'PUBLIC' : 'PRIVATE'),
			'ipVersion' : 'IPV6'
		};

		rackapi.callApi(o, JSON.stringify(data), function(res) {
			callback(res);
		});
	};
	
	this.deleteIp = function(lbId, ipId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/loadbalancers/' + lbId + '/virtualips'
		
		if (ipId != null)
			o.path += '/' + ipId;
		
		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.billableLoadBalancers = function(params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/billable' + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.accountUsage = function(params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/usage' + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.historicalLoadBalancerUsage = function(lbId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/' + lbId + '/usage' + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.currentLoadBalancerUsage = function(lbId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/' + lbId + '/usage/current' + this.normalizeParams(params);

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.accessList = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/' + lbId + '/accesslist';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.addNetworkItem = function(lbId, data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'POST';
		o.path += '/loadbalancers/' + lbId + '/accesslist';
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};
	
	this.deleteNetworkItem = function(lbId, netItemId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/loadbalancers/' + lbId + '/accesslist' + netItemId;
		
		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.deleteAccessList = function(lbId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/loadbalancers/' + lbId + '/accesslist' + this.normalizeParams(params);
		
		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.healthMonitor = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/' + lbId + '/healthmonitor';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.updateHealthMonitor = function(lbId, data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'PUT';
		o.path += '/loadbalancers/' + lbId + '/healthmonitor';
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};
	
	this.deleteHealthMonitor = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/loadbalancers/' + lbId + '/healthmonitor';
		
		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.sessionPersistence = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/' + lbId + '/sessionpersistence';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.enableSessionPersistence = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'PUT';
		o.path += '/loadbalancers/' + lbId + '/sessionpersistence';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.disableSessionPersistence = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/loadbalancers/' + lbId + '/sessionpersistence';
		
		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.connectionLogging = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/' + lbId + '/connectionlogging';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.setConnectionLogging = function(lbId, enabled, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'PUT';
		o.path += '/loadbalancers/' + lbId + '/sessionpersistence';
		
		var data = {'connectionLogging' : {'enabled' : enabled} };

		rackapi.callApi(o, JSON.stringify(data), function(res) {
			callback(res);
		});
	};
	
	this.throttle = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/' + lbId + '/connectionthrottle';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.updateThrottle = function(lbId, data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'PUT';
		o.path += '/loadbalancers/' + lbId + '/connectionthrottle';
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};
	
	this.deleteThrottle = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/loadbalancers/' + lbId + '/connectionthrottle';
		
		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.contentCaching = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/' + lbId + '/contentcaching';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.setContentCaching = function(lbId, enabled, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'PUT';
		o.path += '/loadbalancers/' + lbId + '/contentcaching';
		
		var data = {'contentCaching' : {'enabled' : enabled} };

		rackapi.callApi(o, JSON.stringify(data), function(res) {
			callback(res);
		});
	};
	
	this.protocols = function(callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/protocols';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.algorithms = function(callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/algorithms';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.termination = function(lbId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/' + lbId + '/ssltermination';

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.updateTermination = function(lbId, data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'PUT';
		o.path += '/loadbalancers/' + lbId + '/connectionthrottle';
		o.headers['Content-Type'] = 'application/json';

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};
	
	this.metadata = function(lbId, metaId, nodeId, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.path += '/loadbalancers/' + lbId;
		
		if (metaId != null) {
			if (nodeId != null) {
				// Both
				o.path += '/nodes/' + nodeId + '/metadata/' + metaId;
			} else {
				// Only metaId
				o.path += '/metadata/' + metaId;
			}
		} else {
			if (nodeId != null) {
				// Only nodeId
				o.path += '/nodes/' + nodeId + '/metadata';
			} else {
				// Neither
				o.path += '/metadata';
			}
		}

		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
	
	this.addMetadata = function(lbId, nodeId, data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'PUT';
		o.path += '/loadbalancers/' + lbId;
		o.headers['Content-Type'] = 'application/json';
		
		if (nodeId != null) {
			o.path += '/nodes/' + nodeId + '/metadata';
		} else {
			o.path += '/metadata';
		}

		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};
	
	this.updateMetadata = function(lbId, metaId, nodeId, data, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'PUT';
		o.path += '/loadbalancers/' + lbId;
		o.headers['Content-Type'] = 'application/json';
		
		if (nodeId != null) {
			o.path += '/nodes/' + nodeId + '/metadata/' + metaId;
		} else {
			o.path += '/metadata/' + metaId;
		}
		
		rackapi.callApi(o, data, function(res) {
			callback(res);
		});
	};
	
	this.deleteMetadata = function(lbId, metaId, nodeId, params, callback) {
		var o = rackapi.clone(this.reqOpts);
		o.method = 'DELETE';
		o.path += '/loadbalancers/' + lbId;
		
		if (metaId != null) {
			if (nodeId != null) {
				// Both
				o.path += '/nodes/' + nodeId + '/metadata/' + metaId;
			} else {
				// Only metaId
				o.path += '/metadata/' + metaId;
			}
		} else {
			if (nodeId != null) {
				// Only nodeId
				o.path += '/nodes/' + nodeId + '/metadata';
			} else {
				// Neither
				o.path += '/metadata';
			}
		}
		o.path += this.normalizeParams(params);
		
		rackapi.callApi(o, null, function(res) {
			callback(res);
		});
	};
};
