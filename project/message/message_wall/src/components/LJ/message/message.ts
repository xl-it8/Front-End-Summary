import { createVNode, render } from "vue";
import Message from "./message.vue";

// 准备dom容器
const div = document.createElement("div");
// 添加类名
div.setAttribute("class", "message-container");
// 添加到body上
document.body.appendChild(div);

// 定时器标识
let timer: number | undefined;

export default ({ message, type }: { message: string; type: string }) => {
  // 1. 导入组件
  // 2. 根据组件创建虚拟节点   第一个参数为要创建的虚拟节点  第二个参数为props的参数
  const vnode = createVNode(Message, { message, type });
  // 3. 准备一个DOM容器
  // 4. 把虚拟节点渲染DOM容器中
  render(vnode, div);
  // 5. 开启定时器，移出DOM容器内容
  clearTimeout(timer);
  timer = setTimeout(() => {
    render(null, div);
  }, 2000);
};
