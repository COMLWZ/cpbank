<template>
  <el-container>
    <el-aside width="260px" class="aside">
      <h1>个人中心</h1>
      <el-menu text-color="#fff" active-text-color="#000" :default-active="menuActive">
        <el-menu-item v-for="(menu, i) in menuList" :key="i" :index="i.toString()" @click="selectedMenuHandle(i)">
          <i :class="['iconfont', menu.icon]" style="font-weight: bold"></i>&nbsp; {{ menu.t }}
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <div class="main">
        <div class="crumbs">
          <i :class="['iconfont',crumbs]" style="font-weight: bold"></i>
          <div class="crumbs-bg">
            <i :class="['iconfont',crumbs]" style="font-weight: bold"></i>
          </div>
        </div>
        <!-- 基本信息 -->
        <el-card class="basic-info" v-if="menuActive === '0'" :body-style="{ padding: '40px' }">
          <h3>基本信息
            <el-button :round="true" @click="userInfoUpdateVisible=true">修改信息</el-button>
          </h3>
          <el-row type="flex" justify="space-between">
            <el-col :span="11">
              <p>姓名：{{ userForm.name }}</p>
              <p>昵称：{{ userForm.nickName }}</p>
              <p>性别：{{ userForm.gender === 1 ? '男' : '女' }}</p>
              <p>年龄：{{ userForm.age }}</p>
            </el-col>
            <el-divider direction="vertical"/>
            <el-col :span="11">
              <p>身份证号：{{ userForm.idCard }}</p>
              <p>手机号：{{ userForm.phone }}</p>
              <p>工作状态：{{ userForm.workState }}</p>
            </el-col>
          </el-row>
          <el-dialog v-model="userInfoUpdateVisible" title="修改信息" width="30%">
            <el-form ref="userFormRef" :model="userForm" :rules="userFormRules" status-icon :label-width="120">
              <el-form-item label="姓名：" prop="name">
                <el-input v-model="userForm.name" autocomplete="off" placeholder="请输入真实姓名"/>
              </el-form-item>
              <el-form-item label="昵称：" prop="nickName">
                <el-input v-model="userForm.nickName" autocomplete="off" placeholder="请输入昵称"/>
              </el-form-item>
              <el-form-item label="性别：" prop="gender">
                <el-select v-model="userForm.gender" placeholder="请选择性别">
                  <el-option label="男" :value="1"></el-option>
                  <el-option label="女" :value="0"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="年龄：" prop="age">
                <el-input v-model="userForm.age" autocomplete="off" placeholder="请输入年龄"/>
              </el-form-item>
              <el-form-item label="身份证号：" prop="idCard">
                <el-input v-model="userForm.idCard" autocomplete="off" placeholder="请输入身份证号码"/>
              </el-form-item>
              <el-form-item label="手机号：" prop="phone">
                <el-input v-model="userForm.phone" autocomplete="off" placeholder="请输入手机号码"/>
              </el-form-item>
              <el-form-item label="工作状态：" prop="workState">
                <el-select v-model="userForm.workState" placeholder="请选择工作状态">
                  <el-option label="工作" value="工作"></el-option>
                  <el-option label="无业" value="无业"></el-option>
                  <el-option label="失业" value="失业"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="userInfoUpdateVisible = false">取消</el-button>
                <el-button type="primary" @click="submitForm(userFormRef)">提交</el-button>
              </span>
            </template>
          </el-dialog>
        </el-card>
        <!-- 意见反馈 -->
        <el-card class="fb" v-if="menuActive === '1'">
          <el-form v-model="fbForm">
            <el-form-item class="fb-item" label="使用云产品遇到问题，您偏向于通过哪些方式寻求帮助？（多选）">
              <el-checkbox-group v-model="fbForm.fb1">
                <el-checkbox label="提交订单"/>
                <el-checkbox label="在线客服"/>
                <el-checkbox label="查看订单"/>
                <el-checkbox label="拨打热线电话"/>
                <el-checkbox label="其他"/>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item class="fb-item" label="回顾您最新一次使用x x x在线客服，问题是否得到解决？">
              <el-radio-group v-model="fbForm.fb2">
                <el-radio :label="1">问题得到圆满解决，体验不错</el-radio>
                <el-radio :label="2">问题得到了解决，但体验欠佳</el-radio>
                <el-radio :label="3">问题没有得到根本解决</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="fb-item" label="您是否愿意推荐别人使用在线客服？">
              <el-radio-group v-model="fbForm.fb3">
                <el-radio :label="0">0分（强烈不推荐）</el-radio>
                <el-radio :label="1">1分</el-radio>
                <el-radio :label="2">2分</el-radio>
                <el-radio :label="3">3分</el-radio>
                <el-radio :label="4">4分</el-radio>
                <el-radio :label="5">5分</el-radio>
                <el-radio :label="6">6分</el-radio>
                <el-radio :label="7">7分</el-radio>
                <el-radio :label="8">8分</el-radio>
                <el-radio :label="9">9分</el-radio>
                <el-radio :label="10">10分（强烈推荐）</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="fb-item" label="对于在线支持，您有什么意见或建议？">
              <el-input v-model="fbForm.fb4" type="textarea" resize="none" :autosize="{ minRows: 4, maxRows: 8 }"/>
            </el-form-item>
            <el-form-item class="fb-item" label="如果您方便，能否留下您的联系方式，以便我们做后续回访？">
              <el-input v-model="fbForm.fb5"/>
            </el-form-item>
            <el-form-item>
              <el-button style="background-color: #ff6000;color: #fff">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <!-- 个人资产 -->
        <el-card class="p-assets" v-if="menuActive === '2'">
          <el-row :gutter="20">
            <el-col :span="12">
              <asset-card :status="true" :available-assets="60000" :unavailable-assets="0"></asset-card>
            </el-col>
            <el-col :span="12">
              <asset-card :today-revenue="400" :total-revenue="30000"></asset-card>
            </el-col>

            <el-col>
              <div class="detail">
                <p>支出明细</p>
                <el-table :data="tableData" style="width: 100%" empty-text="未查询到相关数据">
                  <el-table-column prop="date" label="支出时间" width="180"/>
                  <el-table-column prop="date" label="业务订单号" min-width="180"/>
                  <el-table-column prop="name" label="产品信息" min-width="180"/>
                  <el-table-column prop="name" label="购买数量" width="180"/>
                  <el-table-column prop="name" label="支付类型" width="180"/>
                  <el-table-column prop="name" label="支付金额" width="180"/>
                </el-table>
              </div>
            </el-col>
          </el-row>
        </el-card>

        <!-- 我的网点 -->
        <el-card v-if="menuActive === '3'" style="height: calc(100% - 100px)"
                 :body-style="{ height: '100%', boxSizing: 'border-box' }">
          <div style="float: right">
            <el-input placeholder="输入关键字" style="width: 280px">
              <template #suffix>
                <div style="font-size: 20px"><i class="iconfont icon-search"></i></div>
              </template>
            </el-input>
          </div>
          <iframe src="map.html" frameborder="0" style="width: 100%;height: calc(100% - 40px); margin-top: 10px;"/>
        </el-card>
        <!-- 消息中心 -->
        <el-card v-if="menuActive === '4'">
          <el-scrollbar max-height="640px" view-style="padding: 10px">
            <el-card v-for="i in 10" :key="i" style="margin-bottom: 14px;">
              <h2 style="margin-bottom: 15px;">消息标题 -- {{ i }}</h2>
              <p style="font-size: 14px;">消息内容：大方的示范课集装箱船健康v科技时代焕发u好地方</p>
            </el-card>
          </el-scrollbar>
        </el-card>
        <!-- 联系客服 -->
        <el-card class="service" v-if="menuActive === '5'">
          <div class="hi">
            <div>Hi, 尊敬的【某客户】，很高兴为您服务！</div>
          </div>
          <!-- 提问小助手 -->
          <div class="quiz" ref="quizRef">
            <div>
              <p>
                <i class="iconfont icon-tiwen"></i><span>提问小助手</span>
                <i class="iconfont icon-cuo" @click="quizCloseHandle"></i>
              </p>
              <div class="quiz-option">
                <div>更新身份证有效期</div>
                <div>更新身份证有效期</div>
                <div>更新身份证有效期</div>
                <div>更新身份证有效期</div>
                <div>更新身份证有效期</div>
                <div>更新身份证有效期</div>
              </div>
            </div>
          </div>
          <!-- 对话消息 -->
          <el-scrollbar height="300px" max-height="400px" view-style="margin-top:20px">
            <el-row class="massages" v-for="msg in msgList" :key="msg">
              <el-col :span="12">
                <div class="left" v-if="msg.flag===0">
                  <div class="pic">
                    <i class="iconfont icon-kefu1"></i>
                  </div>
                  <div class="msg">
                    <p>{{ msg.msg }}</p>
                  </div>
                </div>
              </el-col>
              <el-col :span="12" >
                <div class="right" v-if="msg.flag===1">
                  <div class="pic">
                    <img src="../../../assets/images/personal/user_p.png" width="50">
                  </div>
                  <div class="msg">
                    <p>{{ msg.msg }}</p>
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-scrollbar>
          <div class="send">
            <el-input v-model="sendMag" type="textarea" rows="4" resize="none"/>
            <el-button type="primary" @click="send">发送</el-button>
          </div>
        </el-card>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { onMounted, reactive, Ref, ref, unref } from 'vue'
