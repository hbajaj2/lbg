var requireDir = require('require-dir');

var stores = requireDir('../../app/flux/stores');

var getStoreStates = function(){

	// Stores need to be required after
	// the application has started

	var storeData = {};

	for( var storeKey in stores ) {
		storeData[storeKey] = stores[storeKey].getState();
	}
	// console.log(storeData);
	return storeData;
}

module.exports = {getStoreStates};
