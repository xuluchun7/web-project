 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tmisc.technology.annual')">
      <el-date-picker value-format="yyyy"
                      v-model="formItem.annual"
                      type="year"
                      :placeholder="$t('base.pleaseSelect')"
                      style="width: 100%">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.technology.name')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.name" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.technology.author')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.author" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.technology.date')">
      <el-date-picker v-model="formItem.date"
                      value-format="yyyy-MM-dd"
                      type="date"
                      style="width:100%;"
                      :placeholder="$t('base.pleaseSelect')">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.technology.control')">
      <el-select v-model='formItem.control'
                 style="width:100%">
        <el-option v-for="item in $t('constant.tmisc.technologyControlList')"
                   :value='item.key'
                   :key='item.key'
                   :label="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmisc.technology.type')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.type" />
    </el-form-item>

    <el-form-item :label="$t('原文件')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formData.flieName"
                disabled />
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
import technologyApi from "../../api/tmisc/apiTechnology";
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formData: {
        flieName: ""
      },
      formItem: {
        code: "",
        annual: 0,
        name: "",
        author: "",
        date: "",
        control: 0,
        type: "",
        path: ""
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.load();
    console.info(this.formItem);
  },
  methods: {
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
      this.formItem.annual = this.formItem.annual + "";
      this.formData.flieName = this.formItem.path.substring(
        this.formItem.path.lastIndexOf("/") + 1
      );
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([technologyApi.update(this.item.id, this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
              this.$emit("update:visible", false);
            })
            .catch(error => {});
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
