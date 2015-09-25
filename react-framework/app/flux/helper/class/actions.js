'use strict';
var
	fluxHelper = require('../../helper.js'),
	actionConstants = require('../../constants/actionConstants.js');

class actionClass {
	constructor(storeName) {
		this.actions = actionConstants.getActionConstants(storeName);
		this.storeName = storeName;
		fluxHelper.registerActions(storeName, this);
	}
	getStore () {
		return fluxHelper(this.storeName);
	}
};

module.exports = actionClass;
