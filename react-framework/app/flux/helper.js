
var dispatcher = require('./helper/dispatcher.js'),
	storeBuilder = require('./helper/storeBuilder.js'),
	storeManager = require('./helper/storeManager.js'),
	constantsManager = require('./helper/constantsManager.js'),
	FluxForm = require('./FluxForm.jsx');

var fluxInstances = {};

var buildActionShortcuts = function(fluxInstance,fluxActions){
	return function(actionKey) {
		return fluxActions[fluxInstance.actions[actionKey]];
	}
}
var reference = {
	fluxHelper: function(storeName){

			//Session information is managed automatically so we only need to
			//build out the flux instance once.
			if(!fluxInstances[storeName]) {
				var fluxInstance = {},
					fluxStore = storeManager.getStore(storeName),
					fluxActions = storeManager.getActions(storeName),
					fluxDispatcher = null;

				if(!fluxStore) {
					throw new Error('Store ' + storeName + ' not registered');
				} else if(!fluxActions){
					throw new Error('Actions for ' + storeName + ' not registered');
				}

				fluxDispatcher = dispatcher(storeName, fluxStore);

				fluxInstance.actions = constantsManager.getConstants(storeName);
				fluxInstance.fireAction = buildActionShortcuts(fluxInstance,fluxActions);

				fluxInstance.getState = fluxStore.getState;
				fluxInstance.dispatch = fluxDispatcher.dispatch;
				fluxInstance.addListener = fluxDispatcher.addListener;

				fluxInstances[storeName] = fluxInstance;
			}
			return fluxInstances[storeName];
	},
	registerActionConstants: function(storeName, constants) {
		constantsManager.setConstants(storeName, constants);
	},
	getActionConstants: function(storeName) {
		return constantsManager.getConstants(storeName);
	},
	registerStore: function(storeName,store,defaultState) {
		var previousStore = storeManager.getStore(storeName);

		if(previousStore && previousStore === store) {
			return;
		}
		if(previousStore) {
			throw new Error('Store with name ' + storeName + ' already registered');
		}
		storeManager.buildDefaultActions(storeName);
		storeManager.setStore(storeName,store,defaultState);
	},
	registerActions: function(storeName,actionLib) {
		storeManager.setActions(storeName,actionLib);
	}
}

var fluxHelper = function(storeName) {

	return reference.fluxHelper(storeName);
}
fluxHelper.reference = reference;

fluxHelper.registerActionConstants = function(storeName, constants) {
	reference.registerActionConstants(storeName, constants);
}

fluxHelper.getActionConstants = function(storeName) {
	return reference.getActionConstants(storeName);
}

fluxHelper.registerStore = function(storeName,store,defaultState) {
	reference.registerStore(storeName,store,defaultState);
};
fluxHelper.registerActions = function(storeName,actionLib) {
	reference.registerActions(storeName,actionLib);
};

module.exports = fluxHelper;
