/**
 * This file does not use jQuery so it can be used in all cases.
 */
WDN.unlalert = (function() {
	var _browserCompat = function() {
		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function (searchElement) {
				"use strict";
				if (this == null) {
					throw new TypeError();
				}
				var t = Object(this);
				var len = t.length >>> 0;
				if (len === 0) {
					return -1;
				}
				var n = 0;
				if (arguments.length > 0) {
					n = Number(arguments[1]);
					if (n != n) {
						n = 0;
					} else if (n != 0 && n != Infinity && n != -Infinity) {
						n = (n > 0 || -1) * Math.floor(Math.abs(n));
					}
				}
				if (n >= len) {
					return -1;
				}
				var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
				for (; k < len; k++) {
					if (k in t && t[k] === searchElement) {
						return k;
					}
				}
				return -1;
			};
		}
	};
	var _getClosedAlerts = function() {
		var c = WDN.getCookie('unlAlertsC');
		if (c) {
			return c.split(',');
		}
		
		return [];
	};
	var _pushClosedAlert = function(id) {
		var closed = _getClosedAlerts();
		if (closed.indexOf(id) != -1) {
			return;
		}
		
		closed.push(id);
		WDN.setCookie('unlAlertsC', closed.join(','), 3600);
	};
	var _checkCookie = function(name) {
		var c = WDN.getCookie(name);
		if (c) {
			return true;
		}
		return false;
	};
	// Establishes there is an alert by setting unlAlertsA cookie, checked by WDN.unlalert._hasPreviousAlert()
	var _flagPreviousAlert = function(flag) {
		var value = 1, time = 60;
		if (flag === false) {
			value = '';
			time = -1;
		}
		WDN.setCookie('unlAlertsA', value, time);
	};
	
	var activeIds = [], calltimeout;
	
	return {
		
		data_url : document.location.protocol+'//alert.unl.edu/json/unlcap.js',
//		data_url : '//ucommabel.unl.edu/workspace/wdntemplates/scripts/public/alertSimulator.php',
		
		initialize: function() {
			WDN.log('Initializing the UNL Alert Plugin');
			_browserCompat();
			WDN.unlalert.checkIfCallNeeded();
		},
		
		checkIfCallNeeded: function() {
			if (WDN.unlalert._dataHasExpired() || WDN.unlalert._hasPreviousAlert()) {
				WDN.unlalert._callServer();
			}
		},
		
		// Data has expired if unlAlertsData cookie is non existent
		_dataHasExpired: function() {
			return !_checkCookie('unlAlertsData');
		},
		
		// Used in addition to _dataHasExpired so that if an alert is loaded
		// and the page is reloaded we check the server again right away instead of waiting
		_hasPreviousAlert: function() {
			return _checkCookie('unlAlertsA');
		},
		
		// Appends script at the data_url to the head, incoming script executes unlAlerts.server.init()
		_callServer: function() {
			WDN.log('Checking the alert server for data '+WDN.unlalert.data_url);
			var head = document.getElementsByTagName('head').item(0);
			var old  = document.getElementById('lastLoadedCmds');
			if (old) {
				head.removeChild(old);
			}
			var currdate = new Date();
			var script = document.createElement('script');
			script.src = WDN.unlalert.data_url+'?'+currdate.getTime();
			script.type = 'text/javascript';
			script.defer = true;
			script.id = 'lastLoadedCmds';
			head.appendChild(script);
		},
		
		// Called from unlAlerts.server.init()
		dataReceived: function() {
			WDN.log('UNL Alert data received');
			clearTimeout(calltimeout);
			// Set cookie to indicate time the data was aquired
			WDN.setCookie('unlAlertsData', 1, 10);
			calltimeout = setTimeout(WDN.unlalert.checkIfCallNeeded, 10000);
		},
		
		/*------ check if alert was acknowledged ------*/
		alertWasAcknowledged: function(id) {
			var closed = _getClosedAlerts();
			return closed.indexOf(id);
		},
		
		/*------ acknowledge alert, and don't show again ------*/
		_acknowledgeAlert: function(id) {
			_pushClosedAlert(id);
		},
		
		
		// Build/Activate alert message, root is unlAlerts.data.alert.info object from server
		alertUser: function(root) {
			WDN.log('Alerting the user');
			
			if (!(root instanceof Array)) {
				root = [root];
			}
			_flagPreviousAlert();
			activeIds = [];
			var $alertWrapper = document.getElementById('unlalert'), $alertContent;
			var allAck = true;
			
			for (var i = 0; i < root.length; i++) {
				if (root[i].severity !== 'Extreme') {
					continue;
				}
				
				var uniqueID = root[i].parameter.value;
				activeIds.push(uniqueID);
				
				if (!allAck || !WDN.unlalert.alertWasAcknowledged(uniqueID)) {
					allAck = false;
				}
				
				// Add a div to store the html content
				if ($alertWrapper == null) {
					$alertWrapper = document.createElement('div');
					$alertWrapper.id = 'unlalert';
					var body = document.getElementsByTagName('body').item(0);
					body.insertBefore($alertWrapper, body.childNodes[0]);
					
					$alertContent = document.createElement('div');
					$alertContent.id = 'unlalert_content';
					$alertWrapper.appendChild($alertContent);
				} else if (i === 0) {
					$alertContent = document.getElementById('unlalert_content');
					$alertContent.innerHTML = '';
				}
				
				var alertTitle = root[i].headline;
				var alertDescription = root[i].description;
				var effectiveDate = root[i].effective || '';
				if (effectiveDate.length) {
					// transform the ISO effective date into a JS date by inserting a missing colon
					effectiveDate = new Date(effectiveDate.slice(0, -2) + ":" + effectiveDate.slice(-2)).toLocaleString();
				}
				
				var alertContentHTML = '<h1>Emergency UNL Alert: ' + alertTitle + '</h1>';
				if (effectiveDate) {
					alertContentHTML += '<h4 class="effectiveDate">Issued at ' + effectiveDate + '</h4>';
				}
				alertContentHTML += '<p>'+ alertDescription +'<!-- Number '+uniqueID+' --></p>';
				$alertContent.innerHTML += alertContentHTML;
			}
			
			// Add an visibility toggle tab
			var $alertToggle = document.getElementById('unlalert_toggle');
			if ($alertToggle == null) {
				$alertToggle = document.createElement('div');
				$alertToggle.id = 'unlalert_toggle';
				$alertToggle.innerHTML = 'Toggle Alert Visibility';
				$alertWrapper.appendChild($alertToggle);
				if ($alertToggle.addEventListener) {
					$alertToggle.addEventListener('click', WDN.unlalert.toggleAlert, false);
				} else if ($alertToggle.attachEvent) {// IE8, IE7
					$alertToggle.attachEvent('onclick', WDN.unlalert.toggleAlert);
				}
			}
			
			if (allAck) {
				WDN.log('No unlalert display: all were previously acknowledged');
			} else {
				// Only trigger when $alertContent is hidden, otherwise an active, unacknowledged alert will be hidden
				if ($alertContent.style.display != 'block') {
					$alertToggle.click();
				}
			}
		},
		
		// Toggle visible alert message open/closed
		toggleAlert: function() {
			WDN.log('Toggle UNL Alert Visibility');
			var $alertContent = document.getElementById('unlalert_content'),
				$alertToggle = document.getElementById('unlalert_toggle');
			
			if ($alertContent.style.display == 'block') {
				$alertContent.style.display = 'none';
				$alertToggle.style.width = '20px';
				for (var i = 0; i < activeIds.length; i++) {
					WDN.unlalert._acknowledgeAlert(activeIds[i]);
				}
			} else {
				$alertContent.style.display = 'block';
				$alertToggle.style.width = '50px';
			}
		}, 
		
		noAlert: function() {
			_flagPreviousAlert(false);
		}
	};
})();

// Server side scripts for UNL Alert System
var unlAlerts = {
	data: {},
	server: {
		init: function() {
			WDN.unlalert.dataReceived();
			
			// There is an alert if unlAlerts.data.alert.info exists
			if (unlAlerts.data.alert && unlAlerts.data.alert.info) {
				WDN.log("Found an alert, calling WDN.unlalert.alertUser()");
				WDN.unlalert.alertUser(unlAlerts.data.alert.info);
			} else {
				WDN.unlalert.noAlert();
			}
		}
	}
};

