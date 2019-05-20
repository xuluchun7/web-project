<template>
    <div>
        <el-form  style="width: 90%;margin: 0 auto">
            <el-form-item>
            <el-table
                    :row-key="getRowKey"
                    :data="formItem"
                    style="width: 100%;"
                    tooltip-effect="dark"
                    ref="multipleTable"
                    @selection-change="handleSelectionChange">
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
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="category.name"
                        :label="$t('tobacco.tmaterial.billApply.category')"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="measure.name"
                        :label="$t('tobacco.tmaterial.billApply.measurement')"
                        width="160">
                </el-table-column>
                <el-table-column
                        type="selection"
                        width="55"
                        :reserve-selection="show">
                </el-table-column>

            </el-table>
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :page-size="15"
                        :total="length"
                        @current-change="currentChange">
                </el-pagination>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import apiMaterial from '../../api/tmaterial/apiMaterial'
    export default {
        props:['ArrmaterialDetails'],
        watch:{
            ArrmaterialDetails:function (curVal, oldVal) {
                console.log(curVal)
                console.log(oldVal)
                console.log('改变')
               if (curVal.length===0){
                   console.log(1)
                   this.$refs.multipleTable.clearSelection();
               }
               else{

                   console.log(2)
               }


            }
        },
        data() {
            return {
                show:true,
                formItem:[],
                radio: '1',
                dataItem:[],
                multipleSelection:[],
                length:0,
                num:0,
                oldArr:[],
                newArr:[]
            };
        },
        created() {
            console.log(1212)
            console.log(this.ArrmaterialDetails)
            Promise.all([apiMaterial.getAll({
                    size: 500,
                    page: 0,
                })])
                .then(res=>{
                    this.length=res[0].content.length
                    this.oldArr=res[0].content
                    for (var i=0;i<this.ArrmaterialDetails.length;i++) {
                        console.log(this.oldArr.filter(item => {
                            return item.name===this.ArrmaterialDetails[i].materialName
                        }))
                        this.newArr.push(this.oldArr.filter(item => {
                            if (this.ArrmaterialDetails[i].materialName!==undefined){
                            return item.name===this.ArrmaterialDetails[i].materialName}
                            else{
                                return item.name===this.ArrmaterialDetails[i].name
                            }
                        }))
                    }
                    for (let i in this.newArr) {
                        console.log(this.newArr[i])
                        this.toggleSelection(this.newArr[i])
                    }
                    console.log(this.newArr)
                    // this.showApiMaterial()
                })
            this.showApiMaterial()
        },
        mounted(){
            for (let i in this.newArr) {
                console.log(this.newArr[i])
                this.toggleSelection(this.newArr[i])
            }
        },
        components: {},
        methods: {
            getRowKey (row) {
                return row.name
            },
            showApiMaterial(){
                Promise.all([apiMaterial.getAll({
                    size: 15,
                    page: this.num,
                    sort: "code",
                })])
                    .then(res=>{
                        this.formItem=res[0].content
                        for (var i in this.formItem){
                            this.formItem[i].date=this.formItem[i].date.substring(0,10)
                        }

                    })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection)
            },
            onSubmit(){
                this.$emit('saveMaterialDetails',this.multipleSelection,false)
            },
            currentChange(a){
                this.num=a-1
                this.showApiMaterial()
                for (let i in this.newArr) {
                    this.toggleSelection(this.newArr[i])

                }

            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
                }
        }
    };
</script>
<style scoped>

</style>
