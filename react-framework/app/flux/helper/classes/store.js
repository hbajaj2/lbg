'use strict';
var
	fluxHelper = require('../helper.js'),
	actionConstants = require('../constants/actionConstants.js');

class storeClass {
	constructor(storeName, defaultState) {
		this.defaultState = defaultState;
		this.defaultState.storeName = storeName;
		this.storeName = storeName;
		this.actions = actionConstants.getActionConstants(storeName);
		fluxHelper.registerStore(storeName, this.reducer.bind(this), this.defaultState)
	}
	reducer(state, actionObject) {

		switch(actionObject.action) {
			default:
				return state;
		}

	}
};

module.exports = storeClass;
