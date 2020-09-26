<template>
  <div class="page-container">
    <div class="form-group add-cat">
      <label for="newCatTitle" class="icon-button grey-text">
        <i class="material-icons">add</i>
      </label>
      <input
        type="text"
        id="newCatTitle"
        name="newCatTitle"
        autocomplete="off"
        maxlength="100"
        class="form-group-input"
        placeholder="Add a New Category..."
        v-model.trim="newCatTitle"
        @keyup.enter="addNewCategory"
        @keyup.esc="resetNewCategory"
      />
      <icon-button
        class="grey-text"
        v-if="newCatTitle.length"
        @click="resetNewCategory"
        size="18px"
      >
        cancel
      </icon-button>
      <span class="post-text" v-if="newCatTitle.length">{{
        newCatTitle.length + "/100"
      }}</span>
      <icon-button
        class="blue-text"
        v-if="newCatTitle.length"
        @click="resetNewCategory"
      >
        check
      </icon-button>
    </div>
    <div class="cat-cards-container">
      <todo-category
        v-for="category of categories"
        :key="category.id"
        :category="category"
        @category-delete="deleteCategory(category.id)"
        @category-title-change="changeCategoryTitle($event, category.id)"
      />
    </div>
  </div>
</template>

<script>
import TodoCategory from "../components/TodoCategory";
import { mapState, mapActions } from "vuex";
import titleMixin from "../mixins/title-mixin";
export default {
  components: { TodoCategory },
  mixins: [titleMixin],
  computed: mapState(["categories"]),
  data() {
    return {
      newCatTitle: "",
      title: "Todos"
    };
  },
  methods: {
    ...mapActions(["deleteCategory"]),
    addNewCategory() {
      this.$store
        .dispatch("addCategory", this.newCatTitle)
        .finally(() => this.resetNewCategory());
    },
    changeCategoryTitle(newTitle, categoryId) {
      this.$store.dispatch("updateCategoryTitle", { categoryId, newTitle });
    },
    resetNewCategory() {
      this.newCatTitle = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";

.page-container {
  font-family: "Comfortaa", cursive;
}

.add-cat {
  border: $border;
  .form-group-input {
    font-weight: 600;
  }
}

.cat-cards-container {
  border: $border;
  border-top: none;

  &:empty {
    border: none;
  }
}
</style>
