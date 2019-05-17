 <template>
     <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.bookId')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.bookId"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.annual')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.annual"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.serial')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.serial"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.number')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.number"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.identity')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.identity"/>
           </el-form-item>

           <el-form-item    :label="$t('tobacco.tmaterial.billApply.title')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.title"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.author')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.author"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.date')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.date"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.operation')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.operation"/>
           </el-form-item>

           <el-form-item    :label="$t('tobacco.tmaterial.billApply.singleNumber')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.singleNumber"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.materialName')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.materialName"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.materialNumber')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.materialNumber"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.materialWeight')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.materialWeight"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.materialSpecifications')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.materialSpecifications"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.materialApplication')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.materialApplication"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmaterial.billApply.applicationTime')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.applicationTime"/>
           </el-form-item>
           <el-form-item>
               <el-button  v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
           </el-form-item>
     </el-form>
</template>
<script>
    import billApplyApi from '../../api/tmaterial/apiBillApply.ts';
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

        },
        watch: {
            item(curVal, oldVal) {
                this.formItem = JSON.parse(JSON.stringify(curVal));
                this.load();
            },
        },
    };
</script>
