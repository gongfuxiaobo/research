<template>
  <div class="w-full h-full overflow-hidden">
    <canvas id="keyboard-canvas" class="w-full h-full bg-black"></canvas>
  </div>
</template>
<script setup lang="ts">
import Input from '@/views/input/types/Input';
import { onBeforeUnmount, onMounted, ref } from 'vue';

const canvas = ref<Input | undefined>(undefined);

onMounted(() => {
  canvas.value = new Input({ id: 'keyboard-canvas' }) || undefined;
  window.addEventListener('resize', () => {
    canvas.value?.redraw();
  });
  window.addEventListener('keydown', (event: KeyboardEvent) => {
    canvas.value?.keyDown(event);
  });
});

onBeforeUnmount(() => {
  canvas.value?.destroy();
  window.removeEventListener('resize', () => {
    canvas.value?.redraw();
  });
  window.removeEventListener('keydown', (event: KeyboardEvent) => {
    canvas.value?.keyDown(event);
  });
});
</script>
<style lang="less" scoped></style>
