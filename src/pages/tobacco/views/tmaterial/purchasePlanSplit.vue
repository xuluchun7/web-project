<style scoped>
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form label-width="70px">
          <el-form-item label="接收单位">
            <el-select multiple
                       v-model="addOrg"
                       style="width:100%;">
              <el-option v-for="org in  formData.orgChildList"
                         :key="org.id"
                         :label="org.name"
                         :value="org.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 210px">
        <el-button-group>
          <el-button type='primary'
                     @click='addButtonOnClick'>添加 </el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-collapse value="itemTable"
                   accordion>
        <el-collapse-item :title="formData.showText"
                          name="itemTable">
          <el-table :data="formData.purchasePlanItemList"
                    style="font-size: 12px;color: black;"
                    :header-cell-style="{'background-color': '#fafafa', 'color': 'black'}">
            <el-table-column type="index">
            </el-table-column>
            <el-table-column prop="materialName"
                             :label="this.$t('tobacco.tmaterial.purchasePlanItem.materialName')" />
            <el-table-column prop="materialCode"
                             :label="this.$t('tobacco.tmaterial.purchasePlanItem.materialCode')" />
            <el-table-column prop="measureName"
                             :label="this.$t('tobacco.tmaterial.purchasePlanItem.measureName')" />
            <el-table-column prop="amount"
                             :label="this.$t('tobacco.tmaterial.purchasePlanItem.amount')">
              <template slot-scope="scope">
                <span>{{ ( scope.row.amount).toFixed(2) }}</span>
              </template></el-table-column>
            <el-table-column prop="confirmAmount"
                             label="分解数量">
              <template slot-scope="scope">
                <span>{{ ( scope.row.confirmAmount).toFixed(2) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="剩余数量">
              <template slot-scope="scope">
                <span>{{ (scope.row.amount - scope.row.confirmAmount).toFixed(2) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
      <div style="float:left;">
        <el-table :data="formData.newPlanList"
                  highlight-current-row
                  style="font-size: 12px;color: black;"
                  :header-cell-style="{'background-color': '#fafafa', 'color': 'black'}"
                  @current-change="onPlanSelected">
          <el-table-column label="接收单位"
                           width="100px"
                           prop="receiverName">
            <template slot-scope="scope">
              <span>{{ scope.row.receiverName}}</span>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <el-button-group>
                <el-button icon="el-icon-success"
                           size="mini"
                           round
                           type="text"
                           @click="onSavePlanAndItmes(scope.row)"></el-button>
                <el-button icon="el-icon-error"
                           size="mini"
                           round
                           type="text"
                           @click="onRemovePlan(scope.row)"></el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="float:left;border-left:1px solid green;">
        <el-collapse value="newItem"
                     style="min-width:500px"
                     accordion>
          <el-collapse-item :title="formData.showItemTitle"
                            name="newItem">
            <el-table :data="formData.newPlanItemList"
                      style="font-size: 12px;color: black;"
                      :header-cell-style="{'background-color': '#fafafa', 'color': 'black'}">
              <el-table-column type="index">
              </el-table-column>
              <el-table-column prop="materialName"
                               min-width="200px"
                               :label="this.$t('tobacco.tmaterial.purchasePlanItem.materialName')" />
              <el-table-column prop="materialCode"
                               min-width="120px"
                               :label="this.$t('tobacco.tmaterial.purchasePlanItem.materialCode')" />
              <el-table-column prop="measureName"
                               :label="this.$t('tobacco.tmaterial.purchasePlanItem.measureName')" />
              <el-table-column prop="amount"
                               min-width="150px"
                               :label="this.$t('tobacco.tmaterial.purchasePlanItem.amount')">
                <template slot-scope="scope">
                  <el-input-number controls-position="right"
                                   size="mini"
                                   :min="0"
                                   style="width:120px"
                                   v-model="scope.row.amount">
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </div>

    </main>
    <template>
      <el-dialog :title="$t('base.buttonAdd')"
                 :visible.sync="childForm.addItemForm"
                 top="10px"
                 append-to-body
                 :before-close="handleClose">
        <add-form :visible.sync="childForm.addItemForm"
                  @onSearchButtonClick="onSearchButtonClick"
                  :parentForm=parentForm />
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')"
                 :visible.sync="childForm.editForm"
                 top="10px"
                 :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.editForm" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')"
                 :visible.sync="childForm.viewForm"
                 top="10px"
                 :before-close="handleClose">
        <edit-form :item=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.viewForm" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import('./purchasePlanItemAdd.vue');
const EditForm = () => import('./purchasePlanItemEdit.vue');
import organizationApi from "@/api/xbasic/apiOrganization";
import purchasePlanItemApi from '../../api/tmaterial/apiPurchasePlanItem';
import purchasePlanApi from '../../api/tmaterial/apiPurchasePlan';
import plantPlanApi from "../../api/tfarm/api_plantPlan";
import quotaApi from "../../api/tmaterial/apiQuota";
import { constants } from 'crypto';
import { mapGetters } from "vuex";
import UUID from "es6-uuid";
import moment from "moment";
export default {
  props: ["item"],
  data () {
    return {
      addOrg: [],
      childForm: {
        addItemForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false
      },
      dateoptions: {
        shortcuts: [
          {
            text: this.$t('base.today'),

            onClick: (picker) => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: this.$t('base.yesterday'),

            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: this.$t('base.threeMonth'),
            onClick (picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      searchData: {
      },
      parentForm: {},
      formData: {
        selectRow: {},
        sumArea: 0,
        itemArea: 0,
        showText: '',
        showItemTitle: "",
        purchasePlanItemList: [],
        orgChildList: [],
        newPlanList: [],
        newPlanItemList: [],
        pagination: {//用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: '',
          pageSizeOpts: [10, 15, 20, 25, 30]
        },
        rowSelection: []
      },
    };
  },
  created () {
    console.log("进入分解界面");
    this.load();

  },
  components: {
    'add-form': AddForm,
    'edit-form': EditForm
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
    item (curVal, oldVal) {

      this.formItem = JSON.parse(JSON.stringify(curVal));
      this.load();
    }
  },
  methods: {
    onSavePlanAndItmes (row) {
      Promise.all([
        purchasePlanApi.saveAll(row, this.formData.newPlanItemList)
      ])
        .then(([response]) => {
          this.$message({
            message: '保存成功!',
            type: 'success'
          });
          this.onSearchButtonClick();
        })
        .catch(error => { });

    },
    onRemovePlan (row) {
      Promise.all([purchasePlanApi.removeAll(row, this.formData.newPlanItemList)])
        .then(([response]) => {
          this.$message({
            type: 'info',
            message: this.$t('message.deleteOk')
          });
          this.formData.showItemTitle = "";
          this.onSearchButtonClick();
          this.formData.selectRow = null;
          this.formData.newPlanItemList = [];
          this.formData.newPlanList = this.formData.newPlanList.filter(item => {
            return item != row
          });
          this.addOrg = this.addOrg.filter(item => {
            return item != row.receiverId
          });
          console.log(this.formData.newPlanList);
        })
        .catch(error => {

        });

    },
    onPlanSelected (currentRow, oldCurrentRow) {
      this.formData.newPlanItemList = [];
      if (currentRow) {
        let item = this.formData.newPlanList.find(it => {
          return it.id === currentRow.id;
        });
        if (item) {
          Promise.all([
            plantPlanApi.getSumArea(this.$store.state.system.annual, item.receiverId)
          ])
            .then(([areaResponse]) => {
              this.formData.itemArea = areaResponse;
              this.formData.showItemTitle = item.receiverName + " :" + this.formData.itemArea.toFixed(2) + "亩";
              this.loadNewPlanItemList(item.id);
            })
            .catch(error => { });

        } else {
          this.formData.newPlanItemList = [];
        }
        this.formData.selectRow = currentRow;
      } else {
        this.formData.newPlanItemList = [];
        this.formData.selectRow = {};
      }
    },
    loadNewPlanItemList (planId) {

      Promise.all([
        purchasePlanApi.getById(planId)
      ])
        .then(([response]) => {
          Promise.all([
            purchasePlanItemApi.getAll({
              size: 500,
              page: 0,
              search: "purchasePlan.id:eq:" + planId
            })
          ])
            .then(([itemsResponse]) => {
              this.formData.newPlanItemList = itemsResponse.content;
            })
            .catch(error => {
              this.createItmes(planId);
            });
        })
        .catch(error => {
          this.createItmes(planId);
        });
    },
    createItmes (planId) {
      this.formData.purchasePlanItemList.forEach(item => {
        let newItem = JSON.parse(JSON.stringify(item));
        newItem.purchasePlan = planId;
        newItem.id = UUID(32, 36);
        newItem.amount = 0;
        newItem.confirmAmount = 0;

        Promise.all([
          quotaApi.getAmount(newItem.materialId, newItem.measureId, this.$store.state.system.annual)
        ])
          .then(([response]) => {
            newItem.amount = (this.formData.itemArea * response).toFixed(2);
          })
          .catch(error => { });

        this.formData.newPlanItemList.push(newItem);
      });
    },

    orgSelectChange (value) {
      var name = this.formData.orgChildList.find(item => {
        return item.id === value;
      }).name;
    },
    load () {
      if (this.item) {
        this.parentForm = JSON.parse(JSON.stringify(this.item));
        Promise.all([
          plantPlanApi.getSumArea(this.$store.state.system.annual, this.parentForm.receiverId),
          organizationApi.getAll({
            size: 500,
            page: 0,
            search: "lead:eq:" + this.item.receiverId
          }),
          purchasePlanApi.getAll({
            size: 500,
            page: 0,
            search: "relevance:eq:" + this.item.id
          })
        ])
          .then(([sumAreaResponse, orgResponse, planResponse]) => {
            this.formData.sumArea = sumAreaResponse;
            this.formData.showText = this.parentForm.receiverName + " :" + this.formData.sumArea.toFixed(2) + "亩,计划单号:" + this.item.serial;
            this.formData.orgChildList = orgResponse.content;
            this.formData.newPlanList = planResponse.content;
          })
          .catch(error => { });

      }
      else {
        this.parentForm = this.item;
      }
      this.formData.purchasePlanItemList = [];
      this.onSearchButtonClick();

    },
    editButtonClick (selectRow, isEdit) {
      this.formData.viewSelect = selectRow;
      if (isEdit) {
        this.childForm.editForm = true;
      } else {
        this.childForm.viewForm = true;
      }
      this.childForm.isEdit = isEdit;
    },
    deleteButtonClick () {
      if (this.formData.selectRow === null || this.formData.selectRow === undefined) {
        this.$message({
          message: this.$t('message.unSelectAny'),
          type: 'info',
        });
        return;
      }

      Promise.all([purchasePlanItemApi.softDelete(this.formData.selectRow.id)])
        .then(([response]) => {
          this.$message({
            type: 'info',
            message: this.$t('message.deleteOk')
          });
          this.formData.selectRow = null;
          this.onSearchButtonClick();

        })
        .catch(error => {

        });
    },
    deleteButtonConfirm () {
      this.$confirm(this.$t('message.deleteConfirm'), this.$t('base.titleTip'), {
        confirmButtonText: this.$t('base.buttonOk'),
        cancelButtonText: this.$t('base.buttonCancel'),
        type: 'warning'
      }).then(() => {
        this.deleteButtonClick();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.$t('message.cancel')
        });
      });

    },
    addButtonOnClick () {

      this.addOrg.forEach(value => {

        let plan = this.formData.newPlanList.filter(plan => {
          return plan.receiverId === value;
        }
        );
        if (plan.length === 0) {
          let org = this.formData.orgChildList.find(item => {
            return item.id === value;
          });
          let childPlan = this.createNewPlanByOrg(org);
          this.formData.newPlanList.push(childPlan);
        }

        console.log(this.formData.newPlanList);

      });


    },
    createNewPlanByOrg (org) {
      let uid = UUID(32, 36);
      let newPlan = JSON.parse(JSON.stringify(this.parentForm));
      newPlan.id = uid;
      newPlan.organizationId = this.parentForm.receiverId;
      newPlan.organizationCode = this.parentForm.receiverId;
      newPlan.organizationName = this.parentForm.receiverName;
      newPlan.organizationOrder = "";
      newPlan.date = moment().format("YYYY-MM-DD");
      newPlan.relevance = this.parentForm.id;
      newPlan.author = this.userName;
      newPlan.receiverId = org.id;
      newPlan.receiverName = org.name;
      return newPlan;
    },
    handleCurrentChange (val) {
      this.formData.selectRow = val;
    },
    onSearchButtonClick () {
      Promise.all([purchasePlanItemApi.getAll({
        size: this.formData.pagination.pageSize,
        page: this.formData.pagination.currentPage - 1,
        search: "purchasePlan.id:EQ:{pId};".format({
          pId: this.parentForm.id
        })
      })])
        .then(([response]) => {
          this.formData.purchasePlanItemList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);
          this.$notify({
            title: this.$t('base.hint'),
            message: this.$t('base.loadingDone'),
            duration: 1000,
            position: 'bottom-right'
          });
        })
        .catch(error => {
        });

    },

    onPageChange (index) {
      if (this.formData.pagination.currentPage !== index) {
        this.formData.pagination.currentPage = index;
        this.onSearchButtonClick();
      }
    },
    onPageSizeChange (size) {
      if (this.formData.pagination.pageSize !== size) {
        this.formData.pagination.pageSize = size;
        this.onSearchButtonClick();
      }
    },
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row';
      } else {
        return 'success-row';
      }
    },
    handleClose (done) {
      this.childForm.addForm = false;
      this.childForm.editForm = false;
      this.onSearchButtonClick();
      done();
    }
  }
};
</script>