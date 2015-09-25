var storeManager = require('../../app/flux/helper/storeManager.js');
var getStoreStates = require('./storeState').getStoreStates;

function handleFluxAction(sessionID, storeName, action, payload, redirect) {

	var actionLib, error, redirectLocation;

	if (typeof payload !== 'object') {
		return {
			error: true,
			message: 'Payload is not an object',
			payload
		};
	}

	storeManager.setSessionName(sessionID);

	actionLib = storeManager.getActions(storeName);
	error = null;
	redirectLocation = {
		url: false,
		useReferringUrl: false
	};

	if ( actionLib && action && actionLib[action] ) {

		delete payload.redirect;

		payload.action = action;
		// Fires flux action
		actionLib[action](payload);

		if ( !redirect ) {
			redirectLocation.useReferringUrl = true;
		} else if ( redirect !== 'die' ) {
			redirectLocation.url = redirect;
		}

	} else {
		error = {
			error: true,
			message: 'Action not found in Action library',
			storeName,
			action,
			payload
		};
	}

	return error || redirectLocation;
}

module.exports = {
	getStoreStates,
	handleFluxAction
};
