<template>
  <div class='mainPanel'
       v-loading="loading">
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form class="cas-flex-3"
                 style="height: 30px;"
                 label-width="80px">

          <el-form-item :label="$t('tobacco.tmaterial.warehouse.name')"
                        prop="materialId">

            <el-select v-model="formItem.warehouse"
                       @change="onWarehouseChanged">
              <el-option v-for="item in formData.warehouseList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.bill.grantPack')"
                        prop="grantPack">
            <el-select v-model="formItem.packId"
                       @change="onGrantPackChange">
              <el-option v-for="item in formData.packList"
                         :key="item.id"
                         :label="item.name"
                         :value="item.id">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.content }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('tobacco.common.district')">
            <organization-form :root="userDistrictId"
                               :code.sync="formData.districtId"
                               model="district" />

          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 300px">
        <el-popover placement="bottom-start"
                    type='primary'
                    width="600"
                    trigger="click">
          <el-form class="cas-group cas-flex-2">
            <el-form-item :label="$t('tobacco.tmaterial.bill.deliveryOrganizationName')"
                          prop="deliveryOrganizationId">
              <organization-form :root="userOrgId"
                                 :code.sync="formItem.deliveryOrganizationId"
                                 :name.sync="formItem.deliveryOrganizationName"
                                 @onchange="onDeliveryChanged" />
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

            <el-form-item :label="$t('tobacco.tmaterial.bill.desc')"
                          style="width:100%">
              <el-input v-bind:placeholder="$t('base.pleaseInput')"
                        type="textarea"
                        :rows="6"
                        v-model="formItem.desc" />
            </el-form-item>
          </el-form>
          <el-button plain
                     type='primary'
                     slot="reference">{{ $t('base.more') }}</el-button>
        </el-popover>
        <el-button type="primary"
                   style="margin-left:3px"
                   plain
                   :disabled="!formItem.packId"
                   @click="onShowFarmer">{{ $t('base.import') }}
        </el-button>
        <el-button type="primary"
                   style="margin-left:3px"
                   plain
                   @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
        </el-button>
        <el-button type='primary'
                   plain
                   style="margin-left:3px"
                   @click="onBackClick()">{{ $t('base.buttonBack') }}
        </el-button>
      </div>
    </div>
    <main class='contentPanel'
          style="padding:5px;border-right:1px solid green;overflow-y:auto;overflow-x:auto;display:inherit ">
      <div style="width:300px;border-right:1px solid green;">
        <el-input placeholder="输入关键字搜索"
                  v-model="filterQuery"
                  style="width:100%" />
        <el-table :data="formData.displayFarmerList"
                  v-vscroll
                  border
                  style="margin-top:5px;padding:5px;overflow-y:auto;overflow-x:auto;"
                  @current-change="onFarmerSelected">
          <el-table-column label="种植户"
                           prop="farmerName">
            <template slot-scope="scope">
              <el-tooltip class="item"
                          effect="dark"
                          :content="scope.row.organization.districtName+ ' '+scope.row.area+'亩'"
                          placement="right">
                <span>{{ scope.row.farmerName}}</span>
              </el-tooltip>

            </template>
          </el-table-column>
          <el-table-column align="center"
                           width="100">
            <template slot="header"
                      slot-scope="scope">
              <el-popover placement="right"
                          width="400"
                          trigger="click">
                <el-autocomplete v-model="formData.newFarmer"
                                 :fetch-suggestions="querySearchAsync"
                                 placeholder="请输入内容"
                                 style="width:100%"
                                 @select="handleSelect">
                  <i class="el-icon-edit el-input__icon"
                     slot="suffix"
                     @click="handleIconClick">
                  </i>
                  <template slot-scope="{ item }">
                    <span style="float: left">{{ item.farmerName }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.organization.districtName }}</span>
                  </template>
                </el-autocomplete>
                <el-button slot="reference"
                           :disabled="!formItem.packId"
                           type="text">添加</el-button>
              </el-popover>
            </template>
            <template slot-scope="scope">
              <el-button icon="el-icon-error"
                         round
                         type="text"
                         @click="onRemoveFarmer(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-table id="table"
                border
                :data="formData.billItemList"
                style="width:calc(100% - 300px)">
        <el-table-column>
          <template slot="header"
                    slot-scope="scope">
            <span style="float: left;font-size: 18px;color: black;}">{{formatSendLabel()}}</span>
            <span style="float: right; color: #8492a6;font-size: 18px;color: black;">{{ formData.totalInfo }}</span>
          </template>
          <el-table-column prop="serial"
                           width="60"
                           :label="this.$t('tobacco.tmaterial.billItem.serial')"
                           show-overflow-tooltip />

          <el-table-column prop="materialCode"
                           :label="this.$t('tobacco.tmaterial.billItem.materialCode')"
                           show-overflow-tooltip />
          <el-table-column prop="materialName"
                           :label="this.$t('tobacco.tmaterial.billItem.materialName')"
                           show-overflow-tooltip />

          <el-table-column prop="measureName"
                           :label="this.$t('tobacco.tmaterial.billItem.measureName')"
                           show-overflow-tooltip />
          <el-table-column prop="exp"
                           v-show="false"
                           :label="this.$t('tobacco.tmaterial.billItem.exp')">
            <template slot-scope="scope">
              <span v-if=" scope.row.exp">
                {{ scope.row.exp|parseDate('YYYY-MM-DD') }}
              </span>
              <span v-else>
                不限
              </span>

            </template>
          </el-table-column>
          <el-table-column prop="price"
                           :label="this.$t('tobacco.tmaterial.billItem.price')" />

          <el-table-column prop="amount"
                           :label="this.$t('tobacco.tmaterial.billItem.amount')">
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount" />
            </template>
          </el-table-column>

          <el-table-column prop="money"
                           :label="this.$t('tobacco.tmaterial.billItem.money')" />

          <el-table-column fixed="right"
                           width="100"
                           :label="$t('base.titleOperation')">

            <template slot-scope="scope">

              <el-button type="text"
                         size="small"
                         @click="onDeleteBillItemClick(scope.row)">{{$t('base.buttonDelete')}}</el-button>
            </template>
          </el-table-column>
        </el-table-column>

      </el-table>

    </main>

  </div>
