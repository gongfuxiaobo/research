import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/assets/main.less';
import App from './App.vue';
import router from '@/router';
import { httpErrorHandler } from '@/apis/request';

const app = createApp(App);
// 初始化store
app.use(createPinia());
// 初始化路由
app.use(router);
// 初始化app
app.mount('#app');

/** 监听未捕获的错误 */
app.config.errorHandler = (error) => {
  // 处理http请求错误
  httpErrorHandler(error);
  // 打印错误信息
  console.error(error);
};
