import axios from "axios";
import config from "./config";
// import encrypt from "./encrypt";
// import { localStore } from "./store";

export const ajax = function(params) {
  let urlData = `${config.ip}${params.url}?`; //url地址
  if (params.hasOwnProperty("query")) {
    for (let item in params.query) {
      urlData += `${item}=${params.query[item]}&`;
    }
  }
  axios({
    url: urlData.slice(0, -1),
    method: params.method || "get",
    headers: {
      ...(params.headers || {}),
      token: config.token
      //localStore.get("token") ? localStore.get("token") : ""
      // timestamp: "#js" + encrypt(parseInt(new Date().getTime() / 1000) + "")
    },
    data: params.body
  })
    .then(function(res) {
      if (res.data.result) {
        if (params.callback) {
          params.callback(res.data.data);
        }
      } else {
        if (config.debug || (!config.debug && !params.warn)) {
          params.context.$message.info(res.data.message);
        }
        if (params.failback) {
          params.failback(res.data.data);
        }
        if (res.data.code == 401) {
          // localStore.remove('token');
          // params.context.$store.state.headerStore.info.isLogin = false;//下线
          params.context.$router.push("/login");
        }
      }
    })
    .catch(function(err) {
      if (config.debug || (!config.debug && !params.warn)) {
        alert(JSON.stringify(err));
      }
      if (params.errorback) {
        params.errorback(err);
      }
    });
};

export default ajax;
