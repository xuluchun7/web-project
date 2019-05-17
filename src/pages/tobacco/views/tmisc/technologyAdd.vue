<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.common.organization')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.organizationName"
                    readonly />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.technology.annual')">
          <el-date-picker value-format="yyyy"
                          v-model="formItem.annual"
                          type="year"
                          :placeholder="$t('base.pleaseSelect')"
                          style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.technology.author')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.author"
                    readonly />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.technology.date')">
          <el-date-picker v-model="formItem.date"
                          value-format="yyyy-MM-dd"
                          type="date"
                          style="width:100%;"
                          :placeholder="$t('base.pleaseSelect')">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.technology.control')">
          <el-select v-model='formItem.control'
                     style="width:100%">
            <el-option v-for="item in $t('constant.tmisc.technologyControlList')"
                       :value='item.key'
                       :key='item.key'
                       :label="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.technology.type')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.type" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.common.selectFile')">
      <el-upload class="upload-demo"
                 ref="upload"
                 :action="uploadUrl"
                 :headers="header"
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :on-success="uploadSuccess"
                 :file-list="fileList"
                 :auto-upload="false">
        <el-button slot="trigger"
                   size="small"
                   type="primary">选取文件</el-button>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary"
                 style="float: right"
                 @click="submitUpload">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import technologyApi from "../../api/tmisc/apiTechnology";
import { getToken } from "@/utils/cookieUtils";
import { mapGetters } from "vuex";
import constant from "../../lang/zh/constant";
export default {
  data() {
    return {
      uploadIndex: 0,
      uploadUrl: this.getRootPath(),
      header: {
        Authorization: getToken()
      },
      fileList: [],
      formItem: {
        code: "",
        annual: 0,
        name: "",
        author: this.$store.state.user.user.userName,
        date: "",
        control: 3,
        type: "",
        organizationName: "",
        organizationId: "",
        organizationCode: ""
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      },
      formData: {}
    };
  },

  created() {
    this.formItem.organizationName = this.organizationName;
    this.formItem.organizationId = this.userOrgId;
    this.formItem.organizationCode = this.userOrgId;
    this.formItem.annual = new Date().getFullYear().toString();
    this.formItem.date = this.dateFormat(new Date(), "YYYY-MM-DD");
  },
  methods: {
    getRootPath() {
      let isProduction = process.env.NODE_ENV === "production";
      let rootPath = process.env.VUE_APP_API_URL;
      if (isProduction) {
        rootPath = "";
      }
      return rootPath + "/tobacco/api/tmisc/technology/upload";
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    onSubmitClick(name) {
      console.info(this.fileList);
      let fileNames = [];
      for (var x in this.fileList) {
        fileNames.push(this.fileList[x].name);
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([technologyApi.batchSave(this.formItem, fileNames)])
            .then(([response]) => {
              this.uploadIndex = 0;
              this.fileList = [];
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    formReset(name) {
      this.$refs[name].resetFields();
    },
    uploadSuccess(response, file, fileList) {
      if (response.code !== 0) {
        this.$notify.error({
          title: "错误",
          message: response.message
        });
        return;
      }
      this.uploadIndex++;
      this.fileList = fileList;
      if (this.uploadIndex === fileList.length) {
        //文件上传完成，再提交表单
        this.onSubmitClick("formValidate");
      }
    }
  },
  computed: {
    ...mapGetters({
      userDistrictId: "districtId",
      userOrgId: "organizationId",
      organizationName: "organizationName"
    })
  }
};
</script>
