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
                    <el-form-item   :label="$t('tobacco.tmaterial.billApply.serial')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.serial"/>
                    </el-form-item>
                    <el-form-item   :label="$t('tobacco.tmaterial.billApply.code')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.code"/>
                    </el-form-item>
                    <el-form-item   :label="$t('tobacco.tmaterial.billApply.identity')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.identity"/>
                    </el-form-item>

                    <el-form-item   :label="$t('tobacco.tmaterial.billApply.title')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.title"/>
                    </el-form-item>
                    <el-form-item   :label="$t('tobacco.tmaterial.billApply.author')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
                    </el-form-item>
                    <el-form-item   :label="$t('tobacco.tmaterial.billApply.date')" >
                        <el-date-picker type="date" placeholder="选择日期" v-model="formItem.date" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item   :label="$t('tobacco.tmaterial.billApply.operation')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.operation"/>
                    </el-form-item>


                    <el-form-item   :label="$t('tobacco.tmaterial.billApply.singleNumber')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.singleNumber"/>
                    </el-form-item>


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
                    :total="formItem.materialDetails.length"
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
              :ArrmaterialDetails="formItem.materialDetails"
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
                formItem: {
                    'bookId':'',
                    'annual':'',
                    'serial':'',
                    'code':'',
                    'identity':'',
                    'year':'',
                    'month':0,
                    'title':'',
                    'author':'',
                    'date':'',
                    'operation':'',
                    'countryId':86,
                    'countryName':'中国',
                    'singleNumber':0,
                    'materialName':'',
                    'materialNumber':0,
                    'materialWeight':0,
                    'materialSpecifications':'',
                    'materialApplication':'',
                    'applicationTime':'',

                    materialDetails:[]
                },
                ruleValidate: {
                    code: [
                        { required: true, message: '编码不能为空', trigger: 'blur' }
                    ],

                },
                showMaterialDetails:false,
                showMaterialDetailsArr:[]
            };
        },
        created(){
       this.formItem.date=util.dateFormat(new Date(),'YYYY-MM-DD')
            this.formItem.annual=util.dateFormat(new Date(),'YYYY-MM-DD')
            this.formItem.author=this.$store.state.user.user.userName;

        },
        methods:{
            onSubmitClick(name) {
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
                this.formItem.materialDetails=[]
                this.showMaterialDetailsArr=[]
                this.formItem.materialDetails=arr
                this.showMaterialDetailsArr=arr.filter((item,index)=>{
                    if (index<5){
                        return item
                    }
                })
                this.showMaterialDetails=showMaterialDetails
            },
            currentChange(page){
                this.showMaterialDetailsArr=this.formItem.materialDetails.filter((item,index)=>{
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
