<template>
  <div class="w-full h-full flex flex-col overflow-hidden bg-gray-2">
    <Header />
    <div class="w-full h-full flex-1 flex overflow-hidden">
      <!-- 菜单面板 -->
      <Menu />
      <!-- 编辑器面板 -->
      <Editor />
      <!-- 设置面板 -->
      <Setting />
    </div>
  </div>
</template>
<script setup lang="ts">
import Header from '@/views/form/components/header/header.vue';
import Menu from '@/views/form/components/menu/menu.vue';
import Editor from '@/views/form/components/editor/editor.vue';
import Setting from '@/views/form/components/setting/setting.vue';
</script>
<style lang="less" scoped></style>
