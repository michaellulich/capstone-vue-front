<template>
  <div class="container">
    <h1>Visualizer</h1>
    <button data-target="modal" class="btn modal-trigger">ENHANCE</button> 
      <div id="modal" class="modal" >
          <div class="modal-content">
            <div class="audio-viz">
                <form class="audio-viz__form">
                    <input type="radio" class="audio-viz__radio"  id="senventies" name="radio-selection"     value="/Haydn_Cello_Concerto_D-1.mp3"    checked>
                      <button><label for="senventies"><span></span>Haydn Cello Concerto in D</label></button>
                      

                      <input type="radio" class="audio-viz__radio" id="eighties" name="radio-selection" value="http://ice1.somafm.com/u80s-128-aac">
                      <button><label for="eighties"><span></span>80's Radio</label></button>
                </form>
              <canvas id="oscilloscope"></canvas>
                <button class="audio-viz__btn" id="start">Start Audio</button>
            </div>              
          </div>
          <div class="modal-footer">
              <a href="#" class="modal-close waves-effect waves-green btn-flat">Close</a>
          </div>
      </div> 
  </div>
</template>

<style>
</style>

<script>
export default {
  data: function() {
    return {};
  },
  mounted: function() {
    $(document).ready(function() {
      $(".modal").modal();
    });
    this.setUpVisualizer();
  },
  created: function() {},
  methods: {
    setUpVisualizer: function() {
      // @ref
      // https://www.w3.org/TR/webaudio
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement
      // https://noisehack.com/build-music-visualizer-web-audio-api
      // ========================================================
      // Global Config
      // ========================================================
      var start_button = document.getElementById("start"),
        radios = document.querySelectorAll('input[name="radio-selection"]'),
        radios_length = radios.length,
        audioContext = void 0,
        masterGain = void 0;
      // ========================================================
      // Audio Setup
      // ========================================================
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
            // Without these lines the oscilloscope won't update
            // when a new selection is made via radio inputs
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
    }
  },
  computed: {}
};
</script>
