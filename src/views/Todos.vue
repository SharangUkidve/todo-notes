<template>
  <div class="page-container">
    <h1 class="page-title">Todos</h1>
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
        @click="resetNewCategory"
        v-if="newCatTitle.length"
      >
        cancel
      </icon-button>
      <span class="post-text" v-if="newCatTitle.length">{{
        newCatTitle.length + "/100"
      }}</span>
      <icon-button
        class="blue-text"
        @click="resetNewCategory"
        v-if="newCatTitle.length"
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
import { mapState, mapMutations } from "vuex";
export default {
  components: { TodoCategory },
  computed: mapState(["categories"]),
  data() {
    return {
      newCatTitle: ""
    };
  },
  methods: {
    ...mapMutations(["deleteCategory"]),
    canAdd(title) {
      if (!title || !title.length) {
        return false;
      }
      const lowerCategories = this.categories.map(cat =>
        cat.title.toLowerCase()
      );
      return !lowerCategories.includes(title.toLowerCase());
    },
    addNewCategory() {
      if (this.canAdd(this.newCatTitle)) {
        this.$store.commit("addNewCategory", this.newCatTitle);
        this.resetNewCategory();
      }
    },
    changeCategoryTitle(newTitle, categoryId) {
      if (this.canAdd(newTitle)) {
        this.$store.commit("updateCategoryTitle", { categoryId, newTitle });
      }
    },
    resetNewCategory() {
      this.newCatTitle = "";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables.scss";
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

.post-text {
  align-self: center;
}
</style>
