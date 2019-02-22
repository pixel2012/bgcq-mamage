<template>
  <div class="frame">
    <el-container>
      <el-header class="top">
        <el-row class="w1200">
          <el-col :span="12">
            <img src="@/assets/logo.png" class="logo" alt="" />
          </el-col>
          <el-col :span="12" class="user-center tr">
            <img src="@/assets/img/header.png" class="" alt="" />
            <img src="@/assets/img/user.png" class="" alt="" />
            <span class="username">suwiner</span>
            <img src="@/assets/img/cart.png" class="" alt="" />
          </el-col>
        </el-row>
      </el-header>
      <el-main class="main">
        <el-container class="w1200">
          <el-aside width="280px" class="aside">
            <div class="aside-box">
              <div class="nav-lists">
                <router-link class="nav-list nav-ico-1" to="/">
                  会员中心首页
                </router-link>
              </div>
              <div class="nav-lists">
                <div class="nav-list nav-ico-2">
                  我的账号
                </div>
                <router-link class="nav-list" to="/">
                  修改资料
                </router-link>
                <router-link class="nav-list" to="/">
                  安全信息
                </router-link>
                <router-link class="nav-list" to="/">
                  我的收藏
                </router-link>
              </div>
              <div class="nav-lists">
                <div class="nav-list nav-ico-2">
                  财务管理
                </div>
                <router-link class="nav-list" to="/">
                  在线支付
                </router-link>
              </div>
              <div class="nav-lists">
                <div class="nav-list nav-ico-2">
                  购物信息
                </div>
                <router-link class="nav-list" to="/">
                  我的订单
                </router-link>
                <router-link class="nav-list" to="/carts">
                  我的购物车
                </router-link>
                <router-link class="nav-list" to="/">
                  我的收货地址
                </router-link>
              </div>
            </div>
          </el-aside>
          <el-main class="sub-main">
            <keep-alive v-if="$route.meta.keepAlive">
              <router-view></router-view>
            </keep-alive>
            <router-view v-else></router-view>
          </el-main>
        </el-container>
      </el-main>
      <el-footer>
        <div class="footer">
          <el-row class="w1200">
            <el-col :span="6">
              <img src="@/assets/img/qrcode.png" alt="">
            </el-col>
            <el-col :span="6">
              <div class="footer-title">大师坊</div>
              <div class="footer-item">
                <a href="">大师介绍</a>
              </div>
              <div class="footer-item">
                <a href="">精品展示</a>
              </div>
              <div class="footer-item">
                <a href="">大师传经</a>
              </div>
              <div class="footer-item">
                <a href="">大师定制</a>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="footer-title">淘宝汇</div>
              <div class="footer-item">
                <a href="">国画水墨</a>
              </div>
              <div class="footer-item">
                <a href="">书法策划</a>
              </div>
              <div class="footer-item">
                <a href="">紫砂陶瓷</a>
              </div>
              <div class="footer-item">
                <a href="">杂项文玩</a>
              </div>
              <div class="footer-item">
                <a href="">当代工艺</a>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="footer-title">热点点击</div>
              <div class="footer-item">
                <a href="">国画水墨</a>
              </div>
              <div class="footer-item">
                <a href="">书法策划</a>
              </div>
              <div class="footer-item">
                <a href="">紫砂陶瓷</a>
              </div>
              <div class="footer-item">
                <a href="">杂项文玩</a>
              </div>
              <div class="footer-item">
                <a href="">当代工艺</a>
              </div>
            </el-col>
          </el-row>
          <div class="w1200">
            <div class="f-l">
              <img src="img/index/vipcn.png" alt="">
            </div>
          </div>
        </div>

        <div class="copyright">
          <div class="w1200">
            <div class="footer_copyright">
              <p>运营商：郑州烁暄文化传媒有限公司</p>
              <p>电话： 0371-55170988 400-111-9688</p>
              <p>郑州市金水区经三路北95号格林融熙国际1102室</p>
              <p>豫ICP备18017354号-1</p>
            </div>
          </div>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "frame1",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style src="../assets/css/common.css"></style>
<style src="../assets/css/nav.css"></style>
