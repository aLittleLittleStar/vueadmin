<template>
	<div class="content">
		<el-container>
			<el-header>
				<span>帐号设置</span>
			</el-header>
			<el-collapse v-model="activeName" accordion>
				<el-collapse-item title="个人资料" name="1">
					<template slot="title">
						<span class="user-info">个人资料</span>
						<i class="header-icon el-icon-info"></i>
					</template>
					<div class="user-info-del">
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
										编辑
								</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-collapse-item>
				<el-collapse-item title="头像" name="2">
					<div class="user-info-del">
						<el-form
							:model="ruleForm"
							:rules="rules"
							ref="ruleForm">
							<el-form-item
								label="用户昵称"
								prop="name">
								<el-input v-model="ruleForm.name"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button 
									type="primary" 
									@click="submitForm('ruleForm')">
										编辑
								</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-collapse-item>
				<el-collapse-item title="密码" name="3">
					<div class="user-info-del">
						<el-form
							:model="ruleForm"
							:rules="rules"
							ref="ruleForm">
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
							<el-form-item>
								<el-button 
									type="primary" 
									@click="submitForm('ruleForm')">
										编辑
								</el-button>
							</el-form-item>
						</el-form>
					</div>
				</el-collapse-item>
			</el-collapse>
		</el-container>
	</div>
</template>


<script>
export default {
	name: 'UserCenter',
	data() {
		return {
			userInfo: '',
			activeName: '1',
			ruleForm: {
				name: '',
				pass: '',
				checkPass:'',
				birth: '',
				sex: '',
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
						// validator: validatePass
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
						// validator: validatePasses,
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
	mounted() {
		// this.getUserInfo();
	},
	methods: {
		getUserInfo() {
			let that = this;
			this.$http.post('/api/userCenter', {
				name: document.cookie.slice(9)
			})
		},
		submitForm() {

		}
	},
}
</script>

<style scoped lang="stylus">
.content
	width: 100%
	height: 100%
	background: #eee
	.el-container.is-vertical
		margin: 4rem 2rem 6rem
		background: #fff
		border-radius: 0.4rem
		box-shadow: 0 1px 6px rgba(0,0,0,.1)
		.el-header
			display: flex
			justify-content: center
			align-items: center
			font-size: 1.6rem
			border-bottom: 1px solid #EBEEF5
		.el-collapse
			margin: 0 2rem
			border-top: none
			.el-collapse-item
				padding: 0 1rem



.user-info
	margin-right: 0.6rem

.user-info-del
	border-top: 1px dashed rgb(204, 204, 204)

</style>