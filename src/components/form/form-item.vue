<template>
  <div class="form-item">
    <label v-if="label" :class="{'i-form-item-label-required': isRequired}">{{ label }}</label>
    <div>
      <slot></slot>
      <div v-if="validateState === 'error'" class="i-form-item-message">{{ validateMessage }}</div>
    </div>
  </div>
</template>

<script>
import Emitter from "@/mixins/emitter.js";
import AsyncValidator from "async-validator";

export default {
  name: "iFormItem",
  props: {
    label: {
      type: String,
      default: ""
    },
    prop: {
      type: String
    }
  },
  inject: ["form"],
  mixins: [Emitter],
  data() {
    return {
      isRequired: false,
      validateState: "",
      validateMessage: "",
      initialValue: this.fieldValue
    };
  },
  computed: {
    fieldValue() {
      return this.form.model[this.prop];
    }
  },
  methods: {
    setRules() {
      let rules = this.getRules();
      if (rules.length) {
        rules.every(rule => {
          this.isRequired = rule.required;
        });
      }
      this.$on("on-form-blur", this.onFieldBlur);
      this.$on("on-form-change", this.onFieldChange);
    },
    getRules() {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(formRules || []);
    },
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter(
        rule => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      );
    },
    validate(trigger, callback = function() {}) {
      let rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) {
        return true;
      }
      this.validateState = "validating";
      let descriptor = {};
      descriptor[this.prop] = rules;
      const validator = new AsyncValidator(descriptor);
      let model = {};
      model[this.prop] = this.fieldValue;
      validator.validate(model, { firstFields: true }, errors => {
        this.validateState = !errors ? "success" : "error";
        this.validateMessage = errors ? errors[0].message : "";
        callback(this.validateMessage);
      });
    },
    onFieldBlur() {
      this.validate("blur");
    },
    onFieldChange() {
      this.validate("change");
    },
    // 重置
    resetField() {
      this.validateState = "";
      this.validateMessage = "";
      this.form.model[this.prop] = this.initialValue;
    }
  },
  mounted() {
    //   若prop无值 则无需验证
    if (this.prop) {
      this.dispatch("iForm", "on-form-item-add", this);
      this.initialValue = this.fieldValue;
      this.setRules();
    }
  },
  beforeDestroy() {
    this.dispatch("iForm", "on-form-item-remove", this);
  }
};
</script>

<style scoped>
.form-item {
  display: flex;
  flex-direction: row;
  width: 20%;
  margin: 20px auto;
}
.i-form-item-label-required:before {
  content: "*";
  color: red;
}
label {
  margin-right: 20px;
  width: 100px;
}
.i-form-item-message {
  color: red;
}
</style>