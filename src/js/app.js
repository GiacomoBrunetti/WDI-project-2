/* global google: true*/


$(() =>{
  const pubs = $('.map1').data('pubs');
  console.log(pubs);
  let map = null;
  const $input = $('.autocomplete');

  if($input.length > 0) {
    const autocomplete = new google.maps.places.Autocomplete($input[0]);
    autocomplete.addListener('place_changed', () => {

      const $lat = $('input[name=lat]');
      const $lng = $('input[name=lng]');

      const place = autocomplete.getPlace();
      const location = place.geometry.location.toJSON();
      $lat.val(location.lat);
      $lng.val(location.lng);
      // console.log(location.lat, location.lng);
    });
  }






  function initMap() {
    const lastKnowPosition = JSON.parse(window.localStorage.getItem('lastKnowPosition'));

    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: lastKnowPosition || { lat: 51.51, lng: -0.072 }//,
      // icon: {
      //   url: "images/markers/svg/Coffee_3.svg",
      //   scaledSize: new google.maps.Size(64, 64)
      // }
    });


    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
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


  function addMarker() {
    pubs.forEach((pub) => {
      const latLng = { lat: pub.lat, lng: pub.lng };
      console.log(latLng);
      window.setTimeout(function() {
        new google.maps.Marker({
          position: latLng,
          map: map,
          animation: google.maps.Animation.DROP
        });
      }, 100);
    });
  }

  initMap();


});
