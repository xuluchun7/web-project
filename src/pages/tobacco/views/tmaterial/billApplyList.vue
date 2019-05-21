<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div class='mainPanel'>
    <div class='toolPanel'>
      <div class='queryCriteria'>
        <el-form  inline>
			<el-form-item :label="$t('tobacco.tmaterial.bill.arriveOrganizationName')">
				<organization-form :root="userOrgId"
								   style="width:100%"
								   :code.sync="searchData.organizationId " />
			</el-form-item>
			<el-form-item :label="$t('base.keywords')">
				<el-input v-bind:placeholder="$t('base.ipKeywords')"
					v-model="formData.pagination.keyword" @keyup.enter.native="onSearchButtonClick"/>
			  </el-form-item>                   
		  </el-form>
      </div>
		<div class='toolButton' style="min-width: 210px">
			<el-button-group>
				<el-button type='primary' @click='onSearchButtonClick'>{{ $t('base.buttonSearch') }} </el-button>
				<el-button type='primary' @click='childForm.addForm=true'>{{ $t('base.buttonAdd') }} </el-button>
				<el-button type='primary' @click='deleteButtonConfirm'>{{ $t('base.buttonDelete') }} </el-button>                

			</el-button-group>
        </div>
      </div>
	  <main class='contentPanel'>
		<el-table
			highlight-current-row
			border
			@current-change="handleCurrentChange"
			:data="formData.billApplyList"
			style="width: 100%"
			:row-class-name="tableRowClassName">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-table
							:data="props.row.billApplyItemList"
							style="width: 100%">
						<el-table-column prop="materialCode" :label="$t('tobacco.tmaterial.billApply.annual')" />
						<el-table-column prop="materialId" :label="$t('tobacco.tmaterial.billApply.code')" />
						<el-table-column prop="materialName" :label="$t('tobacco.tmaterial.billApply.title')" />
						<el-table-column prop="materialNumber" :label="$t('tobacco.tmaterial.billApply.author')" />

					</el-table>
				</template>
			</el-table-column>
		  <el-table-column type="index" >
			</el-table-column>
				<el-table-column prop="annual" :label="$t('tobacco.tmaterial.billApply.annual')" />
				<el-table-column prop="number" :label="$t('tobacco.tmaterial.billApply.code')" />
				<el-table-column prop="title" :label="$t('tobacco.tmaterial.billApply.title')" />
			    <el-table-column prop="author" :label="$t('tobacco.tmaterial.billApply.author')" />
			    <el-table-column prop="date" :label="$t('tobacco.tmaterial.billApply.date')" />
			<el-table-column
		     fixed="right"
		     :label="$t('base.titleOperation')"
		     width="100">
		<template slot-scope="scope">
			<el-button @click="editButtonClick(scope.row,false)" type="text" size="small">{{$t('base.buttonView')}}</el-button>
			<el-button type="text" size="small" @click="editButtonClick(scope.row,true)" >{{$t('base.buttonEdit')}}</el-button>
			<el-button type="text" size="small" v-if="userOrgId===scope.row.organization.organizationId&&scope.row.control===1" @click="saveButtonSubmit(scope.row)">{{$t('base.buttonSubmit')}}</el-button>
			<el-button type="text" size="small" v-if="scope.row.organization.lead===scope.row.organization.organizationId&&scope.row.control===2" @click="saveButtonSubmit(scope.row)">分配</el-button>
		</template>
		</el-table-column>
		</el-table>
        </main>
        <div class='footerPanel'>
            <el-pagination :page-size='formData.pagination.pageSize' :total='formData.pagination.total'
                           :current-page='formData.pagination.currentPage' @current-change='onPageChange'
                           :page-sizes='formData.pagination.pageSizeOpts' @size-change='onPageSizeChange'
                           layout="total, sizes, prev, pager, next, jumper"
                           placement='top'></el-pagination>
        </div>
        <template>
            <el-dialog :title="$t('base.buttonAdd')" :visible.sync="childForm.addForm" top="10px"  :before-close="handleClose">
                <add-form />
            </el-dialog>
            <el-dialog :title="$t('base.buttonEdit')" :visible.sync="childForm.editForm"  top="10px"  :before-close="handleClose" >
                <edit-form :item.sync=formData.viewSelect :isEdit=childForm.isEdit :visible.sync="childForm.editForm"/>
            </el-dialog>
            <el-dialog :title="$t('base.buttonView')" :visible.sync="childForm.viewForm"  top="10px"  :before-close="handleClose">
                <edit-form :item=formData.viewSelect :isEdit =childForm.isEdit :visible.sync="childForm.viewForm" />
            </el-dialog>
        </template>
    </div>
