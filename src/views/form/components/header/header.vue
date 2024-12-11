<template>
  <div class="w-full px-4 h-14 flex justify-between items-center overflow-hidden bg-white border-b border-gray-3 border-solid">
    <div class="text-lg font-bold">表单编辑器</div>
    <div>
      <a-button type="primary" class="!rounded ml-2">
        <template #icon>
          <FormOutlined />
        </template>
        编辑
      </a-button>
      <a-button class="!rounded ml-2">
        <template #icon>
          <FundViewOutlined />
        </template>
        预览
      </a-button>
      <a-button class="!rounded ml-2">
        <template #icon>
          <ExportOutlined />
        </template>
        导出
      </a-button>
      <a-button class="!rounded ml-2">
        <template #icon>
          <ImportOutlined />
        </template>
        导入
      </a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { FormOutlined, FundViewOutlined, ExportOutlined, ImportOutlined } from '@ant-design/icons-vue';
</script>
<style lang="less" scoped></style>
