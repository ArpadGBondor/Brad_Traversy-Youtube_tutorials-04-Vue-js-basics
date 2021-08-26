<template>
  <button :style="{ background: color }" class="btn" @click="$emit('click-button')">
    <fa v-if="spinner" class="spinner" icon="spinner" />
    <span v-else>{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      default: 'Click Me',
    },
    color: {
      type: String,
      default: 'steelblue',
    },
    spinner: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
