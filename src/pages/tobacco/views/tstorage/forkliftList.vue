<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form inline>
          <el-form-item :label="$t('tobacco.thuman.hrTeam.organization')">
            <organization-form :root="userOrgId"
                               @onchange="organizationOnchange" />
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
                     @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }}</el-button>
          <el-button type='primary'
                     @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }}</el-button>
          <el-button type='primary'
                     @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }}</el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.forkliftList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organization.organizationName"
                         :label="this.$t('org.organizationName')"
                         min-width="100"
                         show-overflow-tooltip />
        <el-table-column prop="number"
                         :label="this.$t('tobacco.tstorage.forklift.number')"
                         min-width="100"
                         show-overflow-tooltip />
        <el-table-column prop="title"
                         :label="this.$t('tobacco.tstorage.forklift.title')"
                         min-width="100"
                         show-overflow-tooltip />
        <el-table-column prop="author"
                         :label="this.$t('tobacco.tstorage.forklift.author')"
                         min-width="100"
                         show-overflow-tooltip />
        <el-table-column prop="date"
                         :label="this.$t('tobacco.tstorage.forklift.date')"
                         min-width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.date|parseDate('YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column prop="available"
                         :label="this.$t('tobacco.tstorage.forklift.available')"
                         min-width="100"
                         show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch v-model="scope.row.available"
                       disabled></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="desc"
                         :label="this.$t('tobacco.tstorage.forklift.desc')"
                         min-width="100"
                         show-overflow-tooltip />
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="100">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)"
                       type="text"
                       size="small">{{$t('base.buttonView')}}
            </el-button>
            <el-button type="text"
                       size="small"
                       @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}
            </el-button>
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
                   :visible.sync="childForm.editForm"
                   @refresh="onSearchButtonClick" />
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
const AddForm = () => import("./forkliftAdd.vue");
const EditForm = () => import("./forkliftEdit.vue");
const OrganizationForm = () => import("@/components/Organization");

import forkliftApi from "../../api/tstorage/api_forklift";
import { mapGetters } from "vuex";
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
            text: this.$t("base.oneWeek"),
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
        number: "",
        title: "",
        author: "",
        date: "",
        available: true,
        desc: "",
        organizationId: this.userOrgId
      },
      formData: {
        forkliftList: [],
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
  created() {
    console.log(this.searchData.organizationId);
    this.onSearchButtonClick();
  },
  components: {
    "add-form": AddForm,
    "edit-form": EditForm,
    OrganizationForm
  },
  computed: {
    ...mapGetters({
      userDistrictId: "districtId",
      userOrgId: "organizationId",
      organizationName: "organizationName"
    })
  },
  methods: {
    organizationOnchange(label, value, labels, values) {
      this.searchData.organizationId = value;
      this.searchData.organizationCode = value;
      this.searchData.organizationName = label;
      this.searchData.organizationOrder = "0";
    },
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

      Promise.all([forkliftApi.deleteForklift(this.formData.selectRow.id)])
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
        forkliftApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          sort: "number,ASC",
          contains: "number,title,author,date,available,desc,:{keyword}:true".format(
            { keyword: this.formData.pagination.keyword }
          ),
          search: "organization.organizationId:rlike:{orgid};number:EQ:{number};available:EQ:{available};desc:EQ:{desc};".format(
            {
              number: this.searchData.number,
              title: this.searchData.title,
              author: this.searchData.author,
              date: this.searchData.date,
              available: this.searchData.available,
              desc: this.searchData.desc,
              orgid: this.searchData.organizationId
            }
          )
        })
      ])
        .then(([response]) => {
          this.formData.forkliftList = response.content;
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
