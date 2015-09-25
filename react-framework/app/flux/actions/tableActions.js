'use strict';
var
	actionsClass = require('../helper/class/actions.js'),
	dataUtil = require('../../utils/dataUtil.js');

class tableActions extends actionsClass {

	constructor() {
		super('tableStore');
	}

	GET_DATA (actionObject) {
		var data = null,
			tableStore = this.getStore(),
			tableState = tableStore.getState();

		if( !tableState.data.length || tableState.dataName !== actionObject.dataName ){

			tableStore.dispatch({
				action:this.actions.GET_DATA,
				dataName:actionObject.dataName
			});

			dataUtil.getJsonFromDataFolder( actionObject.dataName, (function(data){
				tableStore.dispatch({action:this.actions.GET_DATA_COMPLETE, data});
			}).bind(this));
		}

	}
}

module.exports = new tableActions();
