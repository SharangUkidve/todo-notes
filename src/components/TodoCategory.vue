<template>
  <section class="category-card" :class="{ expanded: expanded }">
    <header
      class="category-card-header"
      role="button"
      tabindex="0"
      @click="toggleExpansion"
      @keyup.space="toggleExpansion"
    >
      <span class="expand-button icon-button" title="Expand/Collapse Category">
        <i class="material-icons">{{ expanded ? "remove" : "add" }}</i>
      </span>
      <h3 class="title" v-if="!categoryTitleEditing">{{ category.title }}</h3>
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

      <span v-if="infoText">{{ infoText }}</span>
      <icon-button
        class="edit-button"
        @click.stop="toggleTitleEdit"
        :title="categoryTitleEditing ? 'Save New Title' : 'Edit Category Title'"
      >
        {{ categoryTitleEditing ? "check" : "edit" }}
      </icon-button>
      <icon-button
        class="delete-button"
        @click.stop="deleteCategory"
        title="Delete Category"
      >
        delete
      </icon-button>
    </header>
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
          :id="'catSearch' + category.title"
          v-model.trim="catSearch"
        />
        <icon-button
          class="grey-text"
          tabindex="-1"
          v-if="catSearch.length"
          @click="resetSearch"
          title="Clear Search"
        >
          cancel
        </icon-button>
        <icon-button
          class="blue-text"
          tabindex="-1"
          v-if="catSearch.length && !filteredItems.length"
          @click="addFromSearch"
          title="Save New Todo"
        >
          add
        </icon-button>
      </div>
      <ul class="todo-list">
        <todo-item
          v-for="todo of filteredItems"
          :key="todo.title"
          :todo="todo"
          @todo-update="updateTodoStatus($event, todo)"
          @todo-delete="deleteTodo(todo)"
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
            />
            <icon-button
              size="16px"
              class="grey-text"
              v-if="newTodoModel.length"
              @click="resetNewTodo"
              title="Clear New Todo"
            >
              cancel
            </icon-button>
            <icon-button
              class="blue-text"
              v-if="newTodoModel.length"
              @click="addNewTodo"
              title="Save New Todo"
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
      expanded: false
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
    },
    deleteCategory() {
      this.$emit("category-delete");
    },
    resetNewTodo() {
      this.newTodoModel = "";
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
      if (this.canAdd(this.newTodoModel)) {
        this.$store.commit("addNewTodo", {
          categoryId: this.category.id,
          todoTitle: this.newTodoModel
        });
        this.resetNewTodo();
      }
    },
    resetSearch() {
      this.catSearch = "";
    },
    toggleExpansion() {
      this.expanded = !this.expanded;
    },
    addFromSearch() {
      if (this.canAdd(this.catSearch)) {
        this.$store.commit("addNewTodo", {
          categoryId: this.category.id,
          todoTitle: this.catSearch
        });
        this.resetSearch();
      }
    },
    updateTodoStatus(newValue, todo) {
      this.$store.commit("updateTodoStatus", {
        categoryId: this.category.id,
        todo,
        done: newValue
      });
    },
    deleteTodo(todo) {
      this.$store.commit("deleteTodo", { categoryId: this.category.id, todo });
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
    }

    .category-card-body {
      max-height: 360px;
      overflow: auto;
    }
  }

  &-header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    cursor: pointer;

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

    .edit-button,
    .delete-button {
      opacity: 0.5;

      &:active,
      &:focus,
      &:hover {
        opacity: 1;
      }
    }

    .edit-button {
      color: $color-green;
    }

    .delete-button {
      color: $color-red;
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
