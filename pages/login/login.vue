<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<input class="username" v-model="username"></input>
			<input class="password" v-model="password"></input>
		</view>
		<view style="color: red;">
			{{msg}}
		</view>
		<view style="margin-top: 20rpx;">
			<button @tap="onTap">登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: 'zhangsan@gmail.com',
				password: '1234',
				msg: ''
			}
		},
		onLoad() {

		},
		methods: {
			onTap() {
				console.log('登录');
				this.$store.dispatch('user/login', {
					username: this.username,
					password: this.password
				}).then(() => {
					uni.switchTab({
						url: '/pages/index/index'
					});
					
					uni.$emit('loginInit')
				}).catch(e => {
					this.msg = e
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.username {
		border: 1px solid #4CD964;
	}

	.password {
		border: 1px solid #4CD964;
		margin-top: 10rpx;
	}
</style>
