<template>
	<view>
		<view class="column" v-for="item in contactList" :key="item.uid" @tap="onTap(item)">
			<view class="image">
				<image class="avatar" src="/static/logo.png"></image>
			</view>
			<view class="content">
				<view class="name">{{item.username}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		computed: {
			...mapState('user', {
				contactList: 'contactList'
			})
		},
		onShow() {
			this.$store.dispatch('user/getContactList')
		},
		methods: {
			onTap(item) {
				uni.navigateTo({
					url: '/pages/chat-room/chat-room?otherUid=' + item.uid + '&otherName='+item.username
				})
			},
		}
	}
</script>

<style>
	.body {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.column {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #CCC;
		/* margin: 20rpx; */
		padding: 16rpx;
	}
	
	.image {
		display: flex;
		align-items: center;
		margin-right: 10rpx;
	}
	
	.avatar {
		height: 50rpx;
		width: 50rpx;
	}
	
	.content {
		flex: 1;
	}
	
	.name {
		color: #333333;
		font-size: 28rpx;
		font-weight: bold;
	}
</style>
