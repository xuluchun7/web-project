<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.tmaterial.rosterItem.rosterId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.rosterId"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.rosterItem.serial')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.serial"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.rosterItem.materialId')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.materialId"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.rosterItem.materialName')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.materialName"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.rosterItem.standardAmount')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.standardAmount"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.rosterItem.amount')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.amount"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.rosterItem.standardPrice')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.standardPrice"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.rosterItem.standadMoney')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.standadMoney"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.rosterItem.money')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.money"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.rosterItem.actualMoney')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.actualMoney"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tmaterial.rosterItem.desc')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="searchData.desc"
                      @keyup.enter.native="onSearchButtonClick" />
          </el-form-item>
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
                :data="formData.rosterItemList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="rosterId"
                         :label="this.$t('tobacco.tmaterial.rosterItem.rosterId')" />
        <el-table-column prop="serial"
                         :label="this.$t('tobacco.tmaterial.rosterItem.serial')" />
        <el-table-column prop="materialId"
                         :label="this.$t('tobacco.tmaterial.rosterItem.materialId')" />
        <el-table-column prop="materialName"
                         :label="this.$t('tobacco.tmaterial.rosterItem.materialName')" />
        <el-table-column prop="standardAmount"
                         :label="this.$t('tobacco.tmaterial.rosterItem.standardAmount')" />
        <el-table-column prop="amount"
                         :label="this.$t('tobacco.tmaterial.rosterItem.amount')" />
        <el-table-column prop="actualAmount"
                         :label="this.$t('tobacco.tmaterial.rosterItem.actualAmount')" />
        <el-table-column prop="standardPrice"
                         :label="this.$t('tobacco.tmaterial.rosterItem.standardPrice')" />
        <el-table-column prop="standadMoney"
                         :label="this.$t('tobacco.tmaterial.rosterItem.standadMoney')" />
        <el-table-column prop="money"
                         :label="this.$t('tobacco.tmaterial.rosterItem.money')" />
        <el-table-column prop="actualMoney"
                         :label="this.$t('tobacco.tmaterial.rosterItem.actualMoney')" />
        <el-table-column prop="desc"
                         :label="this.$t('tobacco.tmaterial.rosterItem.desc')" />
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
const AddForm = () => import("./rosterItemAdd.vue");
const EditForm = () => import("./rosterItemEdit.vue");
import rosterItemApi from "../../api/tmaterial/apiRosterItem";
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
      searchData: {
        rosterId: "",
        serial: 0,
        materialId: "",
        materialName: "",
        standardAmount: 0,
        amount: 0,
        standardPrice: 0,
        standadMoney: 0,
        money: 0,
        actualMoney: 0,
        desc: ""
      },
      formData: {
        rosterItemList: [],
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

      Promise.all([rosterItemApi.softDelete(this.formData.selectRow.id)])
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
        rosterItemApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: "rosterId,serial,materialId,materialName,standardAmount,amount,standardPrice,standadMoney,money,actualMoney,desc,:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: "rosterId:EQ:{rosterId};serial:EQ:{serial};materialId:EQ:{materialId};materialName:EQ:{materialName};standardAmount:EQ:{standardAmount};amount:EQ:{amount};standardPrice:EQ:{standardPrice};standadMoney:EQ:{standadMoney};money:EQ:{money};actualMoney:EQ:{actualMoney};desc:EQ:{desc};".format(
            {
              rosterId: this.searchData.rosterId,
              serial: this.searchData.serial,
              materialId: this.searchData.materialId,
              materialName: this.searchData.materialName,
              standardAmount: this.searchData.standardAmount,
              amount: this.searchData.amount,
              standardPrice: this.searchData.standardPrice,
              standadMoney: this.searchData.standadMoney,
              money: this.searchData.money,
              actualMoney: this.searchData.actualMoney,
              desc: this.searchData.desc
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.rosterItemList = response.content;
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