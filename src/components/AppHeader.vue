<template>
  <header class="app-header">
    <div class="row">
      <h1 class="app-title">TODO-NOTES</h1>
      <ThemeToggle />
    </div>
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
import ThemeToggle from "./ThemeToggle";
export default {
  components: { ThemeToggle },
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
            activeAnchor.offsetLeft - 1 + "px";
          this.$refs.activeTabIndicator.style.width =
            (activeAnchor.clientWidth ||
              activeAnchor.getBoundingClientRect().width) -
            1 +
            "px";
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
  font-family: "Gochi Hand", sans-serif;
  user-select: none;
  position: relative;

  .row {
    display: flex;
    align-items: center;
    padding: 10px;
  }

  .app-title {
    letter-spacing: 2px;
    margin: 0;
    flex: 1;
  }

  &-nav {
    margin: auto;
    max-width: 1000px;
    text-align: center;

    .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;

      &-item {
        width: 100%;

        .nav-link {
          color: inherit;
          display: block;
          font-size: 19px;
          opacity: 0.8;
          padding: 10px;
          text-decoration: none;
          width: 100%;

          &-active {
            font-weight: bold;
            opacity: 1;
          }
        }
      }
    }
  }

  .active-tab-indicator {
    background-color: $color-blue;
    bottom: -1px;
    height: 2px;
    left: 0;
    position: absolute;
    transition: all 300ms;
    width: 100%;
    z-index: 10;
  }
}
</style>
