<template>
  <Container :node="node">
    <div>object</div>
  </Container>
</template>
<script setup lang="ts">
import Container from '@/views/form/components/editor/components/container/container.vue';
import Object from '@/views/form/types/node/layout/ObjectNode';

const props = defineProps<{
  node: Object; // 节点数据对象
}>();
</script>
<style lang="less" scoped></style>
