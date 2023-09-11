<template>
    <extra-container>
      <extra-block type="header" class="page-header">
        <extra-form :model="ruleForm" :gutter="24" :items="formItems" ref="ruleForm" :rules="rules" label-width="140px" label-suffix="：" label-position="top">
          <extra-form-item alias="propose-maintain-distance" label="二保里程参数" prop="completeMaintenance.maintainThresholdMileage">
            <el-input class="form-label-card-width" placeholder="请输入二保里程参数" v-model="ruleForm.completeMaintenance.maintainThresholdMileage"></el-input>
          </extra-form-item>
  
          <extra-form-item label="实际行驶里程" alias="total-mileage" prop="completeMaintenance.totalMileage" class="form-label-card-width">
            <el-row :gutter="24">
              <el-col :span="18">
                <el-input placeholder="请输入实际行驶里程" v-model="ruleForm.completeMaintenance.totalMileage"></el-input>
              </el-col>
              <el-col :span="6">
                <el-input placeholder="里程间隔" v-model="mileageGap" disabled></el-input>
              </el-col>
            </el-row>
          </extra-form-item>
          <extra-form-item label="本次二保里程" alias="present-maintain-mileage" prop="completeMaintenance.presentMaintainMileage">
            <el-input class="form-label-card-width" placeholder="请输入本次二保里程" v-model="ruleForm.completeMaintenance.presentMaintainMileage"></el-input>
          </extra-form-item>
  
          <extra-form-item label="本次二保日期" alias="present-maintain-time" prop="completeMaintenance.presentMaintainTime" :rules="{
          required: true,
          message: '请选择本次二保日期'
          }">
            <el-date-picker
              class="form-label-card-width"
              placeholder="请选择本次二保日期"
              v-model="ruleForm.completeMaintenance.presentMaintainTime"
              type="datetime"
              format="yyyy-MM-dd hh:mm:ss"
              valueFormat="yyyy-MM-dd hh:mm:ss"
            ></el-date-picker>
          </extra-form-item>
  
          <extra-form-item label="计划二保日期" alias="next-maintain-time" prop="completeMaintenance.nextMaintainTime" :rules="{
          required: true,
          message: '请选择计划二保日期'
          }">
            <el-date-picker
              class="form-label-card-width"
              placeholder="请选择计划二保日期"
              v-model="ruleForm.completeMaintenance.nextMaintainTime"
              type="datetime"
              format="yyyy-MM-dd hh:mm:ss"
              valueFormat="yyyy-MM-dd hh:mm:ss"
            ></el-date-picker>
          </extra-form-item>
  
          <extra-form-item
            label="二保合格单号"
            alias="maintain-qualified-number"
            prop="completeMaintenance.maintainQualifiedNumber"
            :rules="{
                  required: true,
                  message: '二保合格单号不能为空',
                }"
          >
            <el-input class="form-label-card-width" placeholder="请输入二保合格单号" v-model="ruleForm.completeMaintenance.maintainQualifiedNumber" clearable></el-input>
          </extra-form-item>
  
          <extra-form-item alias="maintain-dept" label="维护单位" prop="completeMaintenance.maintainDept" :rules="[{ required: true, message: '请选择维护单位' }]">
            <extra-select
              class="form-label-card-width"
              v-model="ruleForm.completeMaintenance.maintainDept"
              action="/api/base/dictItem/findByDictCode"
              :query="{
              dictCode: 'SECOND',
            }"
              :fields=" {
              label: 'itemText',
              value: 'itemKey',
            }"
              clearable
              filterable
            ></extra-select>
          </extra-form-item>
  
          <extra-form-item label="备注" alias="remark" prop="completeMaintenance.remark">
            <el-input class="form-label-card-width" placeholder="请输入备注" v-model="ruleForm.completeMaintenance.remark" clearable></el-input>
          </extra-form-item>
  
          <extra-form-item alias="line-name" label="线路名称" prop="guideBoard.lineId" :rules="[{ required: true, message: '请选择线路名称' }]">
            <extra-select
              class="form-label-card-width"
              v-model="ruleForm.guideBoard.lineId"
              action="/api/base/line/option"
              :fields=" {
              label: 'lineName',
              value: 'id',
            }"
              clearable
              filterable
              @change="selected"
            ></extra-select>
          </extra-form-item>
  
          <extra-form-item alias="departure" prop="guideBoard.departSiteId" label="发车站点" :rules="[{ required: true, message: '请选择始发站' }]">
            <el-select class="form-label-card-width" v-model="ruleForm.guideBoard.departSiteId" placeholder="请选择始发站" clearable filterable>
              <el-option v-for="item in siteOptions" :disabled="ruleForm.guideBoard.terminalSiteId == item.id" :key="item.id" :label="item.siteName" :value="item.id"></el-option>
            </el-select>
          </extra-form-item>
  
          <extra-form-item alias="stops" prop="guideBoard.transitSiteIdList" label="途经站点">
            <tz-select class="form-label-card-width" v-model="ruleForm.guideBoard.transitSiteIdList" placeholder="请选途经站点" clearable filterable multiple :multiple-all="true" :multiple-panel="true">
              <el-option
                v-for="item in siteOptions"
                :disabled="ruleForm.guideBoard.departSiteId == item.id || ruleForm.guideBoard.endSiteId == item.id || ruleForm.guideBoard.endSiteId == item.id"
                :key="item.id"
                :label="item.siteName"
                :value="item.id"
              ></el-option>
            </tz-select>
          </extra-form-item>
  
          <extra-form-item alias="terminal" prop="guideBoard.endSiteId" label="终点站点" :rules="[{ required: true, message: '请选择终点站' }]">
            <el-select class="form-label-card-width" v-model="ruleForm.guideBoard.endSiteId" placeholder="请选择终点站" clearable filterable>
              <el-option v-for="item in siteOptions" :disabled="ruleForm.guideBoard.departSiteId == item.id" :key="item.id" :label="item.siteName" :value="item.id"></el-option>
            </el-select>
          </extra-form-item>
  
          <extra-form-item alias="shuttle" label="班次" prop="guideBoard.dispatch">
            <el-input class="form-label-card-width" placeholder="请输入班次次序" v-model="ruleForm.guideBoard.dispatch"></el-input>
          </extra-form-item>
  
          <extra-form-item label="准驾车型" prop="drivingLicense.quasiDrivingType" alias="extra-driverType">
            <el-select v-model="ruleForm.drivingLicense.quasiDrivingType" placeholder="请选择" clearable class="form-label-card-width" filterable>
              <el-option v-for="(item, index) in quasiDrivingTypeOtpions" :key="item.itemKey + index" :label="item.itemText" :value="item.itemKey"></el-option>
            </el-select>
          </extra-form-item>
          <extra-form-item label="初次领证日期" prop="drivingLicense.firstGetDate" alias="extra-firstGetDate">
            <el-date-picker class="form-label-card-width" v-model="ruleForm.drivingLicense.firstGetDate" type="date" clearable placeholder="选择日期时间"></el-date-picker>
          </extra-form-item>
  
          <extra-form-item label="保险公司" prop="insurance.insuranceCompany" alias="extra-insuranceCompany">
            <el-select v-model="ruleForm.insurance.insuranceCompany" placeholder="请选择" clearable class="form-label-card-width" filterable>
              <el-option v-for="(item, index) in insuranceCompanyOptions" :key="index" :label="item.name" :value="item.factory"></el-option>
            </el-select>
          </extra-form-item>
  
          <extra-form-item label="凭证" alias="extra-upload">
            <extra-upload multiple v-model="ruleForm.certificatePicList" class="img-uploader" action="/fileData/file/uploadFile" accept="image/*" :foldable="true" width="185px" height="90px">
              <template v-if="ruleForm.certificatePicList.length == 0">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <br />
                  <em>点击上传</em>
                </div>
              </template>
              <img v-else :src="ruleForm.certificatePicList[0]" />
            </extra-upload>
          </extra-form-item>
        </extra-form>
      </extra-block>
    </extra-container>
