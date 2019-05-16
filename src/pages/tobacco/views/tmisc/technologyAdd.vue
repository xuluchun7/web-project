<template>
    <el-form :model="formItem"  label-width="80px" :rules="ruleValidate" ref="formValidate">
                    <el-form-item   :label="$t('misc.tmisc.technology.code')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.code"/>
                    </el-form-item>
                    <el-form-item   :label="$t('misc.tmisc.technology.annual')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.annual"/>
                    </el-form-item>
                    <el-form-item   :label="$t('misc.tmisc.technology.name')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.name"/>
                    </el-form-item>
                    <el-form-item   :label="$t('misc.tmisc.technology.author')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.author"/>
                    </el-form-item>
                    <el-form-item   :label="$t('misc.tmisc.technology.date')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.date"/>
                    </el-form-item>
                    <el-form-item   :label="$t('misc.tmisc.technology.control')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.control"/>
                    </el-form-item>
                    <el-form-item   :label="$t('misc.tmisc.technology.type')" >
                        <el-input v-bind:placeholder="$t('base.pleaseInput')" v-model="formItem.type"/>
                    </el-form-item>

        <el-form-item>
            <el-button type="primary" style="float: right"
                       @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
            </el-button>
        </el-form-item>
    </el-form>
</template>
<script>
    import technologyApi from '@/api/misc/tmisc/apiTechnology';
    export default {
         data () {
            return {
                formItem: {
                    'code':'',
                    'annual':0,
                    'name':'',
                    'author':'',
                    'date':'',
                    'control':0,
                    'type':'',
                },
                ruleValidate: {
                    code: [
                        { required: true, message: '编码不能为空', trigger: 'blur' }
                    ],

                }
            };
        },
        created(){

        },
        methods:{
            onSubmitClick(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        Promise.all([ technologyApi.save(this.formItem)])
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

        }
    };
</script>
