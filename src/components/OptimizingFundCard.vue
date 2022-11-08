<template>
  <div class="card">
    <div class="collect" :class="obj.collected ? 'collected' : ''">
      <span @click="handleCollect">{{ obj.collected ? '已收藏' : '收藏' }}</span>
    </div>
    <div class="left_wrap">
      <div class="title">
        <h1>
          {{ obj.title ? obj.title : '信息缺失' }}
          ({{ obj.id ? obj.id : 0 }})
        </h1>
        <div class="DQll">
          {{ obj.code ? obj.code : 'DQll' }}
        </div>
      </div>
      <div class="part_line"></div>
      <div class="detail">
        <div class="detail_left flex_column">
          <p>净值日期：{{ obj.date ? dateToString(obj.date, 'YYYY-MM-DD') : '＼' }}</p>
          <p>网站折扣：{{ obj.web_discount ? obj.web_discount : '-' }}</p>
        </div>
        <div class="detail_right flex_column">
          <p>最新净值：{{ obj.latest_net ? obj.latest_net : '＼' }}</p>
          <p>累计净值：{{ obj.cumulative_net ? obj.cumulative_net : '＼' }}</p>
          <p>人气值：{{ obj.popular_value ? obj.popular_value : '＼' }}</p>
        </div>
      </div>
    </div>
    <div class="right_wrap">
      <div class="growth_wrap">
        <div class="growth_rate">
          近三月增长率
          <div class="rate">
            {{ obj.growth_rate ? obj.growth_rate : '0.00%' }}
          </div>
        </div>
      </div>
      <div class="buy flex_column">
        <div class="buy_wrap">
          <el-button size="large">购买</el-button>
        </div>
        <div class="plan_wrap">
          <el-button size="large">定投</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { dateToString } from '@/tool/util'

export default {
  name: 'OptimizingFundCard',
  props: {
    obj: {
      type: Object,
      required: true
    }
  },
  setup () {
    // 点击收藏
    function handleCollect () {
      console.log(1)
    }

    return {
      handleCollect,
      dateToString
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  height: 100%;
  background: url("~@/assets/images/icon3.png") no-repeat;
  background-size: 100% 100%;
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
    flex-direction: column;
    justify-content: space-evenly;
    padding-left: 8%;

    .title {
      h1 {
        font-size: 26px;
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
    }

    .detail {
      display: flex;

      .detail_right {
        font-size: 12px;
        line-height: 1.5;
      }
    }
  }

  .right_wrap {
    display: flex;
    align-items: center;

    .growth_wrap {
      flex: 1;

      .growth_rate {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 1px solid #ff600050;
        box-shadow: 0 0 12px 0 #ff600050 inset;
        font-size: 14px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .rate {
          font-size: 26px;
          text-align: center;
          margin-top: 12px;
        }
      }
    }

    .buy {
      flex: 1;
      height: 50%;

      button {
        width: 50%;
        height: 80%;
        font-size: 18px;
      }
    }
  }

  .collect {
    position: absolute;
    top: -3px;
    left: -1px;
    width: 70px;
    height: 70px;
    background: url("../assets/images/hm-bg.png") no-repeat;
    background-size: cover;
    transform: translate(10px, 8px);

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
    transform: scale(.9);
    background: url("../assets/images/hmed-bg.png") no-repeat;
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
