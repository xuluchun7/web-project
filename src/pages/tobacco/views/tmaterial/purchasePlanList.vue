<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('base.keywords')">
            <el-input v-bind:placeholder="$t('base.ipKeywords')"
                      v-model="formData.pagination.keyword"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
        </el-form>
      </div>
      <div class='toolButton'
           style="min-width: 210px">
        <el-button-group>
          <el-button type='primary'
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
          <el-button type='primary'
                     @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
          <el-button type='primary'
                     @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.purchasePlanList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="serial"
                         :label="this.$t('tobacco.tmaterial.purchasePlan.serial')" />
        <el-table-column prop="title"
                         :label="this.$t('tobacco.tmaterial.purchasePlan.title')" />
        <el-table-column prop="author"
                         :label="this.$t('tobacco.tmaterial.purchasePlan.author')" />
        <el-table-column prop="date"
                         :label="this.$t('tobacco.tmaterial.purchasePlan.date')">
          <template slot-scope="scope">
            {{
            scope.row.date|parseDate('YYYY-MM-DD')
            }}
          </template>
        </el-table-column>
        <el-table-column prop="receiverName"
                         :label="this.$t('tobacco.tmaterial.purchasePlan.receiverName')" />
        <el-table-column prop="supplierName"
                         :label="this.$t('tobacco.tmaterial.purchasePlan.supplierName')" />
        <el-table-column prop="control"
                         :label="this.$t('tobacco.tmaterial.purchasePlan.control')">
          <template slot-scope="scope">
            {{scope.row.control|controlFormat}}
          </template>
        </el-table-column>
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="180">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)"
                       type="text"
                       size="small">{{$t('base.buttonView')}}</el-button>
            <el-button type="text"
                       size="small"
                       @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}</el-button>
            <el-button type="text"
                       size="small"
                       @click="itemsManageButtonClick(scope.row,true)">{{$t('base.buttonItemsManage')}}</el-button>
          </template>
        </el-table-column>
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
                 :visible.sync="childForm.addForm"
                 top="10px"
                 :before-close="handleClose">
        <add-form @onSearchButtonClick="onSearchButtonClick" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonEdit')"
                 :visible.sync="childForm.editForm"
                 top="10px"
                 :before-close="handleClose">
        <edit-form :item.sync=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.editForm"
                   @onSearchButtonClick="onSearchButtonClick" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonView')"
                 :visible.sync="childForm.viewForm"
                 top="10px"
                 :before-close="handleClose">
        <edit-form :item=formData.viewSelect
                   :isEdit=childForm.isEdit
                   :visible.sync="childForm.viewForm" />
      </el-dialog>
      <el-dialog :title="$t('base.buttonItemsManage')"
                 :visible.sync="childForm.itemsForm"
                 top="10px"
                 :before-close="handleClose">
        <items-form :item.sync=formData.viewSelect
                    :isEdit=childForm.isEdit
                    :visible.sync="childForm.itemsForm" />
      </el-dialog>
    </template>
  </div>
</template>
<script>
const AddForm = () => import('./purchasePlanAdd.vue');
const EditForm = () => import('./purchasePlanEdit.vue');
const ItemsForm = () => import("./purchasePlanItemList.vue");
import purchasePlanApi from '../../api/tmaterial/apiPurchasePlan';
import purchasePlanItemApi from "../../api/tmaterial/apiPurchasePlanItem";
export default {
  data () {
    return {
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        itemsForm: false,
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
      formData: {
        purchasePlanList: [],
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
    this.onSearchButtonClick();
  },
  components: {
    'add-form': AddForm,
    "edit-form": EditForm,
    "items-form": ItemsForm
  },
  methods: {
    editButtonClick (selectRow, isEdit) {
      this.formData.viewSelect = selectRow;
      if (isEdit) {
        this.childForm.editForm = true;
      } else {
        this.childForm.viewForm = true;
      }
      this.childForm.isEdit = isEdit;
    },
    itemsManageButtonClick (selectRow, isEdit) {
      this.formData.viewSelect = selectRow;
      if (isEdit) {
        this.childForm.itemsForm = true;
      } else {
        this.childForm.itemsForm = true;
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

      Promise.all([purchasePlanApi.softDelete(this.formData.selectRow.id)])
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
      Promise.all([purchasePlanApi.getAll({
        size: this.formData.pagination.pageSize,
        page: this.formData.pagination.currentPage - 1,
        contains: ':{keyword}:true'.format({ keyword: this.formData.pagination.keyword }),
        search: ''.format({})
      })])
        .then(([response]) => {
          this.formData.purchasePlanList = response.content;
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
  },
  filters: {
    controlFormat: function (key) {
      let item = purchasePlanApi.CONTROL_LIST.find(it => {
        return it.key === key;
      });
      return item ? item.value : "其它";
    }
  }
};
</script>