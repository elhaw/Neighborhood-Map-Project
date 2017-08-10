
    var model = [
          {title: 'Park Ave Penthouse', latLng: {lat: 40.7713024, lng: -73.9632393}},
          {title: 'Chelsea Loft', latLng: {lat: 40.7444883, lng: -73.9949465}},
          {title: 'Union Square Open Floor Plan', latLng: {lat: 40.7347062, lng: -73.9895759}},
          {title: 'East Village Hip Studio', latLng: {lat: 40.7281777, lng: -73.984377}},
          {title: 'TriBeCa Artsy Bachelor Pad', latLng: {lat: 40.7195264, lng: -74.0089934}},
          {title: 'Chinatown Homey Space', latLng: {lat: 40.7180628, lng: -73.9961237}}
        ];
    	var infoWindow,map;

   function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
    center:  model[3].latLng,

    zoom: 12
    });
    model.forEach(function(element){
  			var position =  element.latLng;
  			var title = element.title;
            
    	marker = new google.maps.Marker({
		      position:position,
		      title:title,
		      map: map,
		      animation: google.maps.Animation.DROP,
         });
    	element.marker = marker;
    	element.marker.addListener('click', function() {
    			var infowindow = new google.maps.InfoWindow({
                content: '<div><strong   class = "title">' + element.title + '</strong><br>' + 
                 '<img src="https://maps.googleapis.com/maps/api/streetview?size=300x200&location='+element.title+'=151.78&pitch=-0.76&key=AIzaSyCX6bSgdTWvavwA0O8B7KsObZhE5GAf6yQ" >'
                       });
                 infowindow.open(map, this);              	
           });
  	
       });

     myViewModel = new ViewModel();
    ko.applyBindings(myViewModel)   
    
 };
 


function ViewModel(){
    var self =this;
    this.filter = ko.observable();

    this.places = ko.observableArray(model);
    this.visibleLocations = ko.computed(function(){
        var filter = self.filter();
        if (!filter) {
        ko.utils.arrayForEach(self.places(), function (item) {
        item.marker.setVisible(true);
      });
      return self.places();
      }
     else {
      return ko.utils.arrayFilter(self.places(), function(item) {
        // set all markers visible (false)
        var result = (item.title.search(filter)>= 0)
        item.marker.setVisible(result);
        return result;
      });
      }
          
    });
}
 