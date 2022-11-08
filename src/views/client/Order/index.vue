<template>
  <div class="tab_container">
    <div class="tab_wrap">
      <span class="order" :class="bill==='all'?'active':''" @click="changeBill('all')">全部订单</span>
      <span class="order" :class="bill==='noPay'?'active':''" @click="changeBill('noPay')">未支付订单</span>
      <span class="order" :class="bill==='paid'?'active':''" @click="changeBill('paid')">已支付订单</span>
      <span class="order" :class="bill==='collect'?'active':''" @click="changeBill('collect')">收藏订单</span>
    </div>
    <div class="find_order_wrap">
      <el-button plain>查找订单 <i class="iconfont icon-chazhao"></i></el-button>
    </div>
  </div>
  <div v-if="orderList.length > 0" class="order_container">
    <div class="order_card" v-for="(obj, i) in orderList" :key="i">
      <order-card :obj="obj" :index="i" @payHandle="payHandle" @cancelPayHandle="cancelPayHandle"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Ref, ref, h } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import OrderCard from './OrderCard.vue'

const { OrderApi } = require('@/api/OrderApi')
const { SecKillApi } = require('@/api/SecKillApi')
const { useStore } = require('vuex')
const { Http } = require('@/tool/WebEnum')

export default {
  name: 'ProductOrder',
  components: { OrderCard },
  setup () {
    const bill = ref('all')

    function changeBill (type: string) {
      bill.value = type
      getList(type)
    }

    const store = useStore()
    const orderApi = new OrderApi()
    const secKillApi = new SecKillApi()
    // 订单列表
    const orderList: Ref<any[]> = ref([])
    const getList = (bill: string) => {
      orderList.value.length = 0
      orderApi.setData({ token: store.state.token }).personList().then((res: any) => {
        if (res.status === Http.SUCCESS) {
          // 获取产品信息
          res.data.forEach((item: any) => {
            let flag = false
            switch (bill) {
              case 'all':
                flag = true
                break
              case 'noPay':
                if (item.status === 0) {
                  flag = true
                }
                break
              case 'paid':
                if (item.status === 2) {
                  flag = true
                }
                break
              case 'collect':
            }
            if (flag) {
              secKillApi.setData(item.seckillId).secKillGet().then((p: any) => {
                item.secKillInfo = p.data
                orderList.value.push(item)
              })
            }
          })
        } else {
          ElMessage.success(res.data.errMsg)
        }
      }).catch((err: any) => {
        ElMessage.error(err)
      })
    }
    getList(bill.value)

    // 支付
    const payHandle = (orderId: any, order: any, index: number) => {
      const data = {
        // accountId: store.state.userInfo.id,
        accountId: '100029',
        orderId: orderId,
        password: '',
        token: store.state.token
      }
      ElMessageBox.prompt(h('p', { style: 'color: #909399;text-align: right;' }, '密码：'), '支付', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputType: 'password',
        inputPattern: /\w/,
        inputErrorMessage: '请输入密码',
      }).then(({ value }) => {
        data.password = value
        orderApi.setData(data).orderPay().then((res: any) => {
          if (res.status === Http.SUCCESS) {
            order.status = res.data.status
            order.payTime = res.data.payTime
            orderList.value.splice(index, 1)
          } else {
            ElMessage.success(res.data.errMsg)
          }
        }).catch((err: any) => {
          ElMessage.error(err)
        })
      })
    }
    // 取消订单
    const cancelPayHandle = (orderId: any, index: number) => {
      const data = {
        orderId: orderId,
        token: store.state.token
      }
      orderApi.setData(data).cancelOrder().then((res: any) => {
        if (res.status === Http.SUCCESS) {
          orderList.value.splice(index, 1)
        } else {
          ElMessage.success(res.data.errMsg)
        }
      }).catch((err: any) => {
        ElMessage.error(err)
      })
    }

    return {
      orderList,
      bill,
      changeBill,
      payHandle,
      cancelPayHandle
    }
  }
}
</script>
<style>
.el-message-box__content {
  display: grid;
  align-items: center;
  grid-template-columns: 80px calc(100% - 120px);
}
</style>
<style scoped lang="scss">
.tab_container {
  display: flex;
  justify-content: space-between;
  padding: 25px 0;

  &::after {
    content: "";
    width: 100%;
    height: 5px;
    position: absolute;
    left: 0;
    top: 80px;
    //background-image: linear-gradient(var(--el-color-primary-light-5), #fff);
  }

  .tab_wrap {
    .order {
      display: inline-block;
      font-size: 18px;
      color: #ff6000;
      padding: 5px;
      margin: 0 20px;
      cursor: pointer;
      position: relative;

      &::after {
        content: "";
        width: 2px;
        height: 12px;
        background-color: #ff6000;
        position: absolute;
        top: 8px;
        right: -15px;
      }

      &:last-child::after {
        content: normal;
      }
    }

    .active {
      color: #000;
      font-size: 20px;

      &::after {
        top: 10px;
      }
    }
  }

  .find_order_wrap {
    button {
      border: 1px solid #ff6000;
      //color: var(--el-color-primary-light-4);

      i {
        margin-left: 25px;
        font-size: 14px;
      }
    }
  }
}

.order_container {
  padding: 20px 0;

  .order_card {
    height: 220px;
    margin: 15px 0;
    background-color: #fff;
    box-shadow: 0 0 12px 0 var(--border-color-yellow);
  }
}
</style>
