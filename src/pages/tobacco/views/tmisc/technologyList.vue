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
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                @current-change="handleCurrentChange"
                :data="formData.technologyList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="organizationName"
                         :label="this.$t('tobacco.tmisc.technology.organizationName')" />
        <el-table-column prop="annual"
                         :label="this.$t('tobacco.tmisc.technology.annual')" />
        <el-table-column prop="name"
                         :label="this.$t('tobacco.tmisc.technology.name')" />
        <el-table-column prop="author"
                         :label="this.$t('tobacco.tmisc.technology.author')" />
        <el-table-column prop="date"
                         :label="this.$t('tobacco.tmisc.technology.date')">
          <template slot-scope="scope">
            {{scope.row.date|parseDate('YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column prop="control"
                         :label="this.$t('tobacco.tmisc.technology.control')">
          <template slot-scope="slot">
            {{slot.row.control|controlFilter}}
          </template>
        </el-table-column>
        <el-table-column prop="type"
                         :label="this.$t('tobacco.tmisc.technology.type')" />
        <el-table-column fixed="right"
                         :label="$t('base.titleOperation')"
                         width="200">
          <template slot-scope="scope">
            <el-button @click="editButtonClick(scope.row,false)"
                       type="text"
                       size="small">{{$t('base.buttonView')}}</el-button>
            <el-button type="text"
                       size="small"
                       :disabled="scope.row.organizationId !== userOrgId"
                       @click="editButtonClick(scope.row,true)">{{$t('base.buttonEdit')}}</el-button>
            <el-button type='text'
                       size="small"
                       :disabled="scope.row.control !== 1"
                       @click='downloadXlsFile(scope.row)'>{{$t('base.buttonDown')}}</el-button>
            <el-button type='text'
                       size="small"
                       :disabled="scope.row.organizationId !== userOrgId"
                       @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>
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
const AddForm = () => import("./technologyAdd.vue");
const EditForm = () => import("./technologyEdit.vue");
import constant from "../../lang/zh/constant";
import technologyApi from "../../api/tmisc/apiTechnology";
import { mapGetters } from "vuex";
const path = require("path");
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
        technologyList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: [10, 15, 20, 25, 30]
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
  filters: {
    controlFilter: function(key) {
      let it = constant.tmisc.technologyControlList.find(item => {
        return item.key === key;
      });
      return it === undefined ? "" : it.value;
    }
  },
  methods: {
    getfilePath(filepath) {
      console.info(filepath);
      let isProduction = process.env.NODE_ENV === "production"; //如果是生产环境，前缀要发生变化
      if (filepath === undefined || filepath === "" || filepath === null) {
        return "/404";
      }
      let pps = filepath;
      let root = "";
      root = path.join("/upload", pps);
      let rootPath =
        process.env.VUE_APP_API_URL != undefined
          ? process.env.VUE_APP_API_URL
          : window.location.origin;
      if (isProduction) {
        rootPath = "";
      }
      console.info(root);
      root = "{rootPath}{path}".format({ path: root, rootPath: rootPath });
      console.info(root);
      return root;
    },
    downloadXlsFile(selectRow) {
      console.info(selectRow.path);
      var str = selectRow.name;
      var x = new XMLHttpRequest();
      var url = this.getfilePath(selectRow.path);
      x.open("GET", url, true);
      x.responseType = "blob";
      x.onload = function(e) {
        require("downloadjs")(x.response, str);
      };
      x.send();
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

      Promise.all([technologyApi.softDelete(this.formData.selectRow.id)])
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
        technologyApi.getDownList({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          orgId: this.userOrgId,
          fileName: this.formData.pagination.keyword
        })
      ])
        .then(([response]) => {
          console.info(this.formData.technologyList);
          this.formData.technologyList = response.content;
          console.info(this.formData.technologyList);
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
  },
  computed: {
    ...mapGetters({
      userDistrictId: "districtId",
      userOrgId: "organizationId",
      organizationName: "organizationName"
    })
  }
};
</script>