var React = require('react');
var ReactDOM = require('react-dom');

var Map = React.createClass({

  componentDidMount: function() {
    // Call it the first time that the map is mounted
    this.componentDidUpdate();
  },

  componentDidUpdate: function() {

    if(this.lastLat == this.props.coords.currLat && this.lastLng == this.props.coords.currLong){

			// The map has already been initialized at this address.
			// Return from this method so that we don't reinitialize it
			// (and cause it to flicker).

			return;
		}

		this.lastLat = this.props.coords.currLat;
		this.lastLng = this.props.coords.currLong;

    var map = new GMaps({
			el: '#map',
			lat: this.props.coords.currLat,
			lng: this.props.coords.currLong
		});

    map.addMarker({
      lat: this.props.coords.currLat,
      lng: this.props.coords.currLong
    });
  },

  render: function() {
    return (
      <div className="map-holder">
        <p>Loading...</p>
        <div id="map"></div>
      </div>
    );
  }
});

module.exports = Map;
