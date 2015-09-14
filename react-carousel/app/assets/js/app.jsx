var
 React = require('react'),
 Carousel = require('./components/carousel.jsx'),
 data = require('../../data/carousel.js');

var App = React.createClass({
 render: function() {
	 return <Carousel data={data.items} />;
 }
});

React.render(<App />, document.getElementById('carousel-container'));
