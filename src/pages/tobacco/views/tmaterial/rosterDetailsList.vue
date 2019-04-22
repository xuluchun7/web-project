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
                :data="formData.rosterDetailsList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="rosterId"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.rosterId')" />
        <el-table-column prop="farmerId"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.farmerId')" />
        <el-table-column prop="farmerNumber"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.farmerNumber')" />
        <el-table-column prop="farmerName"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.farmerName')" />
        <el-table-column prop="identity"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.identity')" />
        <el-table-column prop="address"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.address')" />
        <el-table-column prop="bankNo"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.bankNo')" />
        <el-table-column prop="phone"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.phone')" />
        <el-table-column prop="area"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.area')" />
        <el-table-column prop="actualArea"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.actualArea')" />
        <el-table-column prop="expectArea"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.expectArea')" />
        <el-table-column prop="money"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.money')" />
        <el-table-column prop="actualMoney"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.actualMoney')" />
        <el-table-column prop="expectMoney"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.expectMoney')" />
        <el-table-column prop="filePath"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.filePath')" />
        <el-table-column prop="signElec"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.signElec')" />
        <el-table-column prop="pictures"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.pictures')" />
        <el-table-column prop="signHand"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.signHand')" />
        <el-table-column prop="billOutId"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.billOutId')" />
        <el-table-column prop="billOutSerial"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.billOutSerial')" />
        <el-table-column prop="control"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.control')" />
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)"
                       type="text"
                       size="small">{{$t('base.buttonView')}}</el-button>
            <el-button type="text"
                       size="small"
                       @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}</el-button>
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
        <add-form />
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
const AddForm = () => import("./rosterDetailsAdd.vue");
const EditForm = () => import("./rosterDetailsEdit.vue");
import rosterDetailsApi from "../../api/tmaterial/apiRosterDetails";
export default {
  data() {
    return {
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false
      },
      dateoptions: {
        shortcuts: [
          {
            text: this.$t("base.today"),

            onClick: picker => {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t("base.yesterday"),

            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: this.$t("base.threeMonth"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      searchData: {},
      formData: {
        rosterDetailsList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: this.GLOBAL.pageSizeOpts
        },
        rowSelection: []
      }
    };
  },
  created() {},
  components: {
    "add-form": AddForm,
    "edit-form": EditForm
  },
  methods: {
    editButtonClick(selectRow, isEdit) {
      this.formData.viewSelect = selectRow;
      if (isEdit) {
        this.childForm.editForm = true;
      } else {
        this.childForm.viewForm = true;
      }
      this.childForm.isEdit = isEdit;
    },
    deleteButtonClick() {
      if (
        this.formData.selectRow === null ||
        this.formData.selectRow === undefined
      ) {
        this.$message({
          message: this.$t("message.unSelectAny"),
          type: "info"
        });
        return;
      }

      Promise.all([rosterDetailsApi.softDelete(this.formData.selectRow.id)])
        .then(([response]) => {
          this.$message({
            type: "info",
            message: this.$t("message.deleteOk")
          });
          this.formData.selectRow = null;
          this.onSearchButtonClick();
        })
        .catch(error => {});
    },
    deleteButtonConfirm() {
      this.$confirm(
        this.$t("message.deleteConfirm"),
        this.$t("base.titleTip"),
        {
          confirmButtonText: this.$t("base.buttonOk"),
          cancelButtonText: this.$t("base.buttonCancel"),
          type: "warning"
        }
      )
        .then(() => {
          this.deleteButtonClick();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("message.cancel")
          });
        });
    },
    handleCurrentChange(val) {
      this.formData.selectRow = val;
    },
    onSearchButtonClick() {
      Promise.all([
        rosterDetailsApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: ":{keyword}:true".format({
            keyword: this.formData.pagination.keyword
          }),
          search: "".format({})
        })
      ])
        .then(([response]) => {
          this.formData.rosterDetailsList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);
          this.$notify({
            title: this.$t("base.hint"),
            message: this.$t("base.loadingDone"),
            duration: 1000,
            position: "bottom-right"
          });
        })
        .catch(error => {});
    },

    onPageChange(index) {
      if (this.formData.pagination.currentPage !== index) {
        this.formData.pagination.currentPage = index;
        this.onSearchButtonClick();
      }
    },
    onPageSizeChange(size) {
      if (this.formData.pagination.pageSize !== size) {
        this.formData.pagination.pageSize = size;
        this.onSearchButtonClick();
      }
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return "warning-row";
      } else {
        return "success-row";
      }
    },
    handleClose(done) {
      this.childForm.addForm = false;
      this.childForm.editForm = false;
      this.onSearchButtonClick();
      done();
    }
  }
};
</script>