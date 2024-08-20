<template>
  <div class="w-full h-full flex justify-center items-center bg-white">
    <div class="flex justify-center items-center">
      <img class="w-72 h-auto" src="@/assets/images/403.png" />

      <div class="ml-10">
        <div class="error-name font-normal text-gray-8">403</div>

        <div class="text-2xl font-normal text-gray-7">抱歉，您无权访问该页面</div>

        <a-button class="mt-12" type="primary" @click="goBackHome">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

// 返回首页
const goBackHome = (): void => {
  router.replace('/home');
};
</script>

<style lang="less">
.error-name {
  font-size: 80px;
}
</style>
