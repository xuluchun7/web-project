<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div style="border: 1px solid #ebebeb">
    <el-row :gutter="0" style="margin-top: 5px">
      <el-col :span="6"
              :offset="1"
              style='text-align:center'>
        <el-button type="primary"
                   @click="addForm">新增</el-button>
        <h5>报表名</h5>
        <div v-show='reportList.length===0' >暂无报表</div>
        <div v-for='item in reportList'
             :key="item.id">
          <el-button @click="handleClick(item)"
                     type="text"
                     size="small">
            {{item.title}}
          </el-button>
        </div>
      </el-col>
      <el-col :span="10"
              :offset='2'
      >
        <el-form label-width="100px">
          <el-form-item label="数据项:">
            <el-select v-model="formData.processAttrId"
                       filterable
                       clearable
                       @change="processAttrChange($event)">
              <el-option v-for="item in formItem.processAttrList"
                         :value='item.id'
                         :key='item.id'
                         :label="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="报表维度:">
            <el-select v-model="formData.dimension"
                       @change="dimensionChange($event)">
              <el-option v-for="item in formItem.dimensionList"
                         :value='item.id'
                         :key='item.id'
                         :label="item.label"
                         />
            </el-select>
          </el-form-item>
          <el-form-item label="统计方式:">
            <el-select v-model="formData.method">
              <el-option v-for="item in formItem.methodList"
                         :value='item.id'
                         :key='item.id'
                         :label="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="展示类型:">
            <el-select v-model="formData.type">
              <el-option v-for="item in formItem.typeList"
                         :value='item.id'
                         :key='item.id'
                         :label="item.label" />
            </el-select>
          </el-form-item>
          <el-form-item label="报表名:">

            <el-input v-model="inputName"
                      size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger"
                       style="display: inline-block"
                       @click='deleteReport'>{{ $t('base.buttonDelete') }}
            </el-button>
            <el-button type="primary"
                       style="display: inline-block;margin-left: 10px"
                       @click="saveReport">{{ $t('base.buttonSave') }}
            </el-button>



          </el-form-item>
        </el-form>

      </el-col>
    </el-row>
  </div>
