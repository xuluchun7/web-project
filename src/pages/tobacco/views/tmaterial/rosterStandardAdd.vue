<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tmaterial.rosterStandard.packId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.packId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterStandard.serial')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.serial" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterStandard.materialId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.materialId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterStandard.materialName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.materialName" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterStandard.measureId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.measureId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterStandard.measureName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.measureName" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterStandard.price')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.price" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterStandard.amount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.amount" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterStandard.money')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.money" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterStandard.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.desc" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterStandard.rosterId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.rosterId" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import rosterStandardApi from "../../api/tmaterial/apiRosterStandard";
export default {
  data() {
    return {
      formItem: {
        packId: "",
        serial: 0,
        materialId: "",
        materialName: "",
        measureId: "",
        measureName: "",
        price: "",
        amount: 0,
        money: 0,
        desc: "",
        rosterId: ""
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {},
  methods: {
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([rosterStandardApi.save(this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              //重置表单，允许多次操作
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$message({
            message: this.$t("message.formValidate"),
            type: "warn"
          });
        }
      });
    },

    formReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
