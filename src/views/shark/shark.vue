<template>
  <div class="w-full h-full overflow-hidden bg-black">
    <div class="flex flex-col justify-center items-center">
      <div class="text-center mt-8">
        <span class="text-6xl font-serif text-blue m-0 font-normal shark-txt">前端扫光</span>
      </div>
      <div class="w-32 mt-8 shark-wrap" :style="`-webkit-mask: url(${shark1}) 0 0/100%`">
        <img class="w-full h-auto" :src="shark1" />
      </div>
      <div class="w-40 mt-8 rounded-[40rem] shark-wrap" :style="`-webkit-mask: url(${shark2}) 0 0/100%`">
        <img class="w-full h-auto" :src="shark2" />
      </div>
      <div class="w-80 mt-8 shark-wrap" :style="`-webkit-mask: url(${shark3}) 0 0/100%`">
        <img class="w-full h-auto" :src="shark3" />
      </div>
      <div class="w-96 mt-8 rounded-lg shark-wrap" :style="`-webkit-mask: url(${shark4}) 0 0/100%`">
        <img class="w-full h-auto" :src="shark4" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import shark1 from '@/assets/images/shark/1.png';
import shark2 from '@/assets/images/shark/2.png';
import shark3 from '@/assets/images/shark/3.png';
import shark4 from '@/assets/images/shark/4.png';
</script>
<style lang="less" scoped>
.shark-txt {
  -webkit-text-fill-color: transparent;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0) 60%) -100%/50% no-repeat currentColor;
  -webkit-background-clip: text;
  animation: shark-txt 2s infinite;
}

@keyframes shark-txt {
  to {
    background-position: 200%;
  }
}

.shark-wrap {
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.shark-wrap::after {
  content: '';
  position: absolute;
  inset: -20%;
  background: linear-gradient(45deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0) 60%);
  transform: translateX(-100%);
  animation: shark-wrap 2s infinite;
}

@keyframes shark-wrap {
  to {
    transform: translateX(100%);
  }
}
</style>
