const state = {
	uid: '',
	username: '',
	email: '',
	avatar: '',
	contactList: [],
}

const mutations = {
	setUid(state, data) {
		if (data) {
			uni.setStorage({
				key: 'uid',
				data
			})
		} else {
			uni.removeStorage({
				key: 'uid',
			})
		}
		state.uid = data
	},
	setUsername(state, data) {
		if (data) {
			uni.setStorage({
				key: 'username',
				data
			})
		} else {
			uni.removeStorage({
				key: 'username',
			})
		}
		state.username = data
	},
	setEmail(state, data) {
		if (data) {
			uni.setStorage({
				key: 'email',
				data
			})
		} else {
			uni.removeStorage({
				key: 'email',
			})
		}
		state.email = data
	},
	setAvatar(state, data) {
		if (data) {
			uni.setStorage({
				key: 'avatar',
				data
			})
		} else {
			uni.removeStorage({
				key: 'avatar',
			})
		}
		state.avatar = data
	},
	setContactList(state, data) {
		if (data) {
			uni.setStorage({
				key: 'contactList',
				data
			})
		} else {
			uni.removeStorage({
				key: 'contactList',
			})
		}
		state.contactList = data || []
	},
}

const actions = {
	login(context, data) {
		return new Promise((resolve, reject) => {
			uni.request({
				url: 'http://10.10.12.131:144/login',
				data: {
					email: data.username,
					password: data.password
				},
				success(res) {
					console.log(res);
					if (res.data.state === 200) {
						context.commit('setUid', res.data.data.uid)
						context.commit('setUsername', res.data.data.username)
						context.commit('setEmail', res.data.data.email)
						context.commit('setAvatar', res.data.data.avatar)
						resolve('1');
					} else {
						reject(res.data.errormsg);
					}
				},
				fail(err) {
					console.error(err);
					reject('网络请求错误！');
				}
			});
		});
	},
	checkLogin(context) {
		console.log(123);
		console.log(!context.state.username);
		if(context.state.username) return true;
		console.log(456);
		context.commit('setUid', uni.getStorageSync('uid'))
		context.commit('setUsername', uni.getStorageSync('username'))
		context.commit('setEmail', uni.getStorageSync('email'))
		context.commit('setAvatar', uni.getStorageSync('avatar'))
		context.commit('setContactList', uni.getStorageSync('contactList'))
		if (!context.state.uid || !context.state.username || !context.state.email || !context.state.avatar) {
			console.log('用户未登录');
			uni.navigateTo({
				url: '/pages/login/login'
			});
			return false;
		}
		console.log('用户已登录');
		return true;
	},
	logout(context) {
		context.commit('setUid')
		context.commit('setUsername')
		context.commit('setEmail')
		context.commit('setAvatar')
		context.commit('setContactList')
		uni.navigateTo({
			url: '/pages/login/login'
		});
		console.log('退出登录');
		return true;
	},
	getContactList(context) {
		if (context.state.contactList.length > 0) return true
		return new Promise((resolve, reject) => {
			uni.request({
				url: 'http://10.10.12.131:144/getContactList',
				success(res) {
					console.log(res);
					if (res.data.state === 200) {
						context.commit('setContactList', res.data.data)
						resolve('1');
					} else {
						reject(res.data.errormsg);
					}
				},
				fail(err) {
					console.error(err);
					reject('网络请求错误！');
				}
			});
		});
	}
}

export default {
	namespaced: true, // 命名空间
	state,
	mutations,
	actions
}