</template>
<script>
import billApi from "../../api/tmaterial/apiBillOut";
import { parseDate } from "@/filters/index.ts";
import booksApi from "../../api/tmaterial/apiBooks";
import warehouseApi from "../../api/tmaterial/apiWarehouse";
import packApi from "../../api/tmaterial/apiPack";
import packItemApi from "../../api/tmaterial/apiPackItem";
import plantPlanApi from "../../api/tfarm/api_plantPlan";
import UUID from "es6-uuid";
import { mapGetters } from "vuex";
export default {
  props: ["operation", "visible"],
  data() {
    return {
      loading: false,
      books: {},
      filterQuery: "",
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
        grantPack: [{ required: true, message: "物资套餐", trigger: "blur" }]
      },
      formData: {
        warehouseList: [],
        packList: [],
        packItemList: [],
        districtId: "",
        districtName: "",
        displayFarmerList: [],
        billOutList: [],
        farmerList: [],
        billItemList: [],
        selectRow: {},
        newFarmer: "",
        totalInfo: "总计0户  总面积0.00亩"
      },
      statusList: [
        { value: 0, label: "编辑" }
        // { value: 5, label: "确认" },
        // { value: 7, label: "作废" }
      ]
    };
  },
  created() {
    this.formItem.operation = this.operation;
    this.loading = true;
    this.formItem.deliveryOrganizationId = this.userOrgId;
    this.formItem.deliveryOrganizationName = this.$store.state.user.organization.organizationName;
    this.onDeliveryChanged("", this.formItem.deliveryOrganizationId);
    this.formData.districtId = this.userDistrictId;
    //获取组织单位信息
    if (this.userOrgId !== undefined && this.userOrgId.length >= 6) {
      //获取到了有效的信息，根据组织单位的特性，采用前6位做为市公司编码
      Promise.all([
        booksApi.getAll({
          size: 15,
          page: 0,
          sort: "createDate,desc",
          search: "organization.organizationId:eq:{orgId};;status:eq:5".format({
            orgId: this.userOrgId.substring(0, 6)
          })
        }),
        packApi.getByOrganizationId(this.userOrgId)
      ])
        .then(([response, packResponse]) => {
          if (response.content.length > 0) {
            this.books = response.content[0];
            this.loading = false;
            this.formItem.books = this.books.id;
          } else {
            this.$notify.error({
              title: "错误",
              message: "未设置有效账套"
            });
          }

          this.formData.packList = packResponse;
        })
        .catch(error => {
          console.log(error);
          this.$notify.error({
            title: "错误",
            message: "获取账套信息失败,请刷新界面重试"
          });
          this.loading = false;
        });
    }
  },
  components: {
    OrganizationForm: () => import("@/components/Organization")
  },
  computed: {
    ...mapGetters({ userDistrictId: "districtId", userOrgId: "organizationId" })
  },
  watch: {
    operation(curl, old) {
      this.formItem.operation = curl;
    },
    filterQuery(value, old) {
      if (value === "" || value === undefined || value === null) {
        this.formData.displayFarmerList = this.formData.farmerList;
      } else {
        this.formData.displayFarmerList = this.formData.farmerList.filter(
          it => {
            return (
              it.farmerName.indexOf(value) !== -1 ||
              (it.organization !== undefined &&
                it.organization.districtName.indexOf(value) !== -1)
            );
          }
        );
      }
    },
    "formData.farmerList"(value) {
      let count = value.length;
      let area = 0;
      value.forEach(it => {
        area += it.area;
      });
      this.formData.totalInfo = "总计{count}户  总面积{area}亩".format({
        count: count,
        area: area.toFixed(2)
      });
    }
  },
  methods: {
    onShowFarmer() {
      this.loadFarmer();
      // if (
      //   this.formData.farmerList !== undefined &&
      //   this.formData.farmerList !== null &&
      //   this.formData.farmerList.length > 0
      // ) {
      //   this.$confirm("继续操作将放弃当前的数据, 是否继续?", "提示", {
      //     confirmButtonText: "确定",
      //     cancelButtonText: "取消",
      //     type: "warning"
      //   })
      //     .then(() => {
      //       this.loadFarmer();
      //     })
      //     .catch(() => {});
      // } else {
      //   this.loadFarmer();
      // }
    },
    onSubmitClick(name) {
      this.formItem.books = this.books.id;
      if (!this.formData.billOutList) {
        this.$notify({
          title: "警告",
          message: "没有数据可以保存",
          type: "warning"
        });
        return;
      }
      let area = 0;
      let materialList = [];
      this.formData.billOutList.forEach(it => {
        area += it.billOut.area;
        it.billItemEntityList.forEach(ii => {
          let item = materialList.find(mi => {
            return mi.materialId === ii.materialId;
          });
          if (item) {
            item.amount += ii.amount;
          } else {
            materialList.push({
              materialId: ii.materialId,
              materialName: ii.materialName,
              amount: ii.amount,
              measureName: ii.measureName
            });
          }
        });
      });

      const h = this.$createElement;
      let mm = [];
      mm.push(h("span", null, "合计发放面积{area}亩".format({ area: area })));
      materialList.forEach(it => {
        mm.push(h("br", null, ""));
        mm.push(
          h(
            "span",
            null,
            "物资名称：{materialName}, 合计数量：{amount} {measureName}".format(
              {
                materialName: it.materialName,
                amount: it.amount,
                measureName: it.measureName
              }
            )
          )
        );
      });
      this.loading = true;
      let that = this;
      this.$msgbox({
        title: "消息",
        message: h("p", null, mm),
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        beforeClose: (action, instance, done) => {
          if (action === "confirm") {
            Promise.all([billApi.saveBatch(this.formData.billOutList)])
              .then(([response]) => {
                //重置表单，允许多次操作
                this.$message({
                  message: this.$t("message.saveAndContinue"),
                  type: "info"
                });
                this.$emit("update:visible", false);
              })
              .catch(error => {
                console.log(error);
                this.$notify.error({
                  title: "错误",
                  message: "保存失败"
                });
              })
              .finally(() => {
                that.loading = false;
                done();
              });
          } else {
            done();
          }
        }
      }).catch(() => {
        that.loading = false;
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
        author: this.$store.state.user.userName,
        date: parseDate(new Date(), "YYYY-MM-DD"),
        operation: this.operation,
        deliveryOrganizationId: "",
        deliveryOrganizationName: "",
        deliveryInfo: "",
        arriveOrganizationId: "",
        arriveOrganizationName: "",
        arriveInfo: "",
        deliver: this.$store.state.user.userName,
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
        organizationName: this.$store.state.user.organization.organizationName,
        organizationOrder: "",
        organizationCode: this.userOrgId,
        packId: "",
        packCode: "",
        packName: "",
        packPrice: 0,
        multiplier: 0,
        area: 0,
        paid: 0
      };
    },
    createBillItem(billId, material, index, packItem, area) {
      return {
        id: UUID(32, 36),
        billId: billId,
        serial: index,
        materialId: material.id,
        materialCode: material.code,
        materialName: material.name,
        measureId: material.measure.id,
        measureName: material.measure.name,
        measureUnitId: material.measure.id,
        measureUnitName: material.measure.name,
        amountUnit: area * packItem.amount,
        convert: 1,
        price: packItem.price.price,
        priceUnit: "",
        amount: area * packItem.amount,
        pricePurchase: "",
        purchaseMoney: "",
        money: area * packItem.price.price,
        mfg: "",
        exp: "",
        tax: "",
        total: area * packItem.price.price,
        desc: "",
        expDays: "",
        area: area
      };
    },
    formReset(name) {
      this.$refs[name].resetFields();
      this.formItem.id = UUID(32, 36);
    },
    onWarehouseChanged(value) {
      let item = this.formData.warehouseList.find(it => {
        return it.id === value;
      });
      if (item !== undefined) {
        this.formItem.warehouse = item.id;
        this.formItem.accountPeriod = item.currentYearMonth;
      }
    },

    onDeliveryChanged(label, value) {
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
    onBackClick() {
      this.$emit("update:visible", false);
    },
    onGrantPackChange(value) {
      if (value) {
        let item = this.formData.packList.find(it => {
          return it.id === value;
        });
        if (item) {
          this.formItem.packName = item.name;
          this.formItem.packCode = item.code;
          this.formItem.packPrice = item.money;
          this.formItem.multiplier = 1;
        }
        Promise.all([
          packItemApi.getAll({
            size: 500,
            page: 0,
            sort: "id,asc",
            search: "pack.id:eq:" + value
          })
        ])
          .then(([response]) => {
            this.formData.packItemList = response.content;
          })
          .catch(error => {});
      }
    },
    onRemoveFarmer(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let index = this.formData.farmerList.findIndex(it => {
            return it.id === row.id;
          });
          if (index > -1) {
            this.formData.farmerList.splice(index, 1);
          }
          let that = this;

          this.formData.displayFarmerList = this.formData.farmerList.filter(
            it => {
              return (
                it.farmerName.indexOf(that.filterQuery) !== -1 ||
                (it.organization !== undefined &&
                  it.organization.districtName.indexOf(that.filterQuery) !== -1)
              );
            }
          );
          index = this.formData.billOutList.findIndex(it => {
            return it.billOut.arriveOrganizationId === row.farmerId;
          });
          if (index > -1) {
            this.formData.billOutList.splice(index, 1);
            this.formData.billItemList = [];
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    /**
     * 覆盖式加载农户
     */
    loadFarmerOvrride() {
      this.formData.billOutList = [];
      Promise.all([
        plantPlanApi.getAll({
          size: 500,
          page: 0,
          sort: "id,asc",
          search: "organization.districtId:rlike:" + this.formData.districtId
        })
      ])
        .then(([response]) => {
          this.formData.farmerList = response.content;
          this.formData.displayFarmerList = this.formData.farmerList;
          let count = this.formData.farmerList.length;
          let area = 0;
          this.formData.farmerList.forEach(it => {
            area += it.area;
          });
          let that = this;
          response.content.forEach(it => {
            let item = JSON.parse(JSON.stringify(that.formItem));
            item.id = UUID(32, 36);
            item.arriveOrganizationId = it.farmerId;
            item.arriveOrganizationName = it.farmerName;
            item.arriveInfo = it.farmerNumber;
            item.area = it.area;
            let billItemEntityList = [];
            let index = 1;
            that.formData.packItemList.forEach(pi => {
              let pitem = that.createBillItem(
                item.id,
                pi.price.material,
                index++,
                pi,
                item.area
              );
              billItemEntityList.push(pitem);
            });
            that.formData.billOutList.push({
              billOut: item,
              billItemEntityList: billItemEntityList
            });
          });
          this.$notify({
            title: "导入信息",
            message: "合计导入{count}户，累计面积{area}亩".format({
              count: count,
              area: area.toFixed(2)
            }),
            type: "success"
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    loadFarmer() {
      Promise.all([
        plantPlanApi.getAll({
          size: 500,
          page: 0,
          sort: "id,asc",
          search: "organization.districtId:rlike:" + this.formData.districtId
        })
      ])
        .then(([response]) => {
          //如果之前没有数据，直接处理
          let subFamerList = []; //需求处理的
          let that = this;
          if (this.formData.farmerList.length === 0) {
            this.formData.farmerList = response.content;
            response.content.forEach(it => {
              let item = JSON.parse(JSON.stringify(that.formItem));
              item.id = UUID(32, 36);
              item.arriveOrganizationId = it.farmerId;
              item.arriveOrganizationName = it.farmerName;
              item.arriveInfo = it.farmerNumber;
              item.area = it.area;
              let billItemEntityList = [];
              let index = 1;
              that.formData.packItemList.forEach(pi => {
                let pitem = that.createBillItem(
                  item.id,
                  pi.price.material,
                  index++,
                  pi,
                  item.area
                );
                billItemEntityList.push(pitem);
              });
              that.formData.billOutList.push({
                billOut: item,
                billItemEntityList: billItemEntityList
              });
            });
          } else {
            subFamerList = response.content.filter(t => {
              return (
                this.formData.farmerList.findIndex(tt => {
                  return tt.id === t.id;
                }) === -1
              );
            });
            this.formData.farmerList.push.apply(
              this.formData.farmerList,
              subFamerList
            );
            if (subFamerList.length !== 0) {
              subFamerList.forEach(it => {
                let item = JSON.parse(JSON.stringify(that.formItem));
                item.id = UUID(32, 36);
                item.arriveOrganizationId = it.farmerId;
                item.arriveOrganizationName = it.farmerName;
                item.arriveInfo = it.farmerNumber;
                item.area = it.area;
                let billItemEntityList = [];
                let index = 1;
                that.formData.packItemList.forEach(pi => {
                  let pitem = that.createBillItem(
                    item.id,
                    pi.price.material,
                    index++,
                    pi,
                    item.area
                  );
                  billItemEntityList.push(pitem);
                });
                that.formData.billOutList.push({
                  billOut: item,
                  billItemEntityList: billItemEntityList
                });
              });
            }
          }
          this.formData.displayFarmerList = this.formData.farmerList;
        })
        .catch(error => {
          console.log(error);
        });
    },
    onFarmerSelected(currentRow, oldCurrentRow) {
      if (currentRow) {
        let item = this.formData.billOutList.find(it => {
          return it.billOut.arriveOrganizationId === currentRow.farmerId;
        });
        if (item) {
          this.formData.billItemList = item.billItemEntityList;
        } else {
          this.formData.billItemList = [];
        }
        this.formData.selectRow = currentRow;
      } else {
        this.formData.billItemList = [];
        this.formData.selectRow = {};
      }
    },
    /**
     * 删除明细
     */
    onDeleteBillItemClick(row) {
      let index = this.formData.billOutList.findIndex(it => {
        return it.billOut.id === row.billId;
      });
      if (index > -1) {
        let item = this.formData.billOutList[index];
        index = item.billItemEntityList.findIndex(it => {
          return it.id === row.id;
        });
        if (index > -1) {
          item.billItemEntityList.splice(index, 1);
        }
      }
    },
    formatSendLabel() {
      let farmerName = this.formData.selectRow.farmerName
        ? this.formData.selectRow.farmerName
        : "暂无";
      let area = this.formData.selectRow.area
        ? this.formData.selectRow.area
        : 0;
      return "发放对象:{farmerName} 发放面积:{area}亩".format({
        farmerName: farmerName,
        area: area.toFixed(2)
      });
    },

    querySearchAsync(queryString, cb) {
      if (!queryString) {
        cb([]);
      }
      Promise.all([
        plantPlanApi.getAll({
          size: 500,
          page: 0,
          sort: "id,asc",
          contains: "farmerName:" + queryString,
          search: "organization.organizationId:rlike:" + this.userOrgId
        })
      ])
        .then(([response]) => {
          cb(response.content);
        })
        .catch(error => {
          console.log(error);
        });
    },
    handleSelect(selected) {
      let that = this;
      let index = that.formData.billOutList.findIndex(it => {
        return it.billOut.arriveOrganizationId === selected.farmerId;
      });
      if (index > -1) {
        this.$notify({
          title: "警告",
          message: "该批次已经存在该烟农",
          type: "warning"
        });
        return;
      }
      this.formData.farmerList.push(selected);
      this.formData.displayFarmerList = this.formData.farmerList.filter(it => {
        return (
          it.farmerName.indexOf(that.filterQuery) !== -1 ||
          (it.organization !== undefined &&
            it.organization.districtName.indexOf(that.filterQuery) !== -1)
        );
      });
      let item = JSON.parse(JSON.stringify(that.formItem));
      item.id = UUID(32, 36);
      item.arriveOrganizationId = selected.farmerId;
      item.arriveOrganizationName = selected.farmerName;
      item.arriveInfo = selected.farmerNumber;
      item.area = selected.area;
      let billItemEntityList = [];
      index = 1;
      that.formData.packItemList.forEach(pi => {
        let pitem = that.createBillItem(
          item.id,
          pi.price.material,
          index++,
          pi,
          selected.area
        );
        billItemEntityList.push(pitem);
      });
      that.formData.billOutList.push({
        billOut: item,
        billItemEntityList: billItemEntityList
      });
    },
    handleIconClick(ev) {
      // console.log(ev);
    }
  },
  directives: {
    vscroll: {
      // 指令的定义
      inserted: function(el) {
        el.style.cssText +=
          "height:" +
          (el.parentElement.parentElement.children["table"].clientHeight - 40) +
          "px;";
      }
    }
  }
};
</script>
