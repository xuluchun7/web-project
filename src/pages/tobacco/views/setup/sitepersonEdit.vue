<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId"
                         :orgId='formItem.organizationId'
                         @onchange="organizationOnchange"
                         style="width:100%" />
    </el-form-item>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.siteperson.webmaster')"
                      prop="webmaster">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.webmaster" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.siteperson.clerk')"
                      prop="clerk">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.clerk" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.siteperson.ratingstaff')"
                      prop="ratingstaff">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.ratingstaff" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.siteperson.overweight')"
                      prop="overweight">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.overweight" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.siteperson.packer')"
                      prop="packer">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.packer" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.siteperson.qualitymanager')"
                      prop="qualitymanager">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.qualitymanager" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.siteperson.precheck')"
                      prop="precheck">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.precheck" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.setup.siteperson.infomanager')"
                      prop="infomanager">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.infomanager" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.setup.siteperson.other')"
                      prop="other">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.other" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item :label="$t('tobacco.setup.siteperson.desc')">
      <el-input type="textarea"
                v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.desc" />
    </el-form-item>

    <el-form-item>
      <el-button v-show='isEdit'
                 type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{
        $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import sitepersonApi from "../../api/setup/api_siteperson";
import { mapGetters } from "vuex";

const OrganizationForm = () => import("@/components/Organization");

export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formItem: {
        organizationId: this.userOrgId,
        organizationName: this.organizationName,
        organizationOrder: "",
        organizationCode: this.userOrgId,
        webmaster: "",
        clerk: "",
        ratingstaff: "",
        overweight: "",
        packer: "",
        qualitymanager: "",
        other: "",
        desc: ""
      },
      ruleValidate: {
        webmaster: [
          {
            required: true,
            message: this.$t("base.mustInput"),
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.load();
  },
  components: {
    OrganizationForm
  },
  computed: {
    ...mapGetters({
      userDistrictId: "districtId",
      userOrgId: "organizationId",
      organizationName: "organizationName"
    })
  },
  methods: {
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
      this.formItem.organizationId = this.formItem.organization.organizationId;
      this.formItem.organizationCode = this.formItem.organization.organizationId;
      this.formItem.organizationName = this.formItem.organization.organizationName;
      this.formItem.organizationOrder = this.formItem.organization.organizationOrder;
    },
    organizationOnchange(label, value, labels, values) {
      this.formItem.organizationId = value;
      this.formItem.organizationCode = value;
      this.formItem.organizationName = label;
      this.formItem.organizationOrder = "0";
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([
            sitepersonApi.updateSiteperson(this.formItem.id, this.formItem)
          ])
            .then(([response]) => {
              this.formReset("formValidate");
              //重置表单，允许多次操作
              this.$message({
                message: this.$t("message.editAndExid"),
                type: "success"
              });
              this.$emit("update:visible", false);
              this.$emit("refresh");
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
  },
  watch: {
    item(curVal, oldVal) {
      this.formItem = JSON.parse(JSON.stringify(curVal));
      this.load();
    }
  }
};
</script>
