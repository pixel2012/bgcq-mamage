//数字格式化金钱展示
export const numToMoney = num => {
  if (typeof num != "number") {
    num = Number(num);
  }
  num = num.toFixed(2);
  num = parseFloat(num);
  num = num.toLocaleString();
  let floatPart = ".00"; // 预定义小数部分
  let numArry = num.split(".");
  // =2表示数据有小数位
  if (numArry.length === 2) {
    floatPart = numArry[1].toString(); // 拿到小数部分
    if (floatPart.length === 1) {
      // 补0,实际上用不着
      return numArry[0] + "." + floatPart + "0";
    } else {
      return numArry[0] + "." + floatPart;
    }
  } else {
    return num + floatPart;
  }
};
//金钱格式化数字展示
export const moneyToNum = value => {
  if (typeof value == "number") {
    return value;
  } else {
    if (value.indexOf(",") != -1) {
      return Number(value);
    } else {
      return Number(value.replace(",", ""));
    }
  }
};

//图片转base64
export const getBase64 = file => {
  return new Promise(function(resolve, reject) {
    let reader = new FileReader();
    let imgResult = "";
    reader.readAsDataURL(file.row);
    reader.onload = function() {
      imgResult = reader.result;
    };
    reader.onerror = function(error) {
      reject(error);
    };
    reader.onloadend = function() {
      resolve(imgResult);
    };
  });
};
export default {
  numToMoney,
  moneyToNum,
  getBase64
};
