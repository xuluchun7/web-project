<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate"
           class="cas-group">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="必要信息"
                        name="1">
        <template slot="title">
          <i class="el-icon-warning"
             style="color:lightseagreen;margin-right:3px"></i>必要信息
        </template>
        <div class="cas-flex-2 cas-group">
          <el-form-item :label="$t('tobacco.tfarm.designScheme.name')">
            <el-select v-model="formItem.designSchemeId"
                       @change='designSchemeChanged'>
              <el-option v-for="item in formData.designSchemeList"
                         :value='item.id'
                         :key='item.id'
                         :label="item.name" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.designScheme.classify')">
            <el-select v-model="formItem.classify"
                       @change='refreshProcess'>
              <el-option v-for="item in formData.classifyList"
                         :value='item.id'
                         :key='item.id'
                         :label="item.name" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.process.begin')">
            <el-date-picker v-model="formItem.begin"
                            type="year"
                            :clearable=false
                            value-format="yyyy"
                            @change='refreshProcess'
                            :placeholder="$t('base.pleaseSelect')">
            </el-date-picker>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.process.lead')">
            <el-cascader :options="formData.processList"
                         :props="formData.props"
                         v-model="formData.leadOptions"
                         clearable
                         @change="onLeadChanged"
                         change-on-select />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.process.code')"
                        prop="code">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="formItem.code" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.process.name')"
                        prop="name">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="formItem.name" />
          </el-form-item>

          <el-form-item :label="$t('tobacco.tfarm.process.title')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="formItem.title" />
          </el-form-item>

          <el-form-item :label="$t('tobacco.tfarm.process.leaf')">
            <el-select v-model="formItem.leaf">
              <el-option v-for="item in $t('constant.boolean')"
                         :value='item.key'
                         :key='item.key'
                         :label="item.value" />
            </el-select>

          </el-form-item>

          <el-form-item :label="$t('tobacco.tfarm.process.from')">
            <el-date-picker v-model="formItem.from"
                            type="date"
                            :clearable=false
                            value-format="yyyy-MM-dd"
                            :placeholder="$t('base.pleaseSelect')" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.process.to')">
            <el-date-picker v-model="formItem.to"
                            type="date"
                            :clearable=false
                            value-format="yyyy-MM-dd"
                            :placeholder="$t('base.pleaseSelect')" />
          </el-form-item>
          <el-form-item label="填报频率">
            <el-select v-model="formItem.frequency"
                       placeholder="请选择固化频率">
              <el-option label="日"
                         :value="1"></el-option>
              <el-option label="周"
                         :value="2"></el-option>
              <el-option label="不定"
                         :value="3"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </el-collapse-item>
      <el-collapse-item title="高级设置"
                        name="2"
                        v-if="formItem.leaf">
        <template slot="title">
          <i class="el-icon-setting"
             style="color:lightseagreen;margin-right:3px"></i>高级设置
        </template>
        <div class="cas-flex-3 cas-group">
          <el-form-item :label="$t('tobacco.tfarm.process.target')">
            <el-select v-model="formItem.target">
              <el-option v-for="item in $t('tobacco.tfarm.process.targetList')"
                         :value='item.key'
                         :key='item.key'
                         :label="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.process.sampling')">
            <el-input-number v-model="formItem.sampling"
                             :precision="2"
                             :step="0.01"
                             :min="0"
                             :max="1"></el-input-number>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.process.accurate')">
            <el-select v-model="formItem.accurate">
              <el-option v-for="item in $t('tobacco.tfarm.process.accurateList')"
                         :value='item.key'
                         :key='item.key'
                         :label="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.process.camera')">
            <el-select v-model="formItem.camera">
              <el-option v-for="item in $t('tobacco.tfarm.process.cameraList')"
                         :value='item.key'
                         :key='item.key'
                         :label="item.value" />
            </el-select>

          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.process.location')">
            <el-select v-model="formItem.location">
              <el-option v-for="item in $t('tobacco.tfarm.process.locationList')"
                         :value='item.key'
                         :key='item.key'
                         :label="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.process.amount')">
            <el-select v-model="formItem.amount">
              <el-option v-for="item in $t('constant.boolean')"
                         :value='item.key'
                         :key='item.key'
                         :label="item.value" />
            </el-select>

          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.process.area')">
            <el-select v-model="formItem.area">
              <el-option v-for="item in $t('constant.boolean')"
                         :value='item.key'
                         :key='item.key'
                         :label="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.process.rate')">
            <el-select v-model="formItem.rate">
              <el-option v-for="item in $t('constant.boolean')"
                         :value='item.key'
                         :key='item.key'
                         :label="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.process.score')">
            <el-select v-model="formItem.score">
              <el-option v-for="item in $t('constant.boolean')"
                         :value='item.key'
                         :key='item.key'
                         :label="item.value" />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('tobacco.tfarm.process.style')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="formItem.style" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.process.visible')">
            <el-select v-model="formItem.visible">
              <el-option v-for="item in $t('constant.boolean')"
                         :value='item.key'
                         :key='item.key'
                         :label="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.process.position')">
            <el-input-number v-model="formItem.position"
                             :step="1"
                             :min="0" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.process.control')">
            <el-select v-model="formItem.control">
              <el-option v-for="item in $t('tobacco.tfarm.process.controlList')"
                         :value='item.key'
                         :key='item.key'
                         :label="item.value" />
            </el-select>
          </el-form-item>

        </div>
      </el-collapse-item>
      <el-collapse-item title="更多设置"
                        name="3">
        <template slot="title">
          <i class="el-icon-more"
             style="color:lightseagreen;margin-right:3px"></i>更多设置
        </template>
        <div class=" cas-flex-2 cas-group">
          <el-form-item :label="$t('tobacco.tfarm.process.icon')">
            <el-upload class="avatar-uploader"
                       :action="uploadUrl"
                       :headers="header"
                       :show-file-list="false"
                       accept="image/jpeg,image/gif,image/png"
                       :on-success="handleAvatarSuccess"
                       :before-upload="beforeAvatarUpload">
              <img v-if="formItem.icon"
                   :src="iconShow"
                   class="avatar">
              <i v-else
                 class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.process.desc')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      type="textarea"
                      :autosize="{ minRows: 3, maxRows: 4}"
                      v-model="formItem.desc" />
          </el-form-item>

        </div>
      </el-collapse-item>
    </el-collapse>
    <el-form-item>
      <el-button type="primary"
                 style="float: right;margin-top: 20px;"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>

  </el-form>
