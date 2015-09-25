var
	React = require('react');

var Carousel = React.createClass({
	getInitialState: function() {
		return {
			count: 0
		};
	},
	myCustomMethod: function(e) {
		var count = this.state.count;
		count++;
		this.setState({
			count: count
		});

		e.preventDefault();
	},
	resetCounter: function() {
		this.setState({
			count: 0
		});
	},
	render: function() {
		return (
			<div className="carousel">
				<p onClick={this.myCustomMethod}>Hello World {this.state.count}</p>
				<button onClick={this.resetCounter}>Reset</button>
			</div>
		);
	}

});

module.exports = Carousel;
