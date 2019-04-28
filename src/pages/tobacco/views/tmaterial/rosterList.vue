<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <transition name="slide-fade">
    <roster-details v-if="childForm.detailsForm"
                    :roster='formData.selectRow'
                    :visible.sync="childForm.detailsForm">

    </roster-details>
    <div class='mainPanel'
         v-else>
      <div class='toolPanel'>
        <div class='queryCriteria'>
          <el-form inline>
            <el-form-item :label="$t('tobacco.common.organization')">
              <organization-form :root="userOrgId"
                                 style="width:100%"
                                 :code.sync="searchData.organizationId" />
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
          </el-button-group>
        </div>
      </div>
      <main class='contentPanel'>
        <el-table highlight-current-row
                  border
                  @current-change="handleCurrentChange"
                  :data="formData.rosterList"
                  style="width: 100%"
                  :row-class-name="tableRowClassName">
          <el-table-column type="expand"
                           fixed="left">
            <template slot-scope="props">
              <el-form class="cas-group cas-flex-3">
                <el-form-item :label="$t('tobacco.tmaterial.roster.serial')"
                              prop="serial">
                  {{props.row.serial}}
                </el-form-item>
                <el-form-item :label="$t('tobacco.tmaterial.roster.desc')"
                              prop="desc">
                  {{props.row.desc}}
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop="annual"
                           :label="this.$t('tobacco.tmaterial.roster.annual')" />

          <el-table-column prop="title"
                           :label="this.$t('tobacco.tmaterial.roster.title')" />
          <el-table-column prop="date"
                           :label="this.$t('tobacco.tmaterial.roster.date')">
            <template slot-scope="scope">
              {{scope.row.date|parseDate('YYYY-MM-DD')}}
            </template>
          </el-table-column>
          <el-table-column prop="author"
                           :label="this.$t('tobacco.tmaterial.roster.author')" />
          <el-table-column prop="operator"
                           :label="this.$t('tobacco.tmaterial.roster.operator')" />

          <el-table-column prop="households"
                           :label="this.$t('tobacco.tmaterial.roster.households')" />
          <el-table-column prop="area"
                           :label="this.$t('tobacco.tmaterial.roster.area')" />
          <el-table-column prop="gridName"
                           :label="this.$t('tobacco.tmaterial.roster.gridName')" />
          <el-table-column prop="villageCount"
                           :label="this.$t('tobacco.tmaterial.roster.villageCount')" />
          <el-table-column prop="villageNames"
                           :label="this.$t('tobacco.tmaterial.roster.villageNames')" />
          <el-table-column prop="control"
                           :label="this.$t('tobacco.tmaterial.roster.control')">
            <template slot-scope="scope">
              {{scope.row.control|controlFormat}}
            </template>
          </el-table-column>
          <el-table-column fixed="right"
                           :label="$t('base.titleOperation')"
                           width="160">
            <template slot-scope="scope">
              <el-button @click="onShowDetail(scope.row)"
                         type="text"
                         size="small">{{$t('tobacco.tmaterial.roster.buttonDetails')}}</el-button>
              <el-button @click="onVoidedClick(scope.row)"
                         type="text"
                         :disabled="scope.row.control!==1"
                         size="small">{{$t('tobacco.tmaterial.roster.buttonVoided')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </main>
      <transition name="fade"
                  v-if="childForm.detailForm"
                  enter-active-class="animated fadeInUp"
                  leave-active-class="animated fadeOut"
                  :duration="200">
        <div class="floatDetail">
          <nav>
            <a @click="childForm.detailForm=false">
              <el-tooltip class="item"
                          effect="dark"
                          content="点击隐藏"
                          placement="top-start">
                <span>物资明细</span>
              </el-tooltip>
            </a>
          </nav>
          <el-table border
                    height="180"
                    :data="formData.itemList"
                    class="subTable">
            <el-table-column prop="serial"
                             :label="this.$t('tobacco.tmaterial.rosterItem.serial')" />
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
          </el-table>

        </div>
      </transition>
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

      </template>
    </div>
  </transition>

</template>
<script>
const AddForm = () => import("./rosterAdd.vue");
const EditForm = () => import("./rosterEdit.vue");
import rosterApi from "../../api/tmaterial/apiRoster";
import rosterItemApi from "../../api/tmaterial/apiRosterItem";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      childForm: {
        addForm: false,
        editForm: false,
        viewForm: false,
        isEdit: false,
        detailForm: false,
        detailsForm: false
      },
      dateoptions: this.GLOBAL.dateoptions,
      searchData: {
        organizationId: this.userOrgId
      },
      formData: {
        rosterList: [],
        pagination: {
          //用于分页的变量
          currentPage: 1,
          pageSize: 10,
          total: 0,
          keyword: "",
          pageSizeOpts: this.GLOBAL.pageSizeOpts
        },
        rowSelection: [],
        selectRow: {},
        itemList: []
      }
    };
  },
  created() {
    this.searchData.organizationId = this.userOrgId;
    this.onSearchButtonClick();
  },
  components: {
    "add-form": AddForm,
    "edit-form": EditForm,
    OrganizationForm: () => import("@/components/Organization"),
    RosterDetails: () => import("./rosterDetailsList.vue")
  },
  computed: {
    ...mapGetters({
      userDistrictId: "districtId",
      userOrgId: "organizationId",
      organizationName: "organizationName",
      userName: "userName"
    })
  },
  methods: {
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

      Promise.all([rosterApi.softDelete(this.formData.selectRow.id)])
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
      if (val !== undefined && val !== null) {
        this.childForm.detailForm = true;
        Promise.all([
          rosterItemApi.getAll({
            size: 500,
            page: 0,
            sort: "serial,desc",
            search: "rosterId:eq:" + val.id
          })
        ])
          .then(([response]) => {
            this.formData.itemList = response.content;
          })
          .catch(error => {});
      } else {
        this.childForm.detailForm = false;
      }
    },
    onSearchButtonClick() {
      let search =
        "organization.organizationId:rlike:" + this.searchData.organizationId;
      Promise.all([
        rosterApi.getAll({
          size: this.formData.pagination.pageSize,
          page: this.formData.pagination.currentPage - 1,
          contains: "author,operator,title,serial,gridName:{keyword}:true".format(
            {
              keyword: this.formData.pagination.keyword
            }
          ),
          search: search
        })
      ])
        .then(([response]) => {
          this.formData.rosterList = response.content;
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
      Object.keys(this.childForm).forEach(key => {
        this.childForm[key] = false;
      });
      this.onSearchButtonClick();
      done();
    },
    onShowDetail(row) {
      this.formData.selectRow = row;
      this.childForm.detailsForm = true;
    },
    onVoidedClick(row) {
      let that = this;
      this.$confirm("确认继续作废数据,此操作不可逆, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Promise.all([rosterApi.voided(row.id)])
            .then(([response]) => {
              that.onSearchButtonClick();
              this.$notify({
                title: this.$t("base.hint"),
                message: "作废成功",
                duration: 1000,
                position: "bottom-right"
              });
            })
            .catch(error => {
              console.log(error);
              this.$notify.error({
                title: "错误",
                message: "作废失败"
              });
            });
        })
        .catch(() => {});
    }
  },
  filters: {
    controlFormat: function(key) {
      let item = rosterApi.CONTROL_LIST.find(it => {
        return it.key === key;
      });
      return item ? item.value : "其它";
    }
  }
};
</script>
<style scoped>
.floatDetail {
  height: 200px;
  position: absolute;
  bottom: 37px;
  left: 210px;
  z-index: 999;
  width: calc(100% - 220px);
}

nav > a {
  position: relative;
  display: inline-block;
  padding: 0.3em 1em 0;
}

nav::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  filter: blur(10px) contrast(0.8);
  z-index: -1;
}

nav > a::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: -1;
  background: #e6e6e6;
  background-image: linear-gradient(
    hsla(0, 0%, 100%, 0.6),
    hsla(0, 0%, 100%, 0)
  );
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-bottom: none;
  border-radius: 0.5em 0.5em 0 0;
  transform: perspective(0.5em) rotateX(5deg);
  transform-origin: left;
}
.subTable {
  width: 100%;
  background: #f7f7f7;
  overflow-y: scroll;
  height: 160px;
  overflow: auto;
}
</style>
