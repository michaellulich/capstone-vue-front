<template>
  <div class="home">
    <canvas id="canvas" style="border: none; width:100%; height:100%;" width="1200" height="800"></canvas>
      <div id="biglogin" class="biglogin"><a onclick="login()">Signin to Spotify</a>
      </div>
      <a class="login" onclick="login()">login</a>  
      <div id="toast" class="toast"><span id="text"></span><span id="   text2"></span>
      </div> 
      <div class="trackposition" id="trackposition"><div class="fill"   id="trackpositionfill"></div>
      </div> 
  </div>
</template>

<style>
</style>

<script>
export default {
  data: function() {
    return {
      message: "Spotify Visualizer"
    };
  },
  mounted: function() {
    (function(i, s, o, g, r, a, m) {
      i["GoogleAnalyticsObject"] = r;
      (i[r] =
        i[r] ||
        function() {
          (i[r].q = i[r].q || []).push(arguments);
        }),
        (i[r].l = 1 * new Date());
      (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m);
    })(
      window,
      document,
      "script",
      "https://www.google-analytics.com/analytics.js",
      "ga"
    );
    ga("create", "UA-49750240-1", "auto");
    ga("send", "pageview");
  },
  created: function() {},
  methods: {},
  computed: {}
};
</script>
