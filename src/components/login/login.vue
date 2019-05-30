<template>
	<el-form
		:model="loginForm"
		:rules="rules"
		ref="loginForm">
		<el-form-item
			label="昵称"
			prop="name">
			<el-input
				v-model="loginForm.name">
			</el-input>
		</el-form-item>
		<el-form-item
			label="密码"
			prop="pass">
			<el-input
				type="password"
				v-model="loginForm.pass">
			</el-input>
		</el-form-item>
		<el-form-item>
			<el-button
				type="primary"
				@click="loginFind('loginForm')">
				登录
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			loginForm: {
				name: '',
				pass: ''
			},
			rules: {
				// 校验规则
				name: [
					{
						required: true,
						message: '请输入昵称',
						trigger: 'blur'
					},
					{
						min: 1,
						max: 8,
						message: '昵称长度在 1 到 8 个字符',
						trigger: 'blur'
					}
				],
				pass: [
					{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					},
					{
						min: 6,
						max: 12,
						message: '密码长度在 6 到 12 个字符',
						trigger: 'blur'
					}
				]
			}
		}
	},
	methods: {
		loginFind: function(fromName) {
			this.$refs[fromName].validate((valid) => {
				// 如果用户名密码输入正确
				if (valid) {
					// 发送请求进行登录
					let name  = this.loginForm.name;
					let pass = this.loginForm.pass;
					console.log("name, pass", name, pass);
					this.$http.post('/api/findUser', {
						name: name
					}).then((res) => {
						console.log("res:", res);
						if (res.data === 1) {
							// 账号不存在
							this.warnOpen();
						} else if (res.data === -1) {
							// 账号存在：进行登录
							this.loginGo(name, pass);
						}
					})
				} else {
					// 如果用户名和密码输入格式不正确
					return false;
				}
			})
		},
		loginGo: function(name, pass) {
			let that = this;
			that.$http.post('/api/login', {
				name: name,
				pass: pass
			}).then((res) => {
				// 如果密码错误
				if (res.data === -1) {
					that.errOpen();
				} else if (res.data === 1) {
					// 密码正确
					that.succOpen();
					// 设置cookie
					window.document.cookie = "username" + '=' + name + ";path=/;expires=" + 2;
					setInterval(function() {
						that.$router.push({
							path: '/'
						})
					}, 2000)
				} else {
					// 其他情况
					console.log("error");
				}
			})
		},
		succOpen() {
			this.$message({
				message: '登录成功，正在跳转至首页',
				type: 'success'
			})
		},
		warnOpen() {
			this.$message.warning('该账号不存在');
		},
		errOpen() {
			this.$message.error('密码错误');
		}
	}
}
</script>

<style scoped lang="stylus">
.el-form
	width: 100%
	height: 100%
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center
	.el-form-item
		display: flex
		align-items: center

	.el-input
		margin: 1rem 0
		width: 20rem


</style>