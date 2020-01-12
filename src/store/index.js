import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let categoryId = 9000;

export default new Vuex.Store({
  state: {
    categories: [
      {
        id: categoryId++,
        title: "Tools",
        items: [
          {
            title: "Hammer",
            done: false
          },
          {
            title: "Screwdriver",
            done: false
          },
          {
            title: "Wrench",
            done: true
          }
        ]
      },
      {
        id: categoryId++,
        title: "Devices",
        items: [
          {
            title: "iPad",
            done: false
          },
          {
            title: "iPhone",
            done: false
          }
        ]
      },
      {
        id: categoryId++,
        title: "Groceries",
        items: [
          {
            title: "Milk",
            done: false
          },
          {
            title: "Bread",
            done: false
          },
          {
            title: "Cheese",
            done: false
          },
          {
            title: "Butter",
            done: false
          }
        ]
      }
    ]
  },
  mutations: {
    // Todo Level
    addNewTodo(state, { categoryId, todoTitle }) {
      const catIndex = state.categories.findIndex(
        category => category.id === categoryId
      );
      const newTodo = { title: todoTitle, done: false };
      state.categories[catIndex].items.push(newTodo);
    },
    updateTodoStatus(state, { categoryId, todo, done }) {
      const catIndex = state.categories.findIndex(
        category => category.id === categoryId
      );
      const todoIndex = state.categories[catIndex].items.indexOf(todo);
      state.categories[catIndex].items[todoIndex].done = done;
    },
    deleteTodo(state, { categoryId, todo }) {
      const catIndex = state.categories.findIndex(
        category => category.id === categoryId
      );
      const todoIndex = state.categories[catIndex].items.indexOf(todo);
      state.categories[catIndex].items.splice(todoIndex, 1);
    },
    // Category Level
    addNewCategory(state, newCategoryTitle) {
      const newCategory = {
        title: newCategoryTitle,
        id: categoryId++,
        items: []
      };
      state.categories.push(newCategory);
    },
    updateCategoryTitle(state, { categoryId, newTitle }) {
      const category = state.categories.find(cat => cat.id === categoryId);
      category.title = newTitle;
    },
    deleteCategory(state, categoryId) {
      const catIndex = state.categories.findIndex(cat => cat.id === categoryId);
      state.categories.splice(catIndex, 1);
    }
  },
  actions: {}
});
