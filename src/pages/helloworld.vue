<template>
  <div class="hello">
    <i-form ref="form" :model="formValidate" :rules="ruleValidate">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="formValidate.name" />
      </i-form-item>
      <i-form-item label="密码" prop="password">
        <i-input v-model="formValidate.password" />
      </i-form-item>
    </i-form>
    <button @click="handleSubmit">提交</button>
    <button @click="handleReset">重置</button>
  </div>
</template>

<script>
import iForm from "@/components/form/form";
import iFormItem from "@/components/form/form-item";
import iInput from "@/components/input/input";

export default {
  name: "HelloWorld",
  components: { iForm, iFormItem, iInput },
  data() {
    return {
      formValidate: {
        name: "",
        password: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) {
          // window.alert("提交失败");
          return false;
        }
        // window.alert('提交成功')
      });
    },
    handleReset() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
