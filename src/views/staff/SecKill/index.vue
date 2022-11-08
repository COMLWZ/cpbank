<template>
  <div id="sk-box">
    <el-row :gutter="20">
      <el-col :span="18" class="box-left">
        <!-- 银行产品 -->
        <el-card class="sk-public" :body-style="{ padding: '30px' }" style="margin-bottom: 20px">
          <h2 style="margin-bottom: 20px">银行产品</h2>
          <div class="functions">
            <div>
              <el-input size="small" style="width: 200px" placeholder="商品关键字">
                <template #suffix>
                  <div style="font-size: 20px"><i class="iconfont icon-search"></i></div>
                </template>
              </el-input>
            </div>
            <div>
              <el-button type="primary" size="small" @click="productSettingDialogVisible=true">添加商品</el-button>
            </div>
          </div>
          <expand-table :table-data="productList" :table-column="productTableColumn">
            <template #expand="scope">
              <el-row :gutter="40" style="margin: 0 40px" class="table-expand">
                <el-col :span="12">
                  <p>产品名称: {{ scope.row.productName }}</p>
                  <p>年化利率（%）: {{ scope.row.rate }}</p>
                  <p>单日限额（元）: {{ scope.row.dayLimit }}</p>
                  <p>单人限额（元）: {{ scope.row.personLimit }}</p>
                  <p>产品期限（天）: {{ scope.row.deadline }}</p>
                  <p>起存金额（元）: {{ scope.row.startAmount }}</p>
                  <p>产品类型: {{ scope.row.flag === 1 ? '秒杀商品' : '普通商品' }}</p>
                  <p>风险等级: {{ scope.row.risk }}</p>
                </el-col>
                <el-col :span="12">
                  <p>产品销量: {{ scope.row.sales }}</p>
                  <p>产品库存: {{ scope.row.stock }}</p>
                  <p>结息方式: {{ scope.row.method }}</p>
                  <p>起息日(精确到天): {{ scope.row.valueDate }}</p>
                  <p>到期日(精确到天): {{ scope.row.endDate }}</p>
                  <p>递增金额（元）: {{ scope.row.increAmount }}</p>
                  <p>产品描述: {{ scope.row.description }}</p>
                </el-col>
                <el-col style="text-align: right">
                  <el-button type="info" size="small" @click="editProductHandle(scope.$index, scope.row)">设置</el-button>
                  <el-button size="small" type="danger"
                             @click="deleteProductHandle(scope.$index, scope.row)">删除
                  </el-button>
                </el-col>
              </el-row>
            </template>
            <template #flag="scope">
              <span>{{ scope.row.flag === 1 ? '秒杀商品' : '普通商品' }}</span>
            </template>
          </expand-table>
          <!-- 分页 -->
          <div style="display: flex;justify-content: flex-end; margin-top: 10px">
            <el-pagination small background layout="prev, pager, next" @current-change="productCurrentChangeHandle"
                           :total="productTotalList.length" class="mt-4"/>
          </div>
        </el-card>
        <!-- 发起秒杀-->
        <el-card class="sk-public" :body-style="{ padding: '30px' }">
          <h2 style="margin-bottom: 20px">秒杀活动</h2>
          <div class="functions">
            <div>
              <el-input size="small" style="width: 200px" placeholder="活动关键字">
                <template #suffix>
                  <div style="font-size: 20px"><i class="iconfont icon-search"></i></div>
                </template>
              </el-input>
            </div>
            <div>
              <el-button type="primary" size="small" @click="secKillSettingDialogVisible=true">添加活动</el-button>
            </div>
          </div>
          <expand-table :expand="false" :table-data="secKillList" :table-column="secKillTableColumn"></expand-table>
          <!-- 分页 -->
          <div style="display: flex;justify-content: flex-end; margin-top: 10px">
            <el-pagination small background layout="prev, pager, next"  @current-change="secKillCurrentChangeHandle"
                           :total="secKillTotalList.length" class="mt-4"/>
          </div>
        </el-card>
        <!-- 流量监控-->
        <el-card class="netraffic" :body-style="{ padding: '30px' }">
          <h2>流量监控</h2>
          <my-echarts :options="cpOptions" e-height="300px"/>
          <my-echarts :options="uOptions" e-height="300px"/>
        </el-card>
        <!-- 秒杀用户 -->
        <el-card class="sk-users" v-if="false" :body-style="{ padding: '30px' }">
          <h2>秒杀用户</h2>
          <ul>
            <li>
              <div>
                <el-image style="width: 50px; height: 50px" fit="cover"
                          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
                <div class="userinfo">
                  <h4>用户名：阿斯顿飞</h4>
                  <p>秒杀日期：2022-03-23</p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <el-image style="width: 50px; height: 50px" fit="cover"
                          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
                <div class="userinfo">
                  <h4>用户名：阿斯顿飞</h4>
                  <p>秒杀日期：2022-03-23</p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <el-image style="width: 50px; height: 50px" fit="cover"
                          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
                <div class="userinfo">
                  <h4>用户名：阿斯顿飞</h4>
                  <p>秒杀日期：2022-03-23</p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <el-image style="width: 50px; height: 50px" fit="cover"
                          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
                <div class="userinfo">
                  <h4>用户名：阿斯顿飞</h4>
                  <p>秒杀日期：2022-03-23</p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <el-image style="width: 50px; height: 50px" fit="cover"
                          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
                <div class="userinfo">
                  <h4>用户名：阿斯顿飞</h4>
                  <p>秒杀日期：2022-03-23</p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <el-image style="width: 50px; height: 50px" fit="cover"
                          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
                <div class="userinfo">
                  <h4>用户名：阿斯顿飞</h4>
                  <p>秒杀日期：2022-03-23</p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <el-image style="width: 50px; height: 50px" fit="cover"
                          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
                <div class="userinfo">
                  <h4>用户名：阿斯顿飞</h4>
                  <p>秒杀日期：2022-03-23</p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <el-image style="width: 50px; height: 50px" fit="cover"
                          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
                <div class="userinfo">
                  <h4>用户名：阿斯顿飞</h4>
                  <p>秒杀日期：2022-03-23</p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <el-image style="width: 50px; height: 50px" fit="cover"
                          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
                <div class="userinfo">
                  <h4>用户名：阿斯顿飞</h4>
                  <p>秒杀日期：2022-03-23</p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <el-image style="width: 50px; height: 50px" fit="cover"
                          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
                <div class="userinfo">
                  <h4>用户名：阿斯顿飞</h4>
                  <p>秒杀日期：2022-03-23</p>
                </div>
              </div>
            </li>
            <li>
              <div>
                <el-image style="width: 50px; height: 50px" fit="cover"
                          src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"/>
                <div class="userinfo">
                  <h4>用户名：阿斯顿飞</h4>
                  <p>秒杀日期：2022-03-23</p>
                </div>
              </div>
            </li>
          </ul>
        </el-card>
      </el-col>
      <!-- 右边 -->
      <el-col :span="6" class="box-right">
        <el-card :body-style="{ padding: '0' }">
          <!-- 秒杀进行中 -->
          <div class="sk-underway">
            <h3>秒杀进行中</h3>
            <ul>
              <li class="hot">
                <div>
                  <div class="sn">1</div>
                  <div class="cp-info">
                    <p class="cp-title">华宝汽油美元汇阿道夫是短发</p>
                    <p class="cp-num">秒杀数量：13.5（万份）</p>
                  </div>
                </div>
              </li>
              <li class="hot">
                <div>
                  <div class="sn">2</div>
                  <div class="cp-info">
                    <p class="cp-title">华宝汽油美元汇阿道夫是短发</p>
                    <p class="cp-num">秒杀数量：13.5（万份）</p>
                  </div>
                </div>
              </li>
              <li class="hot">
                <div>
                  <div class="sn">3</div>
                  <div class="cp-info">
                    <p class="cp-title">华宝汽油美元汇阿道夫是短发</p>
                    <p class="cp-num">秒杀数量：13.5（万份）</p>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <div class="sn-dot"></div>
                  <p class="cp-name">华宝汽油美元汇阿道夫是短发</p>
                </div>
              </li>
              <li>
                <div>
                  <div class="sn-dot"></div>
                  <p class="cp-name">华宝汽油美元汇阿道夫是短发</p>
                </div>
              </li>
              <li>
                <div>
                  <div class="sn-dot"></div>
                  <p class="cp-name">华宝汽油美元汇阿道夫是短发</p>
                </div>
              </li>
              <li>
                <div>
                  <div class="sn-dot"></div>
                  <p class="cp-name">华宝汽油美元汇阿道夫是短发</p>
                </div>
              </li>
              <li>
                <div>
                  <div class="sn-dot"></div>
                  <p class="cp-name">华宝汽油美元汇阿道夫是短发</p>
                </div>
              </li>
            </ul>
          </div>
          <!-- 秒杀已结束 -->
          <div class="sk-finished">
            <h3>秒杀已结束</h3>
            <ul>
              <li class="hot">
                <div>
                  <div class="sn">1</div>
                  <div class="cp-info">
                    <p class="cp-title">华宝汽油美元汇阿道夫是短发</p>
                    <p class="cp-num">秒杀数量：13.5（万份）</p>
                  </div>
                </div>
              </li>
              <li class="hot">
                <div>
                  <div class="sn">2</div>
                  <div class="cp-info">
                    <p class="cp-title">华宝汽油美元汇阿道夫是短发</p>
                    <p class="cp-num">秒杀数量：13.5（万份）</p>
                  </div>
                </div>
              </li>
              <li class="hot">
                <div>
                  <div class="sn">3</div>
                  <div class="cp-info">
                    <p class="cp-title">华宝汽油美元汇阿道夫是短发</p>
                    <p class="cp-num">秒杀数量：13.5（万份）</p>
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <div class="sn-dot"></div>
                  <p class="cp-name">华宝汽油美元汇阿道夫是短发</p>
                </div>
              </li>
              <li>
                <div>
                  <div class="sn-dot"></div>
                  <p class="cp-name">华宝汽油美元汇阿道夫是短发</p>
                </div>
              </li>
              <li>
                <div>
                  <div class="sn-dot"></div>
                  <p class="cp-name">华宝汽油美元汇阿道夫是短发</p>
                </div>
              </li>
              <li>
                <div>
                  <div class="sn-dot"></div>
                  <p class="cp-name">华宝汽油美元汇阿道夫是短发</p>
                </div>
              </li>
              <li>
                <div>
                  <div class="sn-dot"></div>
                  <p class="cp-name">华宝汽油美元汇阿道夫是短发</p>
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 产品设置 -->
    <el-dialog v-model="productSettingDialogVisible" title="产品设置" top="10%" width="50%"
               :close-on-click-modal="false" destroy-on-close @close="formAssign(productForm, null)">
      <el-form ref="productFormRef" :model="productForm" status-icon :rules="productFormRules" label-width="160px">
        <el-row :gutter="40" style="margin-right: 20px">
          <el-col :span="12">
            <el-form-item label="产品名称：" prop="productName">
              <el-input v-model="productForm.productName" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="产品库存：" prop="stock">
              <el-input v-model="productForm.stock" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="产品销量：">
              <el-input v-model="productForm.sales" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="起存金额(元)：" prop="startAmount">
              <el-input v-model="productForm.startAmount" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="递增金额(元)：">
              <el-input v-model="productForm.increAmount" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="单日限额(元)：">
              <el-input v-model="productForm.dayLimit" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="单人限额(元)：">
              <el-input v-model="productForm.personLimit" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="年化利率(%)：" prop="rate">
              <el-input v-model="productForm.rate" autocomplete="off"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="风险等级：">
              <el-select v-model="productForm.risk" clearable>
                <el-option label="低" :value="0"></el-option>
                <el-option label="中" :value="1"></el-option>
                <el-option label="高" :value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品类型：" prop="flag">
              <el-select v-model="productForm.flag" clearable>
                <el-option label="普通商品" :value="0"></el-option>
                <el-option label="秒杀商品" :value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="结息方式：">
              <el-input v-model="productForm.method" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="产品期限(天)：">
              <el-input v-model="productForm.deadline" autocomplete="off"/>
            </el-form-item>
            <el-form-item label="起息日：">
              <el-date-picker v-model="productForm.valueDate" type="date" value-format="YYYY-MM-DD"/>
            </el-form-item>
            <el-form-item label="到期日：">
              <el-date-picker v-model="productForm.endDate" type="date"  value-format="YYYY-MM-DD"/>
            </el-form-item>
            <el-form-item label="产品描述：" prop="description">
              <el-input type="textarea" v-model="productForm.description" resize="none"
                        :autosize="{ minRows: 4, maxRows: 4 }" autocomplete="off"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button @click="productFormSubmit(productFormRef)">提交</el-button>
          <el-button @click="resetForm(productFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 活动设置 -->
    <el-dialog v-model="secKillSettingDialogVisible" title="活动设置" top="10%" width="30%"
               :close-on-click-modal="false" destroy-on-close @close="formAssign(secKillForm, null)">
      <el-form ref="secKillFormRef" :model="secKillForm" status-icon :rules="secKillFormRules"
               label-width="120px" style="margin-right: 20px">
        <el-form-item label="活动名称：" prop="name">
          <el-input v-model="secKillForm.name" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="活动产品：" prop="productId">
          <el-select v-model="secKillForm.productId" clearable>
            <el-option v-for="product in productTotalList" :key="product.id"
                       :label="product.productName" :value="product.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="秒杀价格：" prop="seckillPrice">
          <el-input v-model="secKillForm.seckillPrice" autocomplete="off"/>
        </el-form-item>
        <el-form-item label="开始时间：" prop="startTime">
          <el-date-picker v-model="secKillForm.startTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endTime">
          <el-date-picker v-model="secKillForm.endTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss"/>
        </el-form-item>
        <el-form-item label="活动描述：" prop="info">
          <el-input type="textarea" v-model="secKillForm.info" resize="none"
                    :autosize="{ minRows: 4, maxRows: 4 }" autocomplete="off"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="secKillFormSubmit(secKillFormRef)">提交</el-button>
          <el-button @click="resetForm(secKillFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import MyEcharts from '@/components/myEcharts/echarts.vue'
