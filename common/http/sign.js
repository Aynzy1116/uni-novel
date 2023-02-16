// 引入VUEX
import $store from '@/store/index.js'
var md5 = require('@/utils/MD5.js');
//最后一次请求的ID
let endrid='';
export default {
	//生成请求标识
	getRID : function () {
	    let ticks = this.getTimeTicks(this.getServerDateTime());
	    let rnd = Math.floor((Math.random() * 999) + 1);
	    ticks = ticks * rnd;
	    ticks = ticks + "" + rnd + rnd.toString().length;//转字符
	    if (endrid) {
	        if (endrid == ticks) {
	            return this.getRID();
	        }
	    }
	    endrid = ticks;
	    return ticks;
	},
	//读取服务器时间
	getServerDateTime : function () {
	    let user =$store.state.signInfo;
	    if (user.ctime && user.stime) {
	        let diff = user.stime - user.ctime;//时差结果为豪秒
	        let ctim = new Date(new Date().getTime() + diff);
	        return ctim;
	    }
	    else {
	        return new Date();
	    }
	},
	getTimeTicks: function(dateObj) {
	    //取得时间Ticks 输出 mmddss
	    //const date = new Date();
	    const hour = dateObj.getHours()
	    const minute = dateObj.getMinutes()
	    const second = dateObj.getSeconds()
	    return [hour, minute, second].map(function (n) {
		    //数字或字符转 字符 如果一位则加0 列如 1 输出 01
		    n = n.toString()
		    return n[1] ? n : '0' + n
		}).join('')
	},
	// 签名算法
	getSign:function(args, appsecret) {
	    var date = new Date();
	    var year = date.getFullYear(); //年 ,从 Date 对象以四位数字返回年份
	    var month = date.getMonth() + 1; //月 ,从 Date 对象返回月份 (0 ~ 11) ,date.getMonth()比实际月份少 1 个月
	    var day = date.getDate(); //日 ,从 Date 对象返回一个月中的某一天 (1 ~ 31)
	    var hours = date.getHours(); //小时 ,返回 Date 对象的小时 (0 ~ 23)
	    var minutes = date.getMinutes(); //分钟 ,返回 Date 对象的分钟 (0 ~ 59)
	    var seconds = date.getSeconds(); //秒 ,返回 Date 对象的秒数 (0 ~ 59)   
	    //修改月份格式
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    //修改日期格式
	    if (day >= 0 && day <= 9) {
	        day = "0" + day;
	    }
	    //修改小时格式
	    if (hours >= 0 && hours <= 9) {
	        hours = "0" + hours;
	    }
	    //修改分钟格式
	    if (minutes >= 0 && minutes <= 9) {
	        minutes = "0" + minutes;
	    }
	    //修改秒格式
	    if (seconds >= 0 && seconds <= 9) {
	        seconds = "0" + seconds;
	    }
	    //获取当前系统时间  格式(yyyy-mm-dd hh:mm:ss)
	    var currentFormatDate = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
	    args.actiontime = currentFormatDate;
	    var keys = [];
	    for (var key in args) {
			if(key.toLowerCase() == "sign")
			continue;
	        keys.push(key);
	        // keys.push(key.toLowerCase());
	    }
	    keys.sort(function (a, b) {
	        return a.localeCompare(b)
	    });
	    var str = "";
	    for (var key of keys) {
	        str = str + key.toLowerCase();
	        str = str + args[key];
	    }
		
	    str = str + appsecret;
		// console.log('加密串排序：',str);
	    args.sign =  md5(str)  
	    return args;
	},
}






