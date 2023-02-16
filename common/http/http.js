//基础请求库引入
import request from "@/uni_modules/zhouWei-request/js_sdk/request/index.js";


//配置参数引入
import $config from "./config.js"
//API参数引入
import $api from "./api.js"
// 引入VUEX
import $store from '@/store/index.js'
// 引入utils
import $utils from '../utils/utils.js'
// 引入获取本地数据函数
import {$storage, getWxCode} from '@/common/utils/utils.js'

//可以new多个request来支持多个域名请求
let $http = new request({
	//接口请求地址
	baseUrl: $config.apiBaseUrl,
	//服务器本地上传文件地址
	fileUrl: "",
	// 服务器上传图片默认url
	defaultUploadUrl: "",
	//设置请求头（如果使用报错跨域问题，可能是content-type请求类型和后台那边设置的不一致）
	header: $config.postHeaderDefault,
	// 请求超时时间（默认6000）
	timeout: 12000,
	// 默认配置（可不写）
	config: {
		// 是否自动提示错误
		isPrompt: true,
		// 是否显示加载动画
		load: false,
		// 是否使用数据工厂
		isFactory: true,
		//是否需要签名
		isSign:true
	}
});

// 添加获取七牛云token的方法
$http.getQnToken = function(callback){
    //该地址需要开发者自行配置（每个后台的接口风格都不一样）
    $http.get("api/common/v1/qn_upload").then(data => {
        /*
         *接口返回参数：
         *visitPrefix:访问文件的域名
         *token:七牛云上传token
         *folderPath:上传的文件夹
         *region: 地区 默认为：SCN
         */
        callback({
            visitPrefix: data.visitPrefix,
            token: data.token,
            folderPath: data.folderPath
        });
    });
}
//当前接口请求数
let requestNum = 0;
//请求开始拦截器
$http.requestStart = function(options) {
    if (options.load) {
        if (requestNum <= 0) {
            //打开加载动画
            uni.showLoading({
                title: '加载中',
                mask: true
            });
        }
        requestNum += 1;
    }
    // 图片上传大小限制
    if (options.method == "FILE" && options.maxSize) {
        // 文件最大字节: options.maxSize 可以在调用方法的时候加入参数
        let maxSize = options.maxSize;
        for (let item of options.files) {
            if (item.size > maxSize) {
                setTimeout(() => {
                    uni.showToast({
                        title: "图片过大，请重新上传",
                        icon: "none"
                    });
                }, 500);
                return false;
            }
        }
    }
	//请求前加入token
	if (![$api.login].includes(options.url)) {
		// console.log('$storage',$storage.getStorage('APP_TOKEN'))
		if($storage.getStorage('APP_TOKEN')){
			options.header['APP_TOKEN'] = $storage.getStorage('APP_TOKEN')
		}else{
			
		}
	}
    //请求前加入token
    // options.header['token'] = "";
    return options; // return false 表示请求拦截，不会继续请求
}
//请求结束
$http.requestEnd = function(options) {
    //判断当前接口是否需要加载动画
    if (options.load) {
        requestNum = requestNum - 1;
        if (requestNum <= 0) {
            uni.hideLoading();
        }
    }
}
//所有接口数据处理（可在接口里设置不调用此方法）
//此方法需要开发者根据各自的接口返回类型修改，以下只是模板
$http.dataFactory = async function(res) {
    // console.log("接口请求数据", {
    //     url: res.url,
    //     resolve: res.response,
    //     header: res.header,
    //     data: res.data,
    //     method: res.method,
    // });
    if (res.response.statusCode && res.response.statusCode == 200) {
        let httpData = res.response.data;
        if (typeof (httpData) == "string") {
            httpData = JSON.parse(httpData);
        }
        // 开始----------------------以下是示例-请认真阅读代码-----------------------开始
        //判断数据是否请求成功
        if (httpData.success || httpData.code == 200) {  // 重点------判断接口请求是否成功，成功就返回成功的数据
            // ---重点---返回正确的结果(then接受数据)---重点---
            return Promise.resolve(httpData);
        } else {
            //其他错误提示
            if (res.isPrompt) { // 是否提示
                // uni.showToast({
                //     title: httpData.info || httpData.msg || httpData.message, // 重点------把接口返回的错误抛出显示
                //     icon: "none",
                //     duration: 3000
                // });
            }
            // ---重点---返回错误的结果(catch接受数据)----重点---
            return Promise.reject({
                statusCode: 0,
                errMsg: (httpData.info || httpData.msg || httpData.message)
            });
        }
        // 结束----------------------以上是示例-请认真阅读代码-----------------------结束
    } else {
        // 返回错误的结果(catch接受数据)
        return Promise.reject({
            statusCode: res.response.statusCode,
            errMsg: res.response.data.message
        });
    }
};
// 错误回调（所有错误都在这里）
$http.requestError = function(e) {
	console.log('错误拦截',e);
	switch(e.statusCode){
		case 401:
			//节流只执行最后一次
			$utils.throttle(function(){
				console.log('e.errMsg',e.errMsg);
				getWxCode().then(code=>{
					$store.dispatch('userLogin',{code:code})
				})
			},3000)
		break;
		case 500:
			//节流只执行最后一次
			$utils.throttle(function(){
				console.log('e.errMsg',e.errMsg);
				getWxCode().then(code=>{
					$store.dispatch('userLogin',{code:code})
				})
			},3000)
		break;
		case 0:
			console.log('errMsg0',e);
			if(e.errMsg=='token已过期！'){
				getWxCode().then(code=>{
					$store.dispatch('userLogin',{code:code})
				})
				return
			}
			uni.showToast({
				title: e.errMsg,
				icon: "none"
			});
			// throw e;
		break;
		default:
			uni.showToast({
				title: "网络错误，请检查一下网络",
				icon: "none"
			});
	}
    // if (e.statusCode === 0) {
    //     throw e;
    // } else {
    //     uni.showToast({
    //         title: "网络错误，请检查一下网络",
    //         icon: "none"
    //     });
    // }
}
export default $http