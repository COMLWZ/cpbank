<template>
  <div class="sec_kill_activity_wrap">
    <!-- 活动大图 -->
    <router-link to="">
      <div class="seckill">
        <div class="count_wrap">
          <div class="envelope"></div>
          <!--          <img class="envelope" src="../../../assets/images/red_envelope_war.gif"/>-->
          <img class="limit" src="../../../assets/images/limit_sk.gif" width="1000"/>
          <img class="gold" src="../../../assets/images/gold.gif"/>
          <img class="fireworks" src="../../../assets/images/fireworks.gif"/>
        </div>
      </div>
    </router-link>
    <div class="activity_wrap">
      <h1 class="title">秒杀活动</h1>
      <div style="display: grid; justify-items: center;">
        <div class="menu_wrap">
          <div class="menu_item" :class="active_state === 1 ? 'active' : ''" @click="changeState(1)">
            LightNing秒杀
          </div>
          <div class="menu_item" :class="active_state === 0 ? 'active' : ''" @click="changeState(0)">
            已结束
          </div>
        </div>
      </div>
      <div class="activity_main" v-loading="activityMainLoading"
           element-loading-text="加载中..."
           element-loading-background="#fff5f1"
           :style="{overflow: activityMainLoading ? 'hidden' : ''}">
        <!-- 活动列表 -->
        <div v-if="productObj.length > 0">
          <el-input placeholder="输入关键字" style="width: 280px">
            <template #suffix>
              <div style="font-size: 20px"><i class="iconfont icon-search"></i></div>
            </template>
          </el-input>
          <div class="activity_card" v-for="obj in productObj" :key="obj">
            <activity-card :obj="obj" :btn-state="active_state" @secKillPanicBuying="buyingHandle"
                           @bookHandle="bookHandle"/>
          </div>
        </div>
        <div v-else class="pitera">
          <p>暂无活动</p>
        </div>
      </div>
    </div>
    <el-dialog v-model="buyDialogVisible" width="30%" :center="true">
      <div class="buy-dialog">
        <div class="buy-cut">
          <span :class="['wx', {'active': buyActive===0}]" @click="buyActive=0">微信支付</span>
          <span style="display:inline-block;width: 2px;height: 20px;background-color: #ffd8c0;margin: 0 20px"></span>
          <span :class="['zfb', {'active': buyActive===1}]" @click="buyActive=1">支付宝支付</span>
        </div>
        <p class="pay-money">支付金额：<span class="money">{{ formatMoney(10000) }}<span>元</span></span></p>
        <div class="qr-code">
          <img :src="verifyImgSrc"/>
          <!--          <qrcode-vue :value="qrcode" :size="200" level="H" background="#fff"/>-->
        </div>
        <el-button class="box-book-confirm-btn buy-dialog-btn" type="primary" @click="buyDialogVisible=false">取消支付
        </el-button>
      </div>
    </el-dialog>
    <el-dialog v-model="verifyDialogVisible" width="400px" :center="true"
               :before-close="(done)=>{verifyObj.verifyCode='';done()}">
      <div v-loading="verifyImgLoading" style="padding: 30px;display: flex;flex-direction: column;align-items: center">
        <img :src="verifyImgSrc" style="width:60%" @click="getVerifyImg"/>
        <el-input v-model="verifyObj.verifyCode" placeholder="请输入验证码"
                  style="width:60%;height: 30px;font-size: 16px;margin-top:40px"/>
      </div>
      <template #footer>
        <el-button class="box-book-cancel-btn" @click="verifyDialogVisible = false">取消</el-button>
        <el-button class="box-book-confirm-btn" :disabled="verifyImgLoading" @click="verifyHandle">验证</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { h, reactive, Ref, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import ActivityCard from './ActivityCard.vue'

const { useStore } = require('vuex')
const { SecKillApi } = require('@/api/SecKillApi')
const { Http } = require('@/tool/WebEnum')
const QrcodeVue = require('qrcode.vue')
const { OrderApi } = require('@/api/OrderApi')
const { formatMoney } = require('@/tool/util')

export default {
  name: 'clientSecKillV',
  components: {
    ActivityCard,
    // eslint-disable-next-line vue/no-unused-components
    QrcodeVue
  },
  setup () {
    const store = useStore()
    const secKillApi = new SecKillApi()
    const orderApi = new OrderApi()

    // 当前秒杀产品
    const productObj: Ref<any[]> = ref([])
    // loading
    const activityMainLoading = ref(true)

    // 活动状态 1未开始 0进行中 -1已结束
    const activeState = ref(1)
    let currentDate: number | Date
    let startTime
    let endTime

    const changeState = (num: number) => {
      activityMainLoading.value = true
      activeState.value = num

      productObj.value.length = 0
      currentDate = new Date()
      secKillCpList.value.forEach((item: any) => {
        startTime = new Date(item.startTime)
        endTime = new Date(item.endTime)
        switch (num) {
          case 1: // 进行中
            if (currentDate > startTime && currentDate < endTime) {
              item.activeState = 1
              productObj.value.push(item)
            } else if (currentDate < startTime) {
              item.activeState = -1
              productObj.value.push(item)
            }
            break
          case 0: // 已结束
            if (currentDate > endTime) {
              productObj.value.push(item)
            }
        }
      })
      setTimeout(() => {
        activityMainLoading.value = false
      }, 1000)
    }

    // 获取秒杀产品列表
    const secKillCpList = ref([])
    secKillApi.secKillList().then((res: any) => {
      if (res.status === Http.SUCCESS) {
        secKillCpList.value = res.data

        currentDate = new Date()
        secKillCpList.value.forEach((item: any) => {
          startTime = new Date(item.startTime)
          endTime = new Date(item.endTime)
          if (currentDate > startTime && currentDate < endTime) {
            item.activeState = 1
            productObj.value.push(item)
          } else if (currentDate < startTime) {
            item.activeState = -1
            productObj.value.push(item)
          }
          activityMainLoading.value = false
        })
      } else {
        ElMessage.error(res.data.errMsg)
      }
    }).catch((err: any) => {
      ElMessage.error(err)
    })

    // 秒杀抢购
    const buyDialogVisible = ref(false)
    const buyActive = ref(0)
    const qrcode = ref('')
    const verifyDialogVisible = ref(false)
    const verifyImgSrc = ref('')
    const verifyObj: any = reactive({
      amount: 1,
      path: '',
      verifyCode: '',
      productId: 0,
      seckillId: 0,
      seckillToken: '',
      token: store.state.token
    })
    const verifyImgLoading = ref(false)

    // 获取验证码JFIF
    const getVerifyImg = () => {
      verifyImgLoading.value = true
      orderApi.setData({ token: verifyObj.token }).generateVerifyCode().then((res: any) => {
        setTimeout(() => {
          verifyImgLoading.value = false
        }, 1000)
        const blob = new Blob([res])
        verifyImgSrc.value = window.URL.createObjectURL(blob)
      }).catch((err: any) => {
        ElMessage.error(err)
      })
    }

    const buyingHandle = (pId: number, sId: number) => {
      verifyDialogVisible.value = true
      getVerifyImg()
      verifyObj.productId = pId
      verifyObj.seckillId = sId
    }
    const verifyHandle = () => {
      if (verifyObj.verifyCode.length >= 4) {
        orderApi.setData(verifyObj).generateToken().then((res: any) => {
          if (res.status === Http.SUCCESS) {
            verifyDialogVisible.value = false
            // 获取活动动态地址
            secKillApi.setData(verifyObj).secKillGetPath().then((resp: any) => {
              if (resp.status === Http.SUCCESS) {
                // ElMessage.success('验证成功！')
                // 秒杀活动动态地址
                verifyObj.path = resp.data
                // 秒杀令牌
                verifyObj.seckillToken = res.data
                orderApi.setData(verifyObj).orderCreate().then((re: any) => {
                  if (re.status === Http.SUCCESS) {
                    ElMessage.success('下单成功！')
                  } else {
                    ElMessage.error(re.data.errMsg)
                  }
                }).catch((err: any) => {
                  ElMessage.error(err)
                })
              } else {
                ElMessage.error(resp.data.errMsg)
              }
            }).catch((err: any) => {
              ElMessage.error(err)
            })
          } else {
            ElMessage.error(res.data.errMsg)
            getVerifyImg()
          }
        }).catch((err: any) => {
          ElMessage.error(err)
          getVerifyImg()
        })
      }
    }

    // 立即预约
    const bookHandle = () => {
      ElMessageBox({
        title: '',
        message: h('div', { style: 'padding: 30px' }, [
          h('img', {
            src: require('../../../assets/images/succeed_round.png'),
            width: '100'
          }),
          h('h1', { style: 'color: black;font-size: 28px;margin-top: 30px;' }, '预约成功'),
          h('p', { style: 'color: #909399;margin-top: 10px;' }, '请留意短信提醒')
        ]),
        center: true,
        buttonSize: 'large',
        confirmButtonText: '确定',
        confirmButtonClass: 'box-book-confirm-btn',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            done()
          } else {
            done()
          }
        }
      }).then((action) => {
        console.log(action)
      })
    }

    // 抢购失败
    const buyFailureHandle = () => {
      ElMessageBox({
        title: '',
        message: h('div', { style: 'padding: 30px' }, [
          h('img', {
            src: require('../../../assets/images/buy_failure.png'),
            width: '100'
          }),
          h('h1', { style: 'color: black;font-size: 28px;margin-top: 30px;' }, '抢购失败'),
          h('p', { style: 'color: #909399;margin-top: 10px;' }, '很抱歉您不符合本次活动要求！'),
          h('p', { style: 'color: #909399;margin-top: 10px;' }, '无法参加秒杀活动，如有疑问请咨询电话客服。')
        ]),
        center: true,
        buttonSize: 'large',
        confirmButtonText: '重新抢购',
        confirmButtonClass: 'box-book-confirm-btn',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            done()
          } else {
            done()
          }
        }
      }).then((action) => {
        console.log(action)
      })
    }

    return {
      changeState,
      active_state: activeState,
      productObj,
      activityMainLoading,
      secKillCpList,
      buyDialogVisible,
      buyActive,
      qrcode,
      verifyDialogVisible,
      verifyImgSrc,
      verifyObj,
      verifyImgLoading,
      getVerifyImg,
      buyingHandle,
      verifyHandle,
      formatMoney,
      bookHandle,
      buyFailureHandle
    }
  }
}
</script>

