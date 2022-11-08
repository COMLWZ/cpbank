<template>
  <div id="es-box">
    <el-row :gutter="40">
      <el-col :span="12">
        <el-card>
          <div class="card-top bg1">
            <h1>
              <span>已通过<i class="iconfont icon-check-circle-fill" style="margin-left: 10px"></i></span>
              <el-select v-model="selectedSuccessSecKillId" clearable placeholder="Select">
                <el-option v-for="item in secKillList" :key="item.id" :label="item.name" :value="item.id"
                           @click="getLogSuccessList(item.id, item.seckillPrice)"/>
              </el-select>
            </h1>
            <div class="rod"></div>
            <p>通过人数：{{ logSuccessList.length }}（人）</p>
            <p>通过金额：{{ logSuccessList.length * successPrice / 10000 }}（万元）</p>
          </div>
          <div class="user-list">
            <el-scrollbar height="785px">
              <ul>
                <li v-for="item in logSuccessList" :key="item.id">
                  <div>
                    <el-image style="width: 80px; height: 80px" fit="cover"
                              :src="require('@/assets/images/img/icon-test_'+ Math.round(Math.random()*18+1) +'.png')"/>
                    <div class="userinfo">
                      <h3>用户名：{{ item.userName }} <span><i class="iconfont icon-cog"></i></span></h3>
                      <p>时间：{{ item.seckillTime }} </p>
                      <p>信息：{{ item.msg }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="card-top bg2">
            <h1><span>未通过<i class="iconfont icon-exclamationcircle"></i></span>
              <el-select v-model="selectedFailSecKillId" clearable placeholder="Select">
                <el-option v-for="item in secKillList" :key="item.id" :label="item.name" :value="item.id"
                           @click="getLogFailList(item.id, item.seckillPrice)"/>
              </el-select>
            </h1>
            <div class="rod"></div>
            <p>未通过人数：{{ logFailList.length }}（人）</p>
            <p>未通过金额：{{ logFailList.length * failPrice / 10000 }}（万元）</p>
          </div>
          <div class="user-list">
            <el-scrollbar height="785px">
              <ul>
                <li v-for="item in logFailList" :key="item.id">
                  <div>
                    <el-image style="width: 80px; height: 80px" fit="cover"
                              :src="require('@/assets/images/img/icon-test_'+ Math.round(Math.random()*18+1) +'.png')"/>
                    <div class="userinfo">
                      <h3>用户名：{{ item.userName }} <span><i class="iconfont icon-cog"></i></span></h3>
                      <p>时间：{{ item.seckillTime }} </p>
                      <p>信息：{{ item.msg }}</p>
                    </div>
                  </div>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { reactive, toRefs } from 'vue'

const { SecKillApi } = require('@/api/SecKillApi')
const { Http } = require('@/tool/WebEnum')

export default {
  name: 'EarlySift',
  setup () {
    const secKillApi = new SecKillApi()
    const data = reactive({
      secKillList: [],
      selectedSuccessSecKillId: '',
      logSuccessList: [],
      successPrice: 0,
      selectedFailSecKillId: '',
      logFailList: [],
      failPrice: 0,
    })

    // 秒杀活动列表
    secKillApi.secKillList().then((res: any) => {
      if (res.status === Http.SUCCESS) {
        data.secKillList = res.data
        data.selectedSuccessSecKillId = res.data[0].id
        data.selectedFailSecKillId = res.data[0].id
        console.log(res.data[0].seckillPrice)
        getLogSuccessList(data.selectedSuccessSecKillId, res.data[0].seckillPrice)
        getLogFailList(data.selectedFailSecKillId, res.data[0].seckillPrice)
      } else {
        ElMessage.error(res.data.errMsg)
      }
    }).catch((err: any) => {
      ElMessage.error(err)
    })

    const getLogSuccessList = (id: any, price: number) => {
      secKillApi.setData(id).secKillGetLogSuccess().then((res: any) => {
        if (res.status === Http.SUCCESS) {
          data.logSuccessList = res.data
          data.successPrice = price
        } else {
          ElMessage.error(res.data.errMsg)
        }
      }).catch((err: any) => {
        ElMessage.error(err)
      })
    }

    const getLogFailList = (id: any, price: number) => {
      secKillApi.setData(id).secKillGetLogFail().then((res: any) => {
        if (res.status === Http.SUCCESS) {
          data.logFailList = res.data
          data.failPrice = price
        } else {
          ElMessage.error(res.data.errMsg)
        }
      }).catch((err: any) => {
        ElMessage.error(err)
      })
    }
    return {
      ...toRefs(data),
      getLogSuccessList,
      getLogFailList
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep(.el-card) {
  border-radius: 20px;

  &.is-always-shadow {
    box-shadow: 0 0 12px 0 #ff600050;
  }

  .el-card__body {
    padding: 0;
  }
}

#es-box {
  margin-top: 40px;

  .card-top {
    padding: 50px 30px;
    border-radius: 20px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: bottom;
    box-shadow: 0 0 12px 0 #ff600050;

    h1 {
      font-size: 28px;
      font-weight: normal;
      display: flex;
      justify-content: space-between;

      span {
        color: #ff6000;
      }
    }

    .rod {
      height: 7px;
      margin-top: 30px;
      background-image: url("~@/assets/images/staff/es1.png");
      background-repeat: no-repeat;
    }

    p {
      font-size: 20px;
      margin-top: 30px;
    }
  }

  .user-list {
    ul {
      padding: 30px;
    }

    li {
      padding: 20px 0;
      border-top: 1px solid #aeaeae;

      &:nth-of-type(1) {
        border: 0;
      }

      > div {
        display: flex;

        .el-image {
          border-radius: 10px;
        }

        .userinfo {
          width: calc(100% - 100px);
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-evenly;

          h3 {
            font-size: 20px;
            font-weight: normal;
            display: flex;
            justify-content: space-between;
          }

          p {
            font-size: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            > span {
              font-size: 20px;
              font-weight: bold;

              span {
                font-size: 14px;
              }
            }
          }
        }
      }
    }
  }
}

.bg1 {
  background-image: url("~@/assets/images/staff/es2.png");
}

.bg2 {
  background-image: url("~@/assets/images/staff/es3.png");
}
</style>
