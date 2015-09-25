var fluxHelper = require('../../helper.js');

var actionConstants = null;

class constantsClass {
	constructor(constants) {
		actionConstants = constants;
		fluxHelper.registerActionConstants(this.getActionConstants());
	}
	getActionConstants(storeName) {
		if(storeName){
			if(!actionConstants[storeName]) {
				throw 'Action Constants for ' + storeName + ' undefined';
			}
			return JSON.parse(JSON.stringify(actionConstants[storeName]));
		}
		return JSON.parse(JSON.stringify(actionConstants));
	}

}

module.exports = constantsClass;
