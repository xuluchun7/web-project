<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tmaterial.quota.year')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.year" />
    </el-form-item>

    <el-form-item label="所属单位">
      <organization-form :root="userOrgId"
                         @onchange="organizationOnchange"
                         style="width:100%" />
    </el-form-item>

    <el-form-item :label="$t('tobacco.tmaterial.quota.title')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.title" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.quota.author')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.author" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.quota.date')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.date" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.quota.amount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.amount" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.quota.control')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.control" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.quota.desc')">
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
import quotaApi from '../../api/tmaterial/apiQuota';
const OrganizationForm = () => import("@/components/Organization");
import moment from "moment";
export default {
  data () {
    return {
      formItem: {
        organizationId: this.userOrgId,
        organizationName: "",
        organizationOrder: "",
        organizationCode: this.userOrgId,
        'year': moment().year(),
        'title': '',
        author: this.$store.state.user.userName,
        date: moment().format("YYYY-MM-DD"),
        'amount': 0,
        'control': 0,
        'desc': '',
      },
      ruleValidate: {
        code: [
          { required: true, message: '编码不能为空', trigger: 'blur' }
        ],

      }
    };
  },
  created () {

  },
  methods: {
    organizationOnchange (label, value, values) {
      this.formItem.organizationId = value;
      this.formItem.organizationName = label;
      this.formItem.organizationOrder = "0";
      this.formItem.organizationCode = value;
    },
    onSubmitClick (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          Promise.all([quotaApi.save(this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              //重置表单，允许多次操作
              this.$message({
                message: this.$t('message.saveAndContinue'),
                type: 'info',
              });

            })
            .catch(error => {
              console.log(error);
            });
        } else {
          this.$message({
            message: this.$t('message.formValidate'),
            type: 'warn',
          });
        }
      });
    },

    formReset (name) {
      this.$refs[name].resetFields();
    },

  }
};
</script>
