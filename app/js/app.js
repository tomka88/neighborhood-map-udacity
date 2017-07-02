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

// function initMap() {
// 	var berlin = {lat: 52.5200, lng: 13.4050};
// 	var map;	
// 	map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 12,
//       center: berlin
//     });

//  //    var marker = new google.maps.Marker({
//  //      position: berlin,
//  //      map: map
//  //    });
// }

var Place = function(data) {
	this.name = ko.observable(data.name);
	this.bestBurger = ko.observable(data.bestBurger);
	this.fsq = ko.observable(data.foursquare_id);
	this.lat = ko.observable(data.lat);
	this.lng = ko.observable(data.lng);

	this.location = ko.computed(function(){
		return "{lat:" + this.lat() + ", lng: " + this.lng() + "}";
	},this);

// // creates foursquare link with ko.computed
// 	this.fsqLink = ko.computed(function(){
// 		var link = this.
// 	})

// // a location and a marker with lat-long variables and callingt the google maps API
// 	this.marker = ko.computed

// 	this.marker = ko.computed
// }

};



var ViewModel = function() {
	var self = this;

	this.placeList = ko.observableArray([]);
	this.markers = ko.observableArray([]);

	
// shows places as a list next to the map
	burgerPlaces.forEach(function(placeItem){
		self.placeList.push( new Place(placeItem) );
	});

	this.currentPlace = ko.observable( this.placeList()[0] );

// listens to button press and creates markers for each place on the map

	function initMap() {
		var berlin = {lat: 52.5200, lng: 13.4050};
		var map;	
		map = new google.maps.Map(document.getElementById('map'), {
	      zoom: 12,
	      center: berlin
	    });
	}
	
	initMap();


}

function callback() {
	ko.applyBindings(new ViewModel());	
}






	