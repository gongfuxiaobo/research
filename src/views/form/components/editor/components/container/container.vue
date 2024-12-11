<template>
  <div class="w-full min-h-28 rounded-lg border-dashed border-gray-5 border mb-4 cursor-move overflow-hidden bg-white draggable hover:border-orange">
    <div class="w-full px-4 py-2 relative">
      <div class="flex justify-end">
        <div class="">{{ node.name }}</div>
      </div>
      <div class="flex items-center my-2 gap-1">
        <div class="w-32 text-right">{{ node.title }}</div>
        <span class="mr-1">:</span>
        <div class="flex-1">
          <slot />
        </div>
      </div>
      <div class="flex justify-end gap-1">
        <a-button type="text" size="small">
          <template #icon>
            <UpOutlined />
          </template>
        </a-button>
        <a-button type="text" size="small">
          <template #icon>
            <DownOutlined />
          </template>
        </a-button>
        <a-button type="text" size="small">
          <template #icon>
            <DeleteOutlined />
          </template>
        </a-button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { UpOutlined, DownOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import Node from '@/views/form/types/node/Node';

const props = defineProps<{
  node: Node;
}>();
</script>
<style lang="less" scoped></style>
