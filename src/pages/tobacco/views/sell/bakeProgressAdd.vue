<template>
  <el-form :model="formItem"
           label-width="100px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tsell.bakeProgress.date')">
      <el-date-picker v-model="formItem.date"
                      type="date"
                      value-format="yyyy-MM-dd"
                      style="width:100%;"
                      :placeholder="$t('base.pleaseSelect')">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.bakeProgress.bakeAmount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.bakeAmount" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.bakeProgress.finishAmount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.finishAmount" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.bakeProgress.topMatureAmount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.topMatureAmount" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tsell.bakeProgress.operator')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.operator" />
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
import bakeProgressApi from "../../api/tsell/api_bakeProgress";
import { mapGetters } from "vuex";
import { parseDate } from "@/filters/index.ts";
export default {
  props: ["level"],
  data() {
    return {
      formItem: {
        date: parseDate(new Date(), "YYYY-MM-DD"),
        bakeAmount: 0,
        finishAmount: 0,
        topMatureAmount: 0,
        operator: "",
        siteOperator: "",
        countyOperator: "",
        level: "",
        status: 0,
        organizationId: "",
        organizationCode: "",
        organizationName: ""
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.formItem.level = this.level;
    this.formItem.organizationId = this.userOrgId;
    this.formItem.organizationCode = this.userOrgId;
    this.formItem.organizationName = this.organizationName;

    this.formItem.operator = "[{loginId}]{userName}".format({
      loginId: this.loginName,
      userName: this.userName
    });
  },
  computed: {
    ...mapGetters({
      userDistrictId: "districtId",
      userOrgId: "organizationId",
      organizationName: "organizationName",
      loginName: "loginName",
      userName: "userName"
    })
  },
  methods: {
    onSubmitClick(name) {
      if (
        this.formItem.bakeAmount === 0 &&
        this.formItem.finishAmount === 0 &&
        this.formItem.topMatureAmount === 0
      ) {
        this.$message({
          message: "填报数据不能同时都为0",
          type: "warn"
        });
        return;
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          const loading = this.$loading({
            lock: true,
            text: "处理中,请稍后",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          Promise.all([bakeProgressApi.saveBakeProgress(this.formItem)])
            .then(([response]) => {
              loading.close();
              this.formReset(name);
              //重置表单，允许多次操作
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
            })
            .catch(error => {
              loading.close();
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
