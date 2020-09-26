import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let categoryId = new Date().getTime() + 2091;
let noteId = new Date().getTime() + 2109;
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function getDate() {
  const date = new Date();
  let formattedDate;
  const day = zeroPad(date.getDate());
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = zeroPad(date.getHours());
  const minutes = zeroPad(date.getMinutes());
  formattedDate = `${hours}:${minutes} on ${month} ${day}, ${year}`;
  return formattedDate;
}

function zeroPad(num) {
  if (num < 10) {
    return "0" + num;
  }
  return num;
}

function getInitialTheme() {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return true;
  }
  return false;
}

function canAddTodo({ todoTitle, categoryId }, state) {
  if (!todoTitle || !todoTitle.trim().length) {
    return false;
  }
  const category = state.categories.find(
    category => category.id === categoryId
  );
  if (!category) {
    return false;
  }
  return !category.items.some(
    todo => todo.title.toLowerCase() === todoTitle.toLowerCase()
  );
}

function canAddTodoCategory(categories, title) {
  if (!title || !title.length) {
    return false;
  }
  const lowerCategories = categories.map(cat => cat.title.toLowerCase());
  return !lowerCategories.includes(title.toLowerCase());
}

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos || []));
}

function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes || []));
}

const defaultTodo = {
  id: 0,
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
};

const defaultNote = {
  id: noteId++,
  title: "Sample Note",
  content:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, illo consequatur iusto dolore qui assumenda saepe quod quia deserunt aliquid commodi, ullam enim est quibusdam quos doloremque soluta consequuntur provident.",
  tag: {
    value: "personal",
    color: "lightpink",
    title: "Personal"
  },
  date: getDate()
};

export default new Vuex.Store({
  state: {
    isDark: JSON.parse(
      localStorage.getItem("prefersDarkTheme") || getInitialTheme()
    ),
    newUser: JSON.parse(localStorage.getItem("newUser") || true),
    categories: JSON.parse(localStorage.getItem("todos")) || [defaultTodo],
    noteCategories: [
      {
        value: "personal",
        title: "Personal",
        color: "lightpink"
      },
      {
        value: "work",
        title: "Work",
        color: "aquamarine"
      },
      {
        value: "misc",
        title: "Miscellaneous",
        color: "lightyellow"
      }
    ],
    notes: JSON.parse(localStorage.getItem("notes")) || [defaultNote]
  },
  mutations: {
    // THEME, user Meta
    toggleTheme(state) {
      state.isDark = !state.isDark;
      localStorage.setItem("prefersDarkTheme", JSON.stringify(state.isDark));
    },
    toggleNewUser(state) {
      state.newUser = false;
      localStorage.setItem("newUser", JSON.stringify(state.newUser));
    },
    // TODOS
    // Todo Level
    addNewTodo(state, { todo, catIndex }) {
      state.categories[catIndex].items = [
        ...state.categories[catIndex].items,
        todo
      ];
      saveTodos(state.categories);
    },
    updateTodoStatus(state, { categoryId, todo, done }) {
      const catIndex = state.categories.findIndex(
        category => category.id === categoryId
      );
      const todoIndex = state.categories[catIndex].items.indexOf(todo);
      state.categories[catIndex].items[todoIndex].done = done;
      saveTodos(state.categories);
    },
    deleteTodo(state, { catIndex, todo }) {
      state.categories[catIndex].items = state.categories[
        catIndex
      ].items.filter(item => item !== todo);
      saveTodos(state.categories);
    },
    // Category Level
    addNewCategory(state, newCategoryTitle) {
      const newCategory = {
        title: newCategoryTitle,
        id: categoryId++,
        items: []
      };
      state.categories = [newCategory, ...state.categories];
      saveTodos(state.categories);
    },
    updateCategoryTitle(state, { categoryId, newTitle }) {
      const category = state.categories.find(cat => cat.id === categoryId);
      let newCategory = { ...category, title: newTitle };
      state.categories = [
        newCategory,
        ...state.categories.filter(cat => cat.id !== categoryId)
      ];
      saveTodos(state.categories);
    },
    deleteCategory(state, categoryId) {
      state.categories = state.categories.filter(cat => cat.id !== categoryId);
      saveTodos(state.categories);
    },
    // END TODOS
    // NOTES
    addNote(state, note) {
      state.notes = [...state.notes, note];
      saveNotes(state.notes);
    },
    updateNote(state, note) {
      const updatedNote = {
        ...note,
        date: getDate()
      };
      state.notes = [updatedNote, ...state.notes.filter(n => n.id !== note.id)];
      saveNotes(state.notes);
    },
    addNoteCategory() {},
    deleteNote(state, noteId) {
      state.notes = state.notes.filter(note => note.id !== noteId);
      saveNotes(state.notes);
    }
    // END NOTES
  },
  actions: {
    // TODOS
    addNewTodo({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        if (canAddTodo(payload, state)) {
          const catIndex = state.categories.findIndex(
            category => category.id === payload.categoryId
          );
          if (catIndex < 0) {
            reject("Category not found");
          }
          const todo = {
            title: payload.todoTitle,
            done: false
          };
          setTimeout(() => {
            console.log(todo, catIndex);
            commit("addNewTodo", { todo, catIndex });
            resolve();
          }, 500);
        } else {
          reject();
        }
      });
    },
    updateTodoStatus({ commit }, payload) {
      return new Promise(resolve => {
        commit("updateTodoStatus", payload);
        resolve();
      });
    },
    deleteTodo({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        const catIndex = state.categories.findIndex(
          category => category.id === payload.categoryId
        );
        if (catIndex < 0) {
          reject("Todo Not found");
        }
        setTimeout(() => {
          commit("deleteTodo", { todo: payload.todo, catIndex });
          resolve();
        }, 500);
      });
    },
    addCategory({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        if (canAddTodoCategory(state.categories, payload)) {
          commit("addNewCategory", payload);
          resolve();
        } else {
          reject("Cannot Add Category");
        }
      });
    },
    updateCategoryTitle({ commit, state }, { categoryId, newTitle }) {
      return new Promise((resolve, reject) => {
        if (canAddTodoCategory(state.categories, newTitle)) {
          commit("updateCategoryTitle", { categoryId, newTitle });
          resolve();
        } else {
          reject("Cannot update title");
        }
      });
    },
    deleteCategory({ commit }, payload) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit("deleteCategory", payload);
          resolve();
        }, 400);
      });
    },
    // NOTES
    addNote({ commit }, payload) {
      const note = { ...payload, id: noteId++, date: getDate() };
      return new Promise(resolve => {
        setTimeout(() => {
          commit("addNote", note);
          resolve();
        }, 300);
      });
    },
    updateNote({ commit }, payload) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit("updateNote", payload);
          resolve();
        }, 200);
      });
    },
    deleteNote({ commit }, payload) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit("deleteNote", payload);
          resolve();
        }, 500);
      });
    }
  }
});
