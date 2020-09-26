<template>
  <div class="page-container">
    <div class="notes-container">
      <NoteCard
        v-for="note of notes"
        :key="note.id"
        :note="note"
        @edit-note="openNoteModal(note)"
        @delete-note="deleteNote(note.id)"
      />
    </div>
    <div class="overlay" v-if="showAddNote" @click="closeNoteModal"></div>
    <transition name="scalin">
      <add-note
        v-if="showAddNote"
        :note="editingNote"
        :show="showAddNote"
        @update:show="closeNoteModal"
        @save-note="saveNote($event)"
      />
    </transition>
    <icon-button
      class="add-button"
      @click="toggleNoteModal"
      :class="{ rotated: showAddNote }"
      size="32px"
    >
      add
    </icon-button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NoteCard from "../components/NoteCard";
import AddNote from "../components/AddNote";
import titleMixin from "../mixins/title-mixin";
export default {
  components: {
    NoteCard,
    AddNote
  },
  mixins: [titleMixin],
  computed: mapState(["notes"]),
  data() {
    return {
      title: "Notes",
      editingNote: null,
      showAddNote: false
    };
  },
  methods: {
    ...mapActions(["deleteNote"]),
    openNoteModal(note = null) {
      this.editingNote = note;
      this.showAddNote = true;
    },
    closeNoteModal() {
      this.editingNote = null;
      this.showAddNote = false;
    },
    toggleNoteModal() {
      this.showAddNote = !this.showAddNote;
    },
    saveNote(note) {
      this.$store.dispatch(note.id ? "updateNote" : "addNote", note);
      this.closeNoteModal();
    }
  }
};
</script>

<style lang="scss">
@import "../styles/variables.scss";
@import "../styles/mixins.scss";
.overlay {
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(1px);
}
.notes-container {
  display: flex;
  flex-wrap: wrap;
  font-family: "Nunito", sans-serif;
  position: relative;
}
.add-button {
  @include base-button();
  background-color: $color-blue;
  border-radius: 50%;
  bottom: 60px;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  color: #ffffff;
  height: 56px;
  position: fixed;
  right: 60px;
  width: 56px;
  z-index: 1000;
  i {
    transition: all 300ms;
  }
  &.rotated {
    i {
      transform: rotate(135deg);
    }
    @media only screen and (max-width: 600px) {
      display: none;
    }
  }
}
.scalin-enter-active {
  animation: scalin 300ms;
}
.scalin-leave-active {
  animation: scalin 300ms reverse;
}
@media (prefers-reduced-motion) {
  .scalin-enter-active,
  .scalin-leave-active {
    animation: none;
  }
}
@keyframes scalin {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
