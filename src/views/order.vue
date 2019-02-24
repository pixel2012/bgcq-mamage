<template>
  <div class="layout">
    <breadcrumb :current="$route.meta.name"></breadcrumb>
    <div class="sub-main-box">
      <el-container>
        <el-header>
          <el-row>
            <el-col :span="12">
              <el-button
                type="danger"
                :disabled="multipleSelection.length === 0"
                >删除</el-button
              >
            </el-col>
            <el-col :span="12">
              <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline tr"
              >
                <el-form-item>
                  <el-input
                    v-model="formInline.key"
                    placeholder="商品标题/订单号"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <div class="order-lists">
            <div class="order-item" v-for="item in tableData" :key="item.id">
              <div class="order-title">
                <span><el-checkbox v-model="item.checked"></el-checkbox></span>
                <span class="order-date">{{ item.createTime }}</span>
                <span class="order-id">订单编号：{{ item.id }}</span>
                <el-button @click="look(item.id)" size="mini"
                  >查看订单</el-button
                >
              </div>
              <table
                style="width:100%;"
                border="1"
                cellspacing="0"
                bordercolor="#ECEBEB"
                class="tc"
              >
                <tr v-for="product in item.productSkuList" :key="product.id">
                  <td>
                    <img
                      :src="product.thumbPictureUrl"
                      width="100%"
                      height="200"
                      alt=""
                    />
                  </td>
                  <td>
                    {{ product.name }}
                  </td>
                  <td>￥{{ product.skuPrice }}</td>
                  <td>1</td>
                  <td>
                    <div>￥6000.00</div>
                    <div>(含运费￥0.00)</div>
                  </td>
                  <td>
                    待付款
                  </td>
                  <td>
                    <el-button>撤销</el-button>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </el-main>
        <el-footer>
          <el-pagination background layout="prev, pager, next" :total="15">
          </el-pagination>
        </el-footer>
      </el-container>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form" inline>
        <el-form-item
          v-for="(value, key, i) in form"
          :label="key + '：'"
          :key="i"
          :label-width="formLabelWidth"
        >
          {{ value }}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "order",
  components: {},
  data() {
    return {
      checked: false,
      formInline: {
        key: ""
      },
      multipleSelection: [],
      tableData: [],
      page: {
        index: 1,
        size: 10,
        count: 0
      },
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px"
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.$ajax({
        context: this,
        url: this.$api.order.lists,
        method: "get",
        query: {
          status: 0,
          page: this.page.index,
          size: this.page.size
        },
        body: {},
        callback: data => {
          console.log(data);
          data.map(item => {
            item.checked = false;
          });
          this.tableData = data;
        },
        failback: () => {
          //result:false
        },
        errorback: () => {
          //404,500
        }
      });
    },
    look(id) {
      this.dialogFormVisible = true;
      this.$ajax({
        context: this,
        url: this.$api.order.detail,
        method: "get",
        query: {
          id
        },
        body: {},
        callback: data => {
          console.log(data);
          this.form = data;
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
    onSubmit() {
      console.log(this.formInline);
    }
  }
};
</script>
<style scoped>
.order-item {
  margin-bottom: 40px;
}
.order-title {
  margin-bottom: 20px;
  background-color: #eee;
  padding: 6px 10px;
}
.order-title span {
  display: inline-block;
}
.order-date {
  margin: 0 20px;
}
table td {
  width: calc(100% / 8);
}
</style>
