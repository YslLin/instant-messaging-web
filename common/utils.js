/**
 * 日期格式化
 * value: 日期, fmt: 'yyyy-MM-dd hh:mm:ss'
 */
export function formatDate(value, fmt = 'yyyy-MM-dd hh:mm:ss') {
	let date = new Date(value);
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1, // 月
		'd+': date.getDate(), // 日
		'h+': date.getHours(), // 时
		'm+': date.getMinutes(), // 分
		's+': date.getSeconds() // 秒
	};
	// 遍历这个对象
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
}

/**
 * 小于10 前缀拼接 ‘0’
 */
export function padLeftZero(str) {
	return ('00' + str).substring(str.length);
}