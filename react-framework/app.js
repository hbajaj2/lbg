global.frameworkGlobals = {
	isServer:true,
	isClient:false,
	isDev:false,
	basePath:''
};

require('babel/register')({
	ignore: ['**/jquery.custom*','node_modules']
});
// require('node-jsx').install({harmony: true});
require('./hapi-server/server.js');
