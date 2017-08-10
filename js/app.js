    var model = [
                         {
                            title: 'Park Ave Penthouse',
                            latLng: {lat: 41.7444883, lng: -72.3949465}
                                                  },
                        {
                            title: 'Chelsea Loft',
                            latLng: {lat: 41.2444883, lng: -71.149465}
                        },
                        {
                            title: 'pynsylvania',
                            latLng: {lat: 42.54883, lng: -72.0949465}
                        }

                    ]
    var map,infoWindow;
    var marker =[];

    function ViewModel(){
    var self =this;
    this.filter = ko.observable();

    this.places = ko.observableArray(model);

    this.visibleLocations = ko.computed(function(){

          return this.places().filter(function(places){
              if( !self.filter() || places.title.toLowerCase().indexOf(self.filter()) !== -1)
                return places;
            });
      },this);
  
    }
  var viewModel = new ViewModel();
  ko.applyBindings(ViewModel);

  function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 42.360091, lng: -71.09416},
    zoom: 8
    });
      infowindow = new google.maps.InfoWindow();

      viewModel.forEach(function(place){
    
      place.marker = new google.maps.Marker({
      position:place.latLng,
      map: map,
      animation: google.maps.Animation.DROP,
      title : place.title
    });

    place.marker.addListener('click', function() {

      infowindow.setContent('<div><strong>' + this.title + '</strong><br>' + 
        '<img src="https://maps.googleapis.com/maps/api/streetview?size=300x200&location='+this.title+'=151.78&pitch=-0.76&key=AIzaSyCX6bSgdTWvavwA0O8B7KsObZhE5GAf6yQ" >'
      );

            infowindow.open(map, this);
          });

    });
    
  }

  function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
    center:  {lat: 42.360091, lng: -71.09416},

    zoom: 8
    });
      infowindow = new google.maps.InfoWindow();

      viewModel.places().forEach(function(place){
    
    place.marker = new google.maps.Marker({
      position:place.latLng,
      map: map,
      animation: google.maps.Animation.DROP,
      title : place.title
    });

    place.marker.addListener('click', function() {

      infowindow.setContent('<div><strong>' + this.title + '</strong><br>' + 
        '<img src="https://maps.googleapis.com/maps/api/streetview?size=300x200&location='+this.title+'=151.78&pitch=-0.76&key=AIzaSyCX6bSgdTWvavwA0O8B7KsObZhE5GAf6yQ" >'
      );

            infowindow.open(map, this);
          });

    });
    
       }