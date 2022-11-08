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
              <h1 class="title">注册</h1>
              <div class="register_phone">
                <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" status-icon size="large">
                  <el-form-item prop="phone">
                    <el-input v-model="userForm.phone" type="text" autocomplete="off" placeholder="输入手机号码" clearable
                              class="retract">
                      <template #prefix>
                        <i class="iconfont icon-phone05"></i>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="otpCode">
                    <div class="auth_code">
                      <el-input v-model.number="userForm.otpCode" placeholder="验证码" clearable/>
                      <el-button type="primary" color="#ff6000" @click="sendAuthCode(userFormRef)"
                                 :disabled="disabled">
                        发送验证码{{ countDown > 0 ? '(' + countDown + ')' : '' }}
                      </el-button>
                    </div>
                  </el-form-item>
                  <el-form-item prop="password">
                    <el-input v-model="userForm.password" type="password" autocomplete="off" placeholder="登录密码"
                              clearable
                              class="retract">
                      <template #prefix>
                        <i class="iconfont icon-icons_password"></i>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="confirmPassword">
                    <el-input v-model="userForm.confirmPassword" type="password" autocomplete="off" placeholder="检查密码"
                              clearable class="retract">
                      <template #prefix>
                        <i class="iconfont icon-icons_password"></i>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item>
                    <div class="btn_login">
                      <el-button type="primary" @click="submitForm(userFormRef)" style="font-size: 18px;">
                        立即注册
                      </el-button>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <div class="from_end">
                      <el-checkbox v-model="agree" label="我已阅读并同意" name="agree"/>
                      <router-link to="/login" class="to_login">立即登录</router-link>
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
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElLoading, ElMessage } from 'element-plus'

const { UserApi } = require('@/api/UserApi')
const { Http } = require('@/tool/WebEnum')
const { useRouter } = require('vue-router')

export default {
  name: 'registerV',
  setup () {
    const userFormRef = ref<FormInstance>()
    const disabled = ref(false) // 是否允许发送验证码
    const countDown = ref(0) // 倒计时

    const validatePass = (_rule: object, value: string, callback: any) => {
      if (value === '') {
        callback(new Error('请输入密码！'))
      } else if (value.length < 6) {
        callback(new Error('密码长度不能小于六位！'))
      } else {
        callback()
      }
    }
    const validatePass2 = (_rule: object, value: string, callback: any) => {
      if (value === '') {
        callback(new Error('请再次输入密码！'))
      } else if (value !== userForm.password) {
        callback(new Error('两次输入的密码不一致！'))
      } else {
        callback()
      }
    }
    const validatePhone = (_rule: object, value: string, callback: any) => {
      if (value === '') {
        callback(new Error('请输入手机号码！'))
      } else if (
        !/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(
          value
        )
      ) {
        callback(new Error('手机号码格式有误！'))
      } else {
        callback()
      }
    }
    const validateAuthCode = (_rule: object, value: string, callback: any) => {
      if (value === '') {
        callback(new Error('请输入验证码！'))
      } else if (value.length < 4) {
        callback(new Error('验证码不能少于四位！'))
      } else {
        callback()
      }
    }

    const userForm = reactive({
      phone: '',
      otpCode: '',
      password: '',
      confirmPassword: '',
    })
    // 验证规则
    const userFormRules = reactive({
      phone: [{
        validator: validatePhone,
        trigger: 'blur'
      }],
      otpCode: [{
        validator: validateAuthCode,
        trigger: 'blur'
      }],
      password: [{
        validator: validatePass,
        trigger: 'blur'
      }],
      confirmPassword: [{
        validator: validatePass2,
        trigger: 'blur'
      }]
    })

    const userApi = new UserApi()

    // 发送验证码
    const sendAuthCode = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validateField('phone', (valid) => {
        if (valid) {
          disabled.value = true
          // 发送请求
          userApi.setData({ phone: userForm.phone }).getotp().then((res: any) => {
            if (res.status === Http.SUCCESS) {
              ElMessage.success(Http.sendEmail.SUCCESSMSG)
              countDown.value = 60
              const timer = setInterval(() => {
                countDown.value--
                if (countDown.value < 1) {
                  disabled.value = false
                  clearInterval(timer)
                }
              }, 1000)
            } else {
              ElMessage.success(Http.sendEmail.ERRORMAG)
            }
          }).catch((err: any) => {
            console.log(err)
          })
        }
      })
    }

    // 同意状态
    const agree = ref(true)
    // 提交注册信息
    const router = useRouter()
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          if (!agree.value) {
            ElMessage.warning('请勾选我已阅读并同意！')
          } else {
            userApi.setData({
              phone: userForm.phone,
              otpCode: userForm.otpCode
            }).judgeotp().then((res: any) => {
              if (res.status === Http.SUCCESS) {
                userApi.setData(userForm).register().then((resp: any) => {
                  if (resp.status === Http.SUCCESS) {
                    ElMessage.success('注册成功！')
                    const loading = ElLoading.service({
                      lock: true,
                      text: 'Loading',
                      background: 'rgba(0, 0, 0, 0.7)',
                    })
                    setTimeout(() => {
                      loading.close()
                      router.push('/login')
                    }, 2000)
                  } else {
                    ElMessage.error(resp.data.errMsg)
                  }
                }).catch((err: any) => {
                  ElMessage.error(err)
                })
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
      // ...toRefs(userForm),
      userFormRef,
      userForm,
      userFormRules,
      agree,
      submitForm,
      sendAuthCode,
      disabled,
      countDown
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
