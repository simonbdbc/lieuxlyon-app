if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: homePage
  },
  {
    path: "/maps",
    component: mapsPage
  }
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
    titre: "Lieux Lyon"
  },
  methods: {},
  router
});
