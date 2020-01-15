import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let categoryId = 9000;
let noteId = 90000;
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
  let day = date.getDay();
  if (day < 10) {
    day = "0" + day;
  }
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  formattedDate = `${day} ${month}, ${year}`;
  return formattedDate;
}

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
    ],
    noteCategories: [
      { value: "personal", title: "Personal", color: "lightpink" },
      { value: "work", title: "Work", color: "aquamarine" },
      { value: "misc", title: "Miscellaneous", color: "lightyellow" }
    ],
    notes: [
      {
        id: noteId++,
        title: "Testing 1",
        content:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse, illo consequatur iusto dolore qui assumenda saepe quod quia deserunt aliquid commodi, ullam enim est quibusdam quos doloremque soluta consequuntur provident.",
        tag: { value: "personal", color: "lightpink", title: "Personal" },
        date: "30 September, 2018"
      },
      {
        id: noteId++,
        title: "Testing 2",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam impedit officiis alias nostrum modi debitis iusto saepe excepturi iste doloribus reiciendis, voluptatum, neque consequuntur repellat provident, omnis cum voluptas sed.",
        tag: { value: "personal", color: "lightpink", title: "Personal" },
        date: "31 October, 2018"
      },
      {
        id: noteId++,
        title: "Testing 3",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti reprehenderit, quasi optio veritatis dignissimos magnam porro inventore enim sed eius mollitia asperiores nulla ad pariatur nostrum explicabo similique. Repellat, laudantium.",
        tag: { value: "work", title: "Work", color: "aquamarine" },
        date: "19 March, 2019"
      },
      {
        id: noteId++,
        title:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil qui",
        content:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil qui accusantium dignissimos quas perferendis reiciendis beatae natus soluta, nesciunt consectetur tempora, autem doloremque iure nam ipsum suscipit odio laboriosam ullam.",
        tag: { value: "misc", title: "Miscellaneous", color: "lightyellow" },
        date: "09 February, 2019"
      },
      {
        id: noteId++,
        title: "Testing 5",
        content:
          "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor fugiat repellat officia? Suscipit sint aliquid quibusdam temporibus vitae repudiandae impedit, iure voluptatem ratione quasi quaerat corrupti pariatur est accusamus minima.",
        tag: { value: "misc", title: "Miscellaneous", color: "lightyellow" },
        date: "29 May, 2019"
      },
      {
        id: noteId++,
        title: "Testing 6",
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum atque nulla incidunt alias voluptate unde. Accusamus, alias quis. Eligendi veritatis animi sequi ullam mollitia quia placeat aspernatur quasi ducimus laboriosam.",
        tag: { value: "work", title: "Work", color: "aquamarine" },
        date: "01 January, 2020"
      }
    ]
  },
  // getters: {
  //   getColors
  // }
  mutations: {
    // TODOS
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
    },
    // END TODOS
    // NOTES
    addNote(state, note) {
      state.notes.push({
        ...note,
        id: noteId++,
        date: getDate()
      });
    },
    updateNote(state, note) {
      const noteIndex = state.notes.findIndex(n => n.id === note.id);
      const updatedNote = { ...note, date: getDate() };
      state.notes[noteIndex] = updatedNote;
    },
    addNoteCategory() {},
    deleteNote(state, noteId) {
      const noteIndex = state.notes.findIndex(note => note.id === noteId);
      state.notes.splice(noteIndex, 1);
    }
    // END NOTES
  },
  actions: {}
});
