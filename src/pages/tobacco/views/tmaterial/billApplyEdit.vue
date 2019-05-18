 <template>
     <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
         <el-form-item    :label="$t('tobacco.tmaterial.billApply.annual')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.annual"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.serial')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.serial"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.code')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.number"/>
           </el-form-item>
<!--           <el-form-item    :label="$t('tobacco.tmaterial.billApply.identity')">-->
<!--               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.identity"/>-->
<!--           </el-form-item>-->

           <el-form-item    :label="$t('tobacco.tmaterial.billApply.title')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.title"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.author')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.author"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.date')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.date"/>
           </el-form-item>
<!--           <el-form-item    :label="$t('tobacco.tmaterial.billApply.operation')">-->
<!--               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.operation"/>-->
<!--           </el-form-item>-->

<!--           <el-form-item    :label="$t('tobacco.tmaterial.billApply.singleNumber')">-->
<!--               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.singleNumber"/>-->
<!--           </el-form-item>-->
<!--           <el-form-item    :label="$t('tobacco.tmaterial.billApply.materialName')">-->
<!--               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.materialName"/>-->
<!--           </el-form-item>-->
<!--           <el-form-item    :label="$t('tobacco.tmaterial.billApply.materialNumber')">-->
<!--               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.materialNumber"/>-->
<!--           </el-form-item>-->
<!--           <el-form-item    :label="$t('tobacco.tmaterial.billApply.materialWeight')">-->
<!--               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.materialWeight"/>-->
<!--           </el-form-item>-->
<!--           <el-form-item    :label="$t('tobacco.tmaterial.billApply.materialSpecifications')">-->
<!--               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.materialSpecifications"/>-->
<!--           </el-form-item>-->
<!--           <el-form-item    :label="$t('tobacco.tmaterial.billApply.materialApplication')">-->
<!--               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.materialApplication"/>-->
<!--           </el-form-item>-->
<!--           <el-form-item    :label="$t('tobacco.tmaterial.billApply.applicationTime')">-->
<!--               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.applicationTime"/>-->
<!--           </el-form-item>-->
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
                         prop="materialName"
                         :label="$t('base.name')"
                         width="180">
                 </el-table-column>
                 <el-table-column
                         prop="materialCode"
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
                             v-model="scope.row.materialNumber"
                             size="mini"
                             placeholder="输入数量">
                         <div slot="append">{{scope.row.measure.name}}</div>
                     </el-input>
                 </template>
             </el-table-column>
                 <el-table-column
                         align="left"
                         width="90"
                         label="操作">
                     <template  slot-scope="scope">
                         <el-button type="danger"
                                    size="mini"
                                    @click="deleteClick(scope.row,scope.$index)">{{ $t('base.buttonDelete') }}
                         </el-button>
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

           <el-form-item>
               <el-button  v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
           </el-form-item>
         <el-dialog :title="$t('tobacco.tmaterial.billApply.materialDetails')" :visible.sync="showMaterialDetails" append-to-body>
             <materialDetails-form @saveMaterialDetails="topSaveMaterialDetails"
                                   :ArrmaterialDetails="materialDetails"

             />
         </el-dialog>
     </el-form>
</template>
<script>
    import billApplyApi from '../../api/tmaterial/apiBillApply.ts';
    import materialDetails from './billAppiyDetails'
    export default {
        props: ['item', 'isEdit','visible'],
        data () {
            return {
                formItem: {
                    'bookId':'',
                'annual':0,
                    'serial':'',
                    'number':'',
                    'identity':'',
                'year':0,
                'month':0,
                    'title':'',
                    'author':'',
                    'date':'',
                    'operation':'',
                    'countryId':'',
                    'countryName':'',
                'singleNumber':0,
                    'materialName':'',
                'materialNumber':0,
                'materialWeight':0,
                    'materialSpecifications':'',
                    'materialApplication':'',
                    'applicationTime':'',
                    billApplyItemList:[]
                },
                ruleValidate: {
                    code: [
                        { required: true, message: '编码不能为空', trigger: 'blur' }
                    ],
                },
                showMaterialDetailsArr:[],
                materialDetails:[],
                showMaterialDetails:false
            };
        },
        created(){
            this.load();
            console.log(this.formItem)
            this.materialDetails=this.item.billApplyItemList
            this.showMaterialDetailsArr=this.materialDetails.filter((item,index)=>{
                if (index<5){
                    return item
                }
            })
        },
        methods:{
            load(){
                this.formItem = JSON.parse(JSON.stringify(this.item));
            },
            onSubmitClick(name) {
                this.$refs[name].validate((valid) => {//进行前端检验
                    if (valid) {
                        Promise.all([ billApplyApi.update(this.item.id,this.formItem)])
                            .then(([response]) => {
                                this.formReset(name);
                                this.$message({
                                    message: this.$t('message.saveAndContinue'),
                                    type: 'info',
                                });
                                this.$emit('update:visible', false);
                            })
                            .catch(error => {

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
                this.formItem.billApplyItemList= arr
                console.log(arr)
                for (let i in arr) {
                    this.formItem.billApplyItemList[i].materialId= JSON.parse(JSON.stringify(this.materialDetails[i].id))
                    this.formItem.billApplyItemList[i].materialName= JSON.parse(JSON.stringify(this.materialDetails[i].name))
                    this.formItem.billApplyItemList[i].materialCode=JSON.parse(JSON.stringify(this.materialDetails[i].code ))
                    this.formItem.billApplyItemList[i].materialNumber= JSON.parse(JSON.stringify(this.materialDetails[i].barcode))
                    this.formItem.billApplyItemList[i].measure= JSON.parse(JSON.stringify(this.materialDetails[i].measure.id))
                    this.formItem.billApplyItemList[i].category= JSON.parse(JSON.stringify(this.materialDetails[i].category.id))
                    for (let key in  this.formItem.billApplyItemList[i]){
                        console.log(key)
                        if (key !=='materialId'&&key !=='materialName'&&key !=='materialCode'&&key !=='materialNumber'&&key !=='measure'&&key !=='category'){
                            delete this.formItem.billApplyItemList[i][key]
                        }
                    }

                }
                this.materialDetails=arr
                this.showMaterialDetailsArr=this.formItem.billApplyItemList.filter((item,index)=>{
                    if (index<5){
                        return item
                    }
                })

                this.showMaterialDetails=showMaterialDetails
            },
            currentChange(page){
                this.showMaterialDetailsArr=this.formItem.billApplyItemList.filter((item,index)=>{
                    if (index>=(page-1)*5&&index<page*5){
                        return item
                    }})
            },
            deleteClick(a,b){
                console.log(a)
                console.log(b)
            }
        },
        watch: {
            item(curVal, oldVal) {
                this.formItem = JSON.parse(JSON.stringify(curVal));
                this.load();
                this.materialDetails=curVal.billApplyItemList
            },
        },
        components:{
            'materialDetails-form':materialDetails
        },
    };
</script>