import { ElMessage, FormInstance } from 'element-plus'
import ExpandTable from '@/views/staff/SecKill/ExpandTable.vue'
import { toRefs } from 'vue'

const {
  ref,
  reactive
} = require('vue')
const { graphic } = require('echarts')
// const { dateToString } = require('@/tool/util')
const { ProductApi } = require('@/api/ProductApi')
const { SecKillApi } = require('@/api/SecKillApi')
const { Http } = require('@/tool/WebEnum')
const { useStore } = require('vuex')

export default {
  name: 'homeV',
  components: {
    MyEcharts,
    ExpandTable
  },
  setup () {
    const store = useStore()
    // form字段赋值
    const formAssign = (product: any, row: any) => {
      let keys
      if (row) {
        keys = Object.keys(row)
        keys.forEach((item) => {
          product[item] = row[item]
        })
      } else {
        keys = Object.keys(product)
        keys.forEach((item) => {
          product[item] = ''
        })
      }
    }
    // 重置
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }
    // === 银行产品 start ===========================================================================
    const productApi = new ProductApi()
    const productData = reactive({
      productTotalList: [],
      productList: [], // table显示的数据
      productTableColumn: [
        {
          label: '名称',
          prop: 'productName'
        },
        {
          label: '年化利率（%）',
          prop: 'rate'
        },
        {
          label: '库存',
          prop: 'stock'
        },
        {
          label: '销量',
          prop: 'sales'
        },
        {
          label: '起存金额（元）',
          prop: 'startAmount'
        },
        {
          label: '类型',
          prop: 'flag',
          slot: 'flag'
        }],
      // 产品设置模态框的显示状态
      productSettingDialogVisible: false,
      // form字段
      productForm: {
        dayLimit: '', // 单日限额（元）
        deadline: '', // 产品期限（天）
        description: '', //  产品描述
        endDate: '', //  到期日(精确到天)
        flag: '', //   0为普通商品，1为秒杀商品
        increAmount: '', //  递增金额（元）
        method: '', //  结息方式
        personLimit: '', //  单人限额（元）
        productName: '', //   产品名称
        rate: '', //   年化利率（%）
        risk: '', //  风险等级
        sales: '', //  产品销量
        startAmount: '', //   起存金额（元）
        stock: '', //   库存
        valueDate: '', //  起息日(精确到天)
      },
      // form验证
      productFormRules: {
        productName: [{
          required: true,
          message: '请输入产品名称',
          trigger: 'blur'
        }],
        stock: [{
          required: true,
          message: '请输入产品库存',
          trigger: 'blur'
        }],
        startAmount: [{
          required: true,
          message: '请输入起存金额',
          trigger: 'blur'
        }],
        rate: [{
          required: true,
          message: '请输入年化利率',
          trigger: 'blur'
        }],
        flag: [{
          required: true,
          message: '请选择产品类型',
          trigger: 'change'
        }],
        description: [{
          required: true,
          message: '请输入产品描述',
          trigger: 'blur'
        }]
      },
      pCurrentPage: 1,
    })
    // form实例
    const productFormRef: FormInstance = ref(null)

    // 银行产品列表
    productApi.productList().then((res: any) => {
      if (res.status === Http.SUCCESS) {
        productData.productTotalList = res.data.reverse()
        productCurrentChangeHandle(1)
      } else {
        ElMessage.error(res.data.errMsg)
      }
    }).catch((err: any) => {
      ElMessage.error(err)
    })
    // 分页
    const productCurrentChangeHandle = (page: number) => {
      productData.pCurrentPage = page
      const start = (page - 1) * 10
      productData.productList = productData.productTotalList.slice(start, start + 10)
    }
    // 设置
    const editProductHandle = (index: any, row: any) => {
      formAssign(productData.productForm, row)
      productData.productSettingDialogVisible = true
    }
    // 删除
    const deleteProductHandle = (index: any, row: any) => {
      ElMessage.success('删除 ' + index + '， 名称: ' + row.productName)
    }
    // 提交
    const productFormSubmit = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          if (productData.productForm.id) {
            ElMessage.success('设置成功！')
            // 关闭窗口
            productData.productSettingDialogVisible = false
          } else {
            productApi.setData(productData.productForm).productCreate().then((res: any) => {
              if (res.status === Http.SUCCESS) {
                // 添加到list的头部
                productData.productTotalList.unshift(Object.assign({}, productData.productForm))
                productCurrentChangeHandle(productData.pCurrentPage)
                ElMessage.success('添加成功！')
                // 关闭窗口
                productData.productSettingDialogVisible = false
              } else {
                ElMessage.error(res.data.errMsg)
              }
            }).catch((err: any) => {
              ElMessage.error(err)
            })
          }
        }
      })
    }
    // === end ==================================================================================

    // === 秒杀活动 start ========================================================================
    const secKillApi = new SecKillApi()
    const secKillData = reactive({
      secKillTotalList: [],
      secKillList: [], // table显示的数据
      secKillTableColumn: [
        {
          label: '名称',
          prop: 'name'
        },
        {
          label: '秒杀价格',
          prop: 'seckillPrice'
        },
        {
          label: '开始时间',
          prop: 'startTime'
        },
        {
          label: '结束时间',
          prop: 'endTime'
        },
        {
          label: '活动描述',
          prop: 'info'
        }],
      // 产品设置模态框的显示状态
      secKillSettingDialogVisible: false,
      // form字段
      secKillForm: {
        endTime: '', // 秒杀结束时间
        info: '', // 秒杀活动描述
        managerId: store.state.userInfo.id, // 管理员id
        name: '', // 秒杀活动名称
        productId: '', // 产品id
        seckillPrice: '', // 秒杀价格
        startTime: '', // 秒杀开始时间
        token: store.state.token, // 已登录管理员唯一id
      },
      // form验证
      secKillFormRules: {
        endTime: [{
          required: true,
          message: '请选择结束时间',
          trigger: 'blur'
        }],
        info: [{
          required: true,
          message: '请输入活动描述',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        }],
        seckillPrice: [{
          required: true,
          message: '请输入活动价格',
          trigger: 'blur'
        }],
        startTime: [{
          required: true,
          message: '请选择开始时间',
          trigger: 'change'
        }],
        productId: [{
          required: true,
          message: '请选择活动产品',
          trigger: 'change'
        }]
      },
      sCurrentPage: 1,
    })
    // form实例
    const secKillFormRef: FormInstance = ref(null)
    // 秒杀活动列表
    secKillApi.secKillList().then((res: any) => {
      if (res.status === Http.SUCCESS) {
        secKillData.secKillTotalList = res.data.reverse()
        secKillCurrentChangeHandle(1)
      } else {
        ElMessage.error(res.data.errMsg)
      }
    }).catch((err: any) => {
      ElMessage.error(err)
    })
    // 分页
    const secKillCurrentChangeHandle = (page: number) => {
      secKillData.sCurrentPage = page
      const start = (page - 1) * 10
      secKillData.secKillList = secKillData.secKillTotalList.slice(start, start + 10)
    }
    // 设置
    const editSecKillHandle = (index: any, row: any) => {
      formAssign(secKillData.secKillForm, row)
      secKillData.secKillSettingDialogVisible = true
    }
    // 删除
    const deleteSecKillHandle = (index: any, row: any) => {
      ElMessage.success('删除 ' + index + '， 名称: ' + row.name)
    }
    // 提交
    const secKillFormSubmit = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          if (secKillData.secKillForm.id) {
            ElMessage.success('设置成功！')
            // 关闭窗口
            secKillData.secKillSettingDialogVisible = false
          } else {
            secKillApi.setData(secKillData.secKillForm).secKillPublish().then((res: any) => {
              if (res.status === Http.SUCCESS) {
                // 添加到list的头部
                secKillData.secKillTotalList.unshift(Object.assign({}, secKillData.secKillForm))
                secKillCurrentChangeHandle(secKillData.sCurrentPage)
                ElMessage.success('添加成功！')
                // 关闭窗口
                secKillData.secKillSettingDialogVisible = false
              } else {
                ElMessage.error(res.data.errMsg)
              }
            }).catch((err: any) => {
              ElMessage.error(err)
            })
          }
        }
      })
    }

    // === end ==================================================================================

    // 产品图表配置
    const cpOptions = reactive({
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      title: {
        text: '', // 标题
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: { // 上方标志
        data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'],
        type: 'scroll',
        left: 0,
        top: 25
      },
      toolbox: {
        showTitle: false,
        feature: {
          saveAsImage: {
            title: '导出',
            excludeComponents: ['toolbox']
          }
        },
        tooltip: {
          show: true,
          formatter: function (param: { title: never }) {
            // return '<div>' + param.title + '</div>'; // 自定义的 DOM 结构
            return param.title
          },
          backgroundColor: '#fff',
          textStyle: {
            fontSize: 12
          }
        },
        right: 0
      },
      grid: { // 图表网格位置
        left: 10,
        right: 10,
        bottom: 0,
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Line 1',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
          name: 'Line 2',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(0, 221, 255)'
              },
              {
                offset: 1,
                color: 'rgb(77, 119, 255)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 282, 111, 234, 220, 340, 310]
        },
        {
          name: 'Line 3',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 132, 201, 334, 190, 130, 220]
        },
        {
          name: 'Line 4',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 0, 135)'
              },
              {
                offset: 1,
                color: 'rgb(135, 0, 157)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 402, 231, 134, 190, 230, 120]
        },
        {
          name: 'Line 5',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 191, 0)'
              },
              {
                offset: 1,
                color: 'rgb(224, 62, 76)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 302, 181, 234, 210, 290, 150]
        }
      ]
    })
    // 用户图表配置
    const uOptions = reactive({
      color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
      title: {
        text: '', // 标题
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      legend: { // 上方标志
        data: ['Line 1', 'Line 2', 'Line 3', 'Line 4', 'Line 5'],
        type: 'scroll',
        left: 0,
        top: 25
      },
      toolbox: {
        showTitle: false,
        feature: {
          saveAsImage: {
            title: '导出',
            excludeComponents: ['toolbox']
          }
        },
        tooltip: {
          show: true,
          formatter: function (param: { title: never }) {
            // return '<div>' + param.title + '</div>'; // 自定义的 DOM 结构
            return param.title
          },
          backgroundColor: '#fff',
          textStyle: {
            fontSize: 12
          }
        },
        right: 0
      },
      grid: { // 图表网格位置
        left: 10,
        right: 10,
        bottom: 0,
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Line 1',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(128, 255, 165)'
              },
              {
                offset: 1,
                color: 'rgb(1, 191, 236)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [140, 232, 101, 264, 90, 340, 250]
        },
        {
          name: 'Line 2',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(0, 221, 255)'
              },
              {
                offset: 1,
                color: 'rgb(77, 119, 255)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 282, 111, 234, 220, 340, 310]
        },
        {
          name: 'Line 3',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(55, 162, 255)'
              },
              {
                offset: 1,
                color: 'rgb(116, 21, 219)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 132, 201, 334, 190, 130, 220]
        },
        {
          name: 'Line 4',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 0, 135)'
              },
              {
                offset: 1,
                color: 'rgb(135, 0, 157)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 402, 231, 134, 190, 230, 120]
        },
        {
          name: 'Line 5',
          type: 'line',
          stack: 'Total',
          smooth: true,
          lineStyle: {
            width: 0
          },
          showSymbol: false,
          label: {
            show: true,
            position: 'top'
          },
          areaStyle: {
            opacity: 0.8,
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgb(255, 191, 0)'
              },
              {
                offset: 1,
                color: 'rgb(224, 62, 76)'
              }
            ])
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 302, 181, 234, 210, 290, 150]
        }
      ]
    })

    return {
      formAssign,
      resetForm,

      ...toRefs(productData),
      productFormRef,
      productCurrentChangeHandle,
      editProductHandle,
      deleteProductHandle,
      productFormSubmit,

      ...toRefs(secKillData),
      secKillFormRef,
      secKillCurrentChangeHandle,
      editSecKillHandle,
      deleteSecKillHandle,
      secKillFormSubmit,

      cpOptions,
      uOptions,
    }
  }
}
</script>