<style scoped lang="scss">
.sec_kill_activity_wrap {
  .seckill {
    width: 100%;
    height: 28vw;
    background-image: url("~@/assets/images/banner3.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
    top: 0;

    .count_wrap {
      height: 100%;
      position: relative;
      overflow: hidden;

      .envelope {
        background-image: url("~@/assets/images/red_envelope_war.gif");
        background-size: contain;
        width: 100%;
        height: 100%;
      }

      .limit {
        width: 24vw;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      .gold {
        width: 10vw;
        position: absolute;
        top: 20%;
        left: 60%;
      }

      .fireworks {
        width: 26vw;
        position: absolute;
        top: 0;
        right: 0;
      }

      .flower {

      }
    }
  }

  .activity_wrap {
    padding: 30vw 0 0;

    .title {
      font-size: 30px;
      text-align: center;
      font-weight: 500;
      padding: 15px 0;
    }

    .menu_wrap {
      width: 50%;
      display: flex;
      box-shadow: 0 0 12px 0 var(--border-color-yellow) inset;
      margin: 10px 0 40px;
      border-radius: 50px;
      background-color: #fff;

      .menu_item {
        flex: 1;
        text-align: center;
        padding: 15px 0;
        font-size: 24px;
        cursor: pointer;
        border-radius: 50px;
      }

      .active {
        color: #fff;
        background-color: var(--theme-color);
        background-image: url("~@/assets/images/icon1.png");
        background-size: cover;
        background-position: center;
      }
    }

    .activity_main {
      min-height: 200px;

      .activity_card {
        height: 180px;
        background-color: #fff;
        margin: 20px 0;
        box-shadow: 0 0 12px 0 #ff600050;
      }
    }

    .pitera {
      font-size: 20px;
      text-align: center;
      height: 100%;
      line-height: 200px;
    }
  }
}

.buy-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .buy-cut {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

  .pay-money {
    font-size: 24px;
    margin: 40px 0;
    text-align: center;

    .money {
      color: #ff6000;

      span {
        font-size: 18px;
      }
    }
  }

  .qr-code {
    width: 200px !important;
    height: 200px;
    border-radius: 15px;
    padding: 20px;
    background-color: #ffd8c0;
  }

  .wx, .zfb {
    font-size: 28px;
    color: #ffd8c0;
    cursor: pointer;

    &.active {
      font-size: 30px;
      color: #000;
    }
  }

  .buy-dialog-btn {
    padding: 20px 40px;
    margin: 40px 0;
  }
}

</style>

<style>
.box-book-confirm-btn {
  padding: 12px 40px;
  margin-bottom: 20px;
  color: #fff;
  --el-button-hover-text-color: #fff;
  --el-button-bg-color: #ff6000;
  --el-button-border-color: #ff6000;
  --el-button-hover-bg-color: #ff600080;
  --el-button-hover-border-color: #ff6000;
  --el-button-active-bg-color: #ff6000;
  --el-button-active-border-color: #ff6000;
}

.box-book-cancel-btn {
  padding: 12px 40px;
  margin-bottom: 20px;
  color: #fff;
  --el-button-hover-text-color: #fff;
  --el-button-bg-color: #ff600080;
  --el-button-border-color: #ff600080;
  --el-button-hover-bg-color: #ff600080;
  --el-button-hover-border-color: #ff600080;
  --el-button-active-bg-color: #ff600080;
  --el-button-active-border-color: #ff600080;
}
</style>
