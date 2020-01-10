<template>
  <div id="app">
    <app-header />
    <div class="main-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
export default {
  components: { AppHeader }
};
</script>

<style lang="scss">
@import "./styles/variables.scss";
@import "./styles/global.scss";
#app {
  color: $color-text;
  width: 100%;
  min-height: 100vh;

  .main-container {
    width: 100%;
    max-width: 1000px;
    padding: 10px;
    margin: auto;
  }
}
</style>
