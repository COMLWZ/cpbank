<template>
  <div class="card">
    <div class="title flex_center">
      <h1>
        {{ obj.title ? obj.title : '信息缺失' }}
        ({{ obj.id ? obj.id : 0 }})
      </h1>
      <div class="DQll">
        {{ obj.code ? obj.code : 'DQll' }}
      </div>
    </div>
    <div class="growth_rate flex_center">
      近三月增长值：{{ obj.growth_rate ? obj.growth_rate : '-%' }}
    </div>
    <div class="detail">
      <p>净值日期：{{ obj.date ? dateToString(obj.date, 'YYYY-MM-DD') : '＼' }}</p>
      <p>最新净值：{{ obj.latest_net ? obj.latest_net : '＼' }}</p>
      <p>累计净值：{{ obj.cumulative_net ? obj.cumulative_net : '＼' }}</p>
      <p>人气值：{{ obj.popular_value ? obj.popular_value : '＼' }}</p>
      <p>网站折扣：{{ obj.web_discount ? obj.web_discount : '-' }}</p>
    </div>
    <div class="tools">
      <div class="buy flex_center">购买</div>
      <div class="fixed_invest flex_center">定投</div>
    </div>
    <div
      class="collect flex_center"
      :class="obj.collect ? 'collected' : ''"
      @click="handleCollect"
    >
      {{ obj.collect ? '已收藏' : '收藏' }}
    </div>
  </div>
</template>

<script lang="ts">
import { dateToString } from '@/tool/util'

export default {
  name: 'ProductCard',
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
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  box-shadow: 0 0 8px 3px var(--border-color-yellow);
  color: #000;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div,
  h1,
  p {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .title {
    color: #fff;
    background: url("~@/assets/images/icon2.png") no-repeat 100%;
    // height: calc(192 / 514 * 100%);
    height: 25%;
    flex-direction: column;

    h1 {
      font-size: 20px;
      font-weight: 400;
      width: 80%;
      padding-bottom: 10px;
    }

    .DQll {
      width: 80%;
      font-size: 14px;
      font-weight: 300;
    }
  }

  .growth_rate {
    font-size: 18px;
    height: 14%;
    box-shadow: 0 5px 10px 0 #ff600020;
  }

  .detail {
    height: 47%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    p {
      text-indent: 15%;
    }
  }

  .tools {
    height: 40px;
    display: flex;
    font-size: 18px;

    .buy {
      background-color: #ff6000;
      color: #fff;
    }

    .buy,
    .fixed_invest {
      cursor: pointer;
      box-shadow: inset 0 0 8px 2px #ff600050;
    }
  }

  .collect {
    font-size: 12px;
    width: 20%;
    height: 6%;
    min-width: 40px;
    min-height: 25px;
    // background-image: url("@/assets/images/收藏.png");
    background-color: #fff;
    position: absolute;
    top: 0;
    right: 0;
    border-bottom-left-radius: 15px;
    cursor: pointer;
  }

  .collected {
    color: var(--el-color-primary);
  }

  .flex_center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
