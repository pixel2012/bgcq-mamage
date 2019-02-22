<template>
  <div class="layout">
    <div class="breadcrumb sub-main-box">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-main-box">
      <table border="1" cellspacing="0" bordercolor="#ECEBEB" class="tc">
        <tr>
          <td>用户名</td>
          <td colspan="2" class="username">suwiner</td>
          <td>注册时间</td>
          <td colspan="2">2019-02-20 16:12:35</td>
        </tr>
        <tr>
          <td>会员类别</td>
          <td colspan="2">商城客户</td>
          <td>邮箱</td>
          <td colspan="2">123456@qq.com</td>
        </tr>
        <tr>
          <td>账户余额</td>
          <td colspan="2">0.00元</td>
          <td>新短消息</td>
          <td colspan="2">无</td>
        </tr>
        <tr>
          <td>
            <router-link to="/">
              <i class="icon icon-1"></i>
              <div class="em-title">修改资料</div>
            </router-link>
          </td>
          <td>
            <router-link to="/">
              <i class="icon icon-2"></i>
              <div class="em-title">站内消息</div>
            </router-link>
          </td>
          <td>
            <router-link to="/">
              <i class="icon icon-3"></i>
              <div class="em-title">我的订单</div>
            </router-link>
          </td>
          <td>
            <router-link to="/">
              <i class="icon icon-4"></i>
              <div class="em-title">在线支付</div>
            </router-link>
          </td>
          <td>
            <router-link to="/">
              <i class="icon icon-5"></i>
              <div class="em-title">我的收藏</div>
            </router-link>
          </td>
          <td>
            <router-link to="/">
              <i class="icon icon-6"></i>
              <div class="em-title">我的购物车</div>
            </router-link>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  components: {}
};
</script>

<style scoped>
table {
  width: 100%;
  box-sizing: border-box;
}
table td {
  width: calc(100% / 6);
  color: #515151;
  padding: 20px 0;
  box-sizing: border-box;
}
table tr:last-child td {
  color: #515151;
  background-color: #f7f6f6;
}
.username {
  color: #d90505;
}
.icon {
  display: inline-block;
  width: 30px;
  height: 30px;
}
.icon-1 {
  background: url("../assets/img/icon-edit.png") no-repeat center/contain;
}
.icon-2 {
  background: url("../assets/img/icon-message.png") no-repeat center/contain;
}
.icon-3 {
  background: url("../assets/img/icon-order.png") no-repeat center/contain;
}
.icon-4 {
  background: url("../assets/img/icon-pay.png") no-repeat center/contain;
}
.icon-5 {
  background: url("../assets/img/icon-like.png") no-repeat center/contain;
}
.icon-6 {
  background: url("../assets/img/icon-cart.png") no-repeat center/contain;
}
.em-title {
  margin-top: 20px;
}
</style>
