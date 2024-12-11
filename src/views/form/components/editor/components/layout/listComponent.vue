<template>
  <Container :node="node">
    <div>list</div>
  </Container>
</template>
<script setup lang="ts">
import Container from '@/views/form/components/editor/components/container/container.vue';
import List from '@/views/form/types/node/layout/ListNode';

const props = defineProps<{
  node: List; // 节点数据对象
}>();
</script>
<style lang="less" scoped></style>
