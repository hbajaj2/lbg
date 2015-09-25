var
	React = require('react'),
	routeHistory = require('../utils/routeHistory.jsx'),
	fluxHelper;


var FluxForm = React.createClass({
	componentWillMount: function(){
		fluxHelper = require('./helper.js');
	},
	getDefaultProps: function(){
		return {
			redirect:false,
			redirectQuery:false
		};
	},
	getInitialState: function(){

		var nojsAction = '/action/' + this.props.storeName + '/' + this.props.action + '/',
			renderHistory = routeHistory.createHistory();

		return {
			nojsAction,
			renderHistory,
			redirectRef: this.props.redirect ? renderHistory.createHref(this.props.redirect, this.props.redirectQuery) : null
		}
	},
	handleSubmit: function(e){
		e.preventDefault();

		var formElement = React.findDOMNode(this.refs.fluxForm),
			keys = Object.keys(formElement.elements),
			params = {},
			renderHistory;

		for( var i = 0; i < keys.length; ++i ) {

			if( isNaN(keys[i]*1) && keys[i] !== 'redirect' ){
				params[keys[i]] = formElement.elements[keys[i]].value;
			}
		}

		fluxHelper(this.props.storeName).fireAction(this.props.action)(params);

		if(this.props.redirect) {
			this.state.renderHistory.pushState(null, this.props.redirect, this.props.query);
		}
	},
	render: function(){

		return (
			<form action={this.state.nojsAction} onSubmit={this.handleSubmit} ref="fluxForm">
				<input type="hidden" name="redirect" value={this.state.redirectRef}/>
				{this.props.children}
			</form>
		);
	}
});

var FluxFormProperty = React.createClass({
	render: function(){
		return (
			<input type="hidden" name={this.props.propertyName} value={this.props.propertyValue}/>
		);
	}
});
var FluxNoJs = React.createClass({
	render: function(){
		//The dangerouslySetInnerHTML is required for the proper rendering of noscript child components
		//https://github.com/facebook/react/issues/1252
		return (
				<noscript dangerouslySetInnerHTML={{__html:React.renderToStaticMarkup(this.props.children)}}></noscript>
		);
	}
});

var FluxSubmit = React.createClass({
	render: function(){
		return (
				<button type="submit" className={this.props.className}>
					{this.props.children}
				</button>
		);
	}
});

FluxForm.FluxSubmit = FluxSubmit;
FluxForm.FluxFormProperty = FluxFormProperty;
FluxForm.FluxNoJs = FluxNoJs;

module.exports = FluxForm;
