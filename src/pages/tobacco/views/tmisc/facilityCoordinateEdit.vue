 <template>
     <el-form :model="formItem" label-width="80px" :rules="ruleValidate" ref="formValidate">
           <el-form-item    :label="$t('tobacco.tmisc.facilityCoordinate.layerId')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.layerId"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityCoordinate.objectId')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.objectId"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityCoordinate.groupId')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.groupId"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityCoordinate.coord_id')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.coord_id"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityCoordinate.longitude')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.longitude"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityCoordinate.latitude')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.latitude"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityCoordinate.altitude')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.altitude"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityCoordinate.angle')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.angle"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityCoordinate.speed')">
               <el-input v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.speed"/>
           </el-form-item>
           <el-form-item    :label="$t('tobacco.tmisc.facilityCoordinate.desc')">
               <el-input type="textarea" v-bind:placeholder="$t('base.pleaseInput')"  v-model="formItem.desc"/>
           </el-form-item>
           <el-form-item>
               <el-button  v-show='isEdit' type="primary" style="float: right" @click="onSubmitClick('formValidate')">{{ $t('base.buttonSave') }} </el-button>
           </el-form-item>
     </el-form>
</template>
<script>
    import facilityCoordinateApi from '../../api/tmisc/api_facilityCoordinate';
    export default {
      props: ['item', 'isEdit', 'visible'],
      data () {
        return {
          formItem: {
            'layerId': '',
            'objectId': '',
            'groupId': '',
            'coord_id': 0,
            'longitude': 0,
            'latitude': 0,
            'altitude': 0,
            'angle': 0,
            'speed': 0,
            'desc': '',
          },
          ruleValidate: {
            code: [
              { required: true, message: '编码不能为空', trigger: 'blur' }
            ],
          }
        };
      },
      created() {
        this.load();
      },
      methods: {
        load() {
          this.formItem = JSON.parse(JSON.stringify(this.item));
        },
        onSubmitClick(name) {
          this.$refs[name].validate((valid) => {//进行前端检验
            if (valid) {
              Promise.all([facilityCoordinateApi.updateFacilityCoordinate(this.item.id, this.formItem)])
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