</template>
<script>
  // const dialogComponent = {
  //     props: {
  //         editData: {},
  //     },
  
  //     data() {
  //         return {
  //             ruleForm: this.editData || {},
  //             formItems: [
  //                 {
  //                     component: 'ElInput',
  //                     label: '日期',
  //                     prop: 'date',
  //                     placeholder: '请输入日期',
  //                 },
  //                 {
  //                     component: 'ElInput',
  //                     label: '姓名',
  //                     prop: 'name',
  //                     placeholder: '请输入姓名',
  //                 },
  //                 {
  //                     component: 'ElInput',
  //                     label: '地址',
  //                     prop: 'address',
  //                     placeholder: '请输入地址',
  //                 }
  //             ]
  //         }
  //     },
  
  //     render(h) {
  //         return h('extra-form', {
  //             props: {
  //                 model: this.ruleForm,
  //                 items: this.formItems,
  //             }
  //         })
  //     },
  
  //     methods: {
  //         onCancel(done) {
  //         },
  
  //         onConfirm(done) {
  //             done()
  //         }
  //     }
  // }
  import listMixin from '@/mixins/list2'
  import common from '@/mixins/common'
  import formConfig from '@/mixins/formLicenseConfig'
  
  export default {
    mixins: [listMixin, common, formConfig],
    props: ['licenseOptions', 'upDateLicense', 'editData'],
    data() {
      return {
        ruleForm: {
          certificatePicList: [],
          completeMaintenance: {},
          drivingLicense: {},
          insurance: {},
          guideBoard: {},
          totalMileage: 0,
          presentMaintainMileage: 0,
        },
        quasiDrivingTypeOtpions: [], //准驾车型,
        insuranceCompanyOptions: [], //保险公司
        siteOptions: [],
        rules: {
          cerType: [
            {
              required: true,
              message: '请选择',
            },
          ],
  
          specialType: [
            {
              required: true,
              message: '请选择',
            },
          ],
          cerTypeName: [
            {
              required: true,
              message: '证件号不能为空',
            },
          ],
          daterange: [
            {
              required: true,
              message: '请选择有效时间',
            },
          ],
          'drivingLicense.quasiDrivingType': [
            {
              required: true,
              message: '请选择车型',
            },
          ],
          'insurance.insuranceCompany': [
            {
              required: true,
              message: '请选择保险公司',
            },
          ],
        },
        formItems: [
          {
            // component: 'ExtraSelect',
            span: 24,
            component: 'ElSelect',
            label: '证件类型',
            prop: 'cerType',
            clearable: true,
            filterable: true,
            disabled: this.editData ? true : false,
            // 数据映射
            fields: {
              label: 'name',
              value: 'code',
              disabled: 'disabled',
            },
            // rules: {
            //     required: true,
            // },
            // // 静态数据
            data: this.licenseOptions,
            on: {
              change: this.getFormConfig,
            },
            class: ['form-label-card-width'],
            /**
             * 远程获取数据方法
             *
             * @param {Function} callback
             * @return Promise
             *
             * 两种数据传递方式：手动 callback(data) 或者返回一个 promise
             */
            // remoteMethod: (callback) => {
            //   return this.$axios.post('/api/getList').then((res) => res.body)
            // },
          },
        ],
      }
    },
  
    computed: {
      mileageGap() {
        console.log(
          'mileageGap',
          this.ruleForm.completeMaintenance.totalMileage,
          this.ruleForm.completeMaintenance.presentMaintainMileage
        )
        if (
          !this.ruleForm.completeMaintenance.totalMileage ||
          !this.ruleForm.completeMaintenance.presentMaintainMileage
        )
          return ''
        return (
          (this.ruleForm.completeMaintenance.totalMileage || 0) / 1 -
          (this.ruleForm.completeMaintenance.presentMaintainMileage || 0) / 1
        )
      },
    },
    methods: {
      reset() {},
      /* 根据不同类型获取不同表单配置 */
      getFormConfig(value) {
        this.getOriginForm()
        if (value) {
          let checkformItems = this.formConfig.filter(
            (item) => item.type == value
          )
          if (checkformItems.length) {
            this.formItems.push(...checkformItems[0].formItems)
          }
          console.log(checkformItems, 'checkformItems')
          this.getOptions(value)
          // this.initFormValue(value)
        } else {
          this.ruleForm = {
            certificatePicList: [],
            drivingLicense: {},
            insurance: {},
            certificatePicList: [],
            completeMaintenance: {},
            guideBoard: {},
            totalMileage: 0,
            presentMaintainMileage: 0,
          }
        }
      },
      getOptions(value) {
        if (value == 1) {
          this.getInitOptions([
            {
              url: '/api/base/dictItem/findByDictCode',
              valueKey: 'quasiDrivingTypeOtpions',
              postData: {
                dictCode: 'PERMIT_VEHICLE_TYPE',
              },
            },
          ])
        } else if (value == 5) {
          this.getInitOptions([
            {
              url: '/api/openapi/paymentManage/queryInsuranceFactory',
              valueKey: 'insuranceCompanyOptions',
            },
          ])
        } else if (value == 10) {
          this.getInitOptions([
            {
              url: '/api/base/site/option',
              valueKey: 'siteOptions',
            },
          ])
        }
      },
      initFormValue(value) {
        let { drivingLicense, completeMaintenance, guideBoard, insurance } =
          this.ruleForm
        drivingLicense = drivingLicense || {}
        completeMaintenance = completeMaintenance || {}
        guideBoard = guideBoard || {}
        insurance = insurance || {}
        this.ruleForm = {
          ...this.ruleForm,
          drivingLicense,
          completeMaintenance,
          guideBoard,
          insurance,
        }
      },
      onCancel() {
        this.$extraDialog.close()
      },
      getOriginForm() {
        this.formItems = [this.formItems[0]]
      },
      onConfirm() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.ruleForm = {
              ...this.ruleForm,
              startTime: this.ruleForm.daterange && this.ruleForm.daterange[0],
              endTime: this.ruleForm.daterange && this.ruleForm.daterange[1],
            }
            if (
              this.ruleForm.completeMaintenance?.presentMaintainTime ||
              this.ruleForm.completeMaintenance?.nextMaintainTime
            ) {
              this.ruleForm.startTime =
                this.ruleForm.completeMaintenance.presentMaintainTime
              this.ruleForm.endTime =
                this.ruleForm.completeMaintenance.nextMaintainTime
            }
            this.editData
              ? this.upDateLicense('edit', this.ruleForm)
              : this.upDateLicense('add', this.ruleForm)
            this.onCancel()
          } else {
            return false
          }
        })
      },
      onCancel() {
        this.$extraDialog.close()
      },
      selected(lineId) {
        console.log(lineId)
        this.$axios
          .post('/api/base/line/queryLineTransitSite ', { lineId })
          .then(({ pubResponse, body }) => {
            if (pubResponse.code === '0000') {
              const tmpArr = body || []
              if(!tmpArr.length) return
              this.ruleForm.guideBoard.transitSiteIdList = tmpArr.filter(item => item.positionIdentify === 'TRANSIT').map(item => item.siteId)
              this.ruleForm.guideBoard.departSiteId = tmpArr.filter(item => item.positionIdentify === 'DEPARTURE')[0].siteId
              this.ruleForm.guideBoard.endSiteId = tmpArr.filter(item => item.positionIdentify === 'TERMINAL')[0].siteId
            } 
          })
      },
    },
    created() {},
    mounted() {
      this.getOriginForm()
      if (this.editData) {
        let { startTime, endTime, cerType } = this.editData
        this.getFormConfig(`${cerType}`)
        this.ruleForm = {
          ...this.ruleForm,
          ...this.editData,
          cerType: `${cerType}`,
          daterange: startTime ? [startTime, endTime] : [],
        }
        this.initFormValue()
      }
    },
  }
</script>
<style lang="scss" scoped>
  .img-uploader {
    width: 100%;
    height: 80px;
    display: block;
  
    /deep/.el-upload-dragger {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100% !important;
      border: 1px dashed #d9d9d9;
  
      i.el-icon-upload {
        font-size: 28px;
        color: #afb4c1;
        margin: 0;
        line-height: 1;
      }
    }
  
    .el-upload__text {
      color: #332e2e;
      font-size: 12px;
      line-height: 150%;
    }
  }
  
  .extra-upload .el-icon-upload {
    margin: 6px 0 2px;
  }
  
  .extra-upload.img-uploader img {
    height: 100%;
  }
  /deep/ label.el-form-item__label {
    max-width: 100%;
  }
  /deep/ .form-label-card-width {
    width: 100%;
  }
  /deep/ .el-select {
    width: 100% !important;
  }
</style>