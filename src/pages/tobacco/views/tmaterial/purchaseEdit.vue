 <template>
     <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.serial')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.serial"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.barcode')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.barcode"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.yearMOnth')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.yearMOnth"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.title')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.title"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.author')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.author"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.date')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.date"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.supplierId')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.supplierId"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.supplierName')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.supplierName"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.receiverId')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.receiverId"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.receiverName')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.receiverName"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.price')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.price"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.priceUnit')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.priceUnit"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.amount')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.amount"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.amountUnit')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.amountUnit"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.money')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.money"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.tax')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.tax"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.freight')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.freight"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.total')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.total"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.control')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.control"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.begin')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.begin"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.end')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.end"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.purchase.desc')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.desc"/>
           </el-form-item>
           <el-form-item>
               <el-button  v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
           </el-form-item>
     </el-form>
</template>
<script>
    import purchaseApi from '../../api/tmaterial/apiPurchase';
    export default {
        props: ['item', 'isEdit','visible'],
        data () {
            return {
                formItem: {
                    'serial':'',
                    'barcode':'',
                    'yearMOnth':'',
                    'title':'',
                    'author':'',
                    'date':'',
                    'supplierId':'',
                    'supplierName':'',
                    'receiverId':'',
                    'receiverName':'',
                'price':0,
                'priceUnit':0,
                'amount':0,
                'amountUnit':0,
                'money':0,
                'tax':0,
                'freight':0,
                'total':0,
                'control':0,
                    'begin':'',
                    'end':'',
                    'desc':'',
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
                        Promise.all([ purchaseApi.update(this.item.id,this.formItem)])
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
