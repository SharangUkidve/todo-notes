<template>
  <section class="category-card" :class="{ expanded: expanded }">
    <div
      class="category-card-header"
      role="button"
      tabindex="0"
      @click="toggleExpansion"
      @keyup.space="toggleExpansion"
    >
      <span class="expand-button icon-button" title="Expand/Collapse Category">
        <i class="material-icons">{{ expanded ? "remove" : "add" }}</i>
      </span>
      <h2
        class="title"
        v-if="!categoryTitleEditing"
        @dblclick="toggleTitleEdit"
      >
        {{ category.title }}
      </h2>
      <input
        type="text"
        class="form-field title-edit"
        v-else
        v-autofocus
        v-model.trim="categoryNewTitle"
        @keyup.stop
        @click.stop
        @keyup.enter="toggleTitleEdit"
        @keyup.esc="cancelTitleEdit"
      />

      <span class="pending-text" v-if="infoText">{{ infoText }}</span>
      <icon-button
        class="delete-button grey-text"
        title="Cancel Edit Title"
        v-if="categoryTitleEditing"
        @click.stop="cancelTitleEdit()"
        size="18px"
      >
        cancel
      </icon-button>
      <icon-button
        class="edit-button green-text"
        :title="categoryTitleEditing ? 'Save New Title' : 'Edit Category Title'"
        @click.stop="toggleTitleEdit"
      >
        {{ categoryTitleEditing ? "check" : "edit" }}
      </icon-button>
      <icon-button
        class="delete-button red-text"
        title="Delete Category"
        v-if="!categoryTitleEditing"
        @click.stop="deleteCategory"
      >
        delete
      </icon-button>
    </div>
    <div class="category-card-body" v-if="expanded">
      <div class="form-group" v-if="category.items && category.items.length">
        <label
          :for="'catSearch' + category.title"
          class="icon-button grey-text"
          title="Search Icon"
        >
          <i class="material-icons">search</i>
        </label>
        <input
          type="text"
          class="form-group-input"
          placeholder="Search..."
          autocomplete="off"
          @keyup.enter="addFromSearch"
          :id="'catSearch' + category.title"
          v-model.trim="catSearch"
        />
        <icon-button
          class="grey-text"
          tabindex="-1"
          v-if="catSearch.length"
          @click="resetSearch"
          title="Clear Search"
          size="18px"
        >
          cancel
        </icon-button>
        <icon-button
          class="blue-text"
          tabindex="-1"
          title="Save New Todo"
          v-if="catSearch.length && !filteredItems.length"
          @click="addFromSearch"
        >
          add
        </icon-button>
      </div>
      <ul class="todo-list">
        <todo-item
          v-for="todo of filteredItems"
          :key="todo.title"
          :todo="todo"
          @todo-update="
            updateTodoStatus({ categoryId: category.id, todo, done: $event })
          "
          @todo-delete="deleteTodo({ categoryId: category.id, todo })"
        />
        <li v-show="!catSearch.length">
          <div class="form-group add-todo">
            <label
              class="icon-button grey-text"
              :for="'newTodo' + category.title"
              title="Add New Todo"
            >
              <i class="material-icons">add</i>
            </label>
            <input
              type="text"
              class="form-group-input"
              placeholder="Add New Todo..."
              autocomplete="off"
              :id="'newTodo' + category.title"
              v-model.trim="newTodoModel"
              @keyup.enter="addNewTodo"
              @keyup.esc="resetNewTodo"
              :disabled="submitting"
            />
            <icon-button
              size="18px"
              class="grey-text"
              title="Clear New Todo"
              v-if="newTodoModel.length"
              @click="resetNewTodo"
            >
              cancel
            </icon-button>
            <icon-button
              class="blue-text"
              title="Save New Todo"
              v-if="newTodoModel.length"
              @click="addNewTodo"
            >
              check
            </icon-button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import TodoItem from "./TodoItem";
import { mapActions } from "vuex";
export default {
  components: { TodoItem },
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      catSearch: "",
      newTodoModel: "",
      categoryTitleEditing: false,
      categoryNewTitle: "",
      expanded: false,
      submitting: false
    };
  },
  computed: {
    filteredItems() {
      const lowerSearch = this.catSearch.toLowerCase();
      return lowerSearch && lowerSearch.length
        ? this.category.items.filter(item =>
            item.title.toLowerCase().includes(lowerSearch)
          )
        : this.category.items;
    },
    infoText() {
      if (!this.category.items.length) {
        return "";
      }

      const undoneCount = this.category.items.filter(item => !item.done).length;
      return undoneCount === 0
        ? "All Done"
        : undoneCount.toString() + " Pending";
    }
  },
  created() {
    this.categoryNewTitle = this.category.title;
  },
  methods: {
    ...mapActions({ addTodo: "addNewTodo" }),
    ...mapActions(["updateTodoStatus", "deleteTodo"]),
    toggleTitleEdit() {
      if (
        this.categoryTitleEditing &&
        this.categoryNewTitle.toLowerCase() !==
          this.category.title.toLowerCase()
      ) {
        this.$emit("category-title-change", this.categoryNewTitle);
      }
      this.categoryTitleEditing = !this.categoryTitleEditing;
    },
    cancelTitleEdit() {
      this.categoryTitleEditing = false;
      this.categoryNewTitle = this.category.title;
    },
    deleteCategory() {
      this.$emit("category-delete");
    },
    resetNewTodo() {
      this.newTodoModel = "";
      this.submitting = false;
    },
    canAdd(title) {
      if (!title || !title.trim().length) {
        return false;
      }
      const lowerTodos = this.category.items.map(todo =>
        todo.title.toLowerCase()
      );
      return !lowerTodos.includes(title.toLowerCase());
    },
    addNewTodo() {
      this.submitting = true;
      this.addTodo({
        categoryId: this.category.id,
        todoTitle: this.newTodoModel
      }).finally(() => this.resetNewTodo());
    },
    addFromSearch() {
      this.addTodo({
        categoryId: this.category.id,
        todoTitle: this.catSearch
      }).finally(() => this.resetSearch());
    },
    resetSearch() {
      this.catSearch = "";
    },
    toggleExpansion() {
      this.expanded = !this.expanded;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.category-card {
  max-height: 40px;
  overflow: hidden;
  transition: all 300ms;

  &.expanded {
    max-height: 400px;

    .category-card-header {
      background-color: $color-border;

      &:hover,
      &:focus {
        background-color: $color-hover;
      }
    }

    .category-card-body {
      max-height: 360px;
      overflow: auto;
    }
  }

  &-header {
    align-items: center;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 5px;

    &:hover,
    &:focus {
      background-color: $color-hover;
    }

    .expand-button {
      color: $color-blue;
    }

    @mixin title {
      color: inherit;
      flex: 1;
      font-size: 19px;
      font-weight: 600;
      margin: 0;
      padding: 0 4px;
    }

    .title {
      @include title();
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .title-edit {
      @include title();
      background-color: transparent;
      border: none;
    }

    .pending-text {
      font-size: 14px;
      letter-spacing: -1px;
      margin: 0 8px;
    }
  }

  .todo-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .add-todo {
    border: none;
  }
}
</style>
