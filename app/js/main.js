var burgerPlaces = [
	{
		name: 'Burgermeister',
		lat: 52.501083, 
		lng: 13.442323,
		bestBurger: 'hausmeister',
		foursquare_id: '4ade123bf964a520d87221e3'
	},
	{
		name: 'Shiso Burger',
		lat: 52.527285,
		lng: 13.398726,
		bestBurger: 'Chili-Lemon Burger',
		foursquare_id: '51a9da4f498ec8aca72360f1'
	},
	{
		name: 'Berlin Burger International',
		lat: 52.486476,
		lng: 13.430842,
		bestBurger: 'Chili Burger',
		foursquare_id: '4c3df96cb8b4be9a3f7ccbef'
	},
	{
		name: 'Tommis Burger Joint',
		lat: 52.532366,
		lng: 13.397603,
		bestBurger: 'Cheese Burger',
		foursquare_id: '528a4e3411d24e4d2d087a64'
	},
	{
		name: 'Lily Burger',
		lat: 52.528345,
		lng: 13.425017,
		bestBurger: 'Cheese Burger',
		foursquare_id: '57812384498e776fb02fd609'
	},
	{
		name: 'The Bird',
		lat: 52.546607,
		lng: 13.405813,
		bestBurger: 'Cheese Burger',
		foursquare_id: '57812384498e776fb02fd609'
	}
];

var Place = function(data) {
	this.name = ko.observable(data.name);
	this.bestBurger = ko.observable(data.bestBurger);
	this.fsq = ko.observable(data.foursquare_id);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);
	this.markers = ko.observableArray([]);
	this.address = ko.observable('');
	this.url = ko.observable('');
	this.checkinsCount = ko.observable('');

// creates lat-long variable for google maps markers
	this.latLng = ko.computed(function(){
		return "{lat: " + this.lat() + ", lng: " + this.lng() + "}";
	},this);

};

var ViewModel = function() {
	var self = this;

	
// initiates google map

	self.map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 52.5200, lng: 13.4050},
		zoom: 12
	});



// loops through the all places on the list
	self.placeList = [];
	burgerPlaces.forEach(function(place) {
		self.placeList.push(new Place(place));
	});


// loops through all places, defines the marker position based on the lat-long coordinates
// and populates the info window for each marker
	
	self.placeList.forEach(function(place) {
		var markerOptions = {
			map: self.map,
			position: new google.maps.LatLng(place.lat(), place.lng()),
			animation: google.maps.Animation.DROP,
			title: place.name()
		};

		place.marker = new google.maps.Marker(markerOptions);

		var infoWindow = new google.maps.InfoWindow({
			maxWidth: 350
		});

		function callFsq() {
			var client_secret = 'NRQQY34A5SDFONZYEKKU5GWVZ1LFMR4MVMVQSLCGOIEPAKT2';
			var client_id = '4AU4CIDPEJFBQS3JXUTI20Q13I3NZWZPLR0Y3Y3OOOVCKLJ0';
			var version = '20170702';

			var fsURL = 'https://api.foursquare.com/v2/venues/search?ll=' + place.lat() + ',' + place.lng()+ '&intent=match&query=' + place.name() + '&client_id=' + client_id + '&client_secret=' + client_secret + '&v=' + version;

			var address, checkinsCount, url;
			console.log('hello');

			$.ajax({
				dataType: 'json',
				url: fsURL,
				success: function(data) {
					var results = data.response.venues[0];
					console.log(data); //just checks the call
					place.address(results.location.address);
					place.url(results.url);
					place.checkinsCount(results.stats.checkinsCount);

					infoWindow.setContent('<h4>' + place.name() + '</h4><div><p>number of checkins:<strong> ' + place.checkinsCount() + '</strong></p></div>' + '<div><p>Address:<strong> ' + place.address() + '</strong></p></div>' + '<div><a href="' + place.url() + '">Website</a></div>');
					infoWindow.open(map, place.marker);
	
				},

				//error handling
				complete: function() {
					if(results.length === 0)
						infoWindow.setContent('<h2>There is no foursquare data available for this Venue');
				},

				error: function(data) {
					console.log('an error occured');//for debugging
					alert('<h4>Error. Please try to refresh</h4>');
					return;
				}
			});

		}

		function bounce() {
			if(place.marker.getAnimation() !== null) {
				place.marker.setAnimation(null);
			} else {
				place.marker.setAnimation(google.maps.Animation.BOUNCE);
			}
		}


		// adds click listener to the markers

		google.maps.event.addListener(place.marker, 'click', function(){
			bounce();
			setTimeout(bounce, 150);
			setTimeout(function() {
				callFsq();
			}, 300);
				
		});
	});

	self.visiblePlaces = ko.observableArray();

	self.placeList.forEach(function(place){
		self.visiblePlaces.push(place);
	});

// records the user input and passes it over to KO
// and decides which markers are visible based on user input
	
	self.userInput = ko.observable('');

	self.filterMarkers = function() {
		var searchInput = self.userInput().toLowerCase();

		self.visiblePlaces.removeAll();

		self.placeList.forEach(function(place) {
			place.marker.setVisible(false);

			if (place.name().toLowerCase().indexOf(searchInput) !== -1) {
				self.visiblePlaces.push(place);
			}
		});

		self.visiblePlaces().forEach(function(place) {
			place.marker.setVisible(true);
		});
	};

	self.showInfoWindow = function(place){
		google.maps.event.trigger(place.marker, 'click');
	};

};

function googleError() {
	alert("Cannot load Google Maps. Check internet connection.");
}

function callback() {
	ko.applyBindings(new ViewModel());	
}





	