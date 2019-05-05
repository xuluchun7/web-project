<template>
  <div>
    <el-form v-if='steps===1'
             v-loading.fullscreen.lock="loading"
             :model="formItem"
             label-width="80px"
             :rules="ruleValidate"
             ref="formValidate"
             class="cas-group cas-flex-2">
      <el-form-item :label="$t('tobacco.tmaterial.bill.purchasePlan')"
                    style="width:100%"
                    prop="refBillId">
        <el-select v-model="formItem.refBillId"
                   filterable
                   remote
                   clearable
                   reserve-keyword
                   :remote-method="remoteMethod"
                   placeholder="请输入关键词"
                   :loading="purchasePlanLoading"
                   @change="onPurchasePlanChange">
          <el-option v-for="item in formData.purchaseList"
                     :key="item.id"
                     :label="item.title"
                     :value="item.id">
            <span style="float: left">{{ item.title }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.date|parseDate('YYYY-MM-DD') }}</span>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item :label="$t('tobacco.tmaterial.bill.deliveryOrganizationName')"
                    prop="deliveryOrganizationId">

        <organization-form root="XC"
                           style="width:100%"
                           :showRoot="false"
                           :code.sync="formItem.deliveryOrganizationId"
                           :name.sync="formItem.deliveryOrganizationName" />
      </el-form-item>

      <el-form-item :label="$t('tobacco.tmaterial.bill.arriveOrganizationName')"
                    prop="arriveOrganizationId"
                    v-if="false">

        <organization-form :root="userOrgId"
                           style="width:100%"
                           :code.sync="formItem.arriveOrganizationId"
                           :name.sync="formItem.arriveOrganizationName"
                           @onchange="onArriveChanged" />
      </el-form-item>
      <el-form-item :label="$t('tobacco.tmaterial.bill.arriveWarehouse')"
                    prop="warehouse">

        <el-select v-model="formItem.warehouse"
                   @change="onWarehouseChanged">
          <el-option v-for="item in formData.warehouseList"
                     :key="item.id"
                     :label="item.name"
                     :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('tobacco.tmaterial.bill.sendBillSerial')">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.refBillSerial" />
      </el-form-item>

      <el-form-item :label="$t('tobacco.tmaterial.bill.serial')">
        <el-input placeholder="如果为空，则自动生成"
                  v-model="formItem.serial" />
      </el-form-item>

      <el-form-item :label="$t('tobacco.tmaterial.bill.author')"
                    prop="author">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.author" />
      </el-form-item>
      <el-form-item :label="$t('tobacco.tmaterial.bill.date')">

        <el-date-picker v-model="formItem.date"
                        style="width:100%"
                        type="date"
                        format="yyyy-MM-dd"
                        :clearable="false"
                        placeholder="选择日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item :label="$t('tobacco.tmaterial.bill.deliver')"
                    prop="deliver">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  v-model="formItem.deliver" />
      </el-form-item>

      <el-form-item :label="$t('tobacco.tmaterial.bill.control')">

        <el-select v-model="formItem.control"
                   :placeholder="$t('base.pleaseSelect')"
                   style="width: 100%">
          <el-option v-for="item in statusList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('tobacco.tmaterial.bill.sendInfo')"
                    style="width:100%">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  type="textarea"
                  :span="4"
                  v-model="formItem.refBillInfo" />
      </el-form-item>
      <el-form-item :label="$t('tobacco.tmaterial.bill.desc')"
                    style="width:100%">
        <el-input v-bind:placeholder="$t('base.pleaseInput')"
                  type="textarea"
                  :span="4"
                  v-model="formItem.desc" />
      </el-form-item>
      <el-form-item style="width:100%">
        <el-button type="primary"
                   style="float: right"
                   :disabled="!formItem.refBillId"
                   @click="onNextClick('formValidate')">{{ $t('base.buttonNextStep') }}
        </el-button>
      </el-form-item>
    </el-form>
    <div v-if='steps===2'
         style="height:440px">
      <el-table border
                height="400px"
                :data="formData.billItemList">
        <el-table-column prop="materialCode"
                         :label="this.$t('tobacco.tmaterial.billItem.materialCode')"
                         show-overflow-tooltip />
        <el-table-column prop="materialName"
                         :label="this.$t('tobacco.tmaterial.billItem.materialName')"
                         show-overflow-tooltip />

        <el-table-column prop="measureName"
                         :label="this.$t('tobacco.tmaterial.billItem.measureName')"
                         show-overflow-tooltip />
        <el-table-column prop="mfg"
                         width="200"
                         :label="this.$t('tobacco.tmaterial.billItem.mfg')">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.mfg"
                            style="width:100%"
                            type="date"
                            format="yyyy-MM-dd"
                            :clearable="false"
                            placeholder="选择生产日期">
            </el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="exp"
                         width="200"
                         :label="this.$t('tobacco.tmaterial.billItem.exp')">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.exp"
                            style="width:100%"
                            type="date"
                            format="yyyy-MM-dd"
                            :clearable="false"
                            placeholder="选择有效日期">
            </el-date-picker>
          </template>
        </el-table-column>

        <el-table-column prop="amount"
                         :label="this.$t('tobacco.tmaterial.billItem.amount')">
          <template slot-scope="scope">
            <el-input v-model="scope.row.amount"
                      clearable
                      :placeholder="scope.row.confirmAmount"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="price"
                         v-if="false"
                         :label="this.$t('tobacco.tmaterial.billItem.price')">
          <template slot-scope="scope">
            <el-input v-model="scope.row.price"
                      clearable></el-input>
          </template>
        </el-table-column>

        <el-table-column prop="money"
                         v-if="false"
                         :label="this.$t('tobacco.tmaterial.billItem.money')">
          <template slot-scope="scope">
            <el-input v-model="scope.row.money"
                      clearable></el-input>
          </template>
        </el-table-column>

        <el-table-column width="80">

          <template slot-scope="scope">

            <el-button type="text"
                       size="small"
                       @click="onDeleteBillItemClick(scope.row)">{{$t('base.buttonDelete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary"
                 style="float: right;margin-top:10px"
                 @click="onSubmitClick()">{{ $t('base.buttonSave') }}
      </el-button>
      <el-button type="primary"
                 style="float: right;margin-top:10px;margin-right:10px"
                 @click="steps=1">{{ $t('base.buttonPreStep') }}
      </el-button>
    </div>

  </div>

</template>
<script>
import billApi from "../../api/tmaterial/apiBillIn";
import { parseDate } from "@/filters/index.ts";
import booksApi from "../../api/tmaterial/apiBooks";
import warehouseApi from "../../api/tmaterial/apiWarehouse";
import purchasePlanApi from "../../api/tmaterial/apiPurchasePlan.ts";
import purchasePlanItemApi from "../../api/tmaterial/apiPurchasePlanItem.ts";
import UUID from "es6-uuid";
import { mapGetters } from "vuex";
import { default as util } from "@/utils/util";
export default {
  props: ["operation", "visible"],
  data() {
    return {
      steps: 1,
      loading: false,
      purchasePlanLoading: false,
      books: {},
      formItem: this.creatItem(),
      ruleValidate: {
        deliveryOrganizationId: [
          { required: true, message: "发货单位不能为空", trigger: "blur" }
        ],
        arriveOrganizationId: [
          { required: true, message: "到货单位不能为空", trigger: "blur" }
        ],
        author: [
          { required: true, message: "登记人不能为空", trigger: "blur" }
        ],
        deliver: [
          { required: true, message: "经办人不能为空", trigger: "blur" }
        ],
        warehouse: [
          { required: true, message: "物资仓库不能为空", trigger: "blur" }
        ],
        refBillId: [
          { required: true, message: "采购计划单不能为空", trigger: "blur" }
        ]
      },
      formData: {
        warehouseList: [],
        purchaseList: [],
        billItemList: []
      },
      statusList: [
        { value: 0, label: "编辑" }
        // { value: 5, label: "确认" },
        // { value: 7, label: "作废" }
      ]
    };
  },
  created() {
    this.formItem = this.creatItem();
    this.formItem.operation = this.operation;
    this.loading = true;
    this.formItem.arriveOrganizationId = this.userOrgId;
    this.formItem.arriveOrganizationName = this.organizationName;
    this.onArriveChanged("", this.formItem.arriveOrganizationId);
    //获取组织单位信息
    if (this.userOrgId !== undefined && this.userOrgId.length >= 6) {
      //获取到了有效的信息，根据组织单位的特性，采用前6位做为市公司编码
      Promise.all([
        booksApi.getAll({
          size: 15,
          page: 0,
          sort: "createDate,desc",
          search: "organization.organizationId:eq:{orgId};status:eq:5".format({
            orgId: this.userOrgId.substring(0, 6)
          })
        })
      ])
        .then(([response]) => {
          if (response.content.length > 0) {
            this.books = response.content[0];
            this.load();
            this.loading = false;
            this.formItem.books = this.books.id;
          } else {
            this.$notify.error({
              title: "错误",
              message: "未设置有效账套"
            });
          }
        })
        .catch(error => {
          console.log(error);
          this.$notify.error({
            title: "错误",
            message: "获取账套信息失败,请刷新界面重试"
          });
        });
    }
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
  watch: {
    operation(curl, old) {
      this.formItem.operation = curl;
    },
    "formItem.refBillId"(curl, old) {
      if (util.isNullOrEmpty(curl)) {
        this.formData.purchaseList = [];
      }
    }
  },
  methods: {
    onSubmitClick(name) {
      this.formItem.arriveOrganizationId = this.userOrgId;
      this.formItem.arriveOrganizationName = this.organizationName;
      this.formItem.organizationId = this.userOrgId;
      this.formItem.organizationIds = [this.userOrgId];
      this.formItem.organizationName = this.organizationName;
      this.formItem.organizationOrder = 0;
      this.formItem.organizationCode = this.userOrgId;
      this.formItem.books = this.books.id;
      let item = this.formData.billItemList.find(it => {
        return (
          util.isNullOrEmpty(it.exp) ||
          it.confirmAmount < it.amount ||
          it.amount <= 0
        );
      });
      if (item) {
        if (util.isNullOrEmpty(item.exp)) {
          this.$notify({
            title: "警告",
            message: `[${item.materialName}]有效期未设置`,
            type: "warning"
          });
        } else {
          this.$notify({
            title: "警告",
            message: `[${item.materialName}] 可用量${
              item.confirmAmount
            }且入库数量必须大于0`,
            type: "warning"
          });
        }

        return;
      }
      let serial = 1;
      this.formData.billItemList.forEach(it => {
        it.measureUnitId = it.measureId;
        it.measureUnitName = it.measureName;
        it.amountUnit = it.amount;
        it.convert = 1;
        it.serial = serial++;
        it.billId = this.formItem.id;
      });
      Promise.all([
        billApi.saveByPurchase(this.formItem, this.formData.billItemList)
      ])
        .then(([response]) => {
          this.formItem = this.creatItem();
          this.formItem.warehouse = this.formData.warehouseList[0].id;
          this.formItem.accountPeriod = this.formData.warehouseList[0].currentYearMonth;
          this.steps = 1;
          this.formData.purchaseList = [];
          this.formData.billItemList = [];
          //重置表单，允许多次操作
          this.$message({
            message: this.$t("message.saveAndContinue"),
            type: "info"
          });
          this.$emit("update:visible", false);
        })
        .catch(error => {
          console.log(error);
          this.$message({
            message: error.message,
            type: "error"
          });
        });
    },
    onNextClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.steps = 2;
        }
      });
    },
    creatItem() {
      return {
        id: UUID(32, 36),
        serial: "",
        barcode: "",
        annual: this.$store.state.system.annual,
        accountPeriod: "",
        title: "",
        author: this.userName,
        date: parseDate(new Date(), "YYYY-MM-DD"),
        operation: this.operation,
        deliveryOrganizationId: "",
        deliveryOrganizationName: "",
        deliveryInfo: "",
        arriveOrganizationId: "",
        arriveOrganizationName: "",
        arriveInfo: "",
        deliver: this.userName,
        itemCount: 0,
        itemMoneys: 0,
        itemTaxs: 0,
        itemFreights: 0,
        itemTotals: 0,
        refBillId: "",
        refBillSerial: "",
        refBillBarcode: "",
        refBillInfo: "",
        print: 0,
        control: 0,
        desc: "",
        warehouse: "",
        books: "",
        organizationId: this.userOrgId,
        organizationIds: [this.userOrgId],
        organizationName: this.organizationName,
        organizationOrder: "",
        organizationCode: this.userOrgId
      };
    },

    formReset(name) {
      this.$refs[name].resetFields();
      this.formItem = this.creatItem();
    },
    load() {},
    onWarehouseChanged(value) {
      let item = this.formData.warehouseList.find(it => {
        return it.id === value;
      });
      if (item !== undefined) {
        this.formItem.warehouse = item.id;
        this.formItem.accountPeriod = item.currentYearMonth;
      }
    },
    onArriveChanged(label, value) {
      this.formData.warehouseList = [];
      let search = "organization.organizationId:eq:{orgid};control:eq:5".format(
        {
          orgid: value
        }
      );
      Promise.all([
        warehouseApi.getAll({
          size: 500,
          page: 0,
          sort: "code,asc",
          search: search
        })
      ])
        .then(([response]) => {
          this.formData.warehouseList = response.content;
          if (response.content.length > 0) {
            this.formItem.warehouse = this.formData.warehouseList[0].id;
            this.formItem.accountPeriod = this.formData.warehouseList[0].currentYearMonth;
          }
        })
        .catch(error => {});
    },
    remoteMethod(query) {
      if (!util.isNullOrEmpty(query)) {
        this.purchasePlanLoading = true;
        Promise.all([
          purchasePlanApi.getAll({
            size: 500,
            page: 0,
            contains: "serial,title,author,date:{keyword}:true".format({
              keyword: query
            }),
            search: "organization.organizationId:eq:{orgId}:or;receiverId:{orgId}".format(
              {
                orgId: this.userOrgId
              }
            )
          })
        ])
          .then(([response]) => {
            this.formData.purchaseList = response.content;
          })
          .catch(error => {})
          .finally(() => {
            this.purchasePlanLoading = false;
          });
      } else {
        this.formData.purchaseList = [];
      }
    },
    onPurchasePlanChange(value) {
      let item = this.formData.purchaseList.find(it => {
        return it.id === value;
      });
      if (item) {
        this.formItem.refBillSerial = item.serial;
      }

      Promise.all([
        purchasePlanItemApi.getAll({
          size: 500,
          page: 0,
          search: "purchasePlan.id:EQ:{pId};".format({
            pId: value
          })
        })
      ])
        .then(([response]) => {
          let list = response.content;
          list.forEach(it => {
            it.confirmAmount = it.amount - it.confirmAmount;
            it.amount = it.confirmAmount;
            it.id = UUID(32, 36);
            it.confirmAmount = it.confirmAmount.toFixed(2);
            it.amount = it.amount.toFixed(2);
          });
          this.formData.billItemList = list;
        })
        .catch(error => {});
    },
    onDeleteBillItemClick(row) {
      let index = this.formData.billItemList.findIndex(it => {
        return it.id === row.id;
      });
      if (index > -1) {
        this.formData.billItemList.splice(index, 1);
      }
    }
  }
};
</script>