import AssetCard from './AssetCard.vue'
import 'element-plus/es/components/loading/style/css'
import { ElMessage, FormInstance } from 'element-plus'

const { Http } = require('@/tool/WebEnum')
const { useRouter } = require('vue-router')
const { useStore } = require('vuex')
const { UserApi } = require('@/api/UserApi')
// const { io } = require('socket.io-client')

export default {
  name: 'PersonalCenterV',
  components: {
    AssetCard
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const userApi = new UserApi()

    if (!store.state.userInfo.age) {
      ElMessage.info('请完善个人信息！')
    }

    let socket: WebSocket
    onMounted(() => {
      selectedMenuHandle(Number(menuActive.value))
    })

    // 导航名称list
    const menuList = [
      {
        t: '个人信息',
        icon: 'icon-gerenxinxi'
      }, {
        t: '意见反馈',
        icon: 'icon-yijianfankui1'
      }, {
        t: '个人资产',
        icon: 'icon-wodezichan'
      }, {
        t: '我的网点',
        icon: 'icon-wangdian1'
      }, {
        t: '消息中心',
        icon: 'icon-xiaoxizhongxin'
      }, {
        t: '在线客服',
        icon: 'icon-kefu1'
      }
    ]
    // 当前导航
    const menuActive = ref(localStorage.getItem('personalDefaultActive') || '0')
    const selectedMenuHandle = (activeIndex: number) => {
      localStorage.setItem('personalDefaultActive', activeIndex.toString())
      menuActive.value = activeIndex.toString()
      crumbs.value = menuList[activeIndex].icon

      if (socket) {
        socket.close()
      }
      if (activeIndex === 5) {
        msgList.value.length = 0
        // 判断当前浏览器是否支持WebSocket
        if ('WebSocket' in window) {
          // token
          socket = new WebSocket('ws://118.31.32.85:8090/webSocket/0ec9494a54d040fd99ded2df26fd43df')
        } else {
          alert('Not support socket')
        }
        // 连接发生错误的回调方法
        socket.onerror = function () {
          ElMessage.error('error')
        }
        // 连接成功建立的回调方法
        socket.onopen = function () {
          console.log('open')
        }
        // 接收到消息的回调方法
        socket.onmessage = function (event) {
          msgList.value.push({
            flag: 0,
            msg: event.data
          })
        }
        // 连接关闭的回调方法
        socket.onclose = function () {
          console.log('close')
        }
        // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function () {
          socket.close()
        }
      }
    }

    // 面包屑
    const crumbs = ref(menuList[Number(menuActive.value)].icon)

    // 基本信息
    const userInfoUpdateVisible = ref(Boolean(router.currentRoute.value.query.update) || false)
    const userForm = reactive({
      age: store.state.userInfo.age,
      gender: store.state.userInfo.gender,
      idCard: store.state.userInfo.idCard,
      name: store.state.userInfo.name,
      nickName: store.state.userInfo.nickName,
      phone: store.state.userInfo.phone,
      workState: store.state.userInfo.workState,
    })
    // 验证规则
    const validatePhone = (_rule: object, value: string, callback: any) => {
      if (!/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(value)) {
        callback(new Error('手机号码格式有误！'))
      } else {
        callback()
      }
    }
    const userFormRules = reactive({
      age: [{
        required: true,
        message: '请输入年龄！',
        trigger: 'blur'
      }],
      gender: [{
        required: true,
        message: '请选择性别！',
        trigger: 'change'
      }],
      idCard: [{
        required: true,
        message: '请输入身份证号码！',
        trigger: 'blur'
      }],
      name: [{
        required: true,
        message: '请输入真实姓名！',
        trigger: 'blur'
      }],
      nickName: [{
        required: true,
        message: '请输入昵称！',
        trigger: 'blur'
      }],
      phone: [{
        required: true,
        message: '请输入手机号码！',
        trigger: 'blur'
      }, {
        validator: validatePhone,
        trigger: 'blur'
      }],
      workState: [{
        required: true,
        message: '请选择工作状态！',
        trigger: 'change'
      }],
    })

    const userFormRef = ref<FormInstance>()
    // 提交用户信息
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          userApi.setData(userForm).complete().then((res: any) => {
            if (res.status === Http.SUCCESS) {
              ElMessage.success('修改成功！')
              userInfoUpdateVisible.value = false
            } else {
              ElMessage.error(res.data.errMsg)
            }
          }).catch((err: any) => {
            ElMessage.error(err)
          })
        }
      })
    }

    // 意见反馈
    const fbForm = reactive({
      fb1: [],
      fb2: '',
      fb3: '',
      fb4: '',
      fb5: ''
    })

    // 在线客服
    const sendMag = ref('')
    const quizRef = ref(null)
    const quizCloseHandle = () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const el: HTMLDivElement = unref(quizRef)!
      el.style.display = 'none'
    }

    const msgList: Ref<any[]> = ref([])
    // 发送消息
    const send = () => {
      msgList.value.push({
        flag: 1,
        msg: sendMag.value
      })
      console.log(msgList)
      socket.send(sendMag.value)
      sendMag.value = ''
    }

    return {
      menuList,
      menuActive,
      crumbs,
      userInfoUpdateVisible,
      userForm,
      userFormRules,
      userFormRef,
      submitForm,
      fbForm,
      selectedMenuHandle,
      sendMag,
      quizRef,
      quizCloseHandle,
      send,
      msgList
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .aside {
  background-image: url("~@/assets/images/personal/personal-aside-bg.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin-right: 20px;
  border-radius: 20px;
  box-shadow: 0 0 12px 0 #ff600050;

  h1 {
    font-size: 24px;
    font-weight: bold;
    padding: 60px 0 40px;
    text-align: center;
    color: #fff;
  }

  .el-menu {
    border-right: 0;
    background-color: transparent;
  }

  .el-menu-item {
    height: 46px;
    font-size: 18px;
    padding: 0 !important;
    justify-content: center;
    position: relative;
    transition: all .5s;

    &.is-active {
      background-color: #fcf4f2;
      transition: all .5s;
      color: #1d1d1d;

      &:after {
        content: "";
        display: block;
        background-color: #ffbc93;
        height: 100%;
        width: 10px;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    &:hover {
      color: #1d1d1d;
      transition: all .5s;
      background-color: #fcf4f2;
    }
  }
}

::v-deep .el-divider--vertical {
  width: 2px;
  height: inherit;
  background-color: #ff6000;
  border: 0;
}

.el-container {
  margin: 60px 0;
  min-height: 760px;

  .el-main {
    background-image: url("~@/assets/images/personal/personal-main-bg.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 20px;
    padding: 0;
    box-shadow: 0 0 12px 0 #ff600050;
  }
}

.main {
  height: 100%;
  box-sizing: border-box;

  .crumbs {
    color: #fff;
    font-size: 30px;
    padding: 20px 20px 40px;
    position: relative;
    background-image: url(http://127.0.0.1:3000/img/personal-main-bg.caaba047.png);
    background-position: center;

    .crumbs-bg {
      font-size: 120px;
      position: absolute;
      top: 0;
      right: 60px;
      transform: rotate(320deg);
      opacity: 0.3;
    }
  }

  h3 {
    font-size: 18px;
    font-weight: unset;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }

  > .el-card {
    position: relative;
    top: -20px;
    border-radius: 20px;
    min-height: calc(100% - 74px);
  }

  .basic-info {
    p {
      margin-top: 15px;
      padding-bottom: 20px;
    }
  }

  .fb {
    .fb-item {
      flex-direction: column;
      align-items: flex-start;

      ::v-deep .el-form-item__content {
        min-width: 50%;
      }
    }
  }

  .p-assets {
    .detail {
      margin-top: 40px;

      > p {
        padding: 20px 0;
      }
    }
  }

  .service {
    .hi, .quiz {
      display: flex;
      justify-content: center;
    }

    .hi {
      font-size: 14px;

      div {
        display: inline-block;
        padding: 10px 50px;
        margin-bottom: 20px;
        border-radius: 10px;
        box-shadow: 0 0 8px 0 #aeaeae;
      }
    }

    .quiz {
      > div {
        display: inline-block;
        padding: 20px;
        width: auto;
        border-radius: 10px;
        box-shadow: 0 0 8px 0 #aeaeae;
      }

      p {
        font-size: 16px;
        font-weight: bold;
        position: relative;

        i, span {
          vertical-align: middle;
        }

        .icon-tiwen {
          color: #f3dc84;
          font-size: 20px;
          margin-right: 10px;
        }

        .icon-cuo {
          position: absolute;
          right: 0;

          &:hover {
            color: #ff6000;
          }
        }
      }

      .quiz-option {
        margin-top: 20px;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
        font-size: 14px;

        div {
          color: #ff6000;
          padding: 12px 20px;
          border-radius: 20px;
          border: 1px solid #ff6000;

          &:hover {
            background-color: #ff6000;
            color: #fff;
          }
        }
      }
    }

    .massages {

      .left, .right {
        display: flex;
      }

      .left {
        .pic {
          width: 50px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          border-radius: 50%;
          background-color: #ff600030;

          .iconfont {
            color: #ff6000;
            font-size: 32px;
          }
        }
      }

      .right {
        flex-direction: row-reverse;
      }

      .msg {
        height: fit-content;
        margin-left: 15px;
        margin-right: 15px;
        padding: 15px;
        border-radius: 15px;
        box-shadow: 0 0 8px 0 #aeaeae50;
      }
    }

    .send {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .el-button {
        margin-top: 20px;
      }
    }
  }
}

</style>
