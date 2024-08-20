<template>
  <div class="w-full h-full overflow-hidden">
    <canvas id="heart-beat-canvas" class="w-full h-full bg-black"></canvas>
  </div>
</template>
<script setup lang="ts">
import HeartBeat from '@/views/heartBeat/types/HeartBeat';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const canvas = ref<HeartBeat | undefined>(undefined);

onMounted(() => {
  canvas.value = new HeartBeat('heart-beat-canvas') || undefined;
  window.addEventListener('resize', () => {
    canvas.value?.init();
  });
});

onBeforeUnmount(() => {
  canvas.value?.destroy();
  window.removeEventListener('resize', () => {
    canvas.value?.init();
  });
});
</script>
<style lang="less" scoped></style>
