<script>
	export default {
		data() {
			return {
				socketTask: null
			}
		},
		onLaunch: function() {
			console.log('App Launch')
			uni.$on("loginInit", this.init);
			// this.init()
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			init() {
				this.socketTask = uni.connectSocket({
					url: 'ws://10.10.12.131:4040',
					complete: () => {}
				});

				this.socketTask.onOpen((res) => {
					console.log('WebSocket连接已打开！');
					this.bind();
				});
				this.socketTask.onClose((res) => {
					console.log('WebSocket 已关闭！');
					this.reconnect();
				});
				this.socketTask.onError((res) => {
					console.log('WebSocket 错误事件，请检查！'+res);
					// this.reconnect();
				});
				this.socketTask.onMessage((res) => {
					console.log('收到服务器内容：' + res.data);
					this.onMsg(res)
				});
			},
			bind() {
				let msg = {
					type: 1,
					data: {
						uid: this.$store.state.user.uid
					}
				}
				let json = {
					data: JSON.stringify(msg)
				}
				console.log(json);
				this.socketTask.send(json);
			},
			reconnect() {
				console.log('重新上线');
				this.init();
			},
			onMsg(event){
				if (!event) return;
				let resp = JSON.parse(event.data);
				if(!resp) return;
				switch (resp.type){
					case 1:
						break;
					case 4: // 处理接收的消息
						this.handleReceivedMsg(resp);
						break;
					case 5:
						break;
				}
			},
			handleReceivedMsg(pushedMsg){
				uni.$emit('receivedMsg', pushedMsg);
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
