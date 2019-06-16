if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: homePage
  },
  {
    path: "/maps",
    name: "maps",
    component: mapsPage
  }
  // {
  //   path: "/maps/:PointCenter",
  //   name: "mapsPointCenter",
  //   component: mapsPage
  // }
];

let router = new VueRouter({
  //mode: 'history',
  routes // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
  next();
});

var app = new Vue({
  el: "#app",
  watch: {},
  mounted() {},
  data: {
    titre: "Lieux Lyon",
    snackbar: false,
    color: "",
    mode: "",
    timeout: 6000,
    text: "Une nouvelle version de l'application est disponible."
  },
  methods: {},
  router
});