<style scoped lang="scss">
.el-calendar {
  --el-calendar-cell-width: 30px;
}

::v-deep .el-date-editor, .el-select {
  width: 100%;
}

.el-card {
  border: 0;
  border-radius: 10px;
}

#sk-box {
  > .el-row {
    margin-top: 40px;
  }

  h2 {
    font-size: 24px;
  }

  .box-left {
    .el-card.is-always-shadow {
      box-shadow: 0 0 12px 0 #ff600050;
    }
  }

  .box-right {
    .el-card.is-always-shadow {
      overflow: inherit;
      border: 0;
      box-shadow: none;
    }

    h3 {
      font-size: 20px;
    }
  }

  /* 秒杀已结束 */
  .sk-finished {
    padding: 30px 20px 20px;

    ul {
      margin-top: 10px;
    }

    li {
      padding: 10px 0;

      > div {
        display: flex;
        align-items: center;

        .sn-dot {
          width: 10px;
          height: 10px;
          margin-left: 15px;
          border-radius: 100%;
          background-color: #ffcfb2;
        }

        .cp-name {
          margin-left: 10px;
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }

      &.hot {
        border-bottom: 1px solid #aeaeae;

        .sn {
          width: 40px;
          height: 40px;
          color: #ffffff;
          text-align: center;
          line-height: 40px;
          border-radius: 6px;
          background-color: #ffcfb2;
        }

        .cp-info {
          height: 40px;
          width: calc(100% - 50px);
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .cp-title {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          .cp-num {
            font-size: 14px;
            color: #aeaeae;
          }
        }
      }
    }
  }

  /* 秒杀进行中 */
  .sk-underway {
    padding: 20px;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 0 12px 0 #ff600050;

    ul {
      margin-top: 10px;
    }

    li {
      padding: 10px 0;

      > div {
        display: flex;
        align-items: center;

        .sn-dot {
          width: 10px;
          height: 10px;
          margin-left: 15px;
          border-radius: 100%;
          background-color: #ff6000;
        }

        .cp-name {
          margin-left: 10px;
          font-size: 14px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      }

      &.hot {
        border-bottom: 1px solid #aeaeae;

        .sn {
          width: 40px;
          height: 40px;
          color: #ffffff;
          text-align: center;
          line-height: 40px;
          border-radius: 6px;
          background-color: #ff6000;
        }

        .cp-info {
          height: 40px;
          width: calc(100% - 50px);
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .cp-title {
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }

          .cp-num {
            font-size: 14px;
            color: #aeaeae;
          }
        }
      }
    }
  }

  /* 秒杀用户 */
  .sk-users {
    margin-top: 20px;

    ul {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
    }

    li {
      flex: 1 0 50%;
      margin-top: 15px;

      > div {
        display: flex;

        .el-image {
          border-radius: 8px;
        }

        .userinfo {
          margin-left: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          h4 {
            font-size: 16px;
          }

          p {
            font-size: 12px;
            color: #aeaeae;
          }
        }
      }
    }
  }

  /* 流量监控 */
  .netraffic {
    margin-top: 20px;
  }

  /* 发起秒杀 */
  .sk-public {
    //background-image: url("~@/assets/images/staff/sk1.png");
    //background-repeat: no-repeat;
    //background-size: contain;
    //background-position: bottom;

    .el-button--info {
      --el-button-bg-color: #ff6000;
      --el-button-border-color: #ff6000;
      --el-button-hover-bg-color: #ff8a44;
      --el-button-hover-border-color: #ff8a44;
      --el-button-active-bg-color: #ff6000;
      --el-button-active-border-color: #ff6000;
    }

    h3 {
      font-size: 20px;
      font-weight: normal;
      margin-top: 20px;

      span {
        font-size: 18px;
      }
    }

    .functions {
      padding-bottom: 8px;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
    }

    .table-expand {
      p {
        font-size: 13px;
        margin: 10px 0;
      }
    }
  }
}

</style>
