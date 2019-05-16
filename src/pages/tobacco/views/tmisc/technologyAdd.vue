<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.technology.code')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.code" />
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
        <el-form-item :label="$t('tobacco.tmisc.technology.name')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.name" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tmisc.technology.author')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.author" />
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
            <el-option v-for="item in  formData.control"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
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
                 action="https://jsonplaceholder.typicode.com/posts/"
                 :on-preview="handlePreview"
                 :on-remove="handleRemove"
                 :on-success="uploadSuccess"
                 :file-list="fileList"
                 :headers="header"
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
export default {
  data() {
    return {
      uploadUrl: this.getRootPath(),
      header: {
        Authorization: getToken()
      },
      fileList: [],
      formItem: {
        code: "",
        annual: 0,
        name: "",
        author: "",
        date: "",
        control: 3,
        type: ""
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      },
      formData: {
        control: [
          { id: 1, name: "启用" },
          { id: 2, name: "停用" },
          { id: 3, name: "编辑" }
        ]
      }
    };
  },
  created() {
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
      return rootPath + "/zuul/user/online/statistic/upload/template";
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([technologyApi.save(this.formItem)])
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
      console.info(fileList.length);
      // if (response.code !== 0) {
      //   this.$notify.error({
      //     title: "错误",
      //     message: response.message
      //   });
      //   return;
      // }
      // //文件上传完成，再提交表单
      // this.onSubmitClick("formValidate");
    }
  }
};
</script>
