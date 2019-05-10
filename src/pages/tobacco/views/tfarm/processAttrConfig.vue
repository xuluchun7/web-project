<style scoped>
@import "~@/styles/css/main-list.css";
</style>
<template>
  <div>
    <el-form :model="formItem"
             label-width="80px"
             :rules="ruleValidate"
             ref="formValidate"
             style="margin: 5px;
    border-bottom: 1px solid;">
      <el-row :gutter="10">
        <el-col :span="7">
          <el-form-item :label="$t('tobacco.tfarm.processAttr.collectionName')"
                        prop="label">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="formItem.label" />
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item :label="$t('tobacco.tfarm.processAttr.classify')">
            <el-select v-model="formData.classify "
                       @change="filterAttr">
              <el-option v-for="item in formData.classifyList"
                         :value="item.id"
                         :label="item.name"
                         :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item :label="$t('tobacco.tfarm.processAttr.componentsName')"
                        prop="componentsId">
            <el-select v-model="formItem.componentsId"
                       @change="onComponentsChange">
              <el-option v-for="item in formData.activeAttrList"
                         :value="item.id"
                         :label="item.label"
                         :key="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item style="float:right">
            <el-button @click="onSubmitClick('formValidate')">{{ $t('tobacco.common.btnInsert') }}</el-button>
          </el-form-item>
        </el-col>
      </el-row>

    </el-form>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-table highlight-current-row
                  ref="singleTable"
                  class="cas-group"
                  @current-change="onComponentsSelect"
                  :data="formData.processAttrList"
                  style="width: 100%">

          <el-table-column prop="label"
                           :label="$t('tobacco.tfarm.processAttr.collectionContent')" />

        </el-table>
      </el-col>
      <el-col :span="15"
              class="cas-group">
        <el-form :model="processAttrItem"
                 label-width="80px"
                 diabled
                 :rules="ruleValidate"
                 ref="processAttrForm">

          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.collectionName')">
                <el-input v-bind:placeholder="$t('base.pleaseInput')"
                          v-model="processAttrItem.label" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.classify')">
                <el-select v-model="processAttrItem.classify ">
                  <el-option v-for="item in formData.classifyList"
                             :value="item.id"
                             :label="item.name"
                             :key="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.type')">

                <el-select v-model="processAttrItem.dataType">
                  <el-option v-for="item in formData.dataTypeList"
                             :value='item.key'
                             :key='item.key'
                             :label="item.label" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.unit')">
                <el-select v-model="processAttrItem.unit"
                           allow-create
                           filterable
                           clearable>
                  <el-option v-for="item in formData.unitList"
                             :value='item.key'
                             :key='item.key'
                             :label="item.label" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.group')">
                <el-input v-bind:placeholder="$t('base.pleaseInput')"
                          v-model="processAttrItem.group" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.digits')">
                <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                                 style="width:100%"
                                 v-model="processAttrItem.digits" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.editStatus')">

                <el-select v-model="processAttrItem.editStatus">
                  <el-option v-for="item in formData.editStatusList"
                             :value='item.key'
                             :key='item.key'
                             :label="item.value" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.pattern')">
                <el-input v-bind:placeholder="$t('base.pleaseInput')"
                          v-model="processAttrItem.pattern" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.spanRows')">
                <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                                 style="width:100%"
                                 v-model="processAttrItem.spanRows" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.spanColumns')">
                <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                                 style="width:100%"
                                 v-model="processAttrItem.spanColumns" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item :label="$t('tobacco.tfarm.processAttr.hintInput')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="processAttrItem.hintInput" />
          </el-form-item>
          <el-form-item :label="$t('tobacco.tfarm.processAttr.hintPoint')">
            <el-input v-bind:placeholder="$t('base.pleaseInput')"
                      v-model="processAttrItem.hintPoint" />
          </el-form-item>
          <el-row>
            <el-col :span="8">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.require')">
                <el-select v-model="processAttrItem.require">
                  <el-option v-for="item in $t('constant.boolean')"
                             :value='item.key'
                             :key='item.key'
                             :label="item.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.point')">
                <el-select v-model="processAttrItem.point">
                  <el-option v-for="item in formData.pointTypeList"
                             :value='item.key'
                             :key='item.key'
                             :label="item.label" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.show')">
                <el-select v-model="processAttrItem.show">
                  <el-option v-for="item in $t('constant.boolean')"
                             :value='item.key'
                             :key='item.key'
                             :label="item.value" />
                </el-select>
              </el-form-item>

            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.min')">
                <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                                 v-model="processAttrItem.min" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.max')">
                <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                                 v-model="processAttrItem.max" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.weight')">
                <el-input v-bind:placeholder="$t('base.pleaseInput')"
                          v-model="processAttrItem.weight" />
              </el-form-item>
            </el-col>
            <!--计算指标-->
            <el-col :span="12">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.formula')">
                <el-popover ref="popover"
                            v-model="visible2"
                            placement="top"
                            title="请选择计算方式"
                            width="300"
                            trigger="focus"
                            :disabled="processAttrItem.id===undefined">
                  <el-form label-width="90
          px">
                    <el-form-item label="首项:">
                      <el-select v-model="formElements.first">
                        <el-option v-for="item in selectform"
                                   :value='item.attrId'
                                   :key='item.attrId'
                                   :label="item.label" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="计算方式:">
                      <el-select v-model="formElements.method"
                                 @change="processAttrChange($event)">
                        <el-option v-for="item in operational"
                                   :value='item.id'
                                   :key='item.id'
                                   :label="item.label" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="末项:"
                                  v-show="lastShow">
                      <el-select v-model="formElements.last">
                        <el-option v-for="item in selectform"
                                   :value='item.attrId'
                                   :key='item.attrId'
                                   :label="item.label" />
                      </el-select>
                    </el-form-item>
                    <div style="text-align: right; margin: 0">
                      <el-button size="mini"
                                 type="text"
                                 @click="deleteMethod">取消</el-button>
                      <el-button type="primary"
                                 size="mini"
                                 @click="saveMethod">确定</el-button>
                    </div>
                  </el-form>
                  <el-input v-bind:placeholder="$t('base.pleaseInput')"
                            v-model="processAttrItem.formula"
                            @focus="focuspopover"
                            @blur="blurInput"
                            :disabled="processAttrItem.id===undefined"
                            slot="reference" />
                </el-popover>

              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('tobacco.tfarm.processAttr.position')">
                <el-input-number v-bind:placeholder="$t('base.pleaseInput')"
                                 style="width:100%"
                                 v-model="processAttrItem.position" />
              </el-form-item>
            </el-col>

          </el-row>

          <el-form-item>
            <el-button type="primary"
                       style="float: right"
                       :disabled="processAttrItem.id===undefined"
                       @click="onUpdateClick('processAttrForm')">{{ $t('base.buttonSave') }}
            </el-button>

            <el-button type="danger"
                       style="float: right;margin-right:10px"
                       :disabled="processAttrItem.id===undefined"
                       @click="onDeleteClick('processAttrForm')">{{ $t('base.buttonDelete') }}
            </el-button>

          </el-form-item>

        </el-form>
      </el-col>
    </el-row>

  </div>