</template>
<script>
    const AddForm =()=> import('./billApplyAdd.vue');
    const EditForm =()=> import('./billApplyEdit.vue');
    import billApplyApi from '../../api/tmaterial/apiBillApply.ts';
	import { mapGetters } from "vuex";
    export default {
        data () {
            return {
                childForm: {
                    addForm: false,
                    editForm: false,
                    viewForm:false,
                    isEdit:false
                },
                dateoptions: {
                    shortcuts: [
                        {
                            text: this.$t('base.today') ,

                            onClick: (picker) => {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 );
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text:this.$t('base.yesterday')  ,

                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 2);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text:this.$t('base.threeMonth')  ,
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit('pick', [start, end]);
                            }
                        }
                    ]
                },
                searchData:{
					deliveryOrganizationId:"",
					organizationId:""
                },
                formData:{
                    billApplyList:[],
                    pagination:{//用于分页的变量
                        currentPage:1,
                        pageSize:10,
                        total:0,
                        keyword:'',
                        pageSizeOpts:[10,15,20,25,30]
                    },
                    rowSelection:[]
                },
            };
        },
        created(){
			this.searchData.organizationId = this.userOrgId;
			this.searchData.deliveryOrganizationId = this.userOrgId;
			console.log(this.userOrgId)
        },
        components: {
            'add-form': AddForm,
            'edit-form':EditForm,
			OrganizationForm: () => import("@/components/Organization")
        },
        methods: {
            editButtonClick(selectRow,isEdit) {
                this.formData.viewSelect = selectRow;
                if(isEdit){
                    this.childForm.editForm=true;
                } else {
                    this.childForm.viewForm=true;
                }
                this.childForm.isEdit=isEdit;
            },
            deleteButtonClick() {
                if (this.formData.selectRow === null || this.formData.selectRow === undefined) {
                    this.$message({
                        message: this.$t('message.unSelectAny'),
                        type: 'info',
                    });
                    return;
                }

                Promise.all([billApplyApi.softDelete(this.formData.selectRow.id)])
                    .then(([response]) => {
                        this.$message({
                            type: 'info',
                            message: this.$t('message.deleteOk')
                        });
                        this.formData.selectRow=null;
                        this.onSearchButtonClick();

                    })
                    .catch(error => {

                    });
            },
            deleteButtonConfirm() {
                this.$confirm( this.$t('message.deleteConfirm'),  this.$t('base.titleTip'), {
                    confirmButtonText: this.$t('base.buttonOk'),
                    cancelButtonText: this.$t('base.buttonCancel'),
                    type: 'warning'
                }).then(() => {
                    this.deleteButtonClick();
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message:this.$t('message.cancel')
                    });
                });

            },
            handleCurrentChange(val) {
                this.formData.selectRow = val;
            },
            onSearchButtonClick(){
				let search = "organization.organizationId:like:{orgid}:or;(lead:EQ:{userOrgId};control:EQ:2)".format(
						{
							orgid: this.searchData.organizationId,
							userOrgId:this.userOrgId
						}
				);

                Promise.all([billApplyApi.getAll({
                    size: this.formData.pagination.pageSize,
                    page: this.formData.pagination.currentPage - 1,
                    contains:'serial,barcode,title,author,operation,deliveryOrganizationName,deliveryInfo,arriveOrganizationName,arriveInfo,deliver,refBillSerial,refBillBarcode,refBillInfo,desc,:{keyword}:true'.format({ keyword: this.formData.pagination.keyword }),
                    search:search
                })])
                    .then(([response]) => {

                        this.formData.billApplyList = JSON.parse(JSON.stringify(response.content));
                       for (let i in this.formData.billApplyList){
						   this.formData.billApplyList[i].date=response.content[i].date.substring(0,10)
					   }
                       console.log(this.formData)
                       console.log(this.formData.billApplyList)
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
            tableRowClassName({row, rowIndex}) {
                if (rowIndex%2 === 0) {
                    return 'warning-row';
                } else {
                    return 'success-row';
                }
            },
            handleClose(done) {
                this.childForm.addForm=false;
                this.childForm.editForm=false;
                this.onSearchButtonClick();
                done();
            },
			saveButtonSubmit(row){
            	console.log(row.id)
            	console.log(this.$store.state.user.user.loginName)
				Promise.all([billApplyApi.getByLead(row.id,this.$store.state.user.user.loginName)])
						.then(res=>{
							console.log(res)
						})
			}
        },
		computed: {
			...mapGetters({
				userDistrictId: "districtId",
				userOrgId: "organizationId",
				organizationName: "organizationName"
			})
		},
    };
</script>