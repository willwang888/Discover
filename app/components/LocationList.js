var React = require('react');
var LocationItem = require('./LocationItem');

var LocationList = React.createClass ({

  render: function() {
    var self = this;

    var places = this.props.locations.map(function(curr){

      // Check if the current address is active or not
      var isActive = curr.address == self.props.activeAddress;

      return <LocationItem key={curr.address} address={curr.address} active = {isActive} onClick = {self.props.onClick}
              timeStamp={curr.timeStamp}/>
    });

    return (
      <div className="list-group col-xs-12 col-md-6 col-md-offset-3">
        <span className="list-group-item active">Saved Locations</span>
        {places}
      </div>
    );
  }
});

module.exports = LocationList;
