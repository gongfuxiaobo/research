<template>
  <div class="w-full h-full overflow-hidden">
    <canvas id="k8s-canvas" class="w-full h-full bg-black"></canvas>
  </div>
</template>
<script setup lang="ts">
import K8s from '@/views/k8s/types/K8s';
import Resource from '@/views/k8s/types/Resource1';
import { onBeforeUnmount, onMounted, ref, watch } from 'vue';

const canvas = ref<Resource | undefined>(undefined);
const loading = ref<boolean>(false); // 加载状态
const list = ref<K8s[]>([]); // k8s列表

/**
 * 重绘
 */
function redraw(): void {
  canvas.value?.redraw(list.value);
}

/**
 * 绘制k8s
 */
function draw(): void {
  if (canvas.value) {
    redraw();
  } else {
    canvas.value = new Resource({ id: 'k8s-canvas', list: list.value }) || undefined;
  }
}

/**
 * 获取数据
 */
async function getK8sList(): Promise<void> {
  if (loading.value) {
    return;
  }
  loading.value = true;
  try {
    const res: K8s[] = await K8s.getK8sList();
    list.value = res ?? [];
  } finally {
    loading.value = false;
  }
}

watch(
  () => list.value,
  () => {
    draw();
  }
);

onMounted(() => {
  getK8sList();
  window.addEventListener('resize', () => {
    redraw();
  });
});

onBeforeUnmount(() => {
  canvas.value?.destroy();
  window.removeEventListener('resize', () => {
    redraw();
  });
});
</script>
<style lang="less" scoped></style>
