<template>
  <div class="layout">
    <breadcrumb :current="$route.meta.name"></breadcrumb>
    <div class="sub-main-box">
      <el-container>
        <el-header>
          <el-row>
            <el-col :span="4">
              <el-button :disabled="multipleSelection.length === 0" size="mini"
                >批量删除</el-button
              >
            </el-col>
            <el-col :span="20">
              <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline tr"
              >
                <el-form-item label="订单状态" prop="status">
                  <el-select
                    v-model="formInline.status"
                    placeholder="请选择"
                    size="mini"
                  >
                    <el-option :value="0" label="全部"></el-option>
                    <el-option :value="1" label="待付款"></el-option>
                    <el-option :value="2" label="待发货"></el-option>
                    <el-option :value="3" label="待收货"></el-option>
                    <el-option :value="4" label="待评价"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item prop="key">
                  <el-input
                    v-model="formInline.key"
                    placeholder="商品标题/订单号"
                    size="mini"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" size="mini" @click="search"
                    >查询</el-button
                  >
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <div class="order-lists" v-if="tableData.length > 0">
            <div
              class="order-item"
              v-for="(item, index) in tableData"
              :key="index"
            >
              <el-row class="order-title">
                <el-col :span="22">
                  <span
                    ><el-checkbox v-model="item.checked"></el-checkbox
                  ></span>
                  <span class="order-date">{{
                    item.createTime | dateFormate
                  }}</span>
                  <span class="order-id">订单编号：{{ item.id }}</span>
                  <span>{{ item.status | statusTozh }}</span>
                </el-col>
                <el-col :span="2" class="tr">
                  <el-button @click="remove(item.id)" size="mini"
                    ><i class="el-icon-delete"></i
                  ></el-button>
                </el-col>
              </el-row>
              <table
                style="width:100%;"
                border="1"
                cellspacing="0"
                bordercolor="#ECEBEB"
                class="tc"
              >
                <tr>
                  <td colspan="2">商品信息</td>
                  <td>单价</td>
                  <td>数量</td>
                  <td>实付款</td>
                  <td>操作</td>
                </tr>
              </table>

              <table
                style="width:100%;"
                border="1"
                cellspacing="0"
                bordercolor="#ECEBEB"
                class="tc"
              >
                <tr v-for="(product, num) in item.productSkuList" :key="num">
                  <td>
                    <img
                      :src="product.thumbPictureUrl"
                      width="100%"
                      height="150"
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
                    <div>
                      <router-link to="/" class="link">
                        <el-button size="mini">查看</el-button>
                      </router-link>
                    </div>
                    <div>
                      <el-button
                        v-if="item.status === 4"
                        size="mini"
                        @click="evaluate(item.id, product.id)"
                        >评价</el-button
                      >
                    </div>
                  </td>
                </tr>
              </table>

              <el-row class="order-footer">
                <el-col :span="12">
                  <span class="order-money">总金额：{{ item.realMoney }} </span>
                  <span class="order-money"
                    >运费：{{ item.shippingMoney }}
                  </span>
                </el-col>
                <el-col :span="12" class="tr">
                  <el-button @click="getDetail(item.id)" size="mini"
                    >查看订单</el-button
                  >
                  <el-button
                    v-if="item.status === 1"
                    size="mini"
                    @click="pay(item.id)"
                    >立即支付</el-button
                  >
                  <el-button
                    v-if="item.status === 3"
                    size="mini"
                    @click="getLogistics(item.id)"
                    >查看物流</el-button
                  >
                  <el-button
                    v-if="item.status === 3"
                    size="mini"
                    @click="confirm(item.id)"
                    >确认收货</el-button
                  >
                </el-col>
              </el-row>
            </div>
          </div>
          <div v-else class="empty">暂无数据</div>
        </el-main>
        <el-footer>
          <el-pagination
            v-if="tableData.length > 0"
            background
            layout="prev, pager, next"
            :current-page="page.index"
            :page-size="page.size"
            :total="page.count"
          >
          </el-pagination>
        </el-footer>
      </el-container>
    </div>
    <el-dialog title="订单详情" :visible.sync="dialog.formVisible">
      <el-form v-if="JSON.stringify(form) !== '{}'" :model="form" inline>
        <el-form-item label="产品数量：">{{
          form.productSumCount
        }}</el-form-item>
        <el-form-item label="产品金额：">{{
          form.productSumMoney
        }}</el-form-item>
        <el-form-item label="运费金额：">{{ form.shippingMoney }}</el-form-item>
        <el-form-item label="总金额：">{{ form.sumMoney }}</el-form-item>
        <el-form-item label="物流单号：">{{ form.addressExtSno }}</el-form-item>
        <el-form-item label="店铺ID：">{{ form.shopId }}</el-form-item>
        <el-form-item label="支付单号：">{{ form.extSno }}</el-form-item>
        <el-form-item label="订单创建时间：">{{
          form.createTimeStamp | dateFormate
        }}</el-form-item>
        <el-form-item label="成功支付时间：">{{
          form.paySuccessTimeStamp | dateFormate
        }}</el-form-item>
        <el-form-item label="物流发货时间：">{{
          form.shipmentsTimeStamp | dateFormate
        }}</el-form-item>
        <el-form-item label="确认收货时间：">{{
          form.receiveTimeStamp | dateFormate
        }}</el-form-item>
        <el-form-item label="评价时间：">{{
          form.evaluateTimeStamp | dateFormate
        }}</el-form-item>
        <el-form-item label="订单状态：">{{
          form.status | statusTozh
        }}</el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="订单评价" :visible.sync="dialog.formVisible2">
      <el-form :model="form2" ref="form2">
        <el-form-item
          label="评价内容"
          prop="content"
          :label-width="formLabelWidth"
        >
          <el-input
            type="textarea"
            v-model="form2.content"
            :rows="4"
            placeholder="请输入评价内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="上传图片" :label-width="formLabelWidth">
          <el-upload
            ref="upload"
            :action="$config.ip + $api.upload.binary"
            :headers="{
              token: $config.token
            }"
            list-type="picture-card"
            :before-upload="beforeUpload"
            :on-success="handlePictureCardSuccess"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialog.imgVisible">
            <img width="100%" :src="form2.pictureUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitComments" type="primary">立即提交</el-button
          ><el-button @click="resetForm('form2')">重置</el-button
          >{{ form2.pictureUrlLists }}
        </el-form-item>
      </el-form>
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
        status: 0,
        key: ""
      },
      multipleSelection: [],
      tableData: [],
      page: {
        index: 1,
        size: 10,
        count: 0
      },
      loading: {},
      dialog: {
        formVisible: false,
        formVisible2: false,
        imgVisible: false
      },
      form: {},
      form2: {
        orderId: "",
        productId: "",
        content: "",
        pictureUrl: "",
        pictureUrlList: ""
      },
      formLabelWidth: "80px"
    };
  },
  mounted() {
    this.getLists();
  },
  methods: {
    search() {
      this.getLists();
    },
    getLists() {
      this.$ajax({
        context: this,
        url: this.$api.order.lists,
        method: "get",
        query: {
          ...this.formInline,
          page: this.page.index,
          size: this.page.size
        },
        callback: data => {
          data.list.map(item => {
            item.checked = false;
          });
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
    getDetail(id) {
      this.dialog.formVisible = true;
      this.$ajax({
        context: this,
        url: this.$api.order.detail,
        method: "get",
        query: {
          id
        },
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
    remove(id) {
      this.$ajax({
        context: this,
        url: this.$api.order.cancel,
        method: "post",
        query: {
          id
        },
        callback: () => {
          this.getLists();
        },
        failback: () => {
          //result:false
        },
        errorback: () => {
          //404,500
        }
      });
    },
    pay() {},
    getLogistics() {
      return this.$message.info("正在开发中...");
    },
    confirm(id) {
      this.$ajax({
        context: this,
        url: this.$api.order.confirm,
        method: "post",
        query: {
          id
        },
        callback: () => {
          this.getLists();
        },
        failback: () => {
          //result:false
        },
        errorback: () => {
          //404,500
        }
      });
    },
    evaluate(oid, pid) {
      this.form2.orderId = oid;
      this.form2.productId = pid;
      this.dialog.formVisible2 = true;
    },
    beforeUpload(file) {
      console.log(file.type);
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG或PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      this.form2.pictureUrlList = this.updatePictureUrl(fileList);
    },
    handlePictureCardSuccess(response, file, fileList) {
      this.form2.pictureUrlList = this.updatePictureUrl(fileList);
    },
    updatePictureUrl(fileList) {
      return fileList
        .map(list => {
          return list.response.data.thumbPictureUrl;
        })
        .join(",");
    },
    submitComments() {
      this.$ajax({
        context: this,
        url: this.$api.order.evaluate,
        method: "post",
        body: this.form2,
        callback: () => {
          this.$refs.upload.clearFiles();
          this.resetForm("form2");
          this.dialog.formVisible2 = false;
          this.getLists();
        },
        failback: () => {
          //result:false
        },
        errorback: () => {
          //404,500
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  filters: {
    statusTozh(value) {
      if (value === 1) {
        return "待付款";
      } else if (value === 2) {
        return "待发货";
      } else if (value === 3) {
        return "待收货";
      } else if (value === 4) {
        return "待评价";
      } else if (value === 5) {
        return "已结束";
      } else {
        return "未知";
      }
    }
  },
  watch: {
    tableData: {
      handler(newVal) {
        this.multipleSelection = newVal.filter(item => {
          return item.checked;
        });
      },
      deep: true
    }
  }
};
</script>
<style scoped>
.order-item {
  color: #515151;
  font-size: 14px;
  margin-bottom: 40px;
}
.order-title {
  background-color: #e9e8e8;
  padding: 6px 10px;
}
.order-title span {
  display: inline-block;
  vertical-align: middle;
  margin: 6px 15px 0;
}
table td {
  width: calc(100% / 6);
}
table td[colspan="2"] {
  width: calc(100% / 6 * 2);
}
.order-footer {
  padding: 6px 10px;
  background-color: #e9e8e8;
}
.order-money {
  display: inline-block;
  margin-top: 4px;
  margin-right: 15px;
}
</style>
