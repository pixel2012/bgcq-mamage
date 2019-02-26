<template>
  <div class="layout">
    <breadcrumb :current="$route.meta.name"></breadcrumb>
    <div class="sub-main-box">
      <el-container>
        <el-header>
          <el-row>
            <el-col :span="4">
              <el-button
                type="danger"
                :disabled="multipleSelection.length === 0"
                @click="
                  remove(
                    multipleSelection
                      .map(item => {
                        return item.id;
                      })
                      .join(',')
                  )
                "
                >删除
              </el-button>
            </el-col>
            <el-col :span="20" class="amount tr">
              <span>已选中 {{ multipleSelection.length }} 件</span>
              <span>合计金额：￥{{ amount }}</span>
              <span
                ><el-button
                  type="primary"
                  :disabled="multipleSelection.length === 0"
                  @click="making"
                  >结算</el-button
                ></span
              >
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <el-table
            :data="tableData"
            border
            stripe
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="缩略图">
              <template slot-scope="scope">
                <img
                  :src="scope.row.productThumbPictureUrl"
                  width="100%"
                  alt=""
                />
              </template>
            </el-table-column>
            <el-table-column prop="productName" label="商品名称">
            </el-table-column>
            <el-table-column prop="productSkuPrice" label="单价（元）">
            </el-table-column>
            <el-table-column prop="price" label="数量">
              <template slot-scope="scope">
                <el-input-number
                  v-model="scope.row.productSkuCount"
                  @change="handleChange($event, scope.row)"
                  :min="1"
                  size="small"
                  label="描述文字"
                ></el-input-number>
              </template>
            </el-table-column>
            <el-table-column prop="productskuSumMoney" label="总价(元)">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >查看
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="remove(scope.row.id)"
                  >删除
                </el-button>
              </template>
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
  name: "carts",
  components: {},
  data() {
    return {
      amount: 0,
      multipleSelection: [],
      tableData: [],
      page: {
        index: 1,
        size: 10,
        count: 0
      }
    };
  },
  mounted() {
    this.getLlists();
  },
  methods: {
    getLlists() {
      this.$ajax({
        context: this,
        url: this.$api.cart.lists,
        method: "get",
        query: {
          page: this.page.index,
          size: this.page.size
        },
        callback: data => {
          // data.list.map(item => {
          //   item.checked = false;
          // });
          this.tableData = data.list;
          this.page.count = data.dataCount;
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
      this.$ajax({
        context: this,
        url: this.$api.cart.changeNumber,
        method: "post",
        body: {
          id: row.id,
          number: value
        },
        callback: () => {
          row.productskuSumMoney = row.productSkuPrice * value;
        },
        failback: () => {
          //result:false
        },
        errorback: () => {
          //404,500
        }
      });
    },
    making() {
      this.$router.push({
        path: `/make/${this.multipleSelection
          .map(item => {
            return item.id;
          })
          .join(",")}`
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
