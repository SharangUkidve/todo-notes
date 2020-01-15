<template>
  <div class="note" :style="{ backgroundColor: note.tag.color }">
    <header class="note-header">
      <h4 class="note-tag">{{ note.tag.title }}</h4>
      <h2 class="note-title">{{ note.title }}</h2>
      <icon-button
        class="edit-button blue-text"
        title="Edit Note"
        @click="editNote"
      >
        edit
      </icon-button>
      <icon-button
        class="delete-button red-text"
        title="Delete Note"
        @click="deleteNote"
      >
        delete
      </icon-button>
    </header>
    <p class="note-text">{{ note.content }}</p>
    <small class="note-time">
      Last Mod. <time>{{ note.date }}</time>
    </small>
  </div>
</template>

<script>
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteNote() {
      this.$emit("delete-note");
    },
    editNote() {
      this.$emit("edit-note");
    }
  }
};
</script>

<style lang="scss">
@import "../styles/variables.scss";
.note {
  box-shadow: 3px 10px 6px -6px $color-border;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  margin: 12px;
  padding: 8px 16px 16px;
  transition: all 600ms;
  width: calc(50% - 24px);

  &:hover {
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12);
  }

  &-header {
    display: flex;
    flex-wrap: wrap;
  }

  &-tag {
    flex: 0 0 100%;
    margin: 0;
    font-size: 12px;
  }

  &-title {
    margin: 0;
    flex: 1;
  }

  &-text {
    white-space: pre-line;
  }

  &-time {
    color: $color-grey;
    font-size: 12px;
    margin-top: auto;
  }

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
}
</style>
