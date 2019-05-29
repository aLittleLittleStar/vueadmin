<template>
	<el-form
		:model="ruleForm"
		:rules="rules"
		ref="ruleForm">
		<el-form-item
			label="用户昵称"
			prop="name">
			<el-input v-model="ruleForm.name"></el-input>
		</el-form-item>
		<el-form-item
			label="账号密码"
			prop="pass">
			<el-input
				type="password"
				v-model="ruleForm.pass"
				auto-complete="off"></el-input>
		</el-form-item>
		<el-form-item
			label="确认密码"
			prop="checkPass">
			<el-input
				type="password"
				v-model="ruleForm.checkPass"></el-input>
		</el-form-item>
		<el-form-item 
			label="选择性别"
			prop="sex">
			<el-radio-group 
				v-model="ruleForm.sex">
				<el-radio label="男"></el-radio>
				<el-radio label="女"></el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item
			label="出生日期"
			prop="birth">
			<el-date-picker
				v-model="ruleForm.birth"
				type="date"
				placeholder="选择日期"
				:picker-options="pickerOptions"
				format="yyyy 年 MM 月 dd 日"
				value-format="yyyy-MM-dd"
				suffix-icon="el-icon-date">
			</el-date-picker>
		</el-form-item>
		<el-form-item>
			<el-button 
				type="primary" 
				@click="submitForm('ruleForm')">
					立即注册
			</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	name: 'Register',
	data() {
		let validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'));
			} else {
				// 检验确认密码
				if (this.ruleForm.checkPass !== '') {
					this.$refs.ruleForm.validateField('checkPass');
				}
				callback();
			}
		};
		let validatePasses = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'));
			} else if (value !== this.ruleForm.pass) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			ruleForm: {
				name: '',
				pass: '',
				checkPass:'',
				birth: '',
				sex: '',
				// 上传头像
				imageUrl: ''
			},
			// 生日选择：不能大于当前时间
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now();
				}
			},
			// 规则
			rules: {
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
						type: 'string',
						required: true,
						trigger: 'blur',
						validator: validatePass
					},
					{
						min: 6,
						max: 12,
						message: '密码长度在 6 到 12 个字符',
						trigger: 'blur'
					}
				],
				checkPass: [
					{
						type: 'string',
						required: true,
						validator: validatePasses,
						trigger: 'blur'
					},
					{
						min: 6,
						max: 12,
						message: '确认密码长度在 6 到 12 个字符',
						trigger: 'blur'
					}
				],
				sex: [
					{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}
				],
				birth: [
					{
						required: true,
						message: '请选择生日',
						trigger: 'change'
					}
				]
			}
		}
	},
	methods: {
		// 注册
		submitForm: function(formName) {
			this.$refs[formName].validate((valid) => {
				// 如果数据都进行了填写
				if (valid) {
					let name = this.ruleForm.name;
					let pass = this.ruleForm.pass;
					let checkPass = this.ruleForm.checkPass;
					let sex = this.ruleForm.sex;
					let birth = this.ruleForm.birth;
					console.log("info:", name, pass, checkPass, birth);
					this.$http.post('/api/findUser', {
						name: name
					}).then((res) => {
						if (res.data === -1) {
							// 账号已存在:警告
							this.warnOpen();
						} else if(res.data === 1) {
							// 进行注册
							console.log("res.data:", res.data);
							this.register(name, pass,sex, birth);
						}
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		register: function(name, pass,sex, birth) {
			this.$http.post('/api/register', {
				name: name,
				pass: pass,
				sex: sex,
				birth: birth
			}).then((res) => {
				if (res.status === 200) {
					// 注册成功：success
					this.succOpen();
					// 进行跳转到登录页面
					setInterval(function() {
						that.$router.push({
							path: '/login',
							query:{
								// 防止从外部进来登录
								redirect: location.hostname
							}
						})
					}, 2000)
				} else {
					// 注册失败： error
					this.errOpen();
				}
			})
		},
		/*handleAvatarSuccess(res, file) {
			this.ruleForm.imageUrl = URL.createObjectURL(file.raw);
			console.log("this.ruleForm.imageUrl:", this.ruleForm.imageUrl);
		},
		beforeAvatarUpload(file) {
			const isJPG = file.type === 'image/jpeg';
			const isLt4M = file.size / 1024 / 1024 < 4;
			
			if (!isJPG) {
				this.$message.error('上传头像图片只能是 JPG 格式!');
			}
			if (!isLt4M) {
				this.$message.error('上传头像图片大小不能超过 4MB!');
			}
			return isJPG && isLt4M;
		},*/
		succOpen() {
			this.$message({
				message: '恭喜你注册成功!',
				type: 'success'
			})
		},
		warnOpen() {
			this.$message({
				message: '非常抱歉该账号已存在!',
				type: 'warning'
			})
		},
		errOpen() {
			this.$message.error('非常抱歉注册失败');
		}
	}
}
</script>


<style scoped lang="stylus">
.el-form
	width: 100%
	padding: 10rem 1rem
	display: flex
	flex-direction: column
	align-items: center
	.el-form-item
		display: flex
		&:last-child
			display: flex
			justify-content: center
		.el-input
			width: 20rem

.el-radio-group {
	width: 20rem
}

.avatar-uploader {
	width: 20rem
}
.avatar {
	width: 100%
	height: 100%
}
.avatar-uploader .el-upload .el-icon-plus {
	height: 100%
	width: 100%
	line-height: 100%
	text-align: center
}


</style>