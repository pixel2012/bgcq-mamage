<template>
  <div class="layout">
    <breadcrumb :current="$route.meta.name"></breadcrumb>
    <div class="sub-main-box">
      <el-container>
        <el-header class="tr">
          <el-button type="primary" @click="add">新增收货地址</el-button>
        </el-header>
        <el-main>
          <el-table :data="tableData" border stripe style="width: 100%">
            <el-table-column label="是否默认" width="100">
              <template slot-scope="scope">
                <el-tag :type="scope.row.isdefault ? 'danger' : 'info'">{{
                  scope.row.isdefault ? "是" : "否"
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="realName" label="姓名" width="100">
            </el-table-column>
            <el-table-column prop="phoneNumber" label="手机号" width="150">
            </el-table-column>
            <el-table-column label="详细地址">
              <template slot-scope="scope">
                {{ scope.row.provinceName }}
                {{ scope.row.cityName }}
                {{ scope.row.countyName }}
                {{ scope.row.address }}
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <div>
                  <el-button @click="edit(scope.row)" type="text" size="small"
                    >编辑</el-button
                  >
                  <el-button
                    v-if="!scope.row.isdefault"
                    @click="remove(scope.row)"
                    type="text"
                    size="small"
                    >删除</el-button
                  >
                </div>
                <div v-if="!scope.row.isdefault">
                  <el-button
                    type="text"
                    size="small"
                    @click="setDefault(scope.row)"
                    >设为默认</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
        <!--<el-footer>-->
        <!--<el-pagination background layout="prev, pager, next" :total="1000">-->
        <!--</el-pagination>-->
        <!--</el-footer>-->
      </el-container>
    </div>
    <el-dialog
      :title="(isAdd ? '新增' : '编辑') + '收货地址'"
      :visible.sync="dialog.formVisible"
    >
      <el-form :model="form" ref="form" :rules="rules">
        <el-form-item
          label="姓名"
          prop="realName"
          :label-width="formLabelWidth"
        >
          <el-input
            type="text"
            v-model="form.realName"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          prop="phoneNumber"
          :label-width="formLabelWidth"
        >
          <el-input
            type="number"
            v-model="form.phoneNumber"
            placeholder="请输入"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="省市区"
          prop="provinces"
          :label-width="formLabelWidth"
        >
          <el-cascader
            ref="provinces"
            v-model="form.provinces"
            :options="options"
            filterable
            clearable
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item
          label="详细地址"
          prop="address"
          :label-width="formLabelWidth"
        >
          <el-input
            type="text"
            v-model="form.address"
            placeholder="街道小区门牌号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="是否默认"
          prop="isdefault"
          :label-width="formLabelWidth"
        >
          <el-switch
            v-model="form.isdefault"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit('form')" type="primary">立即提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import regions from "@/assets/mock/regions";

export default {
  name: "location",
  components: {},
  data() {
    return {
      tableData: [],
      isAdd: true, //是否新增
      dialog: {
        formVisible: false
      },
      options: regions,
      form: {
        id: "",
        realName: "",
        phoneNumber: "",
        provinces: [],
        provinceId: "",
        provinceName: "",
        cityId: "",
        cityName: "",
        countyId: "",
        countyName: "",
        address: "",
        isdefault: true
      },
      rules: {
        realName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "姓名长度在 1 到 20 个字符",
            trigger: "blur"
          }
        ],
        phoneNumber: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { min: 11, max: 11, message: "请输入正确的手机号", trigger: "blur" }
        ],
        provinces: [
          {
            type: "array",
            required: true,
            message: "请选择省市区",
            trigger: "change"
          }
        ],
        address: [
          { required: true, message: "请填写详细地址", trigger: "blur" }
        ]
      },
      formLabelWidth: "80px"
    };
  },
  mounted() {
    this.getLists();
  },
  methods: {
    getLists() {
      this.$ajax({
        context: this,
        url: this.$api.location.lists,
        method: "get",
        callback: data => {
          // data.list.map(item => {
          //   item.checked = false;
          // });
          this.tableData = data.list;
        },
        failback: () => {
          //result:false
        },
        errorback: () => {
          //404,500
        }
      });
    },
    add() {
      this.isAdd = true;
      this.dialog.formVisible = true;
    },
    edit(row) {
      this.isAdd = false;
      this.dialog.formVisible = true;
      this.form = row;
      this.form.provinces = [row.provinceId, row.cityId, row.countyId];
    },
    remove(row) {
      this.$ajax({
        context: this,
        url: this.$api.location.remove,
        method: "delete",
        query: {
          ids: row.id
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
    setDefault(row) {
      this.$ajax({
        context: this,
        url: this.$api.location.setDefault,
        method: "post",
        query: {
          id: row.id
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
    handleChange(values) {
      const labels = this.$refs["provinces"].currentLabels;
      //values
      this.form.provinceId = values[0] || "";
      this.form.cityId = values[1] || "";
      this.form.countyId = values[2] || "";
      //labels
      this.form.provinceName = labels[0] || "";
      this.form.cityName = labels[1] || "";
      this.form.countyName = labels[2] || "";
    },
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.form);
          this.$ajax({
            context: this,
            url: this.isAdd ? this.$api.location.add : this.$api.location.edit,
            method: "post",
            body: {
              ...this.form
            },
            callback: () => {
              this.resetForm("form");
              this.getLists();
              this.dialog.formVisible = false;
            },
            failback: () => {
              //result:false
            },
            errorback: () => {
              //404,500
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped></style>
