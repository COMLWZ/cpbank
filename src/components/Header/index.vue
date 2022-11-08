<template>
  <div class="header-box">
    <el-row>
      <el-col :span="4">
        <div class="header-logo">
          <a href="javascipt:;" class="logo">

          </a>
        </div>
      </el-col>
      <el-col :span="16">
        <div v-if="!headerFlag">
          <el-menu mode="horizontal" router :default-active="menuActive"
                   background-color="#ff6000" text-color="#fff" active-text-color="#ffffff">
            <el-menu-item index="/home">首页</el-menu-item>
            <el-menu-item index="/secKill">秒杀活动</el-menu-item>
            <el-menu-item index="/order">产品订单</el-menu-item>
          </el-menu>
        </div>
        <div v-else>
          <el-menu mode="horizontal" router :default-active="menuActive"
                   background-color="#ff6000" text-color="#fff" active-text-color="#ffffff">
            <el-menu-item index="/staff/home">首页</el-menu-item>
            <el-menu-item index="/staff/secKill">秒杀活动</el-menu-item>
            <el-menu-item index="/staff/earlySift">准入初筛</el-menu-item>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="header-uc">
          <router-link v-if="!isLogin" to="/login" style="margin-right: 10px">登录</router-link>
          <router-link v-if="!isLogin" to="/register">注册</router-link>
          <router-link v-if="isLogin" :to="headerFlag ? '/staff/personal' : '/personal'">个人中心<span>
            <i class="iconfont icon-user-circle"></i></span>
          </router-link>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { watch } from 'vue'

const { ref } = require('vue')
const { useStore } = require('vuex')
const { useRouter } = require('vue-router')

export default {
  name: 'HeaderC',
  props: {
    isLogin: Boolean
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    // 当前导航路由
    const menuActive = ref(router.currentRoute.value.path)
    // 根据路由判断header
    const headerFlag = store.state.isStaff

    watch(() => router.currentRoute.value.path, (e) => {
      menuActive.value = e
    })
    return {
      menuActive,
      headerFlag
    }
  }
}
</script>

<style scoped lang="scss">
.header-box {
  .header-logo {
    width: 200px;
    .logo{
      display: block;
      width: 60px;
      height: 60px;
      background-image: url("~@/assets/images/logo.png");
      background-size: contain;
    }
  }

  .el-menu {
    border: 0;

    .el-menu-item {
      font-size: 16px;
    }
  }

  .header-uc {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    > a {
      color: #fff;
      font-size: 16px;
      border-radius: 30px;
      background-color: #ff904d;
      padding: 10px 14px 8px;
      display: flex;
      align-items: center;

      &:hover {
        color: #ffffffdb;
        background-color: #ff904d99;
      }

      span {
        margin-left: 10px;
        font-size: 20px;
      }
    }
  }
}

</style>
