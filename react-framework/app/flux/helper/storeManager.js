var dispatcher = require('./dispatcher.js'),
	storeBuilder = require('./storeBuilder.js'),
	constantsManager = require('./constantsManager.js');

var currentSession = 'client';

function setSessionName(sessionName) {
	currentSession = sessionName;
}


var actionLibs = {};

function bindDefaultActionFunction(actionName, actionLib, storeName) {

	actionLib[actionName] = function(actionParams){
		if(actionParams === undefined) {
			actionParams = {};
		}
		if(typeof(actionParams) !== 'object') {
			throw new Error('Default actions functions require an object with parameters')
		}
		actionParams.action = actionName;
		dispatcher(storeName, getStore(storeName)).dispatch(actionParams);
	}
}

function buildDefaultActions(storeName) {
	var storeConstants = constantsManager.getConstants(storeName),
		storeActionsLib = actionLibs[storeName] || {},
		key;

	for( key in storeConstants ){
		if(!storeActionsLib[key]) {
			bindDefaultActionFunction(key, storeActionsLib, storeName);
		}
	}
	actionLibs[storeName] = storeActionsLib;
}

function setActions(storeName, actionLib){
	var storeConstants = constantsManager.getConstants(storeName),
 		key;
	//make sure there's an action function for every declared action
	if(!actionLibs[storeName]) {
		buildDefaultActions(storeName);
	}
	for(key in storeConstants) {
		if( typeof(actionLib[key]) === 'function') {
			actionLibs[storeName][key] = actionLib[key].bind(actionLib);
		}
	}
}

function getActions(storeName) {
	return actionLibs[storeName];
}

function setStore(storeName,store,storeState){
	store.getState = function(){
		return storeBuilder.getSessionStoreState(currentSession,storeName);
	}
	store.setState = function(stateValue){
		storeBuilder.setSessionStoreState(currentSession,storeName,stateValue);
	}
	storeBuilder.setStore(storeName,store,storeState);
}
function getStore(storeName){
	return storeBuilder.getStore(storeName);
}

module.exports = {
	setStore,
	getStore:storeBuilder.getStore,
	setActions,
	getActions,
	setSessionName,
	buildDefaultActions
};
