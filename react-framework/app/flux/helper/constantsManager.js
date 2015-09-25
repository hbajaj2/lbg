var constants = {};

function setConstants( initialConstants ){
	constants = initialConstants;
}
function getConstantsByStoreName( storeName ) {

	if(!constants[storeName]) {
		throw 'Constants missing for ' + storeName;
	}
	return JSON.parse(JSON.stringify(constants[storeName] || {}));
}

module.exports = {
	setConstants,
	getConstants:getConstantsByStoreName
}
