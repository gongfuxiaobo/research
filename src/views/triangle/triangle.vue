<template>
  <div class="w-full h-full overflow-hidden">
    <canvas id="triangle-canvas" class="w-full h-full bg-black"></canvas>
  </div>
</template>
<script setup lang="ts">
import Triangle from '@/views/triangle/types/Triangle';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const canvas = ref<Triangle | undefined>(undefined);

onMounted(() => {
  canvas.value = new Triangle({ id: 'triangle-canvas' }) || undefined;
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
