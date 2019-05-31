<template>
	<el-container>
		<el-header>
			<p>发布文章</p>
		</el-header>
		<el-main>
			<el-row>
				<el-col 
					:sm="20"
					:md="18"
					:lg="14">
					<el-form 
						ref="form"
						:model="form"
						:rules="rules">
						<el-form-item
							prop="title"
							label="文章标题">
							<el-input 
								v-model="form.title"
								clearable>
								</el-input>
						</el-form-item>
						<el-form-item
							prop="type"
							label="文章类别">
							<el-input 
								v-model="form.type"
								clearable>
								</el-input>
						</el-form-item>
						<el-form-item
							prop="contentMin"
							label="文章简介">
							<el-input 
								v-model="form.contentMin"
								clearable>
							</el-input>
						</el-form-item>
						<el-form-item
							prop="content"
							label="文章内容"
							class="content-say">
							<editor-bar 
								v-model="form.content" 
								:isClear="isClear">
								<!--  -->
							</editor-bar>
						</el-form-item>
						<el-form-item>
							<el-button
								type="primary"
								@click="publish('form')">
								立即发布
							</el-button>
							<el-button
								@click="resetForm('form')">
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
import EditorBar from '../../components/editor/editor'
export default {
	name: 'Publish',
	data() {
		return {
			publishInfo: [],
			nowUserName: '',
			isClear: false,
			form: {
				title: '',
				type: '',
				contentMin: '',
				content: ''
			},
			rules: {
				title: [
					{
						required: true,
						message: '请输入文章标题',
						trigger: 'blur' 
					},
					{
						min: 2,
						max: 26,
						message: '长度在 2 到 26 个字符',
						trigger: 'blur'
					}
				],
				type: [
					{
						required: true,
						message: '请输入文章类别',
						trigger: 'blur' 
					},
					{
						min: 4,
						max: 20,
						message: '长度在 4 到 20 个字符',
						trigger: 'blur'
					}
				],
				contentMin: [
					{
						required: true,
						message: '请输入文章简介',
						trigger: 'blur' 
					},
					{
						min: 40,
						max: 200,
						message: '长度在 40 到 200 个字符',
						trigger: 'blur'
					}
				],
				content: [
					{
						required: true,
						message: '请输入文章内容',
						trigger: 'blur' 
					},
					{
						min: 200,
						message: '长度至少需要200个字符',
						trigger: 'blur'
					}
				]
			}
		}
	},
	mounted() {
		this.getCookie();
	},
	methods: {
		// 提交
		publish: function(formName) {
			if (!this.nowUserName) {
				return;
			}
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// let data = new FormData();
					// data.append('articleavatar', 'this.nowUserName');
					// data.append('articletitle', 'this.form.title');
					// data.append('articlecontent', 'this.form.content');
					// data.append('articlebrief', 'this.form.contentMin');
					// console.log("data:", data);
					// return;
					// 如果文章标题、简介、内容不为空且格式正确
					// 把发布者、以及填写的内容提交到后台
					this.$http.post('/api/publish', {
						articleavatar: this.nowUserName,
						articletitle: this.form.title,
						articlecontent: this.form.content,
						articlebrief: this.form.contentMin,
						ttype: this.form.type,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then((res) => {
						// 返回200表示发布成功
						if (res.status === 200) {
							this.succOpen();
						} else {
							// 发布失败
							this.errOpen();
						}
					})

				} else {
					// 如果文章标题、简介、内容不为空且格式不正确时：返回
					return false;
				}
			});
		},
		// 重置
		resetForm: function(formName) {
			this.$refs[formName].resetFields();
		},
		// 获取cookie
		getCookie: function() {
			if (document.cookie.length > 0) {
				this.nowUserName = document.cookie.slice(9);
			}
		},
		succOpen() {
			this.$message({
				message: '发布成功!',
				type: 'success'
			})
		},
		errOpen() {
			this.$message.error('发布失败');
		}
	},
	components: {
		EditorBar
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
			display: flex
			justify-content: center  //左右居中



.el-form-item
	text-align: center
	margin-top: 1rem

</style>