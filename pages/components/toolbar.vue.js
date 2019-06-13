Vue.component("toolbar-vue", {
  template: `<div>
    <v-navigation-drawer dark app clipped temporary v-model="menu" class="blue white--text">
        <v-list >
            <v-list-tile
               v-for="item in items" :key="item.title" @click="$router.push(item.path)">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>

                <v-list-tile-content>
                    <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar dark color="primary" class="mb-2" fixed app> 
        <v-layout align-center>
            <v-toolbar-side-icon v-on:click="menu=!menu"></v-toolbar-side-icon>
            <v-toolbar-title class="white--text">{{title}}</v-toolbar-title>
            <v-spacer></v-spacer>
        </v-layout>
    </v-toolbar>
</div>`,
  props: ["title"],

  data() {
    return {
      menu: false,
      items: [
        { title: "Home", icon: "home", path: "/" },
        { title: "Maps", icon: "map", path: "/maps" }
      ]
    };
  },
  mounted() {},
  methods: {}
});
