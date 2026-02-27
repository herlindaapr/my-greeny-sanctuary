<script setup lang="ts">
const props = defineProps<{
  class?: string
}>()
</script>

<template>
  <div :class="['relative overflow-hidden', props.class]">
    <div class="scroll-area-viewport h-full w-full max-h-[70vh] rounded-[inherit] overflow-y-auto pr-2">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.scroll-area-viewport {
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.9) transparent;
}

.scroll-area-viewport::-webkit-scrollbar {
  width: 8px;
}

.scroll-area-viewport::-webkit-scrollbar-track {
  background: transparent;
}

.scroll-area-viewport::-webkit-scrollbar-thumb {
  background-color: rgba(148, 163, 184, 0.9);
  border-radius: 9999px;
}
</style>

