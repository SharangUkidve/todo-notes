<template>
  <button
    class="icon-button"
    @click.stop="emitEvent('click.stop', $event)"
    @click="emitEvent('click', $event)"
  >
    <i class="material-icons" :style="{ fontSize: size }"> <slot></slot></i>
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
