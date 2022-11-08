<template>
  <el-container v-if="!routerVerify || userInfo">
    <el-header>
      <el-row type="flex" justify="center">
        <el-col :span="24" :lg="18">
          <header-c :is-login="!!userInfo"></header-c>
        </el-col>
      </el-row>
    </el-header>

    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="24" :lg="18">
          <router-view/>
        </el-col>
      </el-row>
    </el-main>

    <el-footer height="300px">
      <el-row type="flex" justify="center">
        <el-col :span="24" :lg="18">
          <footer-c></footer-c>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import HeaderC from '@/components/Header/index.vue'
import FooterC from '@/components/Footer/index.vue'
import { computed, onMounted, ref, watch } from 'vue'
import { ElLoading, ElMessage } from 'element-plus'

const { Http } = require('@/tool/WebEnum')
const { useRouter } = require('vue-router')
const { useStore } = require('vuex')
const { UserApi } = require('@/api/UserApi')

export default {
  name: 'layoutV',
  components: {
    HeaderC,
    FooterC
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const userInfo: any = ref(null)

    onMounted(() => {
      watch(computed(() => router.currentRoute.value.path), () => {
        watchFunction()
      })
    })

    const loading = ElLoading.service({
      lock: true,
      text: '加载中...',
      background: '#fff',
    })

    // 监听函数
    let watchFunction: () => void = () => {
      // token不存在则未登录，除首页外不可访问其他页面
      if (router.currentRoute.value.meta.verify && !userInfo.value) {
        ElMessage.warning('请先登录！')
        router.push('/login')
      }
    }
    // 记录登录令牌
    const token = localStorage.getItem(Http.AUTHORIZATION) || ''
    store.state.token = token
    // 用户token是否存在
    if (token) {
      // 获取用户信息
      new UserApi().setData(token).getUserInfo().then((res: any) => {
        console.log('=== 获取用户信息 ===')
        if (res.status === Http.SUCCESS) {
          store.state.userInfo = res.data
          userInfo.value = res.data

          watchFunction = () => {
            // 用户信息不完善，跳转至个人信息页面进行信息补全
            if (!userInfo.value?.age) {
              router.push({
                path: '/personal',
                query: { update: true }
              })
            }
          }
          watchFunction()
        } else {
          if (res.data.errCode === 20003 && router.currentRoute.value.path !== '/home') {
            ElMessage.error(res.data.errMsg)
            router.push('/login')
          }
        }
        // 关闭loading
        setTimeout(() => {
          loading.close()
        }, 1000)
      })
    } else if (!token) {
      setTimeout(() => {
        loading.close()
      }, 1000)
      console.log('=== 未登录 ===')

      watchFunction = () => {
        // token不存在则未登录，除首页外不可访问其他页面
        if (router.currentRoute.value.meta.verify && !userInfo.value) {
          ElMessage.warning('请先登录！')
          router.push('/login')
        }
      }
      watchFunction()
    }

    return {
      userInfo,
      routerVerify: router.currentRoute.value.meta.verify
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-loading-spinner {
  .path {
    stroke: var(--theme-color);
  }

  .el-loading-text {
    color: var(--theme-color);
  }
}

.el-header {
  background-color: var(--header-bg-color);
}

.el-main {
  padding: 0 0 60px 0;
  overflow: unset;
  //background-color: var(--main-bg-color);
  background-image: url("~@/assets/images/flower_39986.gif");
  background-size: contain;
}

.el-footer {
  background-color: var(--footer-bg-color);
}
</style>
