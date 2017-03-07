/* global google: true*/


$(() =>{

  const $input = $('.autocomplete');
  const autocomplete = new google.maps.places.Autocomplete($input[0]);
  autocomplete.addListener('place_changed', () => {

    const $lat = $('input[name=lat]');
    const $lng = $('input[name=lng]');

    const place = autocomplete.getPlace();
    const location = place.geometry.location.toJSON();
    $lat.val(location.lat);
    $lng.val(location.lng);
  });
  $('#geocode').on('click', console.log('clicked'));
  initMap();
});

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14
  });


  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      new google.maps.Marker({
        position: pos,
        map: map
      });

      map.setCenter(pos);
    }, function() {
      handleLocationError(true, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}
