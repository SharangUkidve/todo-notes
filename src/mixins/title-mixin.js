export default {
  mounted() {
    const title = this.title;
    if (title) {
      document.title = `Vue Demo | ${title}`;
    }
  }
};
