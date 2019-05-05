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
                     @click='goBack'>{{ $t('base.buttonBack') }} </el-button>
        </el-button-group>
      </div>
    </div>
    <main class='contentPanel'>
      <el-table highlight-current-row
                border
                :data="formData.rosterDetailsList"
                style="width: 100%"
                :row-class-name="tableRowClassName">
        <el-table-column type="expand"
                         fixed="left">
          <template slot-scope="props">
            <el-form class="cas-group cas-flex-3">
              <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.farmerNumber')">
                {{props.row.farmerNumber}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.phone')">
                {{props.row.phone}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.billOutSerial')">
                {{props.row.billOutSerial}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.money')">
                {{props.row.money}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.actualMoney')">
                {{props.row.actualMoney}}
              </el-form-item>
              <el-form-item :label="$t('tobacco.tmaterial.rosterDetails.expectMoney')">
                {{props.row.expectMoney}}
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="farmerName"
                         fixed
                         width="80"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.farmerName')">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="onShowPhoto(scope.row)">{{scope.row.farmerName}}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="identity"
                         fixed
                         width="165"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.identity')" />
        <el-table-column prop="address"
                         fixed
                         show-overflow-tooltip
                         :label="this.$t('tobacco.tmaterial.rosterDetails.address')" />
        <el-table-column prop="bankNo"
                         fixed
                         width="170"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.bankNo')" />
        <el-table-column prop="area"
                         fixed
                         width="80"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.area')" />

        <el-table-column prop="expectArea"
                         fixed
                         width="100"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.expectArea')" />
        <el-table-column prop="actualArea"
                         fixed
                         width="80"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.actualArea')" />
        <el-table-column v-for="item in formData.materialList"
                         :key=item.id
                         :label="item.materialName">
          <template slot-scope="scope">
            {{formatCell(scope.row.rosterDetailsItemEntityList,item.materialId)}}
          </template>
        </el-table-column>
        <el-table-column prop="control"
                         :label="this.$t('tobacco.tmaterial.rosterDetails.control')">
          <template slot-scope="scope">
            {{scope.row.control|controlFormat}}
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
  </div>
</template>
<script>
const AddForm = () => import("./rosterDetailsAdd.vue");
const EditForm = () => import("./rosterDetailsEdit.vue");
import rosterDetailsApi from "../../api/tmaterial/apiRosterDetails";
import rosterStandardApi from "../../api/tmaterial/apiRosterStandard";
export default {
  props: ["roster", "visible"],
  data() {
    return {
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false
      },
      searchData: {},
      formData: {
        materialList: [],
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
  created() {
    this.onSearchButtonClick();
  },
  components: {
    "add-form": AddForm,
    "edit-form": EditForm
  },
  methods: {
    onSearchButtonClick() {
      Promise.all([
        rosterDetailsApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: "farmerName,identity,address,bankNo:{keyword}:true".format({
            keyword: this.formData.pagination.keyword
          }),
          search: "rosterId:eq:" + this.roster.id
        }),
        rosterStandardApi.getAll({
          size: 500,
          page: 0,
          sort: "materialId",
          search: "rosterId:eq:" + this.roster.id
        })
      ])
        .then(([response, standardResponse]) => {
          this.formData.rosterDetailsList = response.content;
          this.formData.pagination.total = parseFloat(response.totalElements);
          this.$notify({
            title: this.$t("base.hint"),
            message: this.$t("base.loadingDone"),
            duration: 1000,
            position: "bottom-right"
          });
          this.formData.materialList = standardResponse.content;
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

    goBack() {
      this.$emit("update:visible", false);
    },
    formatCell(rosterDetailsItemEntityList, materialId) {
      let item = rosterDetailsItemEntityList.find(t => {
        return t.materialId === materialId;
      });
      if (item) {
        return item.amount.toFixed(2) + " " + item.measureName;
      }
      return "0.00";
    },
    onShowPhoto(row) {
      //如果是生产环境，前缀要发生变化
      let isProduction = process.env.NODE_ENV === "production";
      this.photoLoading = true;
      this.formData.photoList = [];
      if (
        row.pictures === undefined ||
        row.pictures === "" ||
        row.pictures === null
      ) {
        this.$message({
          type: "info",
          message: "没有可用照片"
        });
        return;
      }
      let pps = row.pictures.split(",");
      if (pps.length > 0) {
        let pts = [];
        for (var item of pps) {
          let root = "";
          root = path.join("/upload", row.filePath);
          root = path.join(root, item);
          let rootPath = process.env.VUE_APP_API_URL;
          if (isProduction) {
            rootPath = "";
          }
          root = "{rootPath}{path}".format({ path: root, rootPath: rootPath });
          pts.push(root);
        }
        this.formData.photoList = pts;
        this.childForm.showPic = true;
      }
      this.photoLoading = false;
    }
  },
  watch: {
    roster(curVal, oldVal) {
      if (curVal) {
        this.onSearchButtonClick();
      } else {
        this.formData.rosterDetailsList = [];
        this.formData.materialList = [];
      }
    }
  },
  filters: {
    controlFormat: function(key) {
      let item = rosterDetailsApi.CONTROL_LIST.find(it => {
        return it.key === key;
      });
      return item ? item.value : "其它";
    }
  }
};
</script>