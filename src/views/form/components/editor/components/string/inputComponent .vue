<template>
  <Container :node="node">
    <a-input :value="node.defaultValue" :placeholder="node.placeholder" />
  </Container>
</template>
<script setup lang="ts">
import Container from '@/views/form/components/editor/components/container/container.vue';
import Input from '@/views/form/types/node/string/InputNode';

const props = defineProps<{
  node: Input; // 节点数据对象
}>();
</script>
<style lang="less" scoped></style>
