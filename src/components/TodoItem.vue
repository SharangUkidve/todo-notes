<template>
  <li class="todo-item">
    <label
      :for="'todoItem' + todo.title"
      class="todo-label"
      :class="{ striked: todo.done }"
    >
      <input
        type="checkbox"
        class="hidden-input"
        :name="'todoItem' + todo.title"
        :id="'todoItem' + todo.title"
        :checked="todo.done"
        @change="emitTodoStatusUpdate($event)"
      />
      <div class="checkbox" :class="{ checked: todo.done }">
        <i class="material-icons check" v-if="todo.done">check</i>
      </div>
      <!-- <span class="todo-item-text" :class="{ striked: todo.done }"> -->
      {{ todo.title }}
      <!-- </span> -->
    </label>
    <icon-button
      class="todo-item-remove"
      @click="emitRemove"
      tabindex="-1"
      title="Delete Todo"
    >
      remove
    </icon-button>
  </li>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    emitRemove() {
      this.$emit("todo-delete");
    },
    emitTodoStatusUpdate(event) {
      this.$emit("todo-update", event.target.checked);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
.todo-item {
  align-items: center;
  display: flex;
  padding: 0 10px;

  .todo-label {
    align-items: center;
    display: flex;
    flex: 1;
    padding: 8px 0;
    position: relative;
  }

  &:hover {
    background-color: $color-border;
  }

  &-text {
    flex: 1;
    padding: 8px 5px 8px 10px;
  }

  &-remove {
    color: $color-red;
  }

  .checkbox {
    margin-right: 20px;
  }

  .striked {
    color: $color-grey;
    text-decoration: line-through;
    user-select: none;
  }

  .hidden-input {
    &:focus {
      + .checkbox {
        border-color: $color-blue;
      }
    }
  }
}
</style>
