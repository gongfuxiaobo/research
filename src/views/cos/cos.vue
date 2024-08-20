<template>
  <div class="w-full h-full overflow-hidden">
    <canvas id="cos-canvas" class="w-full h-full bg-black"></canvas>
  </div>
</template>
<script setup lang="ts">
import Cos from '@/views/cos/types/Cos';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const canvas = ref<Cos | undefined>(undefined);

onMounted(() => {
  canvas.value = new Cos({ id: 'cos-canvas' }) || undefined;
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
