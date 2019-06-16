var mapsPage = {
  template: `
  <div class="page-container">
  <section v-if="errored" class="error-section">
    <p>Nous sommes désolés, nous ne sommes pas en mesure de récupérer ces informations pour le moment. Veuillez réessayer ultérieurement.</p>
  </section>

  <section v-else>
    <div v-if="loading">Chargement...</div>
  </section>
  <section>
  <v-btn v-on:click="getLocation();">Voir sur la carte</v-btn>
    <v-container fluid grid-list-lg>
        <div id="map"></div>
    </v-container>
  </section>

    </div>`,

  data() {
    return {
      pointCenter: this.$route.params.PointCenter || null,
      aMarkerArea: null,
      aCoord: null,
      layers: null,
      glData: null,
      loading: true,
      errored: false
    };
  },
  created() {},
  mounted() {
    this.requestApi();
  },
  methods: {
    requestApi() {
      axios
        .get("http://192.168.33.12/api/data/read.php")
        .then(response => {
          this.glData = response.data.GL_DATA;
          // console.log(response);
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => {
          // console.log(this.glData);
          if (this.glData != null) {
            this.layers = this.glData;
          } else {
            this.layers = aTourismeLocal;
          }
          this.loadLeaflet();
          this.loading = false;
        });
    },
    loadLeaflet() {
      // console.log(this.$route.params.PointCenter);
      // console.log(this.pointCenter);

      // console.log(this.layers);
      // console.log(aTourismeJSON);
      if (this.pointCenter != null) {
        // Center of the map
        let lat = this.pointCenter.geometry.coordinates[1];
        let lng = this.pointCenter.geometry.coordinates[0];
        var center = [lat, lng];
        var zoom = 19;
      } else {
        // Center of the map
        var center = [45.757547, 4.832782];
        // lat: 45.757547567749775;
        // lng: 4.832782745361329;
        var zoom = 14;
      }

      // Create the map
      var map = L.map("map").setView(center, zoom);

      // Set up the OSM layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
        maxZoom: 19
      }).addTo(map);

      // add a marker in the given location
      // L.marker(center).addTo(map);

      // this.layers.forEach(layer => {
      //   L.marker([layer.geometry.coordinates[1], layer.geometry.coordinates[0]])
      //     .addTo(map)
      //     .bindPopup("<p>" + layer.properties.nom + "</p>");
      // });

      var markersCluster = new L.MarkerClusterGroup();

      this.layers.forEach(layer => {
        var latLng = new L.LatLng(
          layer.geometry.coordinates[1],
          layer.geometry.coordinates[0]
        );

        var marker = new L.Marker(latLng, {
          title: layer.properties.nom
        });

        markersCluster.addLayer(marker);

        var content = "<p>" + layer.properties.nom + "</p>";
        content += layer.properties.adresse + "<br>";
        content += layer.properties.codepostal + " ";
        content += layer.properties.commune + "</p>";

        marker.bindPopup(content).openPopup();
      });

      map.addLayer(markersCluster);

      //////////////////////
      // Methodes utiles
      //////////////////////
    },
    //function that gets the location and returns it
    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      } else {
        console.log("Geo Location not supported by browser");
      }
    },
    //function that retrieves the position
    showPosition(position) {
      var location = {
        longitude: position.coords.longitude,
        latitude: position.coords.latitude
      };
      console.log(location);
    }
  }
};
