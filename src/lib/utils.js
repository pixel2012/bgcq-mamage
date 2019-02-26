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

export const cityFormate = regions => {
  let cities = [];
  for (let province in regions.province_list) {
    cities.push({
      label: regions.province_list[province],
      value: province,
      children: []
    });
  }
  cities.forEach(list => {
    for (let city in regions.city_list) {
      if (list.value.slice(0, 2) === city.slice(0, 2)) {
        list.children.push({
          label: regions.city_list[city],
          value: city,
          children: []
        });
        for (let county in regions.county_list) {
          let index = list.children.length - 1;
          if (city.slice(0, 4) === county.slice(0, 4)) {
            list.children[index].children.push({
              label: regions.county_list[county],
              value: county
            });
          }
        }
      }
    }
  });
  return cities;
};

export default {
  numToMoney,
  cityFormate
};
