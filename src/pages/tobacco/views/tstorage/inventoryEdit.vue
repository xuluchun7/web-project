<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
      <organization-form :root="userOrgId"
                         @onchange="organizationOnchange"
                         :orgId='formItem.organizationId'
                         style="width:100%" />
    </el-form-item>
    <el-row>
      <el-col :span="24">
        <el-form-item :label="$t('tobacco.tstorage.inventory.number')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.number"
                    disabled />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.annual')">
          <el-date-picker value-format="yyyy"
                          v-model="formItem.annual"
                          type="year"
                          :placeholder="$t('base.pleaseSelect')"
                          style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.barcode')"
                      prop="barcode">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.barcode" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.title')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.title" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.author')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.author" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.date')">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                          v-model="formItem.date"
                          type="date"
                          :placeholder="$t('base.pleaseSelect')"
                          style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.year')">
          <el-date-picker value-format="yyyy"
                          v-model="formItem.year"
                          type="year"
                          :placeholder="$t('base.pleaseSelect')"
                          style="width: 100%">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.farmerName')">
          <el-input v-model="formItem.farmerName"
                    v-bind:placeholder="$t('base.pleaseInput')"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.printTimes')">
          <el-input v-model="formItem.printTimes"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.statusName')">
          <status-select :label.sync="formItem.statusName"
                         :value.sync="formItem.statusId"
                         :key.sync="formItem.statusId"
                         style="width:100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.typeName')">
          <type-variety-grade-select :allData.sync="allData"
                                     :varietyName.sync="formItem.varietyName"
                                     :varietyId.sync="formItem.varietyId"
                                     :typeId.sync="formItem.typeId"
                                     :typeName.sync="formItem.typeName"
                                     :gradeId.sync="formItem.gradeId"
                                     :gradeName.sync="formItem.gradeName"
                                     :gradeCode.sync="formItem.gradeCode"
                                     style="width:100%;" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tsell.invoice.rankName')">
          <rank-select :label.sync="formItem.rankName"
                       :value.sync="formItem.rankId"
                       :key.sync="formItem.rankId"
                       style="width:100%;" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.standard')">
          <el-switch v-model="formItem.standard" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.weight')">
          <el-input-number v-model="formItem.weight"
                           style="width: 100%;"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item :label="$t('tobacco.tstorage.inventory.picture')">
          <el-input v-bind:placeholder="$t('base.pleaseInput')"
                    v-model="formItem.picture" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-form-item :label="$t('tobacco.tstorage.inventory.control')">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.control" />
      </el-form-item>
    </el-row>
    <el-form-item :label="$t('tobacco.tstorage.inventory.desc')">
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
const typeSelect = () => import("@/components/Tobacco/typeSelect");
const OrganizationForm = () => import("@/components/Organization");
const statusSelect = () => import("../components/statusSelect");
const rankSelect = () => import("../components/rankSelect");
const varietySelect = () => import("@/components/Tobacco/varietySelect");
const typeVarietySelect = () =>
  import("@/components/Tobacco/typeVarietySelect");
const typeGradeSelect = () => import("@/components/Tobacco/typeGradeSelect");
const typeVarietyGradeSelect = () =>
  import("@/components/Tobacco/typeVarietyGradeSelect");

import inventoryApi from "../../api/tstorage/api_inventory";
import { mapGetters } from "vuex";
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      allData: {}, //存放烟叶类型等数据，用于回显
      formItem: {
        organizationId: "",
        organizationName: "",
        organizationOrder: "",
        organizationCode: "",
        annual: "",
        serial: "",
        barcode: "",
        number: "",
        title: "",
        author: this.userName,
        date: "",
        countryId: "86",
        countryName: "中国",
        year: "",
        typeId: "",
        typeName: "",
        statusId: "",
        statusName: "",
        varietyId: "",
        varietyName: "",
        rankId: "",
        rankName: "",
        gradeId: "",
        gradeCode: "",
        gradeName: "",
        standard: true,
        weight: "",
        picture: "",
        control: "",
        desc: ""
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }],
        barcode: [{ required: true, message: "该项必须填写", trigger: "blur" }]
      }
    };
  },
  created() {
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
  components: {
    OrganizationForm,
    typeGradeSelect,
    typeSelect,
    varietySelect,
    typeVarietySelect,
    statusSelect,
    rankSelect,
    "type-grade-select": typeGradeSelect,
    typeVarietyGradeSelect
  },
  methods: {
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
      this.allData = {};
      //初始化烟叶类型等数据，用于回显
      this.allData["typeId"] = this.formItem.typeId;
      this.allData["varietyId"] = this.formItem.varietyId;
      this.allData["gradeId"] = this.formItem.gradeId;
      if (
        this.formItem.annual !== "" &&
        this.formItem.annual !== null &&
        this.formItem.annual !== undefined
      ) {
        this.formItem.annual = this.formItem.annual.toString();
      }
      if (this.formItem.year !== "" && this.formItem.year !== null) {
        this.formItem.year = this.formItem.year.toString();
      }
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
          if (!this.formItem.gradeId) {
            this.$message({
              message: "请选择等级",
              type: "info"
            });
            return;
          }
          Promise.all([
            inventoryApi.updateInventory(this.formItem.id, this.formItem)
          ])
            .then(([response]) => {
              this.formReset(name);
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
      console.log(JSON.parse(JSON.stringify(this.item)));
      console.log(JSON.parse(JSON.stringify(curVal)));
      this.formItem = JSON.parse(JSON.stringify(curVal));
      this.load();
    }
  }
};
</script>
