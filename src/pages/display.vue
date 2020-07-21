<template>
  <div>
    <h3>动态渲染 .vue文件的组件-Display</h3>
    <i-display :code="code"></i-display>
  </div>
</template>

<script>
import IDisplay from "@/components/display/display";
import defaultCode from "@/default-code.js";

export default {
  name: "display",
  components: { IDisplay },
  data() {
    return {
      code: defaultCode
    };
  }
};
</script>