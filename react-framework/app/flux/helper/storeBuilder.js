var sessions = {
		client:{}
	},
	defaultStoreStates = {},
	stores = {};

function buildStore(sessionName,storeName,storeValue){
	if(!sessions[sessionName]) {
		sessions[sessionName] = {};
	}
	if(!sessions[sessionName][storeName]){
		sessions[sessionName][storeName] = JSON.parse(JSON.stringify(storeValue));
	}
}

function getSessionStoreState(sessionName,storeName) {
	buildStore(sessionName,storeName,defaultStoreStates[storeName]);
	return sessions[sessionName][storeName];
}
function setSessionStoreState(sessionName,storeName,storeValue) {
	buildStore(sessionName,storeName,{});
	sessions[sessionName][storeName] = storeValue;
}

function getStore(storeName){
	return stores[storeName];
}

function setStore(storeName, store, storeState){

	defaultStoreStates[storeName] = JSON.parse(JSON.stringify(storeState));
	stores[storeName] = store;

	if( frameworkGlobals.isClient &&
			window.globalStores !== undefined &&
			window.globalStores[storeName] !== undefined){

		setSessionStoreState('client',storeName,window.globalStores[storeName]);
	}
};

module.exports = {
	setStore,
	getStore,
	setSessionStoreState,
	getSessionStoreState
}
