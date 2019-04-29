<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item label="计划编号">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                :disabled="true"
                v-model="parentForm.serial" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.purchasePlanItem.materialName')">
      <el-autocomplete style="width:100%"
                       v-model="formItem.materialName"
                       :fetch-suggestions="querySearch"
                       placeholder="请输入物资名称过滤"
                       @select="handleSelect">
        <template slot-scope="{ item }">
          <span style="float: left;width:20%; color: #8492a6; font-size: 13px">{{ item.code }}</span>
          <span style="float: left;">{{ item.name }}</span>
          <span style="float: right; color: #8492a6;">{{ item.manufacturer }}</span>
          <span style="float: right;width:30%; color: #8492a6;">{{ item.title }}</span>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.purchasePlanItem.measureName')">
      <el-select v-model="formItem.measureName"
                 @change="unitSelectChange"
                 style="width:100%">
        <el-option v-for="unit in  formData.unitList"
                   :key="unit.id"
                   :label="unit.measureName"
                   :value="unit.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.purchasePlanItem.amount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.amount" />
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
import purchasePlanItemApi from "../../api/tmaterial/apiPurchasePlanItem.ts";
import materialApi from "../../api/tmaterial/apiMaterial";
import materialUnitApi from "../../api/tmaterial/apiMaterialUnit";
import quotaApi from "../../api/tmaterial/apiQuota";
import plantPlanApi from "../../api/tfarm/api_plantPlan";
import moment from "moment";
import UUID from "es6-uuid";
export default {
  props: ["parentForm"],
  data() {
    return {
      formData: {
        materialList: [],
        unitList: [],
        sumArea: 0
      },
      formItem: {},
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.formItem = this.initFormItem();
    Promise.all([
      materialApi.getAll({ size: 500, sort: "code" }),
      plantPlanApi.getSumArea(
        this.$store.state.system.annual,
        this.parentForm.receiverId
      )
    ])
      .then(([materialResponse, sumAreaResponse]) => {
        this.formData.materialList = materialResponse.content;
        this.formData.sumArea = sumAreaResponse;
      })
      .catch(error => {});
  },
  watch: {
    formItem(curValue, oldValue) {
      console.log(curValue);
    }
  },
  methods: {
    initFormItem() {
      return {
        id: UUID(32, 36),
        purchasePlan: this.parentForm.id,
        materialId: "",
        materialName: "",
        materialCode: "",
        measureId: "",
        measureName: "",
        price: 0,
        amount: 0,
        money: 0,
        confirmAmount: 0
      };
    },
    unitSelectChange(value) {
      var name = this.formData.unitList.find(item => {
        return item.id === value;
      }).measureName;
      this.formItem.materialUnit.measureName = name;
      this.genAmount(
        material.id,
        this.formItem.measureId,
        this.$store.state.system.annual
      );
    },
    genAmount(materialId, measureId, annual) {
      Promise.all([quotaApi.getAmount(materialId, measureId, annual)])
        .then(([response]) => {
          this.formItem.amount = (this.formData.sumArea * response).toFixed(2);
        })
        .catch(error => {});
    },
    querySearch(queryString, cb) {
      var materials = this.formData.materialList;
      var results = queryString
        ? materials.filter(this.createFilter(queryString))
        : materials;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return material => {
        return (
          material.name.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
        );
      };
    },
    handleSelect(item) {
      let material = JSON.parse(JSON.stringify(item));
      this.formItem.materialId = material.id;
      this.formItem.materialName = material.name;
      this.formItem.materialCode = material.code;

      this.formData.unitList = [];
      this.formItem.materialUnit = {};
      Promise.all([
        materialUnitApi.getAll({
          size: 100,
          search: "material.id:eq:" + material.id
        })
      ])
        .then(([unitResponse]) => {
          this.formData.unitList = unitResponse.content;
          if (this.formData.unitList.length === 1) {
            this.formItem.measureId = this.formData.unitList[0].measureId;
            this.formItem.measureName = this.formData.unitList[0].measureName;
            this.genAmount(
              material.id,
              this.formItem.measureId,
              this.$store.state.system.annual
            );
          }
        })
        .catch(error => {});
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([purchasePlanItemApi.save(this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              //重置表单，允许多次操作
              this.$message({
                message: "新增成功!",
                type: "info"
              });
              this.$emit("onSearchButtonClick");
              this.$emit("update:visible", false);
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
      this.formItem = this.initFormItem();
    }
  }
};
</script>
