/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 * 
 * @param {Function} func 要执行的回调函数 
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行 
 * @return null
 */
let timeout = null;

const debounce = (func, wait = 500, data, immediate = false) => {
	// 清除定时器
	if (timeout !== null) clearTimeout(timeout);
	// 立即执行，此类情况一般用不到
	if (immediate) {
		var callNow = !timeout;
		timeout = setTimeout(() => {
			timeout = null;
		}, wait);
		if (callNow) typeof func === 'function' && func(data);
	} else {
		// 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
		timeout = setTimeout(() => {
			typeof func === 'function' && func(data);
		}, wait);
	}
}



/**
 * 节流原理：在一定时间内，只能触发一次
 * 
 * @param {Function} func 要执行的回调函数 
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
let timer, flag;
const throttle = (func, wait = 500, data, immediate = true) => {
	if (immediate) {
		if (!flag) {
			flag = true;
			// 如果是立即执行，则在wait毫秒内开始时执行
			typeof func === 'function' && func();
			timer = setTimeout(() => {
				flag = false;
			}, wait);
		}
	} else {
		if (!flag) {
			flag = true
			// 如果是非立即执行，则在wait毫秒内的结束处执行
			timer = setTimeout(() => {
				flag = false
				typeof func === 'function' && func();
			}, wait);
		}

	}
};

// 获取本地存储和清除
const $storage = {
	// 存储到本地
	setStorage:(key,value) => {
		uni.setStorage({
			key: key,
			data: value
		});
	},
	// 获取到本地存储
	getStorage:(key) => {
		let value = uni.getStorageSync(key);
		if(value){
			if(Object.keys(value).length==0) return {}
			return value
		}else{
			return {}
		}
	},
	// 本地缓存中移除指定key
	removeStorage:(key)=>{
		uni.removeStorage({
			key: key,
		});
	},
	// 清理本地数据缓存
	clearStorage:()=>{
		uni.clearStorage();
	}
}

// 获取微信code
const getWxCode = () => {
	const promise = new Promise((resolve,reject)=>{
		uni.login({
			onlyAuthorize:true,
			success: loginRes => {
				console.log('loginRes',loginRes)
				if(loginRes.errMsg == 'login:ok'){
					let code = loginRes.code
					resolve(code)
				}else{
					console.log('code-获取失败');
				}
			}
		})
	})
	return promise
}


module.exports = {
	debounce,
	throttle,
	$storage,
	getWxCode
}
