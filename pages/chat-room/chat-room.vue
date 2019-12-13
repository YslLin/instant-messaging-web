<template>
	<view class="body">
		<view v-for="item in messageList" :key="item.mid" :class="item.type === 1 ? 'other' : 'owner'">
			<image class="avatar" src="/static/logo.png"></image>
			<view class="content">
				{{item.content}}
			</view>
		</view>
		<view class="edit-box">
			<textarea class="edit" maxlength="500" v-model="content" />
			<button class="enter" @tap="enter">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				otherUid: '',
				otherName: '',
				messageList: [],
				content: ''
			}
		},
		onLoad(option) {
			this.otherUid = option.otherUid;
			this.otherName = option.otherName;
			uni.setNavigationBarTitle({
				title: this.otherName
			});
			this.queryMsg();
			
			uni.$on('receivedMsg', this.receivedMsg)
		},
		onReady() {
			
		},
		onUnload() {
			uni.$off('receivedMsg');
		},
		methods: {
			receivedMsg(pushedMsg){
				let msg = pushedMsg.data;
				if (this.$store.state.user.uid != msg.otherUid) return console.log('');
				let otherUid = msg.otherUid
				let otherName = msg.otherName
				let otherUidAvatar = msg.otherUidAvatar
				let ownerUid = msg.ownerUid
				let ownerName = msg.ownerName
				let ownerUidAvatar = msg.ownerUidAvatar
				msg.otherUid = ownerUid
				msg.otherName = ownerName
				msg.otherUidAvatar = ownerUidAvatar
				msg.ownerUid = otherUid
				msg.ownerName = otherName
				msg.ownerUidAvatar = otherUidAvatar
				msg.type = 1;
				console.log('组件接收到消息'+JSON.stringify(msg));
				this.messageList.push(msg);
				setTimeout(()=>{
					uni.pageScrollTo({
						scrollTop: 99999999,
						duration: 300
					});
					console.log(123);
				}, 300)
			},
			enter(){
				let content = this.content;
				if (!content) return console.log("内容不能为空");
				this.content = '';
				uni.request({
					url: 'http://10.10.12.131:144/sendMsg',
					method: 'POST',
					data: {
						senderUid: this.$store.state.user.uid,
						recipientUid: this.otherUid,
						content: content
					},
					success: (res) => {
						console.log(res);
						if (res.data.state === 200) {
							let data = res.data.data;
							this.messageList.push(data);
							console.log(data);
						} else {
							console.error(res.data.errormsg);
						}
					},
					fail(err) {
						console.error(err);
						reject('网络请求错误！');
					}
				});
			},
			queryMsg() {
				uni.request({
					url: 'http://10.10.12.131:144/queryMsg',
					data: {
						ownerUid: this.$store.state.user.uid,
						otherUid: this.otherUid
					},
					success: (res) => {
						console.log(res);
						if (res.data.state === 200) {
							let data = res.data.data;
							this.messageList = data;
							console.log(data);
							setTimeout(()=>{
								uni.pageScrollTo({
									scrollTop: 99999999,
									duration: 300
								});
							}, 300)
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

<style lang="scss">
	page{
		height: 100%;
	}
	.body{
		background-color: #F3F3F3;
		min-height: 100%;
		padding-bottom: 112rpx;
	}
	
	.other {
		display: flex;
		padding: 30rpx 20rpx;
	}
	
	.other .content {
		background-color: #FFFFFF;
		margin-left: 10rpx;
	}
	
	.owner{
		display: flex;
		flex-direction: row-reverse;
		padding: 30rpx 20rpx;
	}
	
	.owner .content {
		background-color: #4CD964;
		margin-right: 10rpx;
	}
	
	.content {
		padding: 10rpx;
		font-size: 32rpx;
		line-height: 32px;
		max-width: 60%;
		display: flex;
		align-items: center;
	}

	.avatar {
		width: 80rpx;
		height: 80rpx;
	}
	
	.edit-box{
		display: flex;
		position: fixed;
		align-items: flex-end;
		bottom: 0rpx;
		background-color: #F9F9F9;
		border-top: 1px solid #CCC;
		width: 100%;
		padding: 20rpx 16rpx;
		box-sizing: border-box;
	}
	
	.edit{
		flex: 1;
		height: 70rpx;
		border: 1rpx solid #2C405A;
		border-radius: 10rpx;
		padding: 14rpx;
		box-sizing: border-box;
		font-size: 28rpx;
	}
	
	.enter{
		width: 120rpx;
		height: 64rpx;
		border: none;
		font-size: 28rpx;
		padding: 0rpx;
		border-radius: 10rpx;
		color: #FFF;
		line-height: 64rpx;
		background-color: #25C23E;
		margin: 0 0 4rpx 20rpx;
	}
	
	.enter:after{
		display: none;
	}
</style>
