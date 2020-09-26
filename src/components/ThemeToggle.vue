<template>
  <icon-button @click="toggleTheme" class="toggle-icon">
    {{ isDark ? "brightness_4" : "brightness_7" }}
  </icon-button>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["isDark"])
  },
  methods: {
    toggleTheme() {
      this.$store.commit("toggleTheme");
    }
  }
};
</script>

<style lang="scss" scoped>
.toggle-icon {
  color: inherit;
}
</style>
