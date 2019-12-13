<template>
	<view class="body">
		<view class="column" v-for="item in contacts" :key="item.otherUid" @tap="onTap(item)">
			<view class="image">
				<image class="avatar" src="/static/logo.png"></image>
				<!-- {{item.otherAvatar}} -->
			</view>
			<view class="content">
				<view class="name">{{item.otherName}}</view>
				<view class="text">{{item.content}}</view>
			</view>
			<view class="date">
				{{formatDate(item.createTime)}}
			</view>
			<!-- {{item.convUnread}} -->
		</view>
	</view>
</template>

<script>
	import {
		formatDate
	} from "@/common/utils.js"
	export default {
		data() {
			return {
				contacts: []
			}
		},
		onLoad() {
			this.$store.dispatch('user/checkLogin');
		},
		onShow() {
			this.getRecentContacts();
		},
		methods: {
			onTap(item) {
				uni.navigateTo({
					url: '/pages/chat-room/chat-room?otherUid=' + item.otherUid + '&otherName='+item.otherName
				})
			},
			formatDate(v) {
				return formatDate(v, 'hh:mm')
			},
			getRecentContacts() {
				uni.request({
					url: 'http://10.10.12.131:144/getRecentContacts',
					success: (res) => {
						console.log(res);
						if (res.data.state === 200) {
							let data = res.data.data;
							this.contacts = data.contactInfoList;
						} else {
							console.error(res.data.errormsg);
						}
					},
					fail(err) {
						console.error(err);
						reject('网络请求错误！');
					}
				});
			}
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
		border: 1px solid #4CD964;
		margin: 20rpx;
		padding: 12rpx;
	}

	.image {
		display: flex;
		align-items: center;
		margin-right: 10rpx;
	}

	.avatar {
		height: 80rpx;
		width: 80rpx;
	}

	.content {
		flex: 1;
	}

	.name {
		color: #333333;
		font-size: 34rpx;
		font-weight: bold;
	}

	.text {
		color: #999999;
		font-size: 26rpx;
	}

	.date {
		color: #999999;
		font-size: 24rpx;
	}
</style>
