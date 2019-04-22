<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.rosterId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.rosterId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.farmerId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.farmerId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.farmerNumber')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.farmerNumber" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.farmerName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.farmerName" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.identity')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.identity" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.address')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.address" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.bankNo')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.bankNo" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.phone')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.phone" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.area')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.area" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.actualArea')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.actualArea" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.expectArea')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.expectArea" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.money')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.money" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.actualMoney')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.actualMoney" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.expectMoney')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.expectMoney" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.filePath')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.filePath" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.signElec')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.signElec" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.pictures')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.pictures" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.signHand')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.signHand" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.billOutId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.billOutId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.billOutSerial')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.billOutSerial" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.control')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.control" />
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
import rosterDetailsApi from "../../api/tmaterial/apiRosterDetails";
export default {
  data() {
    return {
      formItem: {
        rosterId: "",
        farmerId: "",
        farmerNumber: "",
        farmerName: "",
        identity: "",
        address: "",
        bankNo: "",
        phone: "",
        area: 0,
        actualArea: 0,
        expectArea: 0,
        money: 0,
        actualMoney: 0,
        expectMoney: 0,
        filePath: "",
        signElec: "",
        pictures: "",
        signHand: "",
        billOutId: "",
        billOutSerial: "",
        control: 0
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
          Promise.all([rosterDetailsApi.save(this.formItem)])
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
