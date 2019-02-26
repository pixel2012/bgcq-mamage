<template>
  <div class="layout">
    <breadcrumb :current="$route.meta.name"></breadcrumb>
    <div class="sub-main-box">
      <el-container>
        <el-header>
          <el-row v-if="JSON.stringify(order) !== '{}'">
            <el-col :span="24" class="amount tr">
              <span>合计金额(免运费)：￥{{ order.sumMoney }}</span>
              <span
                ><el-button type="primary" @click="clearing"
                  >立即付款</el-button
                ></span
              >
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <div style="margin-bottom: 10px;">
            收货地址：
            <el-select
              v-model="addressId"
              placeholder="请选择收货地址"
              style="width: 90%;"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <el-table
            v-if="order.productSkuList"
            :data="order.productSkuList"
            border
            stripe
            style="width: 100%"
          >
            <el-table-column label="缩略图">
              <template slot-scope="scope">
                <img :src="scope.row.thumbPictureUrl" width="100%" alt="" />
              </template>
            </el-table-column>
            <el-table-column prop="name" label="商品名称"> </el-table-column>
            <el-table-column prop="skuPrice" label="单价（元）">
            </el-table-column>
            <el-table-column prop="price" label="数量">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.skuCount"
                  :min="1"
                  disabled
                  size="small"
                  label="描述文字"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column prop="skuSumMoney" label="总价(元)">
            </el-table-column>
          </el-table>
        </el-main>
        <!--<el-footer>-->
        <!--<el-pagination-->
        <!--v-if="tableData.length > 0"-->
        <!--background-->
        <!--layout="prev, pager, next"-->
        <!--:current-page="page.index"-->
        <!--:page-size="page.size"-->
        <!--:total="page.count"-->
        <!--&gt;-->
        <!--</el-pagination>-->
        <!--</el-footer>-->
      </el-container>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "make",
  components: {},
  data() {
    return {
      options: [],
      addressId: "",
      order: {}
    };
  },
  mounted() {
    this.getLlists();
    this.getAddressLists();
    this.getAddressDefault();
  },
  methods: {
    getAddressDefault() {
      this.$ajax({
        context: this,
        url: this.$api.location.getDefault,
        method: "get",
        callback: data => {
          this.addressId = data.id;
        },
        failback: () => {
          //result:false
        },
        errorback: () => {
          //404,500
        }
      });
    },
    getAddressLists() {
      this.$ajax({
        context: this,
        url: this.$api.location.lists,
        method: "get",
        callback: data => {
          data.list.forEach(item => {
            this.options.push({
              label:
                item.realName +
                " " +
                item.phoneNumber +
                "， " +
                item.provinceName +
                item.cityName +
                item.countyName,
              value: item.id
            });
          });
        },
        failback: () => {
          //result:false
        },
        errorback: () => {
          //404,500
        }
      });
    },
    getLlists() {
      this.$ajax({
        context: this,
        url: this.$api.cart.getOrder,
        method: "post",
        body: {
          ids: this.$route.params.id
        },
        callback: data => {
          this.order = data;
        },
        failback: () => {
          //result:false
        },
        errorback: () => {
          //404,500
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick() {
      this.$message.info("敬请期待");
    },
    remove(id) {
      this.$ajax({
        context: this,
        url: this.$api.cart.remove,
        method: "delete",
        query: {
          id
        },
        callback: () => {
          this.getLlists();
        },
        failback: () => {
          //result:false
        },
        errorback: () => {
          //404,500
        }
      });
    },
    handleChange(value, row) {
      row.productskuSumMoney = row.productSkuPrice * value;
    },
    clearing() {
      this.$ajax({
        context: this,
        url: this.$api.cart.createOrder,
        method: "post",
        body: {
          ids: this.$route.params.id,
          addressId: this.addressId
        },
        callback: () => {
          this.$message.info("跳转去支付");
        },
        failback: () => {
          //result:false
        },
        errorback: () => {
          //404,500
        }
      });
    }
  },
  watch: {
    multipleSelection: {
      handler(newValue) {
        this.amount = 0;
        newValue.forEach(item => {
          this.amount += item.productskuSumMoney;
        });
      },
      deep: true
    }
  }
};
</script>
<style scoped>
.amount span {
  color: #515151;
  margin-left: 15px;
}
</style>
