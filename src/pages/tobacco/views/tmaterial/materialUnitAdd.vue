<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">

    <el-form-item :label="$t('tobacco.tmaterial.materialUnit.material')">
      <el-select v-model="formItem.material"
                 filterable
                 clearable
                 placeholder="请选择">
        <el-option v-for="item in formData.materialList"
                   :key="item.id"
                   :label="item.name"
                   :value="item.id">
          <span style="float: left;width:20%; color: #8492a6; font-size: 13px">{{ item.code }}</span>
          <span style="float: left;">{{ item.name }}</span>
          <span style="float: right; color: #8492a6;">{{ item.manufacturer }}</span>
          <span style="float: right;width:30%; color: #8492a6;">{{ item.title }}</span>
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.materialUnit.measureName')">
      <el-select v-model='formItem.measureId'
                 @change="selectChange"
                 style="width:100%">
        <el-option v-for="measure in  formData.measureList"
                   :key="measure.id"
                   :label="measure.name"
                   :value="measure.id">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.materialUnit.convert')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.convert" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.materialUnit.divider')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.divider" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.materialUnit.visible')">
      <el-checkbox v-model="formItem.visible" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.materialUnit.desc')">
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
import materialUnitApi from "../../api/tmaterial/apiMaterialUnit";
import measureApi from "../../api/tmaterial/apiMeasure";
import materialApi from "../../api/tmaterial/apiMaterial";
export default {
  data () {
    return {
      formData: {
        measureList: [],
        materialList: []
      },
      formItem: {
        material: "",
        measureId: "",
        measureName: "",
        convert: 1,
        divider: 1,
        visible: false,
        desc: ""
      },
      ruleValidate: {}
    };
  },
  created () {
    Promise.all([
      measureApi.getAll({ search: "leaf:eq:true", size: 100 }),
      materialApi.getAll({ size: 500, sort: "code" })
    ])
      .then(([measureResponse, materialResponse]) => {
        this.formData.measureList = measureResponse.content;
        this.formData.materialList = materialResponse.content;
      })
      .catch(error => { });
  },
  methods: {
    selectChange (value) {
      var name = this.formData.measureList.find(item => {
        return item.id === value;
      }).name;
      this.formItem.measureName = name;
    },
    onSubmitClick (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([materialUnitApi.save(this.formItem)])
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

    formReset (name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
