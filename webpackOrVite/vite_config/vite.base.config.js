import { defineConfig } from "vite";
import devConfig from "./vite.dev.config";
import prodConfig from "./vite.prod.config";
//插件vite-plugin-checker 就是js与ts结合
//vite 环境变量
/*
  配置文件注入到 process.env
  客户端注入方式 import.meta.env
*/
const baseConfig = {
    
};

const config = {
  dev: (baseConfig) => ({ ...baseConfig, ...devConfig }),
  prod: (baseConfig) => ({ ...baseConfig, ...prodConfig }),
};
export default defineConfig((command) => {
  return config[command](baseConfig);
});
