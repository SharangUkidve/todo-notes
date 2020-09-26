<template>
  <div class="hidden-overlay">
    <form
      class="modal"
      @submit.prevent="emitSaveNote()"
      autocomplete="off"
      @keyup.esc="emitCloseModal"
    >
      <div class="modal-header">
        <h2>{{ note && note.content.length ? "Edit Note" : "Add Note" }}</h2>
      </div>
      <fieldset class="modal-body">
        <div class="form-group">
          <label for="noteTitle" class="icon-button">
            <i class="material-icons">title</i>
          </label>
          <input
            type="text"
            v-autofocus
            id="noteTitle"
            name="noteTitle"
            placeholder="Note title goes here..."
            class="form-group-input"
            v-model.trim="newNote.title"
            required
            maxlength="100"
          />
          <span v-if="newNote.title.length" class="post-text">
            {{ newNote.title.length + "/100" }}
          </span>
        </div>
        <div class="form-group wrap">
          <label for="noteContent" class="icon-button">
            <i class="material-icons">notes</i>
          </label>
          <textarea
            id="noteContent"
            name="noteContent"
            placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
            class="form-group-input textarea"
            v-autoexpand="{ min: 150 }"
            required
            v-model="newNote.content"
            maxlength="750"
          />
          <span class="post-text full-width">{{
            newNote.content.length + "/750"
          }}</span>
        </div>
        <div class="form-group">
          <label for="noteCategory" class="icon-button">
            <i class="material-icons">label</i>
          </label>
          <select
            name="noteCategory"
            id="noteCategory"
            required
            v-model="newNote.tag"
            class="form-group-input"
          >
            <option value="" selected disabled>Choose a tag</option>
            <option
              v-for="option in noteCategories"
              :key="option.value"
              :value="option"
            >
              {{ option.title }}
            </option>
          </select>
        </div>
      </fieldset>
      <div class="modal-footer">
        <button type="button" class="cancel" @click="emitCloseModal">
          Cancel
        </button>
        <button type="submit" class="save" :disabled="disableSave">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import autoexpand from "../directives/autoexpand";
import { mapState } from "vuex";
export default {
  directives: { autoexpand },
  data() {
    return {
      newNote: {
        title: "",
        content: "",
        tag: ""
      }
    };
  },
  computed: {
    ...mapState(["noteCategories"]),
    disableSave() {
      const newNote = this.newNote;
      const note = this.note;
      if (
        newNote.id &&
        newNote.title.toLowerCase() === note.title.toLowerCase() &&
        newNote.content.toLowerCase() === note.content.toLowerCase() &&
        newNote.tag.value === note.tag.value
      ) {
        return true;
      } else if (
        !newNote.id &&
        newNote.title === "" &&
        newNote.content === "" &&
        newNote.tag === ""
      ) {
        return true;
      }
      return false;
    }
  },
  props: {
    note: Object
  },
  created() {
    if (this.note && this.note.content.length) {
      this.newNote = { ...this.note };
    }
    document.body.classList.add("modal-open");
  },
  destroyed() {
    document.body.classList.remove("modal-open");
  },
  methods: {
    emitCloseModal() {
      this.$emit("update:show", false);
    },
    emitSaveNote() {
      this.$emit("save-note", this.newNote);
    }
  }
};
</script>

<style lang="scss">
@import "../styles/variables.scss";
.hidden-overlay {
  pointer-events: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal {
  pointer-events: all;
  background-color: $color-background;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
    0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
    0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
    0 100px 80px rgba(0, 0, 0, 0.12);
  box-shadow: 0 0 2.2px rgba(0, 0, 0, 0.034), 0 0 5.3px rgba(0, 0, 0, 0.048),
    0 0 10px rgba(0, 0, 0, 0.06), 0 0 17.9px rgba(0, 0, 0, 0.072),
    0 0 33.4px rgba(0, 0, 0, 0.086), 0 0 80px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  height: 450px;
  margin: 20px;
  width: 600px;
  font-family: "Nunito", sans-serif;

  &-header {
    padding: 0 14px;
  }

  &-body {
    margin: 0;
    border: none;
    padding: 10px;
    overflow: auto;
    flex: 1;

    .form-group {
      * {
        transition: all 100ms;
      }

      &.wrap {
        flex-wrap: wrap;

        .full-width {
          width: 100%;
          margin-top: 3px;
          text-align: right;
          flex: 0 0 100%;
        }
      }

      &:focus-within {
        .icon-button {
          color: $color-blue;
        }
      }

      .textarea {
        transition: none;
        resize: vertical;
        padding: 3px 4px;
      }
    }
  }

  &-footer {
    display: flex;

    .save,
    .cancel {
      width: 100%;
      border: none;
      margin: 0;
      padding: 14px;
      background-color: transparent;
    }

    .save {
      color: $color-green;

      &:hover,
      &:focus,
      &:active {
        background-color: $color-green;
        color: #ffffff;
      }

      &:disabled {
        color: $color-grey;

        &:hover,
        &:focus,
        &:active {
          background-color: $color-grey;
          color: #ffffff;
          cursor: default;
        }
      }
    }

    .cancel {
      color: $color-red;

      &:hover,
      &:focus,
      &:active {
        background-color: $color-red;
        color: #ffffff;
      }
    }
  }

  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
    margin: 0;
  }
}
</style>