</template>
<script>
import processApi from "../../api/tfarm/apiProcess";
import { getToken } from "@/utils/cookieUtils";
import designSchemeApi from "../../api/tfarm/apiDesignScheme";
import designSchemeClassifyApi from "../../api/tfarm/apiDesignSchemeClassify";
import { mapGetters } from "vuex";
export default {
  props: ["item", "visible"],
  data() {
    return {
      uploadUrl: this.getRootPath(),
      iconShow: "",
      header: {
        Authorization: getToken()
      },
      activeNames: ["1"],
      formItem: {
        lead: undefined,
        leaf: true,
        code: "",
        name: "",
        title: "",
        begin: this.$store.state.system.annual.toString(),
        end: this.$store.state.system.annual.toString(),
        from: this.$store.state.system.annual.toString() + "-01-01",
        to: this.$store.state.system.annual.toString() + "-12-31",
        target: 1,
        sampling: 0,
        accurate: 8, //默认到网格单元
        camera: 1,
        location: 1,
        amount: true,
        area: true,
        rate: true,
        score: true,
        icon: "",
        style: "",
        visible: true,
        position: 0,
        control: 1,
        designSchemeId: "",
        designSchemeCode: "",
        classify: "",
        desc: "",
        organizationId: "",
        organizationCode: "",
        organizationName: "",
        frequency: 1
      },
      formData: {
        classifyList: [],
        processList: [],
        levelList: [],
        designSchemeList: [],
        props: { label: "name", value: "id", disabled: "leaf" },
        leadOptions: []
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }],
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    console.info(this.getImgApi());
    if (this.item !== undefined) {
      let cache = [];
      this.formItem = JSON.parse(
        JSON.stringify(this.item, function(key, value) {
          if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
            }
            // Store value in our collection
            cache.push(value);
          }
          return value;
        })
      );
      this.formItem.begin = this.formItem.begin.toString();
    }
    this.formItem.organizationId = this.userOrgId;
    this.formItem.organizationCode = this.userOrgId;
    this.formItem.organizationName = this.organizationName;
    this.formItem.lead = this.item === undefined ? undefined : this.item.lead;
    this.iconShow = this.getImgApi() + this.formItem.icon;
    console.info(this.iconShow);
    this.load();
  },
  computed: {
    ...mapGetters({
      userDistrictId: "districtId",
      userOrgId: "organizationId",
      organizationName: "organizationName",
      userName: "userName"
    })
  },
  watch: {
    item(curVal, oldVal) {
      let cache = [];
      this.formItem = JSON.parse(
        JSON.stringify(curVal, function(key, value) {
          if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
            }
            // Store value in our collection
            cache.push(value);
          }
          return value;
        })
      );
      this.formItem.begin = this.formItem.begin.toString();
      this.iconShow = this.getImgApi() + this.formItem.icon;
    }
  },
  methods: {
    getImgApi() {
      let isProduction = process.env.NODE_ENV === "production";
      let rootPath = process.env.VUE_APP_API_URL;
      if (isProduction) {
        rootPath = "";
      }
      return rootPath + "/tobacco/api/tfarm/process/IoReadImage/";
    },
    getRootPath() {
      let isProduction = process.env.NODE_ENV === "production";
      let rootPath = process.env.VUE_APP_API_URL;
      if (isProduction) {
        rootPath = "";
      }
      return rootPath + "/tobacco/api/tfarm/process/upload/icon";
    },
    load() {
      Promise.all([
        designSchemeClassifyApi.getAll({
          size: 500,
          page: 0,
          sort: "id,asc"
        }),
        designSchemeApi.getAll({
          size: 500,
          page: 0,
          search:
            "startAnnual:eq:" +
            this.$store.state.system.annual.toString() +
            ";organization.organizationId:EQ:" +
            this.formItem.organizationId
        })
      ])
        .then(([response, designResponse]) => {
          this.formData.classifyList = response.content;
          this.formData.designSchemeList = designResponse.content;
          if (response.content.length > 0) {
            this.formItem.classify = response.content[0].id;
          }
          if (designResponse.content.length > 0) {
            this.formItem.designScheme = designResponse.content[0].id;
          }
          this.refreshProcess();
        })
        .catch(error => {});
    },
    designSchemeChanged(value) {
      let item = this.formData.designSchemeList.find(it => {
        return it.id === value;
      });
      this.formItem.designSchemeCode = item.code;
      this.refreshProcess();
    },
    refreshProcess() {
      let that = this;
      Promise.all([
        processApi.getTree(
          this.formItem.begin,
          this.formItem.designSchemeId,
          this.formItem.classify,
          this.formItem.organizationId
        )
      ])
        .then(([response, designResponse]) => {
          this.formData.processList = response;
        })
        .catch(error => {});
    },
    onSubmitClick(name) {
      //由于前面的环节可能自动添加此属性
      this.formItem.parent = undefined;
      console.log(this.formItem);
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([processApi.saveOrUpdate(this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              this.refreshProcess();
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
    onLeadChanged(value) {
      if (value !== undefined && value.length > 0) {
        this.formItem.lead = value[value.length - 1];
      }
    },
    formReset(name) {
      this.$refs[name].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.iconShow = URL.createObjectURL(file.raw);
      this.formItem.icon = res.data.path;
      console.info(this.formItem.icon);
      this.$message({
        message: "上传成功",
        type: "success"
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/gif" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传文件只能是图片格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>
<style scoped>
.el-input-number {
  width: 100%;
}
.el-select {
  width: 100%;
}
.el-cascader {
  width: 100%;
}
.el-date-editor.el-input {
  width: 100%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;

  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 64px;
  height: 64px;
  line-height: 64px;
  text-align: center;
}
.avatar {
  width: 64px;
  height: 64px;
  display: block;
}
</style>

