 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tmaterial.quota.year')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.year" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.quota.title')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.title" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.quota.author')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.author" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.quota.date')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.date" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.quota.amount')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.amount" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.quota.control')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.control" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.quota.desc')">
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
import quotaApi from '../../api/tmaterial/apiQuota';
export default {
  props: ['item', 'isEdit', 'visible'],
  data () {
    return {
      formItem: {
        'year': 0,
        'title': '',
        'author': '',
        'date': '',
        'amount': 0,
        'control': 0,
        'desc': '',
      },
      ruleValidate: {
        code: [
          { required: true, message: '编码不能为空', trigger: 'blur' }
        ],
      }
    };
  },
  created () {
    this.load();
  },
  methods: {
    load () {
      this.formItem = JSON.parse(JSON.stringify(this.item));
    },
    onSubmitClick (name) {
      this.$refs[name].validate((valid) => {//进行前端检验
        if (valid) {
          Promise.all([quotaApi.update(this.item.id, this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              this.$message({
                message: this.$t('message.saveAndContinue'),
                type: 'info',
              });
              this.$emit('update:visible', false);
            })
            .catch(error => {

            });
        } else {
          this.$message({
            message: this.$t('message.formValidate'),
            type: 'warn',
          });
        }
      });
    },

    formReset (name) {
      this.$refs[name].resetFields();
    },

  },
  watch: {
    item (curVal, oldVal) {
      this.formItem = JSON.parse(JSON.stringify(curVal));
      this.load();
    },
  },
};
</script>
