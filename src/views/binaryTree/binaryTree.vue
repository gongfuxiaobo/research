<template>
  <div class="w-full h-full overflow-hidden">
    <canvas id="binary-tree-canvas" class="w-full h-full bg-black"></canvas>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import Child from '@/views/binaryTree/types/Child';

const child = ref<Child | undefined>(undefined);

onMounted(() => {
  child.value = new Child({ id: 'binary-tree-canvas' }) || undefined;
  // window.addEventListener('resize', () => {
  //   canvas.value?.redraw();
  // });
});

// onBeforeUnmount(() => {
//   canvas.value?.destroy();
//   window.removeEventListener('resize', () => {
//     canvas.value?.redraw();
//   });
// });
</script>
<style lang="less" scoped></style>
