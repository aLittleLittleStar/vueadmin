<template>
	<el-container>
		<el-header>
			<p>发布学习资源</p>
		</el-header>
		<el-main>
			<el-row>
				<el-col
					:sm="20"
					:md="18"
					:lg="14">
					<el-form 
						:model="dataInfo" 
						:rules="rules" 
						ref="dataInfo">
						<el-form-item 
							label="网站名称" 
							prop="dataName">
							<el-input 
								placeholder="请输入网站官方名称"
								v-model="dataInfo.dataName"
								clearable>
							</el-input>
						</el-form-item>
						<el-form-item
							label="网站Logo"
							prop="dataIcon">
							<el-input 
								v-model="dataInfo.dataIcon"
								placeholder="请输入网站官网Logo地址"
								clearable>
								<el-select 
									slot="prepend"
									v-model="dataInfo.selectIcon"
									placeholder="请选择">
									<el-option 
										label="http://" value="http://">
									</el-option>
									<el-option 
										label="https://" value="https://">
									</el-option>
								</el-select>
								</el-input>
						</el-form-item>
						<el-form-item
							label="网站地址"
							prop="dataWebsite">
							<el-input 
								v-model="dataInfo.dataWebsite"
								placeholder="请输入网站地址"
								clearable>
								<el-select 
									slot="prepend"
									v-model="dataInfo.selectSit"
									placeholder="请选择">
									<el-option 
										label="http://" value="http://">
									</el-option>
									<el-option 
										label="https://" value="https://">
									</el-option>
								</el-select>
							</el-input>
						</el-form-item>
						<el-form-item
							label="网站介绍"
							prop="dataIntroduce">
							<el-input 
								type="textarea"
								:autosize="{ minRows: 2}"
								placeholder="请输入网站介绍"
								v-model="dataInfo.dataIntroduce"
								clearable></el-input>
						</el-form-item>
						<el-form-item 
							label="网站分类"
							prop="dataType">
							<el-select
								class="selectTag"
								v-model="dataInfo.dataType"
								placeholder="请选择网站分类">
								<el-option 
									v-for="(tag, idex) in dataTag"
									:key="idex"
									:label="tag.tagName" 
									:value="tag.tagName">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item 
							label="标签"
							prop="dataTag">
							<el-select
								class="selectTag"
								v-model="dataInfo.dataTag"
								placeholder="请选择网站标签">
								<el-option 
									v-for="(tag, idx) in webTag"
									:key="idx"
									:label="tag.tagName" 
									:value="tag.tagSay">
								</el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button
								type="primary"
								@click="publish('dataInfo')">
								立即发布
							</el-button>
							<el-button
								@click="resetForm('dataInfo')">
								重置
							</el-button>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
export default {
	name: 'PublishData',
	data() {
		return {
			nowUserName: '',
			dataTag: [
				{tagName: '高清图库'},
				{tagName: '灵感创意'},
				{tagName: '素材资源'},
				{tagName: '求职招聘'},
				{tagName: '前端学习'},
				{tagName: '后台开发'},
				{tagName: '字体下载'},
				{tagName: '摄影美图'},
				{tagName: '设计社区'},
				{tagName: '绘画涂鸦'},
			],
			webTag: [
				{tagName: '免费', tagSay: '免费'},
				{tagName: '半付费', tagSay: '半付费'},
				{tagName: '无版权', tagSay: '无版权'},
				{tagName: '付费', tagSay: '付费'},
			],
			dataInfo: {
				dataName: '',
				dataIcon: '',
				dataWebsite: '',
				dataIntroduce: '',
				dataType: '',
				dataTag: '',
				selectSit: 'http://',
				selectIcon: 'http://'
			},
			rules: {
				dataName: [
					{required: true, message: '请输入网站官方名称', trigger: 'blur'},
					{min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'}
				],
				dataIcon: [
					{required: true, message: '请输入网站官方Logo地址', trigger: 'blur'}
				],
				dataWebsite: [
					{required: true, message: '请输入网站官方地址', trigger: 'blur'}
				],
				dataIntroduce: [
					{required: true, message: '请输入网站介绍', trigger: 'blur'},
					{min: 50, max: 140, message: '长度在 50 到 140 个字符', trigger: 'blur'}
				],
				dataTag: [
					{required: true, message: '请选择网站分类', trigger: 'change'}
				],
				dataType: [
					{required: true, message: '请选择网站标签', trigger: 'change'}
				]
			}
		}
	},
	mounted() {
		this.getCookie();
	},
	methods: {
		// 发布
		publish: function(name) {
			console.log("dataInfo：", this.dataInfo);
			this.$refs[name].validate((valid) => {
				// 如果填写完毕且符合校验规则：可以提交
				if (valid) {
					// 发送ajax请求
					this.$http.post('/api/addData', {
						dataname: this.dataInfo.dataName,
						dataicon: this.dataInfo.selectIcon + this.dataInfo.dataIcon,
						datawebsite: this.dataInfo.selectSit + this.dataInfo.dataWebsite,
						dataintroduce: this.dataInfo.dataIntroduce,
						datatype: this.dataInfo.dataType,
						datatags: this.dataInfo.dataTag,
						datapushname: this.nowUserName,
					}).then((res) => {
						if (res.status === 200) {
							// 发布成功: 跳转到详情页面
							this.succOpen();
							setTimeout(function() {
								// this.$router.push({
								// 	path: '/',
								// })
							}, 2000);

						} else {
							// 发布失败
							this.errOpen()
						}
					})
				} else {
					this.warOpen();
					return false;
				}
			})
		},
		// 重置
		resetForm: function(name) {
			this.$refs[name].resetFields();
		},
		// 获取cookie
		getCookie: function() {
			if (document.cookie.length > 0) {
				this.nowUserName = document.cookie.slice(9);
				console.log("this.nowUserName", this.nowUserName);
			}
		},
		succOpen() {
			this.$message({
				message: '发布资源成功，正跳转至资源详情页面',
				type: 'success'
			})
		},
		errOpen() {
			this.$message.error('发布资源失败');
		},
		warOpen() {
			this.$message.warning('请正确填写资源信息');
		}
	}
}
</script>

<style lang="stylus" scoped>
.el-container
	.el-header
		text-align: center
		background: #e7e7e7
		font-size: 1.2rem
		color: #141414
		font-weight: 600
		letter-spacing: 2px
	.el-main
		.el-row
			.el-col
				display: flex
				justify-content: center
				width: 100%
				align-items: center
				margin-top: 2rem
				.el-form
					.el-form-item
						&:last-child
							text-align: center
							margin-top: 2rem

.el-form-item__content
	.el-select.selectTag
		width: 100%


</style>