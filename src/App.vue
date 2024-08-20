<script setup lang="ts">
import { RouterView } from 'vue-router';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
const locale = zhCN;
</script>

<template>
  <a-config-provider :locale="locale">
    <div class="w-full h-full">
      <router-view />
    </div>
  </a-config-provider>
</template>

<style lang="less" scoped>
* {
  margin: 0;
  position: relative;
  font-weight: normal;
}
</style>
