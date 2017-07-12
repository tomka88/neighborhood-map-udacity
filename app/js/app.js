var burgerPlaces = [
	{
		name: 'Burgermeister',
		lat: 52.501083, 
		lng: 13.442323,
		bestBurger: 'hausmeister',
		foursquare_id: '4ade123bf964a520d87221e3',
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

// creates lat-long variable for google maps markers
	this.latLng = ko.computed(function(){
		return "{lat: " + this.lat() + ", lng: " + this.lng() + "}";
	},this);

// creates foursquare link with ko.computed
	this.fsqLink = ko.computed(function(){
		return "https://api.foursquare.com/v2/venues/search?ll=" + this.lat() + "," + this.lng() + "&client_id=4AU4CIDPEJFBQS3JXUTI20Q13I3NZWZPLR0Y3Y3OOOVCKLJ0&client_secret=NRQQY34A5SDFONZYEKKU5GWVZ1LFMR4MVMVQSLCGOIEPAKT2&v=20170702";
	}, this);

	// this.makeContent = ko.computed(function(){
	// 	var html = '<div id="info-window-container" style="display:none;">' + 
	// 					'<div id="info-content" data-bind="if:selectedPlace">'
	// 					+ 'blah blah' +
	// 					'</div>' +
	// 				'</div>';
	// 	html = $.parseHTML(html)[0];
	// 	return html;
	// });


};

var ViewModel = function() {
	var self = this;

	
	// initiates google map
	self.map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 52.5200, lng: 13.4050},
	    zoom: 12
	});

	self.placeList = [];
	burgerPlaces.forEach(function(place) {
		self.placeList.push(new Place(place));
	});

	

	self.placeList.forEach(function(place) {
		var markerOptions = {
			map: self.map,
			position: new google.maps.LatLng(place.lat(), place.lng()),
			animation: google.maps.Animation.DROP,
			title: place.name()
		};

		place.marker = new google.maps.Marker(markerOptions);

		var infoWindow = new google.maps.InfoWindow();

		//click listener

		google.maps.event.addListener(place.marker, 'click', function(){
			infoWindow.setContent('<h3>' + place.name() + '</h3>');
			infoWindow.open(map, place.marker);
		});
	});

	self.visiblePlaces = ko.observableArray();

	self.placeList.forEach(function(place){
		self.visiblePlaces.push(place);
	});


//records the user input and passes it over to KO
	self.userInput = ko.observable('');

	self.filterMarkers = function() {
		var searchInput = self.userInput().toLowerCase();

		self.visiblePlaces.removeAll();

		self.placeList.forEach(function(place) {
			place.marker.setVisible(false);

			if (place.name.toLowerCase().indexOf(searchInput) !== -1) {
				self.visiblePlaces.push(place);
			}
		});

		self.visiblePlaces().forEach(function(place) {
			place.marker.setVisible(true);
		});
	};

	self.show_info = function(place){
		google.maps.event.trigger(place.marker, 'click');
	};

}

function callback() {
	ko.applyBindings(new ViewModel());	
}





	