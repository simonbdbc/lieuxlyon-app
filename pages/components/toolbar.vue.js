Vue.component("toolbar-vue", {
  template: `
  <div>
    <v-navigation-drawer absolute temporary v-model="menu">
        <v-list class="pa-1">
            <v-list-tile avatar>
                <v-list-tile-avatar>
                <v-icon>dashboard</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                <v-list-tile-title>Menu</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
            </v-list>    
            <v-list class="pt-0" dense>
            <v-divider></v-divider>
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
    <v-toolbar>
        <v-toolbar-side-icon v-on:click="menu=!menu"></v-toolbar-side-icon>
        <v-toolbar-title>{{title}}</v-toolbar-title>
        <v-spacer></v-spacer>
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
