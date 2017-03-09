'use strict';

/* global google: true*/

$(function () {
  var pubs = $('.map1').data('pubs');
  console.log(pubs);
  var map = null;
  var $input = $('.autocomplete');

  if ($input.length > 0) {
    var autocomplete = new google.maps.places.Autocomplete($input[0]);
    autocomplete.addListener('place_changed', function () {

      var $lat = $('input[name=lat]');
      var $lng = $('input[name=lng]');

      var place = autocomplete.getPlace();
      var location = place.geometry.location.toJSON();
      $lat.val(location.lat);
      $lng.val(location.lng);
      // console.log(location.lat, location.lng);
    });
  }

  function initMap() {
    var lastKnowPosition = JSON.parse(window.localStorage.getItem('lastKnowPosition'));

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: lastKnowPosition || { lat: 51.51, lng: -0.072 } //,
    });

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        window.localStorage.setItem('lastKnowPosition', JSON.stringify(pos));
        new google.maps.Marker({
          position: pos,
          map: map
        });

        map.setCenter(pos);
        addMarker();
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

  function addMarker() {
    pubs.forEach(function (pub) {
      var latLng = { lat: pub.lat, lng: pub.lng };
      console.log(latLng);
      window.setTimeout(function () {
        var marker = new google.maps.Marker({
          position: latLng,
          map: map,
          animation: google.maps.Animation.DROP
        });
        marker.addListener('click', function () {
          console.log(latLng);
          $('.pub').removeClass('hidden');
          $('.form').addClass('hidden');
          pubs.forEach(function (pub) {
            if (pub.lat === latLng.lat && pub.lng === latLng.lng) {
              console.log(pub.name, pub._id);
              //$('#pubName').html(pub.name);
              $('.pub').empty();
              $('.pub').append('<div><h3><a href="/pubs/' + pub._id + '">' + pub.name + '</a></h3><p><Address: ' + pub.address + '</p><p>Expensiveness: ' + pub.expensiveness + '</p><p>Atmosphere: ' + pub.atmosphere + '</p>');
            }
          });
        });
      }, 100);
    });
  }

  initMap();
});