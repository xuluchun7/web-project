<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="formData.showText">
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 210px">
        <el-button-group>
          <el-button type='primary'
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
          <el-button type='primary'
                     @click='childForm.addItemForm=true'>{{ $t('base.buttonAdd') }} </el-button>
          <el-button type='primary'
                     @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.purchasePlanItemList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="materialName"
                         :label="this.$t('tobacco.tmaterial.purchasePlanItem.materialName')" />
        <el-table-column prop="materialCode"
                         :label="this.$t('tobacco.tmaterial.purchasePlanItem.materialCode')" />
        <el-table-column prop="measureName"
                         :label="this.$t('tobacco.tmaterial.purchasePlanItem.measureName')" />
        <el-table-column prop="amount"
                         :label="this.$t('tobacco.tmaterial.purchasePlanItem.amount')" />
      </el-table>
    </main>
    <div class='footerPanel'>
      <el-pagination :page-size='formData.pagination.pageSize'
                     :total='formData.pagination.total'
                     :current-page='formData.pagination.currentPage'
                     @current-change='onPageChange'
                     :page-sizes='formData.pagination.pageSizeOpts'
                     @size-change='onPageSizeChange'
                     layout="total, sizes, prev, pager, next, jumper"
                     placement='top'></el-pagination>
    </div>
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
import purchasePlanItemApi from '../../api/tmaterial/apiPurchasePlanItem';
import plantPlanApi from "../../api/tfarm/api_plantPlan";
import { constants } from 'crypto';
export default {
  props: ["item"],
  data () {
    return {
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
        sumArea: 0,
        showText: '',
        purchasePlanItemList: [],
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
    this.load();
    this.onSearchButtonClick();

  },
  components: {
    'add-form': AddForm,
    'edit-form': EditForm
  },
  watch: {
    item (curVal, oldVal) {

      this.formItem = JSON.parse(JSON.stringify(curVal));
      this.load();
    }
  },
  methods: {
    load () {
      this.formData.purchasePlanItemList = [];
      if (this.item) {
        this.parentForm = JSON.parse(JSON.stringify(this.item));
        Promise.all([
          plantPlanApi.getSumArea(this.$store.state.system.annual
            , this.parentForm.receiverId)])
          .then(([sumAreaResponse]) => {
            this.formData.sumArea = sumAreaResponse;
            this.formData.showText = this.parentForm.receiverName + " :[ " + this.formData.sumArea.toFixed(2) + " ]亩";
          })
          .catch(error => { });

      }
      else {
        this.parentForm = this.item;
      }

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
    },
  }
};
</script>