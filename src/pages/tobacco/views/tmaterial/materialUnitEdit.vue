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
      <el-button v-show='isEdit'
                 type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import materialUnitApi from "../../api/tmaterial/apiMaterialUnit";
import measureApi from "../../api/tmaterial/apiMeasure";
import materialApi from "../../api/tmaterial/apiMaterial";
export default {
  props: ["item", "isEdit", "visible"],
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
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      }
    };
  },
  created () {
    this.load();
    Promise.all([
      measureApi.getAll({ search: "leaf:eq:true", size: 100 }),
      materialApi.getAll({ size: 500, sort: 'code' })
    ])
      .then(([measureResponse, materialResponse]) => {
        this.formData.measureList = measureResponse.content;
        this.formData.materialList = materialResponse.content;
      })
      .catch(error => { });
  },
  methods: {
    load () {
      this.formItem = JSON.parse(JSON.stringify(this.item));
    },
    selectChange (value) {
      var name = this.formData.measureList.find(item => {
        return item.id === value;
      }).name;
      this.formItem.measureName = name;
    },
    onSubmitClick (name) {
      this.formItem.material = this.formItem.material.id;
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([materialUnitApi.update(this.item.id, this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
              this.$emit("update:visible", false);
            })
            .catch(error => { });
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
  },
  watch: {
    item (curVal, oldVal) {
      this.formItem = JSON.parse(JSON.stringify(curVal));
      this.load();
    }
  }
};
</script>
