
var listenerStores = [];

var buildDispatcher = function(storeName, store) {

	if (!listenerStores[storeName]) {
		listenerStores[storeName] = [];
	}

	var listeners = listenerStores[storeName],
			dispatching = false;

	var dispatch = function(actionObject) {
		if( dispatching ) {
			throw new Error( 'Cannot dispatch multiple actions at once' );
		}
		if( !actionObject.action ) {
			throw new Error( 'Action undefined' );
		}

		dispatching = true;
		try{
			store.setState(store(store.getState(), actionObject));
			for( var i = 0; i < listeners.length; ++i ) {

				listeners[ i ](actionObject);
			}
		} catch(e) {
			//make sure errors don't block the dispatcher
			dispatching = false;
			throw(e);
		}

		dispatching = false;

	}

	var addListener = function( listenFunc, unsafe ) {


		if( !unsafe && frameworkGlobals.isServer ){
			return function(){return true;};
		}

		listeners.push( listenFunc );

		return function() {
			var listenIndex = listeners.indexOf( listenFunc );

			if( listenIndex > -1 ) {

				listeners.splice( listenIndex, 1 );
				return true;
			}

			return false;
		}
	}

	return {
		dispatch,
		addListener
	};

}

module.exports = buildDispatcher;
