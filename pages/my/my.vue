<template>
	<view>
		<button @tap="logout">退出登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			logout(){
				this.$store.dispatch('user/logout')
			}
		}
	}
</script>

<style>
	button{
		margin-top: 40rpx;
	}
</style>
