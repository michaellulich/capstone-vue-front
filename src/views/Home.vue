<template>
  <div class="home">
    <div id='map'></div>
    <div class="container cards">
      
      <h1>ALL the Events</h1>
      <button><a href="https://accounts.spotify.com/authorize?client_id=d45c03352faf4be4884e657dc00ce33f&response_type=code&redirect_uri=http://localhost:8080/">spotify</a></button>
      <button ><a v-bind:href="'/#/profile'" >User Profile</a></button>
      <div class="row">
        <div class="col s4" v-bind:class="{'super-selected': event === currentEvent}" v-for="event in events">
          <div class="card" v-bind:id="`card-${event.id}`">
            <div class="card-image waves-effect waves-block waves-light" >
              <img class="activator"  v-bind:src="`${event.artists[0].primary_image}`" height=220>
            </div>
              <div class="card-content">
                <span class="card-title activator grey-text text-darken-4">{{getArtistsFromEvent(event)}}<i class="material-icons right">more_vert</i></span>
              </div>
                <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">{{getArtistsFromEvent(event)}}<i class="material-icons right">close</i>
                  </span>
                    <ul>
                      <li>{{event.formatted_time}}</li> 
                      <li>{{event.description}}</li> 
                      <li>@ {{event.name}} {{event.address}}</li> 
                    </ul>
                      
                      <div v-for="artist in event.artists">
                        <button data-target="modal" class="btn modal-trigger"  v-on:click="spotifyArtistSearch(artist.name)">{{ artist.name }}</button>
                      </div>

                      <div v-on:click="favoriteButton(event)"> 
                        <button ><a v-bind:href="'/#/events/' + event.id">Event Info</a></button>
                        <button v-if="!event.favorited" v-bind:class="{favorited: event.favorited}" v-on:click='addToFavorites(event)'>I'd like to go.</button>
                        <button v-if="event.favorited" v-bind:class="{favorited: event.favorited}"v-on:click='removeFromFavorites(event)'>No thanks!</button>
                      </div>
                      <div v-on:click='showRoute(event)'>
                       <button >Show Route</button>
                      </div>
                </div>
          </div>
        </div>        
      </div>
    </div>


    <div id="modal" class="modal" >
      <div class="modal-content">
        <h4>{{currentArtist}}</h4>
        <p><iframe v-bind:src="`https://open.spotify.com/embed/artist/${currentArtistTrackSpotifyID}`" width="380" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></p>
         <!-- <av-bars
              caps-color="#FFF"
              :bar-color="['#f00', '#ff0', '#0f0']"
              canv-fill-color="#000"
              :caps-height="2"
              audio-src="/Haydn_Cello_Concerto_D-1.mp3"
            ></av-bars> -->
        <div class="modal-content">
            <div class="audio-viz">
                <form class="audio-viz__form">
                    <input type="radio" class="audio-viz__radio"  id="senventies" name="radio-selection"     value="/Haydn_Cello_Concerto_D-1.mp3"    checked>
                      <button><label for="senventies"><span></span>Haydn Cello Concerto in D</label></button>
                      <!-- <input type="radio" class="audio-viz__radio" id="eighties" name="radio-selection" value="http://ice1.somafm.com/u80s-128-aac">
                      <button><label for="eighties"><span></span>80's Radio</label></button> -->
                </form>
                  <canvas id="oscilloscope"></canvas>
                    <button class="audio-viz__btn" id="start">Start Audio </button>
            </div>              
          </div>
      </div>
      <div class="modal-footer">
        <a href="#" class="modal-close waves-effect waves-green btn-flat">Close</a>
      </div>
    </div> 
  </div>  
</template>

<style>
#map {
  height: 40vh;
  position: fixed;
}

.cards {
  overflow: scroll;
  height: 60vh;
}

h1 {
  font-family: "Baloo Tammudu";
}
.favorited {
  color: green;
}
#floating-panel {
  position: absolute;
  top: 10px;
  left: 25%;
  z-index: 5;
  background-color: #4286f4;
  padding: 5px;
  border: 1px solid #999;
  text-align: center;
  font-family: "Roboto", "sans-serif";
  line-height: 30px;
  padding-left: 10px;
}

.super-selected {
  color: #222a12 !important;
  border: 2px #222a12 solid;
}
</style>

