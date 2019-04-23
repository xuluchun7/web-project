<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tmaterial.rosterItem.rosterId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.rosterId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterItem.serial')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.serial" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterItem.materialId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.materialId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterItem.materialName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.materialName" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterItem.standardAmount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.standardAmount" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterItem.amount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.amount" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterItem.actualAmount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.actualAmount" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterItem.standardPrice')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.standardPrice" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterItem.standadMoney')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.standadMoney" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterItem.money')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.money" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterItem.actualMoney')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.actualMoney" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterItem.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.desc" />
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
import rosterItemApi from "../../api/tmaterial/apiRosterItem";
export default {
  data() {
    return {
      formItem: {
        rosterId: "",
        serial: 0,
        materialId: "",
        materialName: "",
        standardAmount: 0,
        amount: 0,
        actualAmount: "",
        standardPrice: 0,
        standadMoney: 0,
        money: 0,
        actualMoney: 0,
        desc: ""
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
          Promise.all([rosterItemApi.save(this.formItem)])
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
