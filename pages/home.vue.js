var homePage = {
  template: `
  <div>
    <div style="height: 10vh;"></div>
    <v-card class="px-3" color="primary" dark>
      <h3 class="display-2">Bienvenue</h3>
      <span class="subheading">Liste des points touristiques de Lyon.</span>
    </v-card>
  </div>`,

  data() {
    return {
      email: null,
      password: null,
      errorMsg: "",
      isNavOpen: false,
      isSidebarOpen: false,
      sidebarContentToShow: null,
      currentListIndex: 0,
      currentTodoIndex: 0,
      tempNewList: [
        {
          title: null,
          keyword: null
        }
      ],
      tempNewTodo: [
        {
          name: null,
          isCompleted: false
        }
      ],
      todoLists: []
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
