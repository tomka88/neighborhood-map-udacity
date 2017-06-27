var burgerPlaces = [
	{
		name: 'Burgermeister',
		location: {lat: 52.501083, lng:13.442323},
		bestBurger: 'hausmeister' 
	},
	{
		name: 'Shiso Burger',
		location: {lat: 52.527285, lng:13.398726},
		bestBurger: 'Chili-Lemon Burger' 
	},
	{
		name: 'Berlin Burger International',
		location: {lat: 52.486476, lng:13.430842},
		bestBurger: 'Chili Burger' 
	},
	{
		name: 'Tommy''s Burger Joint',
		location: {lat: 52.532366, lng:13.397603},
		bestBurger: 'Cheese Burger' 
	},
	{
		name: 'Lily Burger',
		location: {lat: 52.528345, lng:13.425017},
		bestBurger: 'Cheese Burger' 
	},
	{
		name: 'The Bird',
		location: {lat: 52.546607, lng:13.405813},
		bestBurger: 'Cheese Burger' 
	};
];

var Place = function(data) {
	this.name = ko.observable(data.name);
}

var ViewModel = function() {
	var self = this;

	this.placeList = ko.observableArray ([]);
};

function initMap() {
	var berlin = {lat: 52.5200, lng: 13.4050};
	var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: berlin
    });
    var marker = new google.maps.Marker({
      position: berlin,
      map: map
    });
	}

ko.applyBindings(new ViewModel());
	