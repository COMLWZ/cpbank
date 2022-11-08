<template>
  <div id="asset-card">
    <div class="asset" v-if="status">
      <h3>资产总览<i class="iconfont icon-cog-fill"></i></h3>
      <p>可用资产（元）</p>
      <p>{{ formatMoney(availableAssets) }}</p>
      <p>不可用资产（元）</p>
      <p>{{ formatMoney(unavailableAssets) }}</p>
    </div>
    <div class="revenue" v-else>
      <h3>收益总览<i class="iconfont icon-cog-fill"></i></h3>
      <p>今日收益（元）</p>
      <p>{{ formatMoney(todayRevenue) }}</p>
      <p>总收益（元）</p>
      <p>{{ formatMoney(totalRevenue) }}</p>
    </div>
  </div>
</template>

<script lang="ts">
const { formatMoney } = require('@/tool/util')
export default {
  name: 'AssetCard',
  props: {
    status: {
      type: Boolean,
      default: false
    },
    // 可用资产
    availableAssets: {
      type: Number,
      default: 0
    },
    // 不可用资产
    unavailableAssets: {
      type: Number,
      default: 0
    },
    // 今日收益
    todayRevenue: {
      type: Number,
      default: 0
    },
    // 总收益
    totalRevenue: {
      type: Number,
      default: 0
    }
  },
  setup () {
    return { formatMoney }
  }
}
</script>

<style scoped lang="scss">
#asset-card {
  h3 {
    padding: 10px 0;
    margin-bottom: 10px;
    font-size: 18px;
    display: flex;
    justify-content: space-between;
  }

  > div {
    padding: 20px;
    border-radius: 10px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0 0 12px 0 #12345650;
  }

  .asset {
    color: #fffefe;
    background-image: url("~@/assets/images/personal/asset-bg.png");
  }

  .revenue {
    color: #000101;
    background-image: url("~@/assets/images/personal/revenue-bg.png");

    p {
      color: #aeaeae;

      &:nth-of-type(2), &:nth-of-type(4) {
        color: #ff6000;
      }
    }
  }

  p {
    padding: 10px 0;

    &:nth-of-type(2) {
      font-size: 30px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    &:nth-of-type(4) {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
