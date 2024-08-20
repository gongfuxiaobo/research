<template>
  <div class="w-full h-full overflow-hidden">
    <canvas id="sin-canvas" class="w-full h-full bg-black"></canvas>
  </div>
</template>
<script setup lang="ts">
import Sin from '@/views/sin/types/Sin';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const canvas = ref<Sin | undefined>(undefined);

onMounted(() => {
  canvas.value = new Sin({ id: 'sin-canvas' }) || undefined;
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
