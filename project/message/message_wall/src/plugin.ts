import { App } from "vue";
import myButton from "./components/myButton.vue";
import createMessage from "@/components/LJ/message/message";
export default {
  install(app: App) {
    app.component("myButton", myButton);
    app.config.globalProperties.$message = createMessage;
  },
};
