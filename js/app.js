    var map,infoWindow;
    var marker =[];

    function ViewModel(){
    var self =this;
    this.filter = ko.observable();

    this.locations = ko.observableArray([
                         {
                            title: 'Park Ave Penthouse',
                            location: {lat: 41.7444883, lng: -72.3949465}
                                                  },
                        {
                            title: 'Chelsea Loft',
                            location: {lat: 41.2444883, lng: -71.149465}
                        },
                        {
                            title: 'pynsylvania',
                            location: {lat: 42.54883, lng: -72.0949465}
                        }

                    ]);

      this.visibleLocations = ko.computed(function(){

          return this.locations().filter(function(locations){
              if( !self.filter() || locations.title.toLowerCase().indexOf(self.filter()) !== -1)
                return locations;
            });
      },this);
      this.hideMarker  = function () {
        
      };
  
    }
  var viewModel = new ViewModel();
  ko.applyBindings(ViewModel);