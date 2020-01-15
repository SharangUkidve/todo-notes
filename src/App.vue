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
  min-height: 100vh;
  width: 100%;

  .main-container {
    margin: 60px auto;
    max-width: 1000px;
    padding: 10px;
    width: 100%;
  }
}
</style>
