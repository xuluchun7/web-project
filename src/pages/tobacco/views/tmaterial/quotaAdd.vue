<template>
  <el-form :model="formItem"
           label-width="80px"
           :rules="ruleValidate"
           ref="formValidate">
    <el-form-item :label="$t('tobacco.tmaterial.quota.year')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.year" />
    </el-form-item>

    <el-form-item label="所属单位">
      <organization-form :root="userOrgId"
                         @onchange="organizationOnchange"
                         style="width:100%" />
    </el-form-item>
    <el-form-item label="物资名称">
      <el-select v-model="formItem.material"
                 style="width:100%"
                 filterable
                 remote
                 reserve-keyword
                 placeholder="请输入物资名称或者代码"
                 :remote-method="remoteLoadMaterial"
                 :loading="materialLoading"
                 clearable
                 @change="onMaterialChanged">
        <el-option v-for="item in formData.materialList "
                   :key="item.id"
                   :label="item.name"
                   :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="计量单位">
      <el-select v-model="formItem.unit.id"
                 @change="unitSelectChange"
                 style="width:100%">
        <el-option v-for="unit in  formData.unitList"
                   :key="unit.id"
                   :label="unit.measureName"
                   :value="unit.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.quota.amount')">
      <el-input :placeholder="$t('base.pleaseInput')"
                style="width:100%"
                v-model="formItem.amount">
        <template slot="append"> <span style="color:red;"> {{formItem.measureName}}</span></template>
      </el-input>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.quota.author')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.author" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.quota.date')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.date" />
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.quota.control')">
      <el-select v-model="formItem.control"
                 :placeholder="$t('base.pleaseSelect')"
                 style="width: 100%">
        <el-option v-for="item in controlList"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item :label="$t('tobacco.tmaterial.quota.desc')">
      <el-input v-bind:placeholder="$t('base.pleaseInput')"
                v-model="formItem.desc" />
    </el-form-item>

    <el-form-item>
      <el-button type="primary"
                 style="float: right"
                 @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import quotaApi from '../../api/tmaterial/apiQuota';
const OrganizationForm = () => import("@/components/Organization");
import materialApi from "../../api/tmaterial/apiMaterial";
import materialUnitApi from "../../api/tmaterial/apiMaterialUnit";
import moment from "moment";
import { mapGetters } from "vuex";
export default {
  data () {
    return {
      materialLoading: false,
      formData: {
        materialList: [],
        unitList: []
      },
      formItem: {
        material: {},
        unit: {
          id: "",
          measureName: ""
        },
        organizationId: "",
        organizationName: "",
        organizationOrder: "",
        organizationCode: "",
        'year': moment().year(),
        'title': '',
        author: "",
        date: moment().format("YYYY-MM-DD"),
        'amount': 0,
        'control': 1,
        'desc': '',
      },
      controlList: [
        { value: 1, label: "启用" },
        { value: 0, label: "停用" }
      ],
      ruleValidate: {
        code: [
          { required: true, message: '编码不能为空', trigger: 'blur' }
        ],

      }
    };
  },
  components: {
    OrganizationForm: () => import("@/components/Organization")
  },
  computed: {
    ...mapGetters({ userDistrictId: "districtId", userOrgId: "organizationId", organizationName: "organizationName", userName: "userName" })
  },
  created () {
    this.formItem.organizationId = this.userOrgId;
    this.formItem.organizationName = this.organizationName;
    this.formItem.organizationOrder = "0";
    this.formItem.organizationCode = this.userOrgId;
    this.formItem.author = this.userName;
  },
  methods: {

    organizationOnchange (label, value, values) {
      this.formItem.organizationId = value;
      this.formItem.organizationName = label;
      this.formItem.organizationOrder = "0";
      this.formItem.organizationCode = value;
    },
    onMaterialChanged (item) {
      if (item === undefined || item === null || item === "") {
        this.formData.materialList = [];
      } else {
        let entity = this.formData.materialList.find(it => {
          return it.id === item;
        });
        Promise.all([
          materialUnitApi.getAll({
            size: 100,
            search: "material.id:eq:" + entity.id
          })
        ])
          .then(([unitResponse]) => {
            this.formData.unitList = unitResponse.content;
          })
          .catch(error => { });
      }
    },
    onSubmitClick (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          Promise.all([quotaApi.save(this.formItem)])
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
    remoteLoadMaterial (query) {
      if (query !== "") {
        this.materialLoading = true;
        Promise.all([
          materialApi.getAll({
            contains: "serial,barcode,category,code,name,alphabet,title,author,brand,manufacturer,desc,:{keyword}:true".format(
              { keyword: query }
            )
          })
        ])
          .then(([response]) => {
            this.formData.materialList = response.content;
          })
          .catch(error => {
            console.log(error);
          })
          .finally(() => {
            this.materialLoading = false;
          });
      } else {
        this.formData.materialList = [];
      }
    },
    formReset (name) {
      this.$refs[name].resetFields();
    },

  }
};
</script>
