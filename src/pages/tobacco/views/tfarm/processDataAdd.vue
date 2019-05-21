<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">

    <el-form-item>
      <el-button type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import processDataApi from "../../api/tfarm/apiProcessData";
import processApi from "../../api/tfarm/apiProcess";

export default {
  props: ["processCode", "designSchemeCode"],
  data() {
    return {
      formItem: {},
      ruleValidate: {}
    };
  },
  created() {
    Promise.all([
      processApi.getAttrList(this.processCode, this.designSchemeCode)
    ])
      .then(([response]) => {})
      .catch(error => {});
  },
  methods: {
    onSubmitClick(name) {
      // this.$refs[name].validate(valid => {
      //   if (valid) {
      //     Promise.all([processDataApi.save(this.formItem)])
      //       .then(([response]) => {
      //         this.formReset(name);
      //         //重置表单，允许多次操作
      //         this.$message({
      //           message: this.$t("message.saveAndContinue"),
      //           type: "info"
      //         });
      //       })
      //       .catch(error => {
      //         console.log(error);
      //       });
      //   } else {
      //     this.$message({
      //       message: this.$t("message.formValidate"),
      //       type: "warn"
      //     });
      //   }
      // });
    }
  }
};
</script>
