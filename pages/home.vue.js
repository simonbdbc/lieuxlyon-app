var homePage = {
  template: `
  <div class="page-container">
    <v-card class="px-3">
      <span class="subheading">Liste des points touristiques de Lyon :</span>
    </v-card>

  <section v-if="errored">
    <p>Nous sommes désolés, nous ne sommes pas en mesure de récupérer toutes les informations pour le moment. Veuillez réessayer ultérieurement.</p>
  </section>

  <section v-else>
    <div v-if="loading">Chargement...</div>
    </section>
    <section v-if="bShow">
    <v-card>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout v-for="item in cardItems" :key="item.properties.id" row wrap>
            <v-flex xs12>
              <v-card color="blue-grey darken-2" class="white--text">
                <v-card-title primary-title>
                  <div>
                    <div class="headline">{{item.properties.nom}}</div>
                    <span>{{item.properties.adresse}}</span>
                    <span>{{item.properties.codepostal}}</span>
                    <span>{{item.properties.commune}}</span>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat dark v-on:click="goToMap(item);">Voir sur la carte</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
  </section>

  </div>`,

  data() {
    return {
      cardItems: null,
      glData: null,
      bShow: false,
      loading: true,
      errored: false
    };
  },
  mounted() {
    this.requestApi();
  },
  created() {},
  watch: {},
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
            this.cardItems = this.glData;
          } else {
            this.cardItems = aTourismeLocal;
          }
          this.bShow = true;
          this.loading = false;
        });
    },
    goToMap(item) {
      // console.log(item);
      this.$router.replace({
        name: "maps",
        params: { PointCenter: item }
      });
    }
  }
};
