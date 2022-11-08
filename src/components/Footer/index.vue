<template>
  <div class="footer-box">
    <el-row>
      <el-col :span="10" class="footer-left">
        <div class="logo-name">
          <a href="javascipt:;" class="logo"></a><span>LightNing</span>
        </div>
        <div class="hot-line">

        </div>
      </el-col>
      <el-col :span="14" class="footer-right">
        <el-row :gutter="40">
          <el-col :span="6">
            <dl>
              <dt>关于我们</dt>
              <dd>产品简介</dd>
              <dd>团队介绍</dd>
              <dd>发展历程</dd>
              <dd>闪电秒杀</dd>
              <dd>加入我们</dd>
            </dl>
          </el-col>
          <el-col :span="6">
            <dl>
              <dt>我们无处不在</dt>
              <dd>本部地址</dd>
              <dd>网点地图</dd>
              <dd>邮政信息</dd>
              <dd>快捷通道</dd>
              <dd>一站服务</dd>
            </dl>
          </el-col>
          <el-col :span="6">
            <dl>
              <dt>投诉受理</dt>
              <dd>投诉与咨询电话</dd>
              <dd>掌上Lightning</dd>
              <dd>电子邮箱信函</dd>
              <dd>微信公众号</dd>
              <dd>点击查看投诉处理流程</dd>
            </dl>
          </el-col>
        </el-row>
        <p>2022 © Copyright Lightning 备案号：X X X X 备17012314号 </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'FooterC',
  setup () {
    return {}
  }
}
</script>

<style scoped lang="scss">
.footer-box {
  margin: 60px 0 0;

  .footer-left {
    .logo-name {
      font-size: 40px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      color: #fff;
      font-weight: bold;
      .logo{
        display: block;
        width: 200px;
        height: 200px;
        background-image: url("~@/assets/images/logo.png");
        background-size: contain;
      }
    }

    .hot-line {
      font-size: 20px;
      color: #fff;

      p {
        margin-top: 10px;
      }
    }
  }

  .footer-right {
    color: #fff;

    dl {
      dd {
        margin-top: 10px;
        font-size: 14px;
      }
    }

    > p {
      margin-top: 40px;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
