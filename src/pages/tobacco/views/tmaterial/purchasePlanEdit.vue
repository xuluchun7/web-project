 <template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item label="标题描述"
                  prop="title">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.title" />
    </el-form-item>
    <el-form-item label="所属单位">
      <organization-form :root="userOrgId"
                         @onchange="organizationOnchange"
                         style="width:100%" />
    </el-form-item>

    <el-form-item :label="$t('tobacco.tmaterial.purchasePlan.supplierName')"
                  prop="supplierId">
      <el-autocomplete class="inline-input"
                       style="width:100%"
                       clearable
                       v-model="formItem.supplierName"
                       :fetch-suggestions="querySearch"
                       placeholder="请输入供应厂商名称进行筛选"
                       :trigger-on-focus="false"
                       @select="handleSelect">
        <template slot-scope="{ item }">
          <div class="name">{{ item.name }}</div>
        </template>
      </el-autocomplete>
    </el-form-item>
    <el-form-item label="使用单位"
                  prop="receiverId">
      <organization-form :root="userOrgId"
                         :code.sync="formItem.receiverId"
                         :name.sync="formItem.receiverName"
                         style="width:100%" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.purchasePlan.control')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.control" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.purchasePlan.author')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.author" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.purchasePlan.date')">
      <el-date-picker v-model="formItem.date"
                      type="date"
                      style="width:100%;"
                      :placeholder="$t('base.pleaseSelect')">
      </el-date-picker>
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
import purchasePlanApi from '../../api/tmaterial/apiPurchasePlan';
import organizationApi from "@/api/xbasic/apiOrganization";
import moment from "moment";
import { mapGetters } from "vuex";
import UUID from "es6-uuid";
export default {
  props: ['item', 'isEdit', 'visible'],
  data () {
    return {
      formData: {
        manufacturerList: []
      },
      formItem: {
      },
      ruleValidate: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        receiverId: [
          { required: true, message: '使用单位不能为空', trigger: 'blur' }
        ]

      }
    };
  },
  created () {
    this.load();
    Promise.all([
      organizationApi.getAll({ search: "lead:eq:XC", size: 500 })
    ])
      .then(([response]) => {
        this.formData.supplierList = response.content;
      })
      .catch(error => { });
  },
  components: {
    OrganizationForm: () => import("@/components/Organization")
  },
  computed: {
    ...mapGetters({
      userDistrictId: "districtId",
      userOrgId: "organizationId",
      organizationName: "organizationName",
      userName: "userName"
    })
  },
  methods: {
    organizationOnchange (label, value, values) {
      this.formItem.organizationId = value;
      this.formItem.organizationName = label;
      this.formItem.organizationOrder = "0";
      this.formItem.organizationCode = value;
    },
    load () {
      this.formItem = JSON.parse(JSON.stringify(this.item));
    },
    querySearch (queryString, cb) {
      var suppliers = this.formData.supplierList;
      var results = queryString
        ? suppliers.filter(this.createFilter(queryString))
        : suppliers;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      console.log(queryString);
      return supplier => {
        return (
          supplier.name.toLowerCase().indexOf(queryString.toLowerCase()) >=
          0
        );
      };
    },
    handleSelect (item) {
      this.formItem.supplierId = item.id;
      this.formItem.supplierName = item.name;
    },
    onSubmitClick (name) {
      this.formItem.date = moment(this.formItem.date).format("YYYY-MM-DD");
      this.$refs[name].validate((valid) => {//进行前端检验
        if (valid) {
          Promise.all([purchasePlanApi.update(this.item.id, this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              this.$message({
                message: "修改成功!",
                type: 'info',
              });
              this.$emit('onSearchButtonClick');
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
