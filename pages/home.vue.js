var homePage = {
  template: `
  <div class="page-container">
    <v-card class="px-3 white--text" color="blue-grey darken-2" >
      <span class="subheading">Voici la liste des points touristiques de Lyon :</span>
    </v-card>

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
                  <v-btn flat dark>Voir sur la carte</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
  </div>`,

  data() {
    return {
      isNavOpen: false,
      isSidebarOpen: false,
      sidebarContentToShow: null,
      cardItems: TOURISME
    };
  },
  created() {
    this.todoLists = JSON.parse(
      localStorage.getItem("todoLocalStorage") || "[]"
    );
  },
  watch: {
    todoLists: {
      handler() {
        this.updateTodoLocalStorage();
      },
      deep: true
    }
  },
  methods: {
    totalTodosCompleted: function(i) {
      var total = 0;
      for (var j = 0; j < this.todoLists[i].items.length; j++) {
        if (this.todoLists[i].items[j].isCompleted) {
          total++;
        }
      }
      return total;
    },
    openSidebar: function(contentToShow) {
      this.isSidebarOpen = true;
      this.isNavOpen = false;
      this.sidebarContentToShow = contentToShow;
    },
    addNewList: function() {
      var listTitle = this.tempNewList.title;
      var listKeyword = this.tempNewList.keyword;
      if (listTitle == null) {
        listTitle = "🕵️‍ List with no name";
      }
      if (listKeyword == null) {
        listKeyword = "earth";
      }
      this.todoLists.push({
        title: listTitle,
        keyword: listKeyword,
        items: []
      });
      this.currentListIndex = this.todoLists.length - 1;
      this.isSidebarOpen = false;
      this.tempNewList.title = null;
      this.tempNewList.keyword = null;
    },
    deleteList: function() {
      this.todoLists.splice(this.currentListIndex, 1);
      this.currentListIndex = 0;
      this.isSidebarOpen = false;
    },
    addNewTodo: function() {
      var todoName = this.tempNewTodo.name;
      var todoCompleted = this.tempNewTodo.isCompleted;
      if (todoName == null) {
        todoName = "🕵️‍ unnamed todo";
      }
      this.todoLists[this.currentListIndex].items.push({
        name: todoName,
        isCompleted: todoCompleted
      });
      this.isSidebarOpen = false;
      this.tempNewTodo.name = null;
      this.tempNewTodo.isCompleted = false;
    },
    deleteTodo: function() {
      this.todoLists[this.currentListIndex].items.splice(
        this.currentTodoIndex,
        1
      );
      this.isSidebarOpen = false;
      this.currentTodoIndex = 0;
    },
    updateTodoLocalStorage: function() {
      localStorage.setItem("todoLocalStorage", JSON.stringify(this.todoLists));
    }
  }
};
