<template>
  <div class="home">
    <h1>Chicago Shows</h1>
    <div id='map'></div>
    <h1>All Events</h1>
    <div class="row">
      <div class="col s4" v-for="event in events">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="https://images-na.ssl-images-amazon.com/images/I/716EFOeWz8L._SL1350_.jpg">
          </div>
          <div class="card-content">
            <span class="card-title activator grey-text text-darken-4">{{getArtistsFromEvent(event)}}<i class="material-icons right">more_vert</i></span>
          </div>
          <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">{{getArtistsFromEvent(event)}}<i class="material-icons right">close</i></span>
            <ul>
                  <li>{{timeConvert(event.time)}}</li> 
                  <li>{{event.description}}</li> 
                  <li>@ {{event.name}} {{event.address}}</li> 
            </ul>
               <div v-on:click="favoriteButton(event)"> 
                <button ><a v-bind:href="'/#/events/' + event.id">Event Info</a></button>
                <button v-if="!event.favorited" v-bind:class="{favorited: event.favorited}" v-on:click='addToFavorites(event)'>Add to My Events</button>
                <button v-if="event.favorited" v-bind:class="{favorited: event.favorited}"v-on:click='removeFromFavorites(event)'>Remove From My Events</button>
              </div>
             </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#map {
  height: 500px;
}
.favorited {
  color: green;
}
</style>

<script>
/*global google map*/
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
    axios.get("http://localhost:3000/events/").then(
      function(response) {
        this.events = response.data;
        console.log("events", this.events);
        this.setupMap();
      }.bind(this)
    );
  },

  created: function() {
    axios.get("http://localhost:3000/artist_events/").then(
      function(response) {
        this.artist_events = response.data;
      }.bind(this)
    );
  },

  methods: {
    favoriteButton: function(inputEvent) {
      inputEvent.favorited = !inputEvent.favorited;
    },
    getArtistsFromEvent: function(inputEvent) {
      return inputEvent.artists.map(artist => artist.name).join(", ");
    },
    timeConvert: function(inputTime) {
      return moment().format("MMM do YY");
    },
    addToFavorites: function(inputEvent) {
      axios
        .post("http://localhost:3000/user_events", { event_id: inputEvent.id })
        .then(response => {
          console.log("response", response.data);
          console.log("this.inputEvent.user_event", inputEvent.user_event);
          inputEvent.user_event = response.data;
          console.log("what is the inputEvent now", inputEvent);
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    removeFromFavorites: function(inputEvent) {
      console.log(inputEvent);
      axios
        .delete("http://localhost:3000/user_events/" + inputEvent.user_event.id)
        .then(response => {
          inputEvent.user_event = null;
          // var index = this.user_events.indexOf(inputEvent);
          // this.user_events.splice(index, 1);
        });
    },

    // SET UP MAP FUNCTION LAST
    setupMap: function() {
      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        // center: chicago
        mapTypeControlOptions: {
          mapTypeIds: [
            "roadmap",
            "satellite",
            "hybrid",
            "terrain",
            "styled_map"
          ]
        }
      });

      /* MARKER SET UP */
      var geocoder = new google.maps.Geocoder();
      this.events.forEach(event => {
        geocoder.geocode({ address: event.address }, (results, status) => {
          if (status === "OK") {
            map.setCenter(results[0].geometry.location);
            var infowindow = new google.maps.InfoWindow({
              content: this.getArtistsFromEvent(event)
            });
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              title: event.description
            });
            marker.addListener("click", () => {
              infowindow.open(map, marker);
            });
          } else {
            alert(
              "Geocode was not successful for the following reason: " + status
            );
          }
        });
      });

      /* Location Finder */
      infoWindow = new google.maps.InfoWindow();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Current Location!");
          infoWindow.open(map);
          map.setCenter(pos);
        }),
          function() {
            handleLocationError(true, infoWindow, map.getCenter());
          };
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

      var styledMapType = new google.maps.StyledMapType(
        [
          {
            elementType: "geometry",
            stylers: [
              {
                hue: "#ff4400"
              },
              {
                saturation: -68
              },
              {
                lightness: -4
              },
              {
                gamma: 0.72
              }
            ]
          },
          {
            featureType: "road",
            elementType: "labels.icon"
          },
          {
            featureType: "landscape.man_made",
            elementType: "geometry",
            stylers: [
              {
                hue: "#0077ff"
              },
              {
                gamma: 3.1
              }
            ]
          },
          {
            featureType: "water",
            stylers: [
              {
                hue: "#00ccff"
              },
              {
                gamma: 0.44
              },
              {
                saturation: -33
              }
            ]
          },
          {
            featureType: "poi.park",
            stylers: [
              {
                hue: "#44ff00"
              },
              {
                saturation: -23
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                hue: "#007fff"
              },
              {
                gamma: 0.77
              },
              {
                saturation: 65
              },
              {
                lightness: 99
              }
            ]
          },
          {
            featureType: "water",
            elementType: "labels.text.stroke",
            stylers: [
              {
                gamma: 0.11
              },
              {
                weight: 5.6
              },
              {
                saturation: 99
              },
              {
                hue: "#0091ff"
              },
              {
                lightness: -86
              }
            ]
          },
          {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [
              {
                lightness: -48
              },
              {
                hue: "#ff5e00"
              },
              {
                gamma: 1.2
              },
              {
                saturation: -23
              }
            ]
          },
          {
            featureType: "transit",
            elementType: "labels.text.stroke",
            stylers: [
              {
                saturation: -64
              },
              {
                hue: "#ff9100"
              },
              {
                lightness: 16
              },
              {
                gamma: 0.47
              },
              {
                weight: 2.7
              }
            ]
          }
        ],
        { name: "Styled Map" }
      );

      map.mapTypes.set("styled_map", styledMapType);
      map.setMapTypeId("styled_map");
    }
  }
};
</script>
