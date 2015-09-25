var React = require('react');

var CarouselItem = React.createClass({
	render: function() {

		if (!this.props.caption && !this.props.img) {
			return ( <div className="error">No data loaded</div>);
		}

		return (
			<div>
				<img/>
				<p>Caption</p>
			</div>
		);
	}
});

module.exports = CarouselItem;
