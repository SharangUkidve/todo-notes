function resizer(el, min, max) {
  return () => {
    el.style.height = "";
    const minCurr = min ? Math.max(el.scrollHeight, min) : el.scrollHeight;
    el.style.height = (max ? Math.min(minCurr, max) : minCurr) + "px";
  };
}

export default {
  bind(el, binding) {
    const min = binding.value && binding.value.min;
    const max = binding.value && binding.value.max;
    el.style.minHeight = min + "px";
    el.style.maxHeight = max + "px";
    el.addEventListener("input", resizer(el, min, max));
  },
  unbind(el, binding) {
    const min = binding.value && binding.value.min;
    const max = binding.value && binding.value.max;
    el.style.minHeight = undefined;
    el.style.maxHeight = undefined;
    removeEventListener("input", resizer(el, min, max));
  }
};