</template>
<script>
import processApi from "../../api/tfarm/apiProcess";
import categoryApi from "../../api/basic/api_category";
import designSchemeClassifyApi from "../../api/tfarm/apiDesignSchemeClassify";
import designSchemeApi from "../../api/tfarm/apiDesignScheme";
import levelApi from "@/api/xbasic/apiLevel";
import processAttrApi from "../../api/tfarm/apiProcessAttr";
import processComponentsApi from "../../api/tfarm/apiProcessComponents";
export default {
  props: ["item", "visible"],
  data() {
    return {
      type: "",
      inputValue: "",
      visible2: false,
      lastShow: false,
      formElements: {
        first: "",
        method: "",
        last: ""
      },
      operational: [
        {
          label: "累加",
          id: 0
        },
        {
          label: "加",
          id: 1
        },
        {
          label: "减",
          id: 2
        },
        {
          label: "乘",
          id: 3
        },
        {
          label: "除",
          id: 4
        }
      ],
      selectform: [],
      formItem: {
        processId: "",
        label: "",
        componentsId: ""
      },
      processAttrItem: {},
      formData: {
        processComponentsList: [],
        classifyList: [],
        activeAttrList: [],
        classify: "",
        processAttrList: [],
        pointTypeList: [
          { key: 0, label: "不计分" },
          { key: 1, label: "自动计算" },
          { key: 2, label: "手动录入" },
          { key: 3, label: "选项计分" }
        ],
        unitList: [
          { key: "元", label: "元" },
          { key: "千克", label: "千克" },
          { key: "公斤", label: "公斤" },
          { key: "株", label: "株" },
          { key: "亩", label: "亩" },
          { key: "米", label: "米" }
        ],
        dataTypeList: [
          { key: "string", label: "字符串" },
          { key: "int", label: "整数" },
          { key: "double", label: "浮点数" },
          { key: "date", label: "日期" },
          { key: "time", label: "时间" },
          { key: "datetime", label: "时间日期" },
          { key: "boolean", label: "布尔" },
          { key: "image", label: "图片" },
          { key: "gps", label: "坐标" },
          { key: "enum", label: "枚举" }
        ],
        editStatusList: [
          { key: 0, value: "未设置" },
          { key: 1, value: "只读" },
          { key: 3, value: "编辑只读" },
          { key: 5, value: "可编辑" }
        ]
      },
      ruleValidate: {
        componentsId: [
          { required: true, message: "组件必须选择", trigger: "blur" }
        ],
        label: [
          { required: true, message: "采集名称必须输入", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    console.log(this.visible);
    this.formItem.processId = this.item.id;
    this.formItem.processCode = this.item.code;
    this.formItem.designSchemeId = this.item.designSchemeId;
    this.formItem.designSchemeCode = this.item.designSchemeCode;
    this.loadExsitAttr();
    Promise.all([
      processComponentsApi.getAll({
        size: 500,
        page: 0
      }),
      categoryApi.getAll({ search: "lead:EQ:SC_PD", sort: "id" })
    ])
      .then(([response, categoryResponse]) => {
        this.formData.processComponentsList = response.content;
        this.formData.classifyList = categoryResponse.content;
        if (categoryResponse.content.length > 0) {
          this.formData.classify = categoryResponse.content[0].id;
          this.filterAttr(this.formData.classify);
        }
      })
      .catch(error => {});
  },
  components: {},
  watch: {
    selectform(curVal, oldVal) {
      console.log("新数据", curVal);
      console.log("老数据", oldVal);
    },
    item(curVal, oldVal) {
      this.processAttrItem = {};
      this.$refs.singleTable.setCurrentRow(undefined);
      console.log(curVal);
      this.formItem.processId = curVal.id;
      //加载已经有数据
      this.loadExsitAttr();
    }
  },
  methods: {
    blurInput() {
      this.visible2 = false;
      // this.selectform=[]
    },
    deleteMethod() {
      this.visible2 = false;
      this.formElements.first = "";
      this.formElements.last = "";
      this.formElements.method = "";
    },
    focuspopover() {
      this.visible2 = true;
      if (
        this.processAttrItem.formula !== null &&
        this.processAttrItem.formula !== "" &&
        this.processAttrItem.formula !== undefined
      ) {
        var a = this.processAttrItem.formula;
        var obj = eval("(" + a + ")");
        console.log(1);
        console.log(obj);
        this.formElements.first = obj.choose1;
        this.formElements.method = obj.type;
        this.formElements.last = obj.choose2;
        console.log(obj.choose1);
        console.log(this.selectform);
        console.log(this.formElements.first);
        console.log(this.processAttrItem.formula);
      } else {
        this.formElements.first = "";
        this.formElements.last = "";
        this.formElements.method = "";
      }
      if (this.processAttrItem.id === undefined) {
        this.selectform = [];
      }
      console.log(this.processAttrItem.id);
    },
    saveMethod() {
      if (this.type === 0) {
        if (
          this.formElements.first !== "" &&
          this.formElements.method !== "" &&
          this.formElements.first !== undefined &&
          this.formElements.method !== undefined
        ) {
          this.visible2 = false;
          this.processAttrItem.formula =
            '{"choose1":' +
            this.formElements.first +
            "," +
            '"type":' +
            this.formElements.method +
            "}";
          this.formElements.first = "";
          this.formElements.last = "";
          this.formElements.method = "";
          // this.selectform = []
          console.log(this.inputValue);
        } else {
          console.log(1111);
          this.$message({
            type: "info",
            message: "数据项不能为空"
          });
        }
      } else {
        if (
          this.formElements.first !== "" &&
          this.formElements.method !== "" &&
          this.formElements.last !== "" &&
          this.formElements.first !== undefined &&
          this.formElements.method !== undefined &&
          this.formElements.last !== undefined
        ) {
          this.visible2 = false;
          this.processAttrItem.formula =
            '{"choose1":' +
            this.formElements.first +
            "," +
            '"type":' +
            this.formElements.method +
            "," +
            '"choose2":' +
            this.formElements.last +
            "}";
          this.formElements.first = "";
          this.formElements.last = "";
          this.formElements.method = "";
          // this.selectform = []
          console.log(this.inputValue);
        } else {
          console.log(1111);
          this.$message({
            type: "info",
            message: "数据项不能为空"
          });
        }
      }
    },
    processAttrChange(val) {
      console.log(val);
      this.type = val;
      if (val === 0) {
        this.lastShow = false;
      } else {
        this.lastShow = true;
      }
    },
    onComponentsSelect(row) {
      console.log("选中行", row);
      console.log("www", this.formData.processAttrList);

      if (row === undefined || row === null) {
        this.processAttrItem = {};
      } else {
        this.processAttrItem = row;
        if (this.selectform.length !== 0) {
          this.selectform = [];
        }
        for (var j = 0; j < this.formData.processAttrList.length; j++) {
          if (this.formData.processAttrList[j].id !== row.id) {
            if (
              this.formData.processAttrList[j].dataType === "int" ||
              this.formData.processAttrList[j].dataType === "double"
            ) {
              this.selectform.push(this.formData.processAttrList[j]);
            }
          }
        }
        this.visible2 = false;
        console.log("111", this.selectform);
      }
    },

    onComponentsChange(value) {
      let it = this.formData.processComponentsList.find(item => {
        return item.id === value;
      });
      this.formItem.hintInput = it.hintInput;
      this.formItem.hintPoint = it.hintPoint;
      this.formItem.unit = it.unit;
      this.formItem.dataType = it.dataType;
      this.formItem.require = it.require;
      this.formItem.min = it.min;
      this.formItem.max = it.max;
      this.formItem.point = it.point;
      this.formItem.formula = it.formula;
      this.formItem.weight = it.weight;
      this.formItem.pattern = it.pattern;
      this.formItem.position = it.position;
      this.formItem.show = it.show;
      this.formItem.dataSourceType = it.dataSourceType;
      this.formItem.dataSource = it.dataSource;
      this.formItem.componentsType = it.code;
      this.formItem.classify = it.classify;
    },
    filterAttr(classify) {
      let list = [];
      this.formItem.componentsId = "";
      this.formData.processComponentsList.forEach(item => {
        if (item.classify === classify) {
          list.push(item);
        }
      });
      this.formData.activeAttrList = list;
    },
    onSubmitClick(name) {
      this.$refs.singleTable.setCurrentRow(undefined);
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([processAttrApi.save(this.formItem)])
            .then(([response]) => {
              this.formReset(name);
              this.loadExsitAttr();
              //重置表单，允许多次操作
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
            })
            .catch(error => {
              this.$message({
                type: "warning",
                message: error.message
              });
            });
        }
      });
    },
    onUpdateClick(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          Promise.all([
            processAttrApi.update(this.processAttrItem.id, this.processAttrItem)
          ])
            .then(([response]) => {
              this.$refs.singleTable.setCurrentRow(undefined);
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
            })
            .catch(error => {
              this.$message({
                type: "info",
                message: error.message
              });
            });
        }
      });
    },
    onDeleteClick(name) {
      //  this.$refs.singleTable.setCurrentRow(undefined);
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
          Promise.all([processAttrApi.delete(this.processAttrItem.id)])
            .then(([response]) => {
              this.$refs.singleTable.setCurrentRow(undefined);
              this.processAttrItem = {};
              this.loadExsitAttr();
              this.$message({
                message: this.$t("message.saveAndContinue"),
                type: "info"
              });
            })
            .catch(error => {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.$t("message.cancel")
          });
        });
    },

    formReset(name) {
      this.$refs[name].resetFields();
    },

    loadExsitAttr() {
      Promise.all([processAttrApi.getByProcessId(this.formItem.processId)])
        .then(([response]) => {
          this.formData.processAttrList = response.sort(function(a, b) {
            return a.position - b.position;
          });
        })
        .catch(error => {});
    }
  }
};
</script>
<style>
</style>
