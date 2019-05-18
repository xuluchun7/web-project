<template>
    <div>
    <el-form :model="formItem"  label-width="100px" :rules="ruleValidate" ref="formValidate" class="cas-group cas-flex-2">

                    <el-form-item   :label="$t('tobacco.tmaterial.billApply.annual')" >
                        <el-date-picker
                                v-model="formItem.annual"
                                type="year"
                                :placeholder="$t('base.pleaseInput')">
                        </el-date-picker>
                    </el-form-item>

<!--                    <el-form-item   :label="$t('tobacco.tmaterial.billApply.code')" >-->
<!--                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.code"/>-->
<!--                    </el-form-item>-->
<!--                    <el-form-item   :label="$t('tobacco.tmaterial.billApply.identity')" >-->
<!--                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.identity"/>-->
<!--                    </el-form-item>-->

                    <el-form-item   :label="$t('tobacco.tmaterial.billApply.title')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
                    </el-form-item>
                    <el-form-item   :label="$t('tobacco.tmaterial.billApply.author')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
                    </el-form-item>
                    <el-form-item   :label="$t('tobacco.tmaterial.billApply.date')" >
                        <el-date-picker type="date" placeholder="选择日期" v-model="formItem.date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
<!--                    <el-form-item   :label="$t('tobacco.tmaterial.billApply.operation')" >-->
<!--                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.operation"/>-->
<!--                    </el-form-item>-->


<!--                    <el-form-item   :label="$t('tobacco.tmaterial.billApply.singleNumber')" >-->
<!--                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.singleNumber"/>-->
<!--                    </el-form-item>-->


        <el-form-item >

        </el-form-item>
        <el-form-item style="width: 100%;border-bottom: 1px solid #c1c1c1">

        </el-form-item>

        <el-form-item style="width: 100%" label-width="0px">
            <el-table
                    :data="showMaterialDetailsArr"
                    tooltip-effect="dark"
                    style="width: 100%;margin-top: 10px">
                <el-table-column
                        align="center"
                        :label="$t('tobacco.tmaterial.billApply.materialDetails')"
                        width="110" >

                </el-table-column>
                <el-table-column
                        prop="date"
                        :label="$t('base.date')"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="name"
                        :label="$t('base.name')"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="code"
                        :label="$t('base.code')"
                >
                </el-table-column>
<!--                输入框-->
                <el-table-column
                        align="left"
                        width="190"
                        label="输入数量">
                    <template  slot-scope="scope">
                        <el-input
                                v-model="scope.row.barcode"
                                size="mini"
                                placeholder="输入数量">
                            <div slot="append">{{scope.row.measure.name}}</div>
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        width="90">
                    <template slot="header" slot-scope="scope">
                        <el-button type="primary"
                                   @click="showMaterialDetails=!showMaterialDetails">{{ $t('base.buttonInsert') }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
<!--分页-->
            <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="materialDetails.length"
                    :page-size="5"
                    @current-change="currentChange">
            </el-pagination>
        </el-form-item>
        <el-form-item >

        </el-form-item>
        <el-form-item >

        </el-form-item>
        <el-form-item >

        </el-form-item>
        <!--保存按钮-->
        <el-form-item >
            <el-button type="primary" style="float: right"
                       @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
            </el-button>
        </el-form-item>

    </el-form>

        <el-dialog :title="$t('tobacco.tmaterial.billApply.materialDetails')" :visible.sync="showMaterialDetails" append-to-body>
            <materialDetails-form @saveMaterialDetails="topSaveMaterialDetails"
              :ArrmaterialDetails="materialDetails"
             />
        </el-dialog>
    </div>
</template>
<script>
    import billApplyApi from '../../api/tmaterial/apiBillApply.ts';
    import materialDetails from './billAppiyDetails'
    import util from '@/utils/util.ts'
    import { mapGetters } from "vuex";
    export default {
         data () {
            return {
                search:'',
                formItem: {
                    'annual':'',
                    lead:'',
                    'title':'',
                    'author':'',
                    'date':'',
                    'countryId':86,
                    'countryName':'中国',
                    organizationId:'',
                    organizationCode:'',
                    organizationName:'',
                    billApplyItemList:[],
                    control:1
                },
                ruleValidate: {
                    code: [
                        { required: true, message: '编码不能为空', trigger: 'blur' }
                    ],

                },
                showMaterialDetails:false,
                showMaterialDetailsArr:[],
                materialDetails:[],
            };
        },
        created(){
            this.formItem.date=util.dateFormat(new Date(),'YYYY-MM-DD')
            this.formItem.annual=util.dateFormat(new Date(),'YYYY-MM-DD')
            this.formItem.author=this.$store.state.user.user.userName;
            this.formItem.organizationName=this.organizationName
            this.formItem.organizationId=this.userOrgId
            this.formItem.organizationCode=this.userOrgId
        },
        methods:{
            onSubmitClick(name) {
                console.log(name)
                console.log(this.userOrgId)
                this.formItem.annual=new Date().getFullYear()
                this.formItem.lead=this.userOrgId.substring(0,this.userOrgId.length-2)
                this.formItem.billApplyItemList=this.materialDetails
                for (let i in this.formItem.billApplyItemList) {
                        this.formItem.billApplyItemList[i].materialId=this.materialDetails[i].id
                        this.formItem.billApplyItemList[i].materialName=this.materialDetails[i].name
                        this.formItem.billApplyItemList[i].materialCode=this.materialDetails[i].code
                        this.formItem.billApplyItemList[i].materialNumber=this.materialDetails[i].barcode
                        this.formItem.billApplyItemList[i].measure=this.materialDetails[i].measure.id
                        this.formItem.billApplyItemList[i].category=this.materialDetails[i].category.id
                    for (let key in  this.formItem.billApplyItemList[i]){
                        console.log(key)
                        if (key !=='materialId'&&key !=='materialName'&&key !=='materialCode'&&key !=='materialNumber'&&key !=='measure'&&key !=='category'){
                            delete this.formItem.billApplyItemList[i][key]
                        }
                    }

                }
                console.log(this.formItem)
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        Promise.all([ billApplyApi.save(this.formItem)])
                            .then(([response]) => {
                                this.formReset(name);
                                //重置表单，允许多次操作
                                this.$message({
                                    message: this.$t('message.saveAndContinue'),
                                    type: 'info',
                                });
                                this.formItem.billApplyItemList=[]
                                this.showMaterialDetailsArr=[]
                                this.materialDetails=[]

                            })
                            .catch(error => {
                                console.log(error);
                            });
                    } else {
                        this.$message({
                            message: this.$t('message.formValidate'),
                            type: 'warn',
                        });
                    }
                });
            },
            formReset (name) {
                this.$refs[name].resetFields();
            },
            topSaveMaterialDetails(arr,showMaterialDetails){
                this.materialDetails=[]
                this.showMaterialDetailsArr=[]
                this.materialDetails=arr
                this.showMaterialDetailsArr=arr.filter((item,index)=>{
                    if (index<5){
                        return item
                    }
                })
                this.showMaterialDetails=showMaterialDetails
            },
            currentChange(page){
                this.showMaterialDetailsArr=this.materialDetails.filter((item,index)=>{
                    if (index>=(page-1)*5&&index<page*5){
                        return item
                    }})
            }
        },
        components:{
            'materialDetails-form':materialDetails
        },
        computed: {
            ...mapGetters({
                userDistrictId: "districtId",
                userOrgId: "organizationId",
                organizationName: "organizationName"
            }),

        },
    };
</script>
