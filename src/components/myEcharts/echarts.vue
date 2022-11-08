<template>
  <div class="echarts-box">
    <slot name="dropdown"/>
    <div id="show-echarts" ref="echartsRef" :style="{ height: eHeight, width: eWidth }"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref, unref, watch } from 'vue'
import * as echarts from 'echarts'

const elementResizeDetector = require('element-resize-detector/src/element-resize-detector')

export default defineComponent({
  name: 'MyEcharts',
  props: {
    options: {
      type: Object,
      required: true
    },
    eWidth: {
      type: String,
      default: '100%'
    },
    eHeight: {
      type: String,
      default: '100%'
    }
  },
  setup (props) {
    const echartsRef = ref(null)

    let erd = elementResizeDetector()
    let echartsInstance: echarts.ECharts | null = null

    // 监听数据变化后重置数据
    watch(
      props.options,
      () => {
        echartsInstance && echartsInstance.clear()
        props.options && echartsInstance?.setOption(props.options, true)
      }
    )
    onMounted(() => {
      nextTick(() => {
        // 初始化
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        echartsInstance = echarts.init(unref(echartsRef)!)
        // 把配置和数据放这里
        echartsInstance && echartsInstance.clear()
        props.options && echartsInstance.setOption(props.options, true)
        // 监听el-main节点的大小变化，动态改变图表的大小
        erd.listenTo(unref(echartsRef), () => {
          // 使echarts尺寸重置
          nextTick(() => echartsInstance && echartsInstance.resize())
        })
      })
    })

    onBeforeUnmount(() => {
      echartsInstance && echartsInstance.dispose()
      echartsInstance = null
      erd.uninstall(document.getElementsByClassName('el-main')[0])
      erd = null
    })
    return {
      echartsRef
    }
  }
})

</script>

<style lang="scss" scoped>
.echarts-box {
  width: 100%;
  height: 100%;
}
</style>
