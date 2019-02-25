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
      token: config.debug
        ? "E000AE945CA6A874CF769DB02CC1BF60A014F06A2BCECBC6792AFFB3E8FBE17CD07270BA98179EFCAF3F83F39F883472386DB1D617388F6BE29221D3DA2D81A08CF249F4DA0AF0FD132F7BD80F0F6EB65A92CB07FD06FA5AD5A0CE5E53515751FCC7EFA24A292DFC80FFC30A59DE854D34336CB86CDC1B5347FEBB281CFE92311D52A37428A083805CCAD3A1059FEC748FFED29082D7C30A402C2EBF348724FD3C96B39A51D1B23B146E48F538F06F9BBC26F1F4005BFD723C340E2D412A7CF8FF73161EA2598DB98E06B3B3614FDF4B2B3815464862CBD72EE9500E8C1483218AD47AB3A3968EBCBCD7C21FE9E496AD"
        : "502CBAE40B07B943A53CE30324A8D6282C21DF5520B32A287EFEAC01A4B231722E5B294C5955B38FDFF149915C07528C4A7C191489A065907900C5D5BC2A4ADE839D1E223216AE2DED363892272FF47354992A17FABD9F2CE57461A8BB1E9617B714FAF710F21126447CC1BA96F3BBF2AE4FEB2988E6B040A3C9677EB3ACF2847126F729AA0660A1F9F07DC03A83C7942F002B02767DB9ABB095305739467ED9B9873C69343DBAC2CB01F82E6CEBE4C5AE6A78207D2489FECCD5FB6C17F6B135964709A73FD0389EC2851076F7C051868471FCCFFE60255EDDBC6F7B29C66AEEF2471933F5FA87120633CEEC84227007C47C75EF03A1B9B756EC50D1021523E9"
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
