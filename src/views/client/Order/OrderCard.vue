<template>
  <div class="card">
    <div class="collect" :class="obj.collected ? 'collected' : ''">
      <span @click="handleCollect">{{
        obj.collected ? '已收藏' : '收藏'
      }}</span>
    </div>
    <div class="left_wrap">
      <div class="top">
        <div class="title">
          <h1>{{ obj.secKillInfo.name }}
            <el-popover :width="300" placement="right"
                        popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px,
                        rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;">
              <template #reference>
                <i class="iconfont icon-tips" style="color: #ff6000"/>
              </template>
              <template #default>
                <div style="display: flex; gap: 16px; flex-direction: column">
                  <div>
                    <p style="margin: 0; font-weight: 500">产品：{{ obj.secKillInfo.name }}</p>
                  </div>
                  <p style="margin: 0">
                    {{ obj.secKillInfo.info }}
                  </p>
                </div>
              </template>
            </el-popover>
          </h1>
        </div>
        <!--        <div class="order_num">产品名称：{{ obj.secKillInfo.productModel.productName }}</div>-->
        <div class="order_num">订单号：{{ obj.id }}</div>
        <!--        <div class=class"DQll">{{ obj.code ? obj.code : 'DQll' }}</div>-->
        <!--        <div class="part_line"></div>-->
      </div>
      <div class="bottom">
        <div class="detail_left">
          <p>净值日期：{{ '＼' }}</p>
          <p>最新净值：{{ obj.latest_net ? obj.latest_net : '＼' }}</p>
        </div>
        <div class="detail_center">
          <p>近1日增长率：{{ obj.growth_rate ? obj.growth_rate : '0.00%' }}</p>
          <p>近1周增长率：{{ obj.growth_rate ? obj.growth_rate : '0.00%' }}</p>
        </div>
        <div class="detail_right">
          <p>近3月增长率：{{ obj.growth_rate ? obj.growth_rate : '0.00%' }}</p>
          <p>近6月增长率：{{ obj.growth_rate ? obj.growth_rate : '0.00%' }}</p>
        </div>
      </div>
    </div>
    <div class="center_wrap">
      <!--      <div class="price">{{ obj.price ? obj.price : '0.00' }}<span>元</span></div>-->
    </div>
    <div class="right_wrap">
      <div class="main">
        <div class="title">核对订单</div>
        <div class="total_price_wrap">
          商品总价：<span class="price total_price">{{ obj.secKillInfo.seckillPrice }}<span>元</span></span>
        </div>
        <div class="payment_wrap">
          实付金额<span class="price payment_price">{{ obj.payMoney }}<span>元</span></span>
        </div>
        <div style="margin-top: 20px;text-align: center">
          <el-button type="primary" plain :disabled="obj.status === 2" @click="payHandle(obj.id, obj, index)">
            {{ obj.status === 2 ? '已支付' : '立即支付' }}
          </el-button>
          <el-popconfirm confirm-button-text="确定" cancel-button-text="取消" :icon="InfoFilled" icon-color="red"
                         title="Are you sure to delete this?"
                         @confirm="cancelPayHandle(obj.id, index)">
            <template #reference>
              <el-button type="info" plain :disabled="obj.status === 2">
                取消订单
              </el-button>
            </template>
          </el-popconfirm>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { InfoFilled } from '@element-plus/icons-vue'

export default {
  name: 'OrderCard',
  props: {
    obj: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  emits: ['payHandle', 'cancelPayHandle'],
  setup (props: any, context: any) {
    // 点击收藏
    function handleCollect () {
      console.log(1)
    }

    const payHandle = (orderId: any, obj: any, index: number) => {
      context.emit('payHandle', orderId, obj, index)
    }

    const cancelPayHandle = (orderId: any, index: number) => {
      context.emit('cancelPayHandle', orderId, index)
    }

    return {
      InfoFilled,
      handleCollect,
      payHandle,
      cancelPayHandle
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;

  div,
  h1,
  p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .left_wrap {
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 6%;

    .top {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .order_num {
        font-size: 18px;
        padding: 2px 0 20px;
      }

      .title {
        padding: 10px 0;

        h1 {
          font-size: 22px;
          font-weight: 500;
          width: 80%;
          padding-bottom: 10px;
        }

        .DQll {
          width: 80%;
          font-size: 14px;
          font-weight: 300;
        }
      }

      .part_line {
        width: 20px;
        height: 3px;
        background-color: var(--theme-color);
        margin: 10px 0;
      }
    }

    .bottom {
      display: flex;
      align-items: flex-start;
      font-size: 13px;
      line-height: 25px;
    }
  }

  .center_wrap {
    flex: 1;

    .price {
      font-size: 22px;
      color: #ff6000;
      margin-top: 95px;

      span {
        font-size: 18px;
      }
    }
  }

  .right_wrap {
    flex: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ff6000;

    .main {
      width: 80%;
      height: 80%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      color: #fff;
      font-size: 16px;

      .title {
        font-size: 18px;
        padding-bottom: 10px;
        border-bottom: 1px solid #c5c5c5;
      }

      .pro_id {
        margin: -15px 0 5px;
      }

      .total_price_wrap {
        padding: 20px 0;
        //border-top: 1px solid #ccc;
        //border-bottom: 1px solid #ccc;
      }

      .price {
        float: right;
        color: #ccc;
      }

      .payment_wrap {
        font-size: 18px;

        .payment_price {
          color: #fff;
        }
      }
    }
  }

  .collect {
    position: absolute;
    top: -5px;
    left: -5px;
    width: 70px;
    height: 70px;
    background: url("~@/assets/images/hm-bg.png") no-repeat;
    background-size: cover;

    span {
      font-size: 12px;
      color: #fff;
      display: inline-block;
      width: 90px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      transform: translate(-20px, 10px) rotate(-45deg);
      cursor: pointer;
    }
  }

  .collected {
    transform: scale(1.2);
    background: url("~@/assets/images/hmed-bg.png") no-repeat;
    background-size: cover;

    span {
      color: var(--theme-color);
    }
  }

  .flex_column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
