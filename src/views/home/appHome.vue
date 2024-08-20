<template>
  <div class="w-full h-full flex justify-center items-center bg-black">
    <div class="grid grid-cols-4 gap-4 w-[43rem]">
      <a-button type="primary" size="large" class="col-span-1" @click="handleGoPage('/heartBeat')">心跳</a-button>
      <a-button type="primary" size="large" class="col-span-1" @click="handleGoPage('/sin')">正弦函数</a-button>
      <a-button type="primary" size="large" class="col-span-1" @click="handleGoPage('/cos')">余弦函数</a-button>
      <a-button type="primary" size="large" class="col-span-1" @click="handleGoPage('/rain')">数字雨</a-button>
      <a-button type="primary" size="large" class="col-span-1" @click="handleGoPage('/input')">输入</a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

/**
 * 跳转页面
 * @param path
 */
function handleGoPage(path: string) {
  router.push({
    path,
    query: {}
  });
}
</script>
<style lang="less" scoped></style>
