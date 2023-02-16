const isDebug = false;

// const devUrl = '' //开发环境
//const devUrl = 'http://192.168.1.32:8089/jeecg-boot' //开发环境 宁 - 本地数据库
//const devUrl = 'http://192.168.1.41:8080/jeecg-boot' //开发环境 贺 - 本地数据库
const devUrl = 'http://192.168.1.40:8080/jeecg-boot' //开发环境 赵 - 本地数据库

const proUrl = 'https://xiuzuiadmin.yongwang5.com/api/jeecg-boot' //新的正式环境

const isOfficial = false; //生成微信小程序二维码用到  true 是正式版本   false 是体验版本

module.exports = {
	//图片路径前缀
	imgUrl:'https://xiuzuiadmin.yongwang5.com/api/jeecg-boot//sys/common/static/',
	wxMiniVersion: isOfficial ? 'release' : 'trial',
	// api 基础 url
	apiBaseUrl        :  isDebug ? devUrl:proUrl,
	staticUrl : '',
	wssUrl : '',
	h5Url : '',
	fileUrl:'',
	// 调试模式 [ false 关闭调试输出，项目发包时请设置此项为 false ]
	debug             : isDebug,
	//腾讯地图key
	mapWX:"",
	// 本地 Token 数据键名称
	token : '',
	//订阅消息模板ID
	msgId:{
		"test":'lqV-kywLq6eUn50LL6fxwzShx9covCJ4VuGziIp6_2E',//测试模板
	},
	// token 有效期, 单位 秒 ，要与后端保持一致
	expiredTime       : 3600,

	// post 方式 header[content-type] 默认值
	postHeaderDefault : {
		'content-type': 'application/json;charset=UTF-8'
	},
}
