var
	$ = require('../jquery/dist/jquery'),
	React = require('react');

var CarouselSlider = React.createClass({
	getInitialState: function() {
		return {
			width: 0
		}
	},
	componentWillMount: function() {
		this.setState({
			width: $('#bullet-size').width() * this.props.pictures.length
		});
	},
	render: function() {
		var bullets = [], className;
		for(var pictureIndex in this.props.pictures) {
			className = pictureIndex == this.props['current-picture'] ? 'carousel-current-picture' : '';

			bullets.push(
				<li>
					<div value={pictureIndex} onClick={this.setCurrentPicture} className={className}></div>
				</li>
			);
		}

		return <ul className="carousel-slider" style={{width: this.state.width + 'px'}}>{bullets}</ul>;
	},
	setCurrentPicture: function(event) {
		this.props['set-picture']($(event.target).attr('value'));
	}
});

var CarouselItem = React.createClass({
	render: function() {
		var picture = this.props.pictures[this.props.picture], arrows = [];

		if(this.props.picture > 0)
			arrows.push(
				<div className="carousel-arrow left" value={-1} onClick={this.setCurrentPicture}>
					<i className="glyphicon glyphicon-chevron-left" value={-1}></i>
				</div>
			);

		if(this.props.picture < (this.props.pictures.length - 1))
			arrows.push(
				<div className="carousel-arrow right" value={1} onClick={this.setCurrentPicture}>
					<i className="glyphicon glyphicon-chevron-right" value={1}></i>
				</div>
			);

		return (
			<div className="carousel-picture-block">
				<div className="carousel-picture">
					<img src={picture.img} alt="" />
					<div className="carousel-picture-title">{picture.caption}</div>
                    {arrows}
				</div>
			</div>
		);
	},
	setCurrentPicture: function(event) {
		this.props['set-picture'](parseInt(this.props.picture) + parseInt($(event.target).attr('value')) );
	}
});

var CarouselList = React.createClass({
	getInitialState: function() {
		return {
			width: 0
		}
	},
	componentWillMount: function() {
		this.setState({
			width: $('#carousel-container').width()
		});
	},
	render: function() {
		var carouselItems = [];
		for(var pictureIndex in this.props.pictures)
			carouselItems.push(
				<div style={{float: 'left', width: this.state.width + 'px'}}>
					<CarouselItem picture={pictureIndex} pictures={this.props.pictures} set-picture={this.props['set-picture']} />
				</div>
			);

		var width = this.props.pictures.length * this.state.width;
		var classes = 'current-carousel-item' + (!this.props['scrolled'] ? ' animated' : '');
		var left = -1 * this.props['current-picture'] * this.state.width;

		return (
			<div style={{overflowX: 'hidden', width: this.state.width + 'px'}}>
				<div style={{left: left + 'px', position: 'relative', width: width + 'px'}} className={classes}>
                    {carouselItems}
					<div style={{clear: 'both'}}></div>
				</div>
			</div>
		);
	}
});

var Carousel = React.createClass({
	getInitialState: function() {
		return {
			'current-picture': 0
		};
	},
	render: function() {
		return (
			<div>
				<CarouselList current-picture={this.state['current-picture']} pictures={this.props.data}
					set-picture={this.setCurrentPicture} />
				<CarouselSlider current-picture={this.state['current-picture']} pictures={this.props.data}
					set-picture={this.setCurrentPicture} />
			</div>
		);
	},
	setCurrentPicture: function(currentPicture) {
		this.state['current-picture'] = currentPicture;
		this.setState(this.state);
	}
});

module.exports = Carousel;
