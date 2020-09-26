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
  display: flex;
  flex-direction: column;
  margin: 12px;
  padding: 8px 16px 16px;
  transition: all 300ms;
  color: #2c3e50;
  width: calc(50% - 24px);

  &:hover {
    box-shadow: $box-shadow;
  }

  &-header {
    display: flex;
    flex-wrap: wrap;
  }

  &-tag {
    flex: 0 0 100%;
    margin: 4px 0 -4px;
    font-size: 12px;
    letter-spacing: -0.3px;
    color: #666666;
  }

  &-title {
    margin: 0;
    flex: 1;
    letter-spacing: -0.7px;
  }

  &-text {
    line-height: 1.4;
    white-space: pre-line;
    word-break: break-all;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  &-time {
    color: #555555;
    letter-spacing: -0.5px;
    font-size: 12px;
    margin-top: auto;
  }

  @media only screen and (max-width: 800px) {
    width: 100%;
  }
}
</style>
