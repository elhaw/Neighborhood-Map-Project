model.forEach(function(element) {
    var position = element.latLng;
    var title = element.title;
    var foursquareId = element.foursquareId;

    $.ajax({

        url: 'https://api.foursquare.com/v2/venues/' + foursquareId + '?client_id=SJKSIKIDERVTXS3YVT5DYBV22CPEX5UA1TRDKMUSBM5CHYIW&client_secret=XCDPG5MXPYTER2BLUSXF3CX5RXP4J3ADS0ZXLOJBQIL2YKUN&v=20170814',
        success: function(data) {
            element.name = data.response.venue.name ? data.response.venue.name : "property not available";
            element.url = data.response.venue.url;


            // console.log(element.url);
            element.address = data.response.venue.location.formattedAddress ? data.response.venue.location.formattedAddress : "property not available";
            element.workingHours = data.response.venue.hours.status ? data.response.venue.hours.status : "property not available";
            element.isOpen = data.response.venue.hours.isOpen;
            element.rating = data.response.venue.rating ? data.response.venue.rating : "property not available";
            if (element.url === undefined) {
                element.urlError = "is not a vailable ";
                alert("website for " + element.title + element.urlError);
                $("a[href$='undefined']").addClass("error");


            } else {
                element.url = data.response.venue.url;
            }


        },

        error: function(jqXHR, exception) {
            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'Requested page not found(check your requested URL). [404] ';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }
            alert(msg);
        }



    });
});

function initMap() {
    //initialize the map
    map = new google.maps.Map(document.getElementById('map'), {
        center: model[1].latLng,
        zoom: 11
    });

    myViewModel = new ViewModel();
    ko.applyBindings(myViewModel);

}



function ViewModel() {

    var self = this;
    this.filter = ko.observable();
    this.places = ko.observableArray(model);
    self.infowindow = new google.maps.InfoWindow();

    self.marker = [];


    model.forEach(function(element) {
        var position = element.latLng;
        var title = element.title;
        var foursquareId = element.foursquareId;

        element.marker = new google.maps.Marker({
            position: position,
            title: title,
            map: map,
            animation: google.maps.Animation.DROP,
        });

        self.marker.push(element.marker);
        element.marker.addListener('click', function() {
            self.populateInfoWindow(this, self.infowindow, element);
        });


    });
    self.populateInfoWindow = (function(marker, infowindow, element, foursquareId) {

        var content = '<div id="info-content">' +
            '<p>' + element.name + '</p>' +
            '<img src="https://maps.googleapis.com/maps/api/streetview?size=300x200&location=' + element.latLng.lat + ',' + element.latLng.lng + '&fov=90&heading=235&pitch=10&key=AIzaSyCX6bSgdTWvavwA0O8B7KsObZhE5GAf6yQ" >' +
            '<br>' + '<p>' + 'Rating : ' + element.rating + '/10' + '</p>' +
            '<p>' + 'Addres is : ' + element.address + '</p>' +
            '<p>' + 'Working hours : ' + element.workingHours + '</p>' +
            '<p>' + 'Is it open now : ' + element.isOpen + '</h3>' + '<br>' +
            '<a  href="' + element.url + '">' + 'Link to the website </a>' +
            '</div>';

        self.infowindow.setContent(content);
        self.infowindow.open(map, marker);
        self.animateMarker(marker);

    });
    self.animateMarker = (function(marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 1500);
    });
    self.listItemsClick = (function(location) {

        google.maps.event.trigger(location.marker, 'click');

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
                self.infowindow.close();
                item.marker.setVisible(result);
                return result;
            });
        }

    });

}

//loading google maps error handling 

function googleError() {

    alert("check your internet connection and reload the page");


}