<script>
/* global google, $ */
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
      userProfile: [],
      currentEvent: {}
    };
  },

  mounted: function() {
    // Funky Jquery Modal
    $(document).ready(function() {
      $(".modal").modal();
    });
    //wave form radio //
    this.setUpVisualizer();
    axios.get("http://localhost:3000/events/").then(
      function(response) {
        this.events = response.data;
        // console.log("events", this.events[0].artists[0].primary_image);
        console.log(this.events);
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
    window.app = this;
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
          history.replaceState("data to be passed", "Title of the page", "/#/");
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
      return moment(inputTime).format("MMM do YY");
    },
    addToFavorites: function(inputEvent) {
      axios
        .post("http://localhost:3000/user_events", { event_id: inputEvent.id })
        .then(response => {
          inputEvent.user_event = response.data;
        })
        .catch(error => {
          // this.errors = error.response.data.errors;
          this.$router.push("/login/");
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
            console.log(response.data["artists"]);
          }.bind(this)
        );
    },
    draw: function() {
      this.drawDirections();
    },
    time: function() {
      console.log(moment(event.time).format("MMM do YY"));
    },
    getUserId: function() {
      axios.get("http://localhost:3000/usersprofile/").then(
        function(response) {
          this.userProfile = response.data;
        }.bind(this)
      );
    },
    showRoute: function(event, marker) {
      this.destination = event.address;
      this.drawDirections();
    },
    setUpVisualizer: function() {
      var start_button = document.getElementById("start"),
        radios = document.querySelectorAll('input[name="radio-selection"]'),
        radios_length = radios.length,
        audioContext = void 0,
        masterGain = void 0;
      function audioSetup() {
        var source = void 0;
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        masterGain = audioContext.createGain();
        masterGain.connect(audioContext.destination);
        for (var i = 0, max = radios_length; i < max; i++) {
          if (radios[i].checked === true) {
            source = radios[i].value;
          }
        }
        var song = new Audio(source),
          songSource = audioContext.createMediaElementSource(song),
          songPlaying = false;
        song.crossOrigin = "anonymous";
        songSource.connect(masterGain);
        for (var i = 0, max = radios_length; i < max; i++) {
          radios[i].addEventListener("change", function() {
            if (songPlaying) {
              song.pause();
              start_button.innerHTML = "Start Audio";
              songPlaying = !songPlaying;
            }
            song = new Audio(this.value);
            (songSource = audioContext.createMediaElementSource(song)),
              (song.crossOrigin = "anonymous");
            songSource.connect(masterGain);
          });
        }
        start_button.addEventListener("click", function() {
          if (songPlaying) {
            console.log("PAUSE");
            song.pause();
            start_button.innerHTML = "Start Audio";
          } else {
            console.log("PLAY", song, waveform);
            song.play();
            drawOscilloscope();
            updateWaveForm();
            start_button.innerHTML = "Stop Audio";
          }
          songPlaying = !songPlaying;
        });
      }
      audioSetup();
      // ========================================================
      // Create Wave Form
      // ========================================================
      var analyser = audioContext.createAnalyser();
      masterGain.connect(analyser);
      var waveform = new Float32Array(analyser.frequencyBinCount);
      analyser.getFloatTimeDomainData(waveform);
      function updateWaveForm() {
        requestAnimationFrame(updateWaveForm);
        analyser.getFloatTimeDomainData(waveform);
      }
      // ========================================================
      // Draw Oscilloscope
      // ========================================================
      function drawOscilloscope() {
        requestAnimationFrame(drawOscilloscope);
        var scopeCanvas = document.getElementById("oscilloscope");
        var scopeContext = scopeCanvas.getContext("2d");
        scopeCanvas.width = waveform.length;
        scopeCanvas.height = 200;
        scopeContext.clearRect(0, 0, scopeCanvas.width, scopeCanvas.height);
        scopeContext.beginPath();
        for (var i = 0; i < waveform.length; i++) {
          var x = i;
          var y = (0.5 + waveform[i] / 2) * scopeCanvas.height;
          if (i == 0) {
            scopeContext.moveTo(x, y);
          } else {
            scopeContext.lineTo(x, y);
          }
        }
        scopeContext.strokeStyle = "#5661FA";
        scopeContext.lineWidth = 2;
        scopeContext.stroke();
      }
    },
    // SET UP MAP FUNCTION LAST
    setupMap: function() {
      var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        styles: [
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
        geocoder.geocode(
          { address: event.address },
          (results, status) => {
            if (status === "OK") {
              map.setCenter(results[0].geometry.location);
              // console.log("event artists", event.artists[0]);
              var artistsContentString = event.artists
                .map(artist => `<h6>${artist.name}</h6>`)
                .join("");
              var timeString = moment(event.time).format("MMM do YY");
              var contentString = `
                <div id="infowindow">
                  ${artistsContentString}
                </div>
                `;
              // <h5>@${event.name}</h5>
              //   <p>${event.address}</p>
              //   <h4>${timeString}<h4>
              //   <button onclick="app.drawDirections()">Show route</button>

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
                // infowindow.open(map, marker);
                toggleBounce();
                setTimeout(toggleBounce, 2000);
                this.setDestination(event, marker);

                var element = document.querySelector(`#card-${event.id}`);
                element.scrollIntoView({ block: "end", behavior: "smooth" });

                if (
                  document.querySelector(`#card-${event.id} .card-reveal`).style
                    .display !== "none"
                ) {
                  var elementClose = document.querySelector(
                    `#card-${event.id} .card-reveal .material-icons.right`
                  );
                  elementClose.click();
                } else {
                  var elementOpen = document.querySelector(
                    `#card-${event.id} .activator`
                  );
                  elementOpen.click();
                }

                this.currentEvent = event;
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
          },
          250
        );
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
            infoWindow.setContent("You Are Here.");
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
