<template>
  <div class="home">
    <h1>LoCALE</h1>
    <div id='map'></div>
    <h1>All Events</h1>
    <a href="https://accounts.spotify.com/authorize?client_id=d45c03352faf4be4884e657dc00ce33f&response_type=code&redirect_uri=http://localhost:8080/">spotify</a>
    <button v-on:click="draw()">draw route</button>
    <button ><a v-bind:href="'/#/profile'" >Current User Profile</a></button>
    <div class="row">
      <div class="col s4" v-for="event in events">
        <div class="card">
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator" src="https://images-na.ssl-images-amazon.com/images/I/716EFOeWz8L._SL1350_.jpg">
          </div>
            <div class="card-content">
              <span class="card-title activator grey-text text-darken-4">{{getArtistsFromEvent(event)}}<i class="material-icons right">more_vert</i></span>
            </div>
              <div v-on:click='setDestination()' class="card-reveal">
                <span class="card-title grey-text text-darken-4">{{getArtistsFromEvent(event)}}<i class="material-icons right">close</i>
                </span>
                  <ul>
                    <li>{{timeConvert(event.time)}}</li> 
                    <li>{{event.description}}</li> 
                    <li>@ {{event.name}} {{event.address}}</li> 
                  </ul>
                    
                    <div v-for="artist in event.artists">
                      <button data-target="modal" class="btn modal-trigger"  v-on:click="spotifyArtistSearch(artist.name)">{{ artist.name }}</button>
                    </div>

                    <div v-on:click="favoriteButton(event)"> 
                      <button ><a v-bind:href="'/#/events/' + event.id">Event Info</a></button>
                      <button v-if="!event.favorited" v-bind:class="{favorited: event.favorited}" v-on:click='addToFavorites(event)'>Add to My Events</button>
                      <button v-if="event.favorited" v-bind:class="{favorited: event.favorited}"v-on:click='removeFromFavorites(event)'>Remove From My Events</button>
                    </div>
                    <div v-on:click='draw()'>
                     <button >Show Route</button>
                    </div>
              </div>
        </div>
      </div>        
    </div>


    <div id="modal" class="modal" >
      <div class="modal-content">
        <h4>{{currentArtist}}</h4>
        <p><iframe v-bind:src="`https://open.spotify.com/embed/artist/${currentArtistTrackSpotifyID}`" width="380" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></p>

        <p>{{`https://open.spotify.com/embed/artist/${currentArtistTrackSpotifyID}`}}</p>
      </div>
      <div class="modal-footer">
        <a href="#" class="modal-close waves-effect waves-green btn-flat">Close</a>
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
#floating-panel {
  position: absolute;
  top: 10px;
  left: 25%;
  z-index: 5;
  background-color: #fff;
  padding: 5px;
  border: 1px solid #999;
  text-align: center;
  font-family: "Roboto", "sans-serif";
  line-height: 30px;
  padding-left: 10px;
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
      events: [],
      user_events: [],
      accessToken: "",
      map: null,
      directionsService: null,
      directionsDisplay: null,
      position: "",
      origin: "",
      destination: "",
      currentArtist: "",
      currentArtistTrackSpotifyID: "",
      userProfile: []
    };
  },

  mounted: function() {
    // Funky Jquery Modal
    $(document).ready(function() {
      $(".modal").modal();
    });

    axios.get("http://localhost:3000/events/").then(
      function(response) {
        this.events = response.data;
        // console.log("events", this.events);
        this.setupMap();
        // this.drawDirections();
      }.bind(this)
    );
    axios.get("http://localhost:3000/user_events").then(
      function(response) {
        this.user_events = response.data;
      }.bind(this)
    );
    // axios.get("http://localhost:3000/token").then(
    //   function(response) {
    //     this.token = response.data;
    //     console.log(this.token);
    //   }.bind(this)
    // );
  },
  created: function() {
    var url = location.href;
    if (url.split("?code=").length > 1) {
      var code = url.split("?code=")[1].split("#")[0];
      axios
        .get("http://localhost:3000/spotify/callback?code=" + code)
        .then(function(response) {
          localStorage.setItem(
            "spotifyAccessToken",
            response.data.access_token
          );
          // this.$router.push("/");
          // { headers: { "Authorization": `Bearer ${accessToken}`} };

          // axios
          //   .get("https://api.spotify.com/v1/me", {
          //     headers: { Authorization: `Bearer ${accessToken}` }
          //   })
          //   .then(function(response) {
          //     console.log("spotify me", response);
          //   });
        });
    }
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
          inputEvent.user_event = response.data;
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    },
    removeFromFavorites: function(inputEvent) {
      axios
        .delete("http://localhost:3000/user_events/" + inputEvent.user_event.id)
        .then(response => {
          inputEvent.user_event = null;
          // var index = this.user_events.indexOf(inputEvent);
          // this.user_events.splice(index, 1);
        });
    },
    spotifyArtistSearch: function(inputArtist) {
      var accessToken = localStorage.getItem("spotifyAccessToken");
      var currentArtist = inputArtist;
      axios
        .get(
          `https://api.spotify.com/v1/search?q=${currentArtist}&type=artist`,
          {
            headers: { Authorization: `Bearer ${accessToken}` }
          }
        )
        .then(
          function(response) {
            this.currentArtistTrackSpotifyID =
              response.data["artists"]["items"][0]["id"];
          }.bind(this)
        );
    },
    draw: function() {
      this.drawDirections();
    },
    getUserId: function() {
      axios.get("http://localhost:3000/usersprofile/").then(
        function(response) {
          this.userProfile = response.data;
        }.bind(this)
      );
    },
    // SET UP MAP FUNCTION LAST
    setupMap: function() {
      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
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

      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      directionsDisplay.setMap(map);

      this.map = map;
      this.directionsService = directionsService;
      this.directionsDisplay = directionsDisplay;

      /* MARKER SET UP */
      var geocoder = new google.maps.Geocoder();
      this.events.forEach(event => {
        geocoder.geocode({ address: event.address }, (results, status) => {
          if (status === "OK") {
            map.setCenter(results[0].geometry.location);
            var contentString =
              "<div id=infoWindow>" +
              "<ul>" +
              `${event.artists[0]}` +
              `${event.name}` +
              `${event.address}` +
              "<button>Get Route</button>" +
              "</ul>" +
              "</div>";
            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              title: event.description,
              animation: google.maps.Animation.DROP
            });

            marker.addListener("click", () => {
              infowindow.open(map, marker);
              toggleBounce();
              setTimeout(toggleBounce, 2000);
              this.setDestination(event, marker);
            });
          } else {
            alert(
              "Geocode was not successful for the following reason: " + status
            );
          }
          function toggleBounce() {
            if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
            } else {
              marker.setAnimation(google.maps.Animation.BOUNCE);
            }
          }
        });
      });

      /* geolocation */
      infoWindow = new google.maps.InfoWindow();
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function(position) {
            this.pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            infoWindow.setPosition(this.pos);
            infoWindow.setContent("location");
            infoWindow.open(map);
            map.setCenter(this.pos);
          }.bind(this),
          function() {
            handleLocationError(true, infoWindow, map.getCenter());
          }
        );
      } else {
        // Browser doesn't support Geolocation
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
    },
    // getAddress: function() {
    //   console.log(this.pos["lat"], this.pos["lng"]);
    // },
    drawDirections: function() {
      // console.log(
      //   "drawDirections",
      //   this.directionsService,
      //   this.directionsDisplay
      // );
      // ROUTES
      infoWindow = new google.maps.InfoWindow();
      this.directionsService.route(
        {
          origin: this.pos,
          destination: this.destination,
          travelMode: "DRIVING"
        },
        function(response, status) {
          if (status === "OK") {
            this.directionsDisplay.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }.bind(this)
      );
    },
    setDestination: function(event, marker) {
      this.destination = event.address;
      // this.drawDirections();
    }
  }
};
</script>
