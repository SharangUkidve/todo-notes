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
