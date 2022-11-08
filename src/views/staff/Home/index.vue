<template>
  <div id="sk-box">
    <el-row :gutter="20">
      <!--日历时间-->
      <el-col :span="8" class="calendar">
        <h3>日历时间<span><i class="iconfont icon-cog"></i></span></h3>
        <el-card>
          <el-calendar v-model="calendarValue"/>
          <p class="show-date">{{ dateToString(calendarValue, 'YYYY.MM.DD') }}</p>
          <div class="date-ok">确定</div>
        </el-card>
      </el-col>
      <!--金融新闻-->
      <el-col :span="16" class="news">
        <h3>金融新闻<span><i class="iconfont icon-cog"></i></span></h3>
        <el-card>
          <el-row :gutter="20">
            <el-col :span="10" class="news-list">
              <ul>
                <li>
                  <div>
                    <h4>金融时报丨X X 银行扎根湖湘本土服务实体经济</h4>
                    <p>发布日期：2022-03-14</p>
                  </div>
                </li>
                <li>
                  <div>
                    <h4>金融时报丨X X 银行扎根湖湘本土服务实体经济</h4>
                    <p>发布日期：2022-03-14</p>
                  </div>
                </li>
                <li>
                  <div>
                    <h4>金融时报丨X X 银行扎根湖湘本土服务实体经济</h4>
                    <p>发布日期：2022-03-14</p>
                  </div>
                </li>
              </ul>
            </el-col>
            <el-col :span="14" class="news-img">
              <img src="@/assets/images/staff/t1.png" height="348">
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!--待办事项-->
    <el-row class="backlog">
      <el-col class="backlog-title">
        <h3>待办事项
          <span>
            <el-input size="small" placeholder="查找明细">
              <template #suffix>
                <div style="font-size: 20px"><i class="iconfont icon-search"></i></div>
              </template>
            </el-input>
          </span>
        </h3>
      </el-col>
      <el-col class="backlog-table">
        <el-card>
          <el-table :data="tableData" style="width: 100%" empty-text="未查询到相关数据">
            <el-table-column prop="date" label="支出时间" width="180"/>
            <el-table-column prop="date" label="业务订单号" min-width="180"/>
            <el-table-column prop="name" label="产品信息" min-width="180"/>
            <el-table-column prop="name" label="购买数量" width="180"/>
            <el-table-column prop="name" label="支付类型" width="180"/>
            <el-table-column prop="name" label="支付金额" width="180"/>
            <!--            <el-table-column prop="address" label="Address" />-->
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
const { ref } = require('vue')
const { dateToString } = require('@/tool/util')

export default {
  name: 'homeV',
  setup () {
    // 日历
    const calendarValue = ref(new Date())

    // 表格数据
    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles'
      }
    ]
    return {
      calendarValue,
      tableData,
      dateToString
    }
  }
}
</script>

<style scoped lang="scss">
.el-calendar {
  --el-calendar-cell-width: 30px;
}

.el-card {
  border-radius: 10px;

  &.is-always-shadow {
    box-shadow: 0 0 12px 0 #ff600050;
  }
}

::v-deep(.calendar) {
  .el-card__body {
    //padding: 0;
    .el-calendar__body {
      padding: 0 20px 10px;

      .el-calendar-table {
        .el-calendar-day {
          text-align: center;
          line-height: 16px;

          &:hover {
            cursor: pointer;
            background-color: #ff600033;
          }
        }

        td {
          border-bottom: 0;
          border-right: 0;
          border-radius: 20px;
          overflow: hidden;

          &.is-selected {
            color: #ffffff;
            background-color: var(--header-bg-color);
          }
        }

        tr {
          td:first-child {
            border-left: 0;
          }

          &:first-child td {
            border-top: 0;
          }
        }
      }
    }
  }
}

#sk-box {
  > .el-row {
    margin-top: 40px;
  }
}

.calendar {
  h3 {
    font-size: 20px;
    font-weight: normal;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
  }

  .el-card {
    text-align: center;
  }

  .show-date {
    text-align: center;
  }

  .date-ok {
    display: inline-block;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    padding: 8px 40px;
    margin: 20px 0;
    border-radius: 20px;
    background-color: var(--header-bg-color);
  }
}

::v-deep(.news) {
  .el-card__body {
    padding: 30px;
  }
}

.news {
  h3 {
    font-size: 20px;
    font-weight: normal;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
  }

  .news-list {
    li {
      padding: 20px;
      border: 1px solid #aeaeae;
      border-radius: 8px;
      margin-top: 10px;

      &:nth-of-type(1) {
        margin-top: 0;
      }

      h4 {
        font-size: 18px;
        letter-spacing: 2px;
        line-height: 22px;
      }

      p {
        font-size: 14px;
        color: #aeaeae;
        margin-top: 8px;
      }
    }
  }
}

::v-deep(.backlog) {
  .el-table__header-wrapper {
    font-size: 16px;
  }
}

.backlog {
  .backlog-title {
    h3 {
      font-size: 20px;
      font-weight: normal;
      padding: 10px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
