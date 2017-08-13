	//model contains required data about locations
	var model = [

	    {
	        title: 'Park Ave Penthouse',
	        latLng: {
	            lat: 40.7713024,
	            lng: -73.9632393
	        }
	    },
	    {
	        title: 'Chelsea Loft',
	        latLng: {
	            lat: 40.7444883,
	            lng: -73.9949465
	        }
	    },
	    {
	        title: 'Union Square Open Floor Plan',
	        latLng: {
	            lat: 40.7347062,
	            lng: -73.9895759
	        }
	    },
	    {
	        title: 'East Village Hip Studio',
	        latLng: {
	            lat: 40.7281777,
	            lng: -73.984377
	        }
	    },
	    {
	        title: 'TriBeCa Artsy Bachelor Pad',
	        latLng: {
	            lat: 40.7195264,
	            lng: -74.0089934
	        }
	    },
	    {
	        title: 'Chinatown Homey Space',
	        latLng: {
	            lat: 40.7180628,
	            lng: -73.9961237
	        }
	    }

	];
	//declaring global variables 
	var infoWindow, map;

	function initMap() {
	    //initialize the map
	    map = new google.maps.Map(document.getElementById('map'), {
	        center: model[3].latLng,
	        zoom: 12
	    });


	    myViewModel = new ViewModel();
	    ko.applyBindings(myViewModel)

	};



	function ViewModel() {

	    var self = this;
	    this.filter = ko.observable();
	    this.places = ko.observableArray(model);
	    self.infowindow = new google.maps.InfoWindow();

	    self.marker = [];
		    model.forEach(function(element) {
	        var position = element.latLng;
	        var title = element.title;

	        element.marker = new google.maps.Marker({
	            position: position,
	            title: title,
	            map: map,
	            animation: google.maps.Animation.DROP,
	        });
	        self.marker.push(element.marker);
	        element.marker.addListener('click', function() {
	            self.populateInfoWindow(this, self.infowindow, element);
	            //animate the marker when clicked
	        });
	        
	    });

	    self.populateInfoWindow = (function(marker, infowindow, element) {

	        self.infowindow.setContent('<div><strong>' + element.title + '</strong><br>');
	        self.infowindow.open(map, marker);
	        self.animateMarker(marker);

	    });
	    self.animateMarker = (function(marker) {
	        marker.setAnimation(google.maps.Animation.BOUNCE);
	        setTimeout(function() {
	            marker.setAnimation(null)
	        }, 1500);
	    });
	    this.visibleLocations = ko.computed(function() {
	        var filter = self.filter();
	        if (!filter) {
	            ko.utils.arrayForEach(self.places(), function(item) {
	                item.marker.setVisible(true);
	            });
	            return self.places();
	        } else {
	            return ko.utils.arrayFilter(self.places(), function(item) {
	                // set all markers visible (false)
	                var result = (item.title.toLowerCase().search(filter) >= 0);
	                item.marker.setVisible(result);
	                return result;
	            });
	        }

	    });

	};

	//loading google maps error handling 

	function googleError() {

	    alert("check your internet connection and reload the page");


	}
