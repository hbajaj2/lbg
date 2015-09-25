'use strict';
var storeClass = require('../helper/class/store.js');

class tableStore extends storeClass {
	constructor(){
		super('tableStore',{
			data: [],
			dataName: 'table-dummy',
			getDataAction: 'GET_DATA',
			limit: 10,
			setLimitAction: 'SET_LIMIT',
			currentKey: 1,
			keyHistory:[],
			setCurrentKeyAction: 'SET_CURRENT_KEY'
		});
	}
	reducer(state, actionObject) {

		switch(actionObject.action){
			case this.actions.GET_DATA:
				state.dataName = actionObject.dataName;
				return state;

			case this.actions.GET_DATA_COMPLETE:
				state.data = actionObject.data;
				return state;

			case this.actions.SET_LIMIT:
				state.limit = parseInt(actionObject.limit, 10);
				return state;

			case this.actions.SET_CURRENT_KEY:
				var nextKey = parseInt(actionObject.currentKey, 10);
				if(state.currentKey !== nextKey){

					if(state.currentKey !== undefined) {
						state.keyHistory.unshift(state.currentKey);
					}
					state.currentKey = nextKey;
				}
				return state;

			default:
				return state;
		}
	}
}

module.exports = new tableStore();
