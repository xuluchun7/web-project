 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tmaterial.roster.serial')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.serial" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.roster.title')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.title" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.roster.date')">
      <el-date-picker v-model="formItem.date"
                      type="date"
                      style="width:100%;"
                      :placeholder="$t('base.pleaseSelect')">
      </el-date-picker>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.roster.authorId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.authorId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.roster.author')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.author" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.roster.operator')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.operator" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.roster.groupId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.groupId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.roster.households')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.households" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.roster.area')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.area" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.roster.gridId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.gridId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.roster.gridName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.gridName" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.roster.villageCount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.villageCount" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.roster.villageIds')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.villageIds" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.roster.villageNames')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.villageNames" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.roster.annual')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.annual" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.roster.desc')">
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
import rosterApi from "../../api/tmaterial/apiRoster";
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formItem: {
        serial: "",
        title: "",
        date: "",
        authorId: "",
        author: "",
        operator: "",
        operation: "",
        control: 0,
        groupId: "",
        households: 0,
        area: 0,
        gridId: "",
        gridName: "",
        villageCount: 0,
        villageIds: "",
        villageNames: "",
        annual: 0,
        desc: ""
      },
      ruleValidate: {
        code: [{ required: true, message: "编码不能为空", trigger: "blur" }]
      }
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
      this.formItem = JSON.parse(JSON.stringify(this.item));
    },
    onSubmitClick(name) {
      this.$refs[name].validate(valid => {
        //进行前端检验
        if (valid) {
          Promise.all([rosterApi.update(this.item.id, this.formItem)])
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
