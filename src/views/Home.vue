<template>
  <div class="home">
    
    <h1>Chicago Shows</h1>
    <div id='map'></div>
    <h1>All Events</h1>
    <div v-for="event in events">
      <ul>
        <li>{{timeConvert(event.time)}} {{event.description}} @ {{event.name}} {{event.address}} with: {{getArtistsFromEvent(event)}}</li>
      </ul>
      <div>
        <button ><a v-bind:href="'/#/events/' + event.id">Event Info</a></button>
      </div>
    </div>
     
    
  </div>
</template>

<style>
#map {
  height: 300px;
}
</style>

<script>
/*global google*/
var axios = require("axios");
var moment = require("moment");
var infoWindow;

export default {
  data: function() {
    return {
      events: []
    };
  },
  mounted: function() {
    var chicago = { lat: 41.851215, lng: -87.634422 };
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: chicago
    });
    infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location Found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        function() {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }
    // var marker = new google.maps.Marker({ position: chicago, map: map });
  },

  created: function() {
    axios.get("http://localhost:3000/events/").then(
      function(response) {
        this.events = response.data;
      }.bind(this)
    );
    axios.get("http://localhost:3000/artist_events/").then(
      function(response) {
        this.artist_events = response.data;
      }.bind(this)
    );
  },
  methods: {
    getArtistsFromEvent: function(inputEvent) {
      return inputEvent.artists.map(artist => artist.name).join(", ");
    },
    timeConvert: function(inputTime) {
      return moment().format("MMM do YY");
    }
  },
  computed: {}
};
</script>
