<template>
  <div class="banner-box" ref="root">
    <!--轮播图区域-->
    <div class="wrapper">
      <div v-for="(item, i) in sources" :key="i" :class="item.className" :style="item.sty">
        <div class="card" @click="computed(i, sources)">
          <div class="main">
            <div class="title flex_center">{{ item.cpName + '--' + i }}</div>
            <div class="date flex_center">
              日期：{{ dateToString(item.date, 'YYYY-MM-DD HH:mm:SS') }}
            </div>
            <div class="yield_rate flex_center">
              七日年化收益率：{{ item.sevenYield }}
            </div>
            <div class="yield flex_center">
              万份收益：{{ item.thousandsIncome }}
            </div>
          </div>
          <div class="tools">
            <div class="buy flex_center">购买</div>
            <div class="fixed_invest flex_center">定投</div>
          </div>
          <div class="collect flex_center" :class="item.collect ? 'collected' : ''" @click="handleCollect(item)">
            {{ item.collect ? '已收藏' : '收藏' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { dateToString } from '@/tool/util'

export default {
  name: 'Carousel3dC',
  props: {
    source: {
      type: Array,
      required: true
    },
    initial: {
      type: Number,
      default: 0
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  setup (props) {
    // 处理source
    // eslint-disable-next-line vue/no-setup-props-destructure
    let source = props.source
    let diff = source.length - 5
    if (diff < 0) {
      diff = Math.abs(diff)
      source.slice(0, diff).forEach((item) => {
        source.push({
          ...item,
          id: parseInt(source[source.length - 1].id) + 1
        })
      })
    }
    // 处理每一项的样式
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const computed = (initial, source) => {
      const len = source.length
      initial = initial < 0 ? 0 : initial >= len ? len - 1 : initial
      let temp1 = initial - 2
      let temp2 = initial - 1
      const temp3 = initial
      let temp4 = initial + 1
      let temp5 = initial + 2
      temp1 = temp1 < 0 ? len + temp1 : temp1
      temp2 = temp2 < 0 ? len + temp2 : temp2
      temp4 = temp4 >= len ? temp4 - len : temp4
      temp5 = temp5 >= len ? temp5 - len : temp5

      // 计算每一项的样式
      return source.map((item, index) => {
        let transform = 'translate(-50%, -50%) scale(0.55)'
        let zIndex = 0
        let className = 'slide'
        switch (index) {
          case temp3:
            zIndex = 3
            className = 'slide active'
            transform = 'translate(-50%, -50%) scale(1)'
            break
          case temp1:
            zIndex = 1
            className = 'slide s'
            transform = 'translate(-240%, -50%) scale(0.7)'
            break
          case temp2:
            zIndex = 2
            className = 'slide s'
            transform = 'translate(-150%, -50%) scale(0.85)'
            break
          case temp4:
            zIndex = 2
            transform = 'translate(50%, -50%) scale(0.85)'
            break
          case temp5:
            zIndex = 1
            transform = 'translate(140%, -50%) scale(0.7)'
            break
        }
        item.sty = {
          transform,
          zIndex
        }
        item.className = className
        return item
      })
    }
    source = computed(props.initial, props.source)

    const initial = ref(props.initial)
    const sources = ref(source)
    // 自动轮播
    let autoTimer = null
    const autoPlay = () => {
      autoTimer = setInterval(() => {
        initial.value++
        if (initial.value >= sources.value.length) {
          initial.value = 0
        }
      }, props.interval)
    }

    // 监听initial
    watch(initial, (initial) => {
      sources.value = computed(initial, sources.value)
    })

    // 页面加载完，执行自动轮播
    const root = ref(null)
    onMounted(() => {
      autoPlay()
      // 鼠标控制自动轮播
      const box = root.value
      box.onmouseenter = () => clearInterval(autoTimer)
      box.onmouseleave = () => autoPlay()
    })

    // 点击收藏
    function handleCollect (cp) {
      cp.collect = !cp.collect
    }

    return {
      sources,
      root,
      computed,
      dateToString,
      handleCollect
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 12px 0 #ff600050;
  color: #000;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  div {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .main {
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .title {
      font-size: 20px;
      margin-top: 30px;
    }

    .date {
      font-size: 16px;
    }

    .yield_rate {
      font-size: 20px;
    }

    .yield {
      font-size: 20px;
      width: 80%;
      padding: 12px 0;
      box-shadow: inset 0 0 12px 0 #ff600050;
      border-radius: 5px;
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
    color: #fff;
    width: 25%;
    height: 8%;
    min-width: 40px;
    min-height: 25px;
    // background-image: url("@/assets/images/收藏.png");
    background-color: #ff6000;
    position: absolute;
    top: 0;
    right: 0;
    border-bottom-left-radius: 10px;
    cursor: pointer;
  }

  .flex_center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.banner-box {
  width: 100%;
  height: 350px;

  .wrapper {
    position: relative;
    box-sizing: border-box;
    height: 100%;

    .slide {
      border-radius: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 0;
      box-shadow: 0 0 12px 0 #ff600050;
      transform: translate(-50%, -50%);
      box-sizing: border-box;
      width: 22%;
      height: 100%;
      overflow: hidden;
      transition: 0.5s;
      background-image: linear-gradient(90deg, #f9e5db 0%, #ffffff 74%);

      &.s {
        background-image: linear-gradient(270deg, #f9e5db 0%, #ffffff 74%);
      }

      &:not([class~='active']) .card {
        opacity: 0.6;
      }

      //
      //  &:after {
      //    content: "";
      //    width: 100%;
      //    height: 100%;
      //    position: absolute;
      //    top: 0;
      //    left: 0;
      //    background-image: linear-gradient(90deg, #fcf4f2 0%, #ffffff00 74%);
      //    opacity: 0.8;
      //  }
      //}
    }
  }

  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 39px;
    height: 80px;
    background: #000101;
  }
}

</style>
