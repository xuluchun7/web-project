 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tmaterial.purchasePlanItem.materialId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.materialId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.purchasePlanItem.materialName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.materialName" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.purchasePlanItem.materialCode')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.materialCode" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.purchasePlanItem.measureId')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.measureId" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.purchasePlanItem.measureName')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.measureName" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.purchasePlanItem.price')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.price" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.purchasePlanItem.amount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.amount" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.purchasePlanItem.money')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.money" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.purchasePlanItem.confirmAmount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.confirmAmount" />
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
import purchasePlanItemApi from "../../api/tmaterial/apiPurchasePlanItem.ts";
export default {
  props: ["item", "isEdit", "visible"],
  data() {
    return {
      formItem: {
        materialId: "",
        materialName: "",
        materialCode: "",
        measureId: "",
        measureName: "",
        price: 0,
        amount: 0,
        money: 0,
        confirmAmount: 0
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
          Promise.all([purchasePlanItemApi.update(this.item.id, this.formItem)])
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
