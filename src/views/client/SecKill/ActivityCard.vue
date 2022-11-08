<template>
  <div class="card">
    <div class="collect" :class="obj.collected ? 'collected' : ''">
      <span @click="handleCollect(obj.id)">{{ obj.collected ? '已收藏' : '收藏' }}</span>
    </div>
    <div class="left_wrap">
      <div class="left">
        <div class="title">
          <h1>
            {{ obj.name || '-' }} <!--({{ obj.id ? obj.id : 0 }})-->
          </h1>
          <div class="DQll">
            {{ obj.info }}
          </div>
        </div>
        <div class="part_line"></div>
        <div class="detail">
          <div class="detail_left flex_column">
            <p>开始时间：{{ obj.startTime || '-' }}</p>
            <p>结束时间：{{ obj.endTime || '-' }}</p>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="growth_rate">
          秒杀价格：{{ obj.seckillPrice || '0.00' }} 元
        </div>
        <div class="growth_rate">
          满期利率：{{ obj.productModel.rate || '0.00' }}%
        </div>
        <div style="border: 1px solid #ff6000;width: fit-content; padding: 10px 30px;
        color: #ff8000; border-radius: 10px;">固定收益类</div>
      </div>
    </div>
    <div class="right_wrap">
      <div class="date_wrap">
        <div class="date_start">
          <div v-if="obj.activeState === -1">
            <div class="time_title">距离本场开始时间</div>
            <div class="time_wrap">
              <span class="time day" v-if="countTime.day > 0">{{ countTime.day }}天</span>
              <span class="time">{{ countTime.hour }}&nbsp;:&nbsp;{{ countTime.minute }}&nbsp;:&nbsp;{{
                countTime.second
              }}</span>
            </div>
          </div>
          <div v-else-if="obj.activeState === 1">
            <div class="time_title">距离本场结束时间</div>
            <div class="time_wrap">
              <span class="time day" v-if="countTime.day > 0">{{ countTime.day }}天</span>
              <span class="time">{{ countTime.hour }}&nbsp;:&nbsp;{{ countTime.minute }}&nbsp;:&nbsp;{{
                countTime.second
              }}</span>
            </div>
          </div>
          <div v-if="btnState == 0" >
            <div class="time_title">本场已结束</div>
            <div class="time_wrap">
              <span class="time day" v-if="countTime.day > 0">{{ countTime.day }}天</span>
              <span class="time">{{ countTime.hour }}&nbsp;:&nbsp;{{ countTime.minute }}&nbsp;:&nbsp;{{
                countTime.second
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="subscribe">
        <div class="subscribe_wrap">
          <el-button v-if="obj.activeState === -1" type="primary" size="large" :disabled="bookDisabled"
                     @click="bookHandle">立即预约</el-button>
          <el-button v-else-if="obj.activeState === 1" type="primary" size="large"
                     @click="buyHandle(obj.productId, obj.id)">秒杀抢购</el-button>
          <el-button v-if="btnState == 0" type="primary" size="large"
                     :disabled="true" style="opacity: 0.5">秒杀已结束</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'

const { reactive } = require('vue')
const { countDown } = require('@/tool/util')
// const { UserApi } = reactive()

export default {
  name: 'ActivityCard',
  props: {
    obj: {
      type: Object,
      required: true
    },
    btnState: {
      type: Number,
      required: true
    }
  },
  emits: ['secKillPanicBuying', 'bookHandle'],
  setup (props: { btnState: any; obj: { endTime: any } }, context: any) {
    // 点击收藏
    function handleCollect () {
      console.log(1)
    }

    // 倒计时
    const countTime: any = reactive({
      day: 0,
      hour: 0,
      minute: 0,
      second: 0
    })

    // 倒计时计算
    switch (props.btnState) {
      case 0: // 进行中
        countDown(props.obj.endTime, countTime)
        break
      case 1: // 未开始
        countDown(props.obj.endTime, countTime)
        break
      case -1: // 已结束
        countDown(props.obj.endTime, countTime)
    }

    const bookDisabled = ref(false)
    // 立即预约
    const bookHandle = (event:any) => {
      if (event.target.lastElementChild) {
        event.target.style.backgroundColor = '#ff600080'
      } else {
        event.target.parentNode.style.backgroundColor = '#ff600080'
      }
      bookDisabled.value = true
      context.emit('bookHandle')
    }

    // 秒杀抢购
    const buyHandle = (productId: number, secKillId: number) => {
      context.emit('secKillPanicBuying', productId, secKillId)
    }

    return {
      handleCollect,
      bookDisabled,
      bookHandle,
      countTime,
      buyHandle
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
    display: flex;
    justify-content: space-evenly;
    padding-left: 8%;
    align-items: center;

    .left {
      .title {
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
        margin-top: 8px;
        margin-bottom: 10px;
      }
    }

    .detail {
      display: flex;
      line-height: 2;
      font-size: 14px;
    }

    .right {
      .growth_rate {
        font-size: 20px;
        color: var(--theme-color);
        font-weight: 700;
        line-height: 2.2;
      }
    }
  }

  .right_wrap {
    display: flex;
    align-items: center;

    .date_wrap {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      .date_start {
        width: 80%;
        height: 120px;
        box-shadow: 0 0 12px 0 var(--border-color-yellow) inset;
        font-size: 22px;
        color: var(--theme-color);
        display: flex;
        flex-direction: column;
        justify-content: center;

        .time_title {
          text-align: center;
        }

        .time_wrap {
          text-align: center;
          padding-top: 10px;

          .time {
            display: inline-block;
            background-color: var(--theme-color);
            color: #fff;
            padding: 8px 7px;
            margin: 0 10px;
          }

          .day {
            background-color: transparent;
            font-size: 24px;
            color: var(--theme-color);
          }
        }
      }
    }

    .subscribe {
      flex: 1;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      .subscribe_wrap {
        text-align: center;

        button {
          font-size: 16px;
          background-color: #ff6000;
          border-color: #ff6000 !important;
        }
      }
    }
  }

  .collect {
    position: absolute;
    top: -3px;
    left: -3px;
    width: 70px;
    height: 70px;
    background-image: url("~@/assets/images/hm-bg.png");
    background-repeat: no-repeat;
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
    background-image: url("~@/assets/images/hmed-bg.png");
    background-repeat: no-repeat;
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
