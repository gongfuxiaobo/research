<template>
  <div class="w-full h-full overflow-hidden">
    <canvas id="rain-canvas" class="w-full h-full bg-black"></canvas>
  </div>
</template>
<script setup lang="ts">
import Rain from '@/views/rain/types/Rain';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const canvas = ref<Rain | undefined>(undefined);

onMounted(() => {
  canvas.value = new Rain({ id: 'rain-canvas' }) || undefined;
  window.addEventListener('resize', () => {
    canvas.value?.redraw();
  });
});

onBeforeUnmount(() => {
  canvas.value?.destroy();
  window.removeEventListener('resize', () => {
    canvas.value?.redraw();
  });
});
</script>
<style lang="less" scoped></style>
