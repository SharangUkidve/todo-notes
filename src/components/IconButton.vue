<template>
  <button class="icon-button">
    <i
      class="material-icons"
      @click.stop="emitEvent('click.stop', $event)"
      @click="emitEvent('click', $event)"
      :style="{ fontSize: size }"
      ><slot></slot
    ></i>
  </button>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: "24px"
    }
  },
  methods: {
    emitEvent(eventName, event) {
      this.$emit(eventName, event);
    }
  }
};
</script>

<style lang="scss">
@import "../styles/variables.scss";
@import "../styles/mixins.scss";
.icon-button {
  @include base-button();
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  padding: 3px;
  i {
    font-size: 20px;
  }
}
</style>
