var React = require('react');
var ReactDOM = require('react-dom');

var Search = require('./Search');
var Map = require('./Map');
var CurrentLocation = require('./CurrentLocation');
var LocationList = require('./LocationList');

var App = React.createClass ({

	getInitialState: function() {

		// Declare array of favorites to keep track of user's favorites
		var favorites = [];
		// localStorage.favorites = JSON.stringify(favorites);
		// If user already has favorites in localStorage, initialize to those
		if(localStorage.favorites){
			favorites = JSON.parse(localStorage.favorites);
		}

		// Return states, set inital address to be LA
		return {
			currentAddress: 'Los Angeles, CA, USA',
			favorites: favorites,
			mapCoordinates: {
				currLat: 34.052235,
				currLong: -118.243683
			}
		};
	},

	// Either adds or removes address from favoites
	toggleFavorite(checkAddress) {
		var self = this;
		// If already in favorites, removeFromFavorites
		// Else, addToFavorites
		console.log("IN HERE");
		if(self.inFavorites(checkAddress)) {
			console.log("REMOVING FROM FAVORITES");
			self.removeFromFavorites(checkAddress);
		}

		else {
			console.log("ADDING TO FAVORITES");
			self.addToFavorites(checkAddress);
		}
	},

	// Adds address to favorites
	addToFavorites(addressToAdd) {

		var tempFavorites = this.state.favorites;

		// Add the new address to the favorites array
		tempFavorites.push({
			address: addressToAdd,
			timeStamp: Date.now()
		});

		// Set the state of the app
		this.setState ({
			favorites: tempFavorites
		});

		// Update localStorage
		localStorage.favorites = JSON.stringify(tempFavorites);
	},

	// Removes address from favorites
	removeFromFavorites(addressToRemove) {
		var tempFavorites = this.state.favorites;

		// Find index of address to take off
		var index = -1;
		for(var i = 0; i < tempFavorites.length; i++) {
			if(tempFavorites[i].address == addressToRemove) {
				index = i;
			}
		}

		if(index !== -1) {
			console.log("ADDRESS NOT FOUND");
			// Take it out of the array
			tempFavorites.splice(index, 1);

			// Set the state of the app
			this.setState ({
				favorites: tempFavorites
			});

			// Update localStorage
			localStorage.favorites = JSON.stringify(tempFavorites);
		}
	},

	// Check if the current address is in favorites
	inFavorites(toCheck) {

		var favorites = this.state.favorites;

		for (var i = 0; i < favorites.length; i++) {
	    if (favorites[i].address == toCheck) {
	        return true;
	    }
		}
		return false;
	},

	// Search the inputted address
	searchAddress(toSearch) {

		// Because this.setState has not been bound to the class yet
		var self = this;

		GMaps.geocode({
			address: toSearch,
			callback: function(results, status) {
				if (status == 'OK') {
					var latlng = results[0].geometry.location;

					self.setState ({
						currentAddress: results[0].formatted_address,
						mapCoordinates: {
							currLat: latlng.lat(),
							currLong: latlng.lng()
						}
					});
				}
			}
		});
	},

	render: function() {
		return (
			<div>
				<h1>Your Locations</h1>

				<Search onClick = {this.searchAddress}/>

				<Map coords={this.state.mapCoordinates}/>

				<CurrentLocation address = {this.state.currentAddress} toggleFavorite={this.toggleFavorite}
					favorite={this.inFavorites(this.state.currentAddress)}/>

				<LocationList locations={this.state.favorites} activeAddress = {this.state.currentAddress}
					onClick = {this.searchAddress}/>
			</div>
		);
	}
});

module.exports = App;
