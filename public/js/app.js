'use strict';

/* global google: true*/

$(function () {

  $('#geocode').on('click', console.log('clicked'));

  initMap();
});

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      new google.maps.Marker({
        position: pos,
        map: map
      });

      map.setCenter(pos);
    }, function () {
      handleLocationError(true, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ? 'Error: The Geolocation service failed.' : 'Error: Your browser doesn\'t support geolocation.');
}

function geocodeAddress(geocoder) {
  var address = $('#address').value;
  console.log(address);
  geocoder.geocode({ 'address': address }, function (results, status) {
    if (status === 'OK') {
      console.log('ok');
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}