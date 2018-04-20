import axios from 'axios'
import CryptoJS from './aes'
var contextPath = "";
axios.defaults.baseURL = contextPath;//后台接口公共前缀

var alertNum = 0;  //  单点登录   alert提示框只弹出一次  alertNum=0 弹出  alertNum=1 不弹
export function fetch(url, params, token, methods) {  //路径 参数 token(用户登录token) 方法
  alertNum = 0;  //  单点登录  调接口前  先默认 alertNum=0 弹出
  params.os = 'web';
  return new Promise((resolve, reject) => {
    token = token || '';  //  token可有可无
    //  时间 + UUID  接口调取传值
    // 获取当前时间戳(以s为单位)
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //当前时间戳为：1403149534
    var d = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    var concurrentId = timestamp + uuid;//防止并发
    var config = {
      method: methods || 'GET',
      url: url,
      headers: {'concurrentId': concurrentId,'token':token},
    };

    if (methods && (methods == 'post' || methods == 'POST')) {
      config.data = $.param(params);
    } else {
      config.params = params;
    }
    axios(
      config
    )
      .then(response => {
        const res = getDAes(response.data);  //  将后台返回数据 AES 解密
        response.data = JSON.parse(res);
        // 单点登录 => 当接口返回resCode=1114 时，表示该账号再别处已经登录，路由到登录页面
        if(response.data.resCode == '1114'){
          if(alertNum === 0){
            alert(response.data.resMsg);
            alertNum = 1;
          }
           document.cookie = "userCookie="+'{}' + ';' + 'expires= -1'+';path=/;';   //  用户在其他地方登录之后，同时清除用户cookie
           window.location.href = '/index.html#/login';
        }
        resolve(response.data);
      })
      .catch((error) => {

        reject(error);
      })
  })
}
export function getRealPath() {

  // //获取当前网址，如： http://localhost:8083/myproj/view/my.jsp
  //  var curWwwPath=window.document.location.href;
  //  //获取主机地址之后的目录，如： myproj/view/my.jsp
  // var pathName=window.document.location.pathname;
  // var pos=curWwwPath.indexOf(pathName);
  // //获取主机地址，如： http://localhost:8083
  // var localhostPaht=curWwwPath.substring(0,pos);
  // //获取带"/"的项目名，如：/myproj
  // var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
  var protocol = window.document.location.protocol;
  var host = window.document.location.host;

  return contextPath = protocol + '//' + host + '/';
}
//输入框限制
//object 输入框限制的对象，maximum 可输入的最大值，limited 是否限制0开始，true为限制。 maximum与limited可不输入。
//oninput="$.checkLimit($(this),1000,true);" onkeyup="$.checkLimit($(this),1000,true);" onafterpaste="$.checkLimit($(this),1000,true);"
//jsonp的基础访问路径
export function baseJsonpUrl() {
  const href = window.location.href;
  const isTest = /testddjr/g.test(href);//测试环境
  const isLocal = /localhost/g.test(href);//本地环境
  const isUat = /uat/.test(href);//uat环境
  let url = '';
  if ((isTest || isLocal)) {
    url = 'http://testjd.duodianjr.com';
  } else if (isUat) {
    url = 'http://uatjd.duodianjr.com';
  } else {
    url = 'http://jiedai.duodianjr.com';//生产环境
  }

  return url;
}

export function regexp(regular, value) {
  let result = regular.test(value);
  let cash = ''
  if (!result) {
  }
  else {
    cash = value
  }
  return cash
}


//接口函数
export function ajaxRequest(url, str, method, type) {
  str.data = getAES(str.data);  // AES 对参数加密
  alertNum = 0;  //  单点登录  调接口前  先默认 alertNum=0 弹出
  //  时间 + UUID  接口调取传值
  // 获取当前时间戳(以s为单位)
  var timestamp = Date.parse(new Date());
  timestamp = timestamp / 1000;
  //当前时间戳为：1403149534
  var d = new Date().getTime();
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  var concurrentId = timestamp + uuid;//防止并发
  var typeValue;
  if (type == null || type == "") {
    typeValue = "POST";
  } else {
    typeValue = type;
  }
  // loadingMessage('<img src="'+contextPath+'pic/weixin/loading.gif" width=25px>');
  $.ajax({
    url: url,
    type: typeValue,
    dataType: "json",
    // data: port.encrypt(str),
    data: str,
    headers: {'concurrentId': concurrentId},
    success: function (data) {
      data = getDAes(data);   //  AES 解密
      // 单点登录 => 当接口返回resCode=1114 时，表示该账号再别处已经登录，路由到登录页面
      if(data.resCode == '1114'){
        if(alertNum === 0){
          alert(data.resMsg);
          alertNum = 1;
        }
        document.cookie = "userCookie="+'{}' + ';' + 'expires= -1'+';path=/;';  //  用户在其他地方登录之后，同时清除用户cookie
        window.location.href = '/index.html#/login';
      }
      method(data);
    },
    error: function () {
      //errorMessage("请求失败!");
    }
  });
};
//报错
export function errorMessage(str) {
  if ($("body .errorMessage").length > 0) {
    return false;
  }
  function hideError() {
    $("body .errorMessage").fadeOut("normal", function () {
      $(this).remove();
    })
  }

  var html = '<div class="errorMessage MT20" style="bottom: 100px; position: fixed; text-align: center; width: 100%; display:none; z-index:1111;"><font style="background-color: rgba(0, 0, 0, 0.7); border-radius: 5px; color: #fff; z-index:1000; display: inline-table; line-height: 170%; max-width: 80%; padding: 5px 10px;">' + str + '</font></div>';
  $("body").append(html);
  $("body .errorMessage").fadeIn("normal", function () {
    setTimeout(hideError, 3000);
  })
}


//手机号校验正则
export const phoneReg = /^\d{11}$/;//手机号校验规则 前端只限定11位数字


//AES 加密、  解密    前后端数据  ***************************************start
export function getAES(data){ //加密
  const key  = CryptoJS.enc.Utf8.parse('aeswebapkxO3uMtKsyINnqYlYcULaYSA');  //密钥
  const iv   = CryptoJS.enc.Utf8.parse('aeswebCT5bCwhaqH');  // 偏移量
  const encrypted =CryptoJS.AES.encrypt(data,key,
    {
      iv:iv,
      mode:CryptoJS.mode.CBC,
      padding:CryptoJS.pad.Pkcs7
    });
  return encrypted.toString();    //返回的是base64格式的密文
}

function getDAes(encrypted){//解密
  const key  = CryptoJS.enc.Utf8.parse('aeswebapkxO3uMtKsyINnqYlYcULaYSA');
  const iv   = CryptoJS.enc.Utf8.parse('aeswebCT5bCwhaqH');
  const decrypted =CryptoJS.AES.decrypt(encrypted,key,
    {
      iv:iv,
      mode:CryptoJS.mode.CBC,
      padding:CryptoJS.pad.Pkcs7
    });
  return decrypted.toString(CryptoJS.enc.Utf8);      //
}

//AES 加密、  解密    前后端数据  ********************************* end
