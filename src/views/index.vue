<template>
  <div class="layout">
    <breadcrumb :current="$route.meta.name"></breadcrumb>
    <div class="sub-main-box">
      <table border="1" cellspacing="0" bordercolor="#ECEBEB" class="tc">
        <tr>
          <td>用户名</td>
          <td colspan="2" class="username">
            {{ $store.state.userInfo.nickName }}
          </td>
          <td>注册时间</td>
          <td colspan="2">
            {{ $store.state.userInfo.registerTime | dateFormate }}
          </td>
        </tr>
        <tr>
          <td>会员类别</td>
          <td colspan="2">{{ $store.state.userInfo.fromSource }}</td>
          <td>邮箱</td>
          <td colspan="2">{{ $store.state.userInfo.email }}</td>
        </tr>
        <tr>
          <td>账户余额</td>
          <td colspan="2">
            {{ $store.state.userInfo.balance | numToMoney }}元
          </td>
          <td>新短消息</td>
          <td colspan="2">{{ $store.state.userInfo.noticeCount }}</td>
        </tr>
        <tr>
          <td>积分</td>
          <td colspan="2">{{ $store.state.userInfo.integrate }}元</td>
          <td>优惠券</td>
          <td colspan="2">{{ $store.state.userInfo.coupon }}</td>
        </tr>
        <tr>
          <td>
            <router-link to="/modified">
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
            <router-link to="/order">
              <i class="icon icon-3"></i>
              <div class="em-title">我的订单</div>
            </router-link>
          </td>
          <td>
            <router-link to="/pay">
              <i class="icon icon-4"></i>
              <div class="em-title">在线支付</div>
            </router-link>
          </td>
          <td>
            <router-link to="/like">
              <i class="icon icon-5"></i>
              <div class="em-title">我的收藏</div>
            </router-link>
          </td>
          <td>
            <router-link to="/carts">
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
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {}
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
