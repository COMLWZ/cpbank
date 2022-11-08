<template>
  <el-container>
    <el-main style="display: flex; flex-direction: column; justify-content: center;">
      <el-row class="row-bg" justify="center">
        <el-col :span="8">
          <div class="logo_warp"></div>
        </el-col>
        <el-col :span="8">
          <div class="register_wrap">
            <div class="register_main">
              <h1 class="title">登录</h1>
              <div class="register_phone">
                <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" status-icon class="demo-userForm"
                         size="large">
                  <el-form-item prop="phone">
                    <el-input v-model="userForm.phone" type="text" autocomplete="off" placeholder="输入手机号码" clearable
                              class="retract">
                      <template #prefix>
                        <i class="iconfont icon-phone05"></i>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input v-model="userForm.password" type="password" autocomplete="off" placeholder="登录密码"
                              clearable class="retract">
                      <template #prefix>
                        <i class="iconfont icon-icons_password"></i>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <div class="btn_login">
                      <el-button type="primary" @click="submitForm(userFormRef)" style="font-size: 18px;">登录
                      </el-button>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <div class="from_end">
                      <el-checkbox v-model="agree" label="我已阅读并同意" name="agree"/>
                      <router-link to="/register" class="to_login">没有账号？注册一个</router-link>
                    </div>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'

const { StaffApi } = require('@/api/UserApi')
const { Http } = require('@/tool/WebEnum')
const { useRouter } = require('vue-router')

export default {
  name: 'registerV',
  setup () {
    const router = useRouter()
    const staffApi = new StaffApi()

    const userForm = reactive({
      phone: '',
      password: ''
    })
    const userFormRef = ref<FormInstance>()
    // 同意阅读勾选状态
    const agree = ref(true)

    // 验证规则 ==== start ====
    const validatePass = (_rule: object, value: string, callback: any) => {
      if (value === '') {
        callback(new Error('请输入密码！'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不能小于六位！'))
      } else {
        callback()
      }
    }
    const validatePhone = (_rule: object, value: string, callback: any) => {
      if (value === '') {
        callback(new Error('请输入手机号码！'))
      // else if (!/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(value)) {
      //     callback(new Error('手机号码格式有误！'))
      //   }
      } else {
        callback()
      }
    }
    const userFormRules = reactive({
      phone: [{
        validator: validatePhone,
        trigger: 'blur'
      }],
      password: [{
        validator: validatePass,
        trigger: 'blur'
      }]
    })
    // 验证规则 ==== end ====

    // 提交登陆请求
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          if (!agree.value) {
            ElMessage.warning('请勾选我已阅读并同意！')
          } else {
            staffApi.setData(userForm).loginAuth().then((res: any) => {
              if (res.status === Http.SUCCESS) {
                localStorage.setItem(Http.STAFFAUTHORIZATION, res.data)
                ElMessage.success('登录成功！')
                router.push('/staff/home')
              } else {
                ElMessage.error(res.data.errMsg)
              }
            }).catch((err: any) => {
              ElMessage.error(err)
            })
          }
        }
      })
    }

    return {
      userForm,
      userFormRef,
      agree,
      userFormRules,
      submitForm
    }
  }
}
</script>

<style scoped lang="scss">
.el-container {
  background-color: var(--theme-bg-color);
}

.logo_warp {
  min-height: 600px;
  box-shadow: 0 0 12px 0 #ff6000;
  background-image: url("~@/assets/images/login_pig_icon.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 20px 0 0 20px;
  position: relative;
  z-index: 1;
}

.register_wrap {
  height: 100%;
  box-shadow: 0 0 12px 0 #ff600050;
  border-radius: 0 20px 20px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  .register_main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .title {
      font-size: 30px;
      padding-bottom: 50px;
      letter-spacing: 10px;
    }

    .register_phone {
      min-width: 60%;

      .el-button {
        font-weight: bold;
        --el-button-bg-color: #ff6000;
        --el-button-border-color: #ff6000;
        --el-button-hover-bg-color: #ff600080;
        --el-button-hover-border-color: #ff600080;
        --el-button-active-bg-color: #ff6000;
        --el-button-active-border-color: #ff6000;
      }
    }

    .iconfont {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      position: relative;
      left: -5px;
    }

    ::v-deep(.retract) .el-input__inner {
      text-indent: 6px;
    }

    ::v-deep(.from_end) .el-checkbox.el-checkbox--large .el-checkbox__inner {
      border-radius: 50%;
    }

    .btn_login {
      width: 100%;
    }

    ::v-deep(.btn_login) .el-button--primary {
      width: 100%;
      border-radius: 20px;
    }
  }

  .auth_code {
    display: flex;

    div {
      margin-right: -2%;
    }

    button {
      z-index: 1;
    }
  }

  .from_end {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 12px;

    .to_login {
      color: var(--el-color-primary);
    }
  }
}
</style>
