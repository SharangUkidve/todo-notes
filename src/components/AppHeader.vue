<template>
  <header class="app-header">
    <h1 class="app-title">TODO-NOTES</h1>
    <nav class="app-header-nav">
      <ul class="nav-list">
        <li v-for="route of routes" :key="route.name" class="nav-list-item">
          <router-link
            :to="route.name"
            ref="navLinks"
            class="nav-link"
            active-class="nav-link-active"
          >
            {{ route.title }}
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="active-tab-indicator" ref="activeTabIndicator"></div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        { name: "todos", title: "Todos" },
        { name: "notes", title: "Notes" }
      ]
    };
  },
  created() {
    this.$watch(() => this.$route.name, this.changeIndicatorPosition, {
      immediate: true
    });
  },
  mounted() {
    window.addEventListener("resize", this.changeIndicatorPosition);
  },
  methods: {
    getActiveLinkElement(links) {
      const activeLink = links.find(link =>
        link.$el.classList.contains("nav-link-active")
      );
      return activeLink ? activeLink.$el : null;
    },
    changeIndicatorPosition() {
      setTimeout(() => {
        const activeAnchor = this.getActiveLinkElement(this.$refs.navLinks);
        if (activeAnchor) {
          this.$refs.activeTabIndicator.style.left =
            activeAnchor.offsetLeft + "px";
          this.$refs.activeTabIndicator.style.width =
            (activeAnchor.clientWidth ||
              activeAnchor.getBoundingClientRect().width) + "px";
        } else {
          this.$refs.activeTabIndicator.style.width = 0;
        }
      }, 0);
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.changeIndicatorPosition);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../styles/variables.scss";
.app-header {
  border-bottom: $border;
  position: relative;

  .app-title {
    margin: 0;
    padding: 10px;
  }

  &-nav {
    max-width: 1000px;
    margin: auto;
    text-align: center;

    .nav-list {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;

      &-item {
        width: 100%;

        .nav-link {
          display: block;
          width: 100%;
          padding: 10px;
          text-decoration: none;
          color: inherit;
          opacity: 0.8;

          &-active {
            font-weight: bold;
            opacity: 1;
          }
        }
      }
    }
  }

  .active-tab-indicator {
    position: absolute;
    height: 2px;
    bottom: -1px;
    left: 0;
    background-color: $color-blue;
    width: 100%;
    transition: all 300ms;
    z-index: 10;
  }
}
</style>
