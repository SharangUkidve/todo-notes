import Vue from "vue";
import VueRouter from "vue-router";
import Todos from "../views/Todos.vue";
import Notes from "../views/Notes.vue";

Vue.use(VueRouter);

const routes = [{
    path: "/todos",
    name: "todos",
    component: Todos
  },
  {
    path: "/notes",
    name: "notes",
    component: Notes
  },
  {
    path: "",
    redirect: "todos"
  },
  {
    path: "**",
    redirect: "todos"
  }
];

const router = new VueRouter({
  routes
});

export default router;
