//配置参数引入
import $config from "./config.js"

const API = {
	
	login: $config.apiBaseUrl + '/wechat/wechat/login', // 用户登录

	getParkList: $config.apiBaseUrl + '/app/pmsPark/list', // 园区列表
	
	
}
export default API