</template>
<script>
import processApi from '../../api/tfarm/apiProcess';
import categoryApi from '../../api/basic/api_category';
import designSchemeClassifyApi from '../../api/tfarm/apiDesignSchemeClassify';
import designSchemeApi from '../../api/tfarm/apiDesignScheme';
import levelApi from '@/api/xbasic/apiLevel';
import processAttrApi from '../../api/tfarm/apiProcessAttr';
import processComponentsApi from '../../api/tfarm/apiProcessComponents';
import reportApi from '../../api/tfarm/apiProcessReport';
import apiProcessReport from '../../api/tfarm/apiProcessReport';
export default {
  "props": ['item', 'visible'],
  data() {
    return {
      formId:'',
      "formItem": {
        "processId": '',
        "processAttrList": [],
        "dimensionList": [
          { "id": 2, "label": '下级组织单位/行政单位' },
          { "id": 1, "label": '时间' }
        ],
        "methodList": [
          { "id": 1, "label": '源数据' },
          { "id": 2, "label": '累加' },
          { "id": 3, "label": '平均值' }
        ],
        "typeList": [
          { "id": 1, "label": '饼状图' },
          { "id": 2, "label": '折线图' },
          { "id": 3, "label": '柱状图' }
        ]
      },
      "reportList": [],
      "reportAddForm": false,
      "formData": {
        "processId": '',
        "processAttrName": '',
        "type": '',
        "dimension": '',
        "title": '',
        "method": '',
        "processAttrId": '',
        "id": '',
        "processAttrCode": ''
      },
      "change": true,
      inputName: ''
    };
  },
  created() {
    this.formItem.processId = this.item.id;
    this.formData.processId = this.item.id;
      this.formData.type = 1;
      // this.formData.dimension = 1;
      this.formData.method = 1;
    this.loadExsitAttr();
    this.showReportList();
    this.change=true
  },
  "components": {},
  "watch": { 
    item(newVal, oldVal) {
      this.formData = {};
      this.reportList=[]
    this.reportAddForm=false
        this.inputName=''
      this.formItem.processId = newVal.id;
       this.formData.processId = newVal.id;
        this.formData.type = 1;
        // this.formData.dimension = 1;
        this.formData.method = 1;
        this.change=true
      //加载已经有数据
      this.loadExsitAttr();
      this.showReportList()
    },
  },
  "methods": {
    handleClick(item) {
      console.log(item)
      this.reportAddForm = true;
      this.formData = item;
      this.inputName=item.title
      this.change=false
    },
    loadExsitAttr() {
      Promise.all([processAttrApi.getByProcessId(this.formItem.processId)])
        .then(([response]) => {
          this.formItem.processAttrList = [];
          var list = [];
          list = response.sort(function(a, b) {
            return a.position - b.position;
          });
          console.log(response)
            for (var i=0;i<list.length;i++){
                if (list[i].dataType==="double"||list[i].dataType==='int'){
                    this.formItem.processAttrList.push(list[i])
                }
            } 
          console.log(this.formItem.processAttrList)
        })
        .catch(error => {});
    },
    addForm() {
      this.reportAddForm = true;
      this.inputName = '';
      this.change = true;
      this.formData.type = 1;
      // this.formData.dimension = 1;
      this.formData.method = 1;
    },
    dimensionChange(val){
        console.log(val)
          if (val===1){
              this.formItem.methodList=[
                  { "id": 1, "label": '源数据' },
              ]

              }
              else{
              this.formItem.methodList=[
                  { "id": 1, "label": '源数据' },
                  { "id": 2, "label": '累加' },
                  { "id": 3, "label": '平均值' }
              ]
          }
      },
    processAttrChange(val) {
      let obj = {};
      obj = this.formItem.processAttrList.find(item => {
        return item.id === val;
      });
      this.formData.processAttrName = obj.label;
      this.formData.processAttrCode=obj.attrId;
      console.info(obj);

    },
    showReportList() {
      Promise.all([
        apiProcessReport.getListByProcess(this.formItem.processId)
      ]).then(([response]) => {
        this.reportList = [];
this.reportList = response;
      });
    },
    saveReport() {
      this.reportAddForm = true;
      console.log(this.change)
      if (this.change === true) {
        this.formData.title =this.inputName
        console.log(this.formItem.processAttrList)
          if (this.formItem.processAttrList.length===0){
              this.$message({
                  "message": this.$t('暂无数据无法配置'),
                  "type": 'info'
              });
              return;
          }
        if (
          this.formData.processAttrId === undefined ||
          this.formData.processAttrId === null ||
          this.formData.processAttrId === ''
        ) {
          this.$message({
            "message": this.$t('请选择数据项'),
            "type": 'info'
          });
          return;
        }
        if (
          this.formData.title === undefined ||
          this.formData.title === null ||
          this.formData.title === ''
        ) {
          this.$message({
            "message": this.$t('请填写报表名'),
            "type": 'info'
          });
          return;
        }
        this.formData.id=this.formId
        delete this.formData['id']
        console.log(this.formData)
        Promise.all([reportApi.save(this.formData)]).then(([response]) => {
         this.$message({
            "message": this.$t('添加成功'),
            "type": 'info'
          });
           this.showReportList()

        });
      }else{
         if (
          this.formData.processAttrId === undefined ||
          this.formData.processAttrId === null ||
          this.formData.processAttrId === ''
        ) {
          this.$message({
            "message": this.$t('请选择数据项'),
            "type": 'info'
          });
          return;
        }
        if (this.formItem.processAttrList.length===0){
            this.$message({
                "message": this.$t('暂无数据无法配置'),
                "type": 'info'
            });
            return;
        }
        if (
          this.formData.title === undefined ||
          this.formData.title === null ||
          this.formData.title === ''
        ) {
          this.$message({
            "message": this.$t('请填写报表名'),
            "type": 'info'
          });
          return;
        }
        this.formData.title=this.inputName
        console.log(this.formId,this.formData)
        Promise.all([reportApi.update(this.formId,this.formData)]).then(([response]) => {
           this.showReportList()
            this.$message({
            "message": this.$t('修改成功'),
            "type": 'info'
          });
         });
      }
     this.change = false;
    },
    deleteReport() {
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
    deleteButtonClick(){
      Promise.all([reportApi.softDelete(this.formData.id)])
        .then(([response]) => {
          this.$message({
            type: "info",
            message: this.$t("message.deleteOk")
          });
        this.showReportList()
        this.reportAddForm = false;
        this.inputName=''
        })
        .catch(error => {});
    }
  }
};
</script>
<style>
</style>
