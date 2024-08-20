import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/research/',
  plugins: [vue(), vueJsx(), Components({ resolvers: [AntDesignVueResolver({ importStyle: false })], dts: false })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    port: 9999, // 设置服务启动端口号
    open: false, // 设置服务启动时是否自动打开浏览器
    cors: true // 允许跨域
    // 设置代理，根据我们项目实际情况配置
    // proxy: {
    //   '/api': {
    //     target: 'https://xxxx.xxx.cn',
    //     changeOrigin: true,
    //     secure: true,
    //     rewrite: (path) => path.replace('/^\/api/', '')
    //   }
    // }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true, //注意，这一句是在less对象中，写在外边不起作用
        modifyVars: {
          //在这里进行主题的修改，参考官方配置属性
          '@primary-color': '#FF6F32', // 全局主色
          '@success-color': '#2DAD69', // 成功色
          '@warning-color': '#FFA623', // 警告色
          '@error-color': '#FF3B30' // 错误色
        }
      },
      locale: 'zh-cn'
    }
  }
});
