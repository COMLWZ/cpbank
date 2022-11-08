<template>
  <div class="home_wrap">
    <!-- 导航 -->
    <div class="menu">
      <div class="menu_item" @click="goAnchor('activity')">热门活动</div>
      <div class="menu_item" @click="goAnchor('recommend')">精选推荐</div>
      <div class="menu_item" @click="goAnchor('fund')">优选基金</div>
    </div>
    <!-- 活动大图 -->
    <router-link to="" style="display: block">
      <div class="seckill">
        <!--        <img src="@/assets/images/banner.png" />-->
      </div>
    </router-link>
    <div class="home_main">
      <div class="hot_activity_wrap">
        <h1 class="hot_title" id="activity">热门活动</h1>
        <Suspense>
          <template v-slot:default>
            <el-row :gutter="60">
              <el-col v-for="obj in productObj" :key="obj" :span="6">
                <div class="product_card">
                  <product-card :obj="obj"/>
                </div>
              </el-col>
            </el-row>
          </template>
          <template v-slot:fallback>
            <h3>稍等，加载中...</h3>
          </template>
        </Suspense>
      </div>
      <div class="recommend_wrap">
        <h1 class="hot_title" id="recommend">精选推荐</h1>
        <Suspense>
          <template v-slot:default>
            <div>
              <Carousel3d :source="rmSource"/>
            </div>
          </template>
          <template v-slot:fallback>
            <h3>稍等，加载中...</h3>
          </template>
        </Suspense>
      </div>
      <div class="fund_wrap">
        <h1 class="hot_title" id="fund">优选基金</h1>
        <Suspense>
          <template v-slot:default>
            <div
              class="optimizing-fund-card"
              v-for="obj in productObj"
              :key="obj"
            >
              <optimizing-fund-card :obj="obj"/>
            </div>
          </template>
          <template v-slot:fallback>
            <h3>稍等，加载中...</h3>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import Carousel3d from './Carousel3d.vue'

const ProductCard = defineAsyncComponent(() => import('@/components/ProductCard.vue'))
const OptimizingFundCard = defineAsyncComponent(() => import('@/components/OptimizingFundCard.vue'))

export default {
  name: 'clientHomeV',
  components: {
    ProductCard,
    Carousel3d,
    OptimizingFundCard
    // Carousel3d: ,
    // Slide
  },
  setup () {
    const productObj = [{}, {}, {}, {}]

    // 去到对应锚点位置
    function goAnchor (anchor: string) {
      const el = document.getElementById(anchor)
      if (el) {
        el.scrollIntoView()
      }
    }

    // 精选推荐
    const rmSource = ref([
      {
        cpName: '阿斯顿飞啊发送到',
        date: new Date(),
        sevenYield: '2.111%',
        thousandsIncome: '0.522'
      }, {
        cpName: '阿斯顿飞啊发送到',
        date: new Date(),
        sevenYield: '2.111%',
        thousandsIncome: '0.522',
        collect: 0
      }, {
        cpName: '阿斯顿飞啊发送到',
        date: new Date(),
        sevenYield: '2.111%',
        thousandsIncome: '0.522',
        collect: 1
      }, {
        cpName: '阿斯顿飞啊发送到',
        date: new Date(),
        sevenYield: '2.111%',
        thousandsIncome: '0.522',
        collect: 0
      }, {
        cpName: '阿斯顿飞啊发送到',
        date: new Date(),
        sevenYield: '2.111%',
        thousandsIncome: '0.522',
        collect: 0
      }
    ])

    return {
      goAnchor,
      productObj,
      rmSource
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-carousel__item {
  overflow: unset;
}

::v-deep .el-carousel--horizontal {
  overflow: unset;
}

.home_wrap {
  .menu {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px 0;
    z-index: 9;
    color: #fff;
    background-color: #65470340;
    font-size: 18px;
    display: flex;
    justify-content: space-evenly;

    .menu_item {
      padding: 5px;
      cursor: pointer;
      font-weight: 300;

      &:hover {
        color: #fff;
        font-weight: bold;
      }
    }
  }

  .seckill {
    width: 100%;
    height: 28vw;
    // height: 36.5vw;
    background-image: url("~@/assets/images/banner.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    left: 0;
    top: 0;
  }

  .home_main {
    margin-top: 25vw;
    padding: 10px 0;

    .hot_title {
      font-size: 30px;
      font-weight: 500;
      text-align: center;
      padding: 80px 0 40px 0;
    }

    .product_card {
      width: 100%;
      height: 450px;
      overflow: hidden;
      border-radius: 15px;
      box-shadow: 0 0 12px 0 #ff600050;
    }

    .recommend_wrap {
      .el-carousel__item--card {
        // width: 32%
      }

      // .el-carousel__item--card.is-active {
      //   & + .el-carousel__item--card .card {
      //     left: 28%;
      //   }
      //   .card {
      //     left: 50%;
      //     transform: translateX(-50%);
      //   }
      // }
    }
  }

  .fund_wrap {
    .optimizing-fund-card {
      width: 100%;
      height: 200px;
      margin-bottom: 15px;
    }

    padding-bottom: 20px;
  }
}
</style>
