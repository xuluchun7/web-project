 <template>
     <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
           <el-form-item    :label="$t('tobacco.tmaterial.purchasePlan.serial')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.serial"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchasePlan.barcode')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.barcode"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchasePlan.title')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.title"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchasePlan.author')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.author"/>
           </el-form-item>
           <el-form-item   :label="$t('tobacco.tmaterial.purchasePlan.date')">
               <el-date-picker
                   v-model="formItem.date"
                   type="date"
                   style="width:100%;"
                   :placeholder="$t('base.pleaseSelect')">
               </el-date-picker>
            </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchasePlan.receiverId')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.receiverId"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchasePlan.receiverName')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.receiverName"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchasePlan.control')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.control"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchasePlan.supplierId')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.supplierId"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchasePlan.supplierName')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.supplierName"/>
           </el-form-item>
           <el-form-item>
               <el-button  v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
           </el-form-item>
     </el-form>
</template>
<script>
    import purchasePlanApi from '../../api/tmaterial/apiPurchasePlan';
    export default {
        props: ['item', 'isEdit','visible'],
        data () {
            return {
                formItem: {
                    'serial':'',
                    'barcode':'',
                    'title':'',
                    'author':'',
                    'date':'',
                    'receiverId':'',
                    'receiverName':'',
                'control':0,
                    'supplierId':'',
                    'supplierName':'',
                },
                ruleValidate: {
                    code: [
                        { required: true, message: '编码不能为空', trigger: 'blur' }
                    ],
                }
            };
        },
        created(){
            this.load();
        },
        methods:{
            load(){
                this.formItem = JSON.parse(JSON.stringify(this.item));
            },
            onSubmitClick(name) {
                this.$refs[name].validate((valid) => {//进行前端检验
                    if (valid) {
                        Promise.all([ purchasePlanApi.update(this.item.id,this.formItem)])
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

        },
        watch: {
            item(curVal, oldVal) {
                this.formItem = JSON.parse(JSON.stringify(curVal));
                this.load();
            },
        },
    };
</script>
