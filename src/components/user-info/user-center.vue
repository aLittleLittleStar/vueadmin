<template>
	<div class="content">
		<el-row :gutter="10">
			<el-col :xs="24" :sm="20" :md="20" :lg="18" :xl="18">
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
										<el-input v-model="ruleForm.name" clearable disabled>
										</el-input>
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
											@click="submitBaseInfo('ruleForm')">
												保存
										</el-button>
									</el-form-item>
								</el-form>
							</div>
						</el-collapse-item>
<!-- 						<el-collapse-item title="头像" name="2">
							<div class="user-info-del">
								<el-form
									:model="ruleForm"
									:rules="rules"
									ref="ruleForm">
									<el-form-item
										label="用户昵称"
										prop="name">
										<el-input v-model="ruleForm.name" clearable></el-input>
									</el-form-item>
									<el-form-item>
										<el-button 
											type="primary" 
											@click="submitImgInfo('ruleForm')">
												编辑
										</el-button>
									</el-form-item>
								</el-form>
							</div>
						</el-collapse-item> -->
						<el-collapse-item title="密码" name="3">
							<div class="user-info-del">
								<el-form
									:model="rulePass"
									:rules="rules"
									ref="rulePass">
									<el-form-item
										label="当前密码"
										prop="pass">
										<el-input
											type="password"
											v-model="rulePass.pass"
											auto-complete="off"
											clearable>
										</el-input>
									</el-form-item>
									<el-form-item
										label="新密码"
										prop="newPass">
										<el-input
											type="password"
											v-model="rulePass.newPass"
											auto-complete="off"
											clearable>
										</el-input>
									</el-form-item>
									<el-form-item
										label="确认新密码"
										prop="checkPass">
										<el-input
											type="password"
											v-model="rulePass.checkPass"
											clearable>
										</el-input>
									</el-form-item>
									<el-form-item>
										<el-button 
											type="primary" 
											@click="upUserPass('rulePass')">
												确认更新
										</el-button>
									</el-form-item>
								</el-form>
							</div>
						</el-collapse-item>
						<el-collapse-item title="发布的文章" name="4">
							<div class="user-info-del">
								<el-table
									:data="pushArticleData"
									border
									style="width: 100%">
									<el-table-column
										prop="articletitle"
										label="文章标题">
									</el-table-column>
									<el-table-column
										prop="ttype"
										label="文章类别"
										width="160">
									</el-table-column>
									<el-table-column
										prop="articletime"
										label="发布时间"
										width="150">
									</el-table-column>
									<el-table-column
										label="操作"
										width="220">
										<template slot-scope="scope">
											<el-button 
												type="btn" 
												size="small"
												@click.native.prevent="seePushArticle(scope.$index, pushArticleData)">
												查看详情
											</el-button>
											<el-button 
												@click.native.prevent="delPushArticle(scope.$index)" 
												type="danger" 
												size="small">
												删除
											</el-button>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</el-collapse-item>
						<el-collapse-item title="发布的资料" name="5">
							<div class="user-info-del">
								<el-table
									:data="pushDataData"
									border
									style="width: 100%">
									<el-table-column
										prop="dataname"
										label="网站名">
									</el-table-column>
									<el-table-column
										prop="datatype"
										label="网站分类"
										width="120">
									</el-table-column>
									<el-table-column
										prop="datatags"
										label="标签"
										width="120">
									</el-table-column>
									<el-table-column
										prop="datapushtime"
										label="发布时间"
										width="150">
									</el-table-column>
									<el-table-column
										label="操作"
										width="220">
										<template slot-scope="scope">
											<el-button 
												type="btn" 
												size="small"
												@click.native.prevent="seePushData(scope.$index)">
												查看详情
											</el-button>
											<el-button 
												@click.native.prevent="delPushData(scope.$index)" 
												type="danger"
												size="small">
												删除
											</el-button>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</el-collapse-item>
						<el-collapse-item title="收藏的文章" name="6">
							<div class="user-info-del">
								<el-table
									:data="collectionArtDelList"
									border
									style="width: 100%">
									<el-table-column
										prop="articletitle"
										label="文章标题">
									</el-table-column>
									<el-table-column
										prop="articleavatar"
										label="发布者"
										width="120">
									</el-table-column>
									<el-table-column
										prop="ttype"
										label="文章类别"
										width="150">
									</el-table-column>
									<el-table-column
										prop="articletime"
										label="发布时间"
										width="150">
									</el-table-column>
									<el-table-column
										label="操作"
										width="240">
										<template slot-scope="scope">
											<el-button 
												type="btn" 
												size="small"
												@click.native.prevent="seeCollArt(scope.$index)">
												查看详情
											</el-button>
											<el-button 
												@click="cancelArticle(scope.$index)" 
												type="warning" 
												size="small">
												取消收藏
											</el-button>
										</template>
									</el-table-column>
								</el-table>
							</div>
						</el-collapse-item>
<!-- 						<el-collapse-item title="图表统计" name="7">
							<div class="user-info-del set-circle">
								<div 
									id="myChartCricle" 
									style="width:20rem;height:20rem;">
								</div>
							</div>
						</el-collapse-item> -->
					</el-collapse>
				</el-container>
			</el-col>
		</el-row>
	</div>
</template>


<script>
export default {
	name: 'UserCenter',
	data() {
		// 校验当前密码
		let validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入当前密码'));
			} else {
				// 检验新密码
				if (this.rulePass.newPass !== '') {
					this.$refs.rulePass.validateField('newPass');
				}
				callback();
			}
		};
		// 校验新密码
		let validateNewPass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入新密码'));
			} else {
				// 检验确认新密码
				if (this.rulePass.checkPass !== '') {
					this.$refs.rulePass.validateField('checkPass');
				}
				callback();
			}
		};
		// 校验确认密码
		let validatePasses = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入确认密码'));
			} else if (value !== this.rulePass.newPass) {
				callback(new Error('两次输入密码不一致!'));
			} else {
				callback();
			}
		};
		return {
			// 用户信息
			userInfo: '',
			// 当前展示的折叠面板
			activeName: '',
			// 当前未修改信息前的昵称
			activeUserName: '',
			activeSex: '',
			activeBirth: '',
			// 发布的文章
			pushArticleData: [],
			pushDataData: [],
			collectionArtId: [],
			collectionArtDelList:[],
			ruleForm: {
				name: '',
				birth: '',
				sex: '',
				id: ''
			},
			rulePass:{
				pass: '',
				newPass: '',
				checkPass:''
			},
			// 生日选择：不能大于当前时间
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now();
				}
			},
			// 规则
			rules: {
				// name: [
				// 	{required: true,message: '请输入昵称',trigger: 'blur'},
				// 	{min: 1,max: 8,message: '昵称长度在 1 到 8 个字符',trigger: 'blur'}],
				pass: [
					{type: 'string',required: true,trigger: 'blur',validator: validatePass},
					{min: 6,max: 12,message: '密码长度在 6 到 12 个字符',trigger: 'blur'}],
				newPass: [
					{type: 'string',required: true,validator: validateNewPass,trigger: 'blur'},
					{min: 6,max: 12,message: '确认密码长度在 6 到 12 个字符',trigger: 'blur'}],
				checkPass: [
					{type: 'string',required: true,validator: validatePasses,trigger: 'blur'},
					{min: 6,max: 12,message: '确认密码长度在 6 到 12 个字符',trigger: 'blur'}],
				sex: [{required: true,message: '请选择性别',trigger: 'change'}],
				birth: [{required: true,message: '请选择生日',trigger: 'change'}]
			}
		}
	},
	mounted() {
		this.getUserInfo();
		this.getPublishArt();
		this.getPublishData();
		this.getCollectionArtId();
	},
	methods: {
		// 获取用户信息
		getUserInfo() {
			let that = this;
			that.$http.post('/api/userHome', {
				name: document.cookie.slice(9)
			}).then((res) => {
				// console.log("res:", res);
				if (res.status === 200) {
					that.userInfo = res.data[0];
					that.userInfo.birth = res.data[0].birth.slice(0,10);
					that.ruleForm.name = that.userInfo.name;
					that.activeUserName= that.userInfo.name;
					that.ruleForm.birth = that.userInfo.birth;
					that.activeBirth = that.userInfo.birth;
					that.ruleForm.sex = that.userInfo.sex;
					that.activeSex = that.userInfo.sex;
					that.ruleForm.id = that.userInfo.id;
				} else {
					console.log("err");
				}
			})
		},
		// 获取用户发布的文章
		getPublishArt() {
			let that = this;
			that.$http.post('/api/findPublish', {
				name: document.cookie.slice(9)
			}).then((res) => {
				// console.log("res:", res);
				if (res.status === 200) {
					for(let i = 0; i < res.data.length; i++) {
						that.pushArticleData.push(res.data[i]);
					}
					for(let i = 0; i < res.data.length; i++) {
						that.pushArticleData[i].articletime = that.pushArticleData[i].articletime.slice(0,10)
					}
				} else {
					console.log("err");
				}
			})
		},
		// 获取用户发布的资料
		getPublishData() {
			let that = this;
			that.$http.post('/api/findPublishData', {
				name: document.cookie.slice(9)
			}).then((res) => {
				if (res.status === 200) {
					for(let i = 0; i < res.data.length; i++) {
						that.pushDataData.push(res.data[i])
					}
					for(let i = 0; i < res.data.length; i++) {
						that.pushDataData[i].datapushtime = that.pushDataData[i].datapushtime.slice(0,10)
					}
				} else {
					console.log("err");
				}
			})
		},
		// 获取用户收藏文章的ID
		getCollectionArtId() {
			let that = this;
			that.$http.post('/api/findUserCollId', {
				name: document.cookie.slice(9)
			}).then((res) => {
				// console.log("res:", res);
				if (res.status === 200) {
					that.collectionArtId = res.data;
					// console.log("res.collectionArtId:", res);
					that.getCollectionArtDel();
				} else {
					console.log("err");
				}
			})
		},
		// 获取用户收藏文章的详情
		getCollectionArtDel() {
			let that = this;
			for(let i = 0; i < that.collectionArtId.length; i++) {
				that.$http.post('/api/findUserCollDel', {
					articleid: that.collectionArtId[i].articleid
				}).then((res) => {
					if (res.status === 200) {
						res.data[0].articletime = res.data[0].articletime.slice(0,10);
						// console.log(res.data[0].articletime);
						that.collectionArtDelList.push(res.data[0]);
						// console.log(that.collectionArtDelList);
					} else {
						console.log("err");
					}
				})
			}
			this.showCircle();
		},
		/*
		 * 更新用户信息
		 * 昵称、性别、生日、头像、密码
		 */
		/*
		 * 思路：
		 */
		submitBaseInfo(formName) {
			// 先查询更新的信息：用户名是否被占用
			// 如果未被占用则更新数据否则进行提示
			this.$refs[formName].validate((valid) => {
				// 如果数据都进行了填写
				if (valid) {
					//判断是否修改了用户名
					if (this.ruleForm.name != this.activeUserName) {
						// 如果修改了：判断修改后的用户名是否已经存在
						this.$http.post('/api/findUserNameId', {
							name: this.ruleForm.name
						}).then((res) => {
							console.log("res.data:", res);
							if (res.data != '') {
								// 账号已存在:警告
								this.$showMessage('warning', '账号已存在')
							} else if(res.data == '') {
								// 进行修改用户信息
								this.upBaseInfo();
							}
						})
						// 如果没有修改用户名：
						// 则判断性别和出生日期修改了没：如果没修改则不提交
						// 如果修改了则进行提交
					} else if (this.activeBirth != this.ruleForm.birth || this.activeSex != this.ruleForm.sex) {
						this.upBaseInfo();
					} else {
						this.$showMessage('warning', '请修改后进行保存')
					}
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		// 更新用户信息表
		upBaseInfo() {
			let that = this;
			this.$http.post('/api/upBaseInfo', {
				name: that.ruleForm.name,
				sex: that.ruleForm.sex,
				birth: that.ruleForm.birth,
				id: that.ruleForm.id
			}).then((res) => {
				if(res.status == 200) {
					console.log("baseInfo", res);
					this.$showMessage('success', '恭喜你更新个人信息成功')
				} else {
					this.$showMessage('error', '非常抱歉更新信息失败')
				}
			})
			window.document.cookie = "username" + '=' + this.ruleForm.name + ";path=/;expires=" + 1;
			console.log("this.ruleForm.name:", this.ruleForm.name);
			// this.$router.push({
			// 	path: '/user-center/',
			// 	redirect: {
			// 		name: this.ruleForm.name
			// 	}
			// })
		},
		// 更新用户密码
		// 思路： 先确定当前密码、新密码、确认密码格式是否正确：
		// 		如果正确发送请求。判断当前密码输入是否正确
		// 		如果正确更新密码
		// 		如果不正确进行提示
		upUserPass(formName) {
			console.log("formName:", formName);
			this.$refs[formName].validate((valid) => {
				console.log("valid:", valid);
				// 如果数据都进行了填写
				if (valid) {
					this.$http.post('/api/login', {
						name: this.ruleForm.name,
						pass: this.rulePass.pass
					}).then((res) => {
						if (res.data == -1) {
							// 当前密码错误: 危险警告
							this.$showMessage('error', '当前密码输入错误')
						} else if(res.data == 1) {
							// 当前密码正确可以进行修改密码
							this.modifyPass();
						}
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		modifyPass() {
			let that = this;
			that.$http.post('/api/modifyPass', {
				id: that.ruleForm.id,
				pass: that.rulePass.newPass
			}).then((res) => {
				console.log("res:", res);
				if (res.status == 200) {
					that.rulePass.pass = '';
					that.rulePass.newPass = '';
					that.rulePass.checkPass = '';
					this.$showMessage('success', '恭喜你更新密码成功,正前往登录页面...')
					// 修改密码成功：应该清空cookie让其重新登陆
					window.document.cookie = "username" + '=' + '' + ";path=/;expires=" + 0;
					setTimeout(function() {
						that.$router.push('/login')
					}, 2000)
				} else {
					this.$showMessage('error', '非常抱歉更新密码失败')
				}
			})
		},
		handleClick(row) {

		},
		/*
		 * 点击删除、取消收藏的事件
		 */
		/*
		 * 删除发布的文章:
		 * 思路：点击删除
		 *  出现弹出框进行提示：是否删除
		 *    点击确定把该文章的id传入后台，进行删除
		 *      删除成功之后进行提示
		 *    点击取消
		 *      取消删除，弹出框消失
		 */
		delPushArticle(index) {
			let id = this.pushArticleData[index].articleid;
			let articletitle = this.pushArticleData[index].articletitle;
			this.$confirm('此操作将永久删除 <strong>' + articletitle + '</strong> 该文章, 是否继续?', '提示', {
				dangerouslyUseHTMLString: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				// 点击确定【发送id到后台进行删除】
				this.$http.post('/api/delArticle', {
					articleid: id
				}).then((res) => {
					if (res.status === 200) {
						this.pushArticleData = [];
						this.getPublishArt();
						this.$showMessage('success', '删除成功')
					}
				})
			}).catch(() => {
				this.$showMessage('info', '已取消删除')
			});
		},
		// 删除资料
		delPushData(index) {
			let id = this.pushDataData[index].dataid;
			let dataname = this.pushDataData[index].dataname;
			this.$confirm('此操作将永久删除 <strong>' + dataname + '</strong> 该分享资料, 是否继续?', '提示', {
				dangerouslyUseHTMLString: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				// 点击确定【发送id到后台进行删除】
				this.$http.post('/api/delData', {
					dataid: id
				}).then((res) => {
					if (res.status === 200) {
						this.pushDataData = [];
						this.getPublishData();
						this.$showMessage('success', '删除成功')
					}
				})
			}).catch(() => {
				this.$showMessage('info', '已取消删除')
			});
		},
		// 取消收藏
		cancelArticle(index) {
			let id = this.collectionArtDelList[index].articleid;
			let articletitle = this.collectionArtDelList[index].articletitle;
			this.$confirm('取消对 <strong>' + articletitle + '</strong> 该文章的点赞, 是否继续?', '提示', {
				dangerouslyUseHTMLString: true,
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				// 点击确定【发送id到后台进行删除】
				this.$http.post('/api/cancelArticle', {
					articleid: id,
					name: document.cookie.slice(9)
				}).then((res) => {
					if (res.status === 200) {
						this.collectionArtId = [];
						this.collectionArtDelList = [];
						this.getCollectionArtId();
						this.$showMessage('success', '取消点赞成功')
					}
				})
			}).catch(() => {
				this.$showMessage('info', '已取消取消收藏')
			});
		},
		/*
		 * 点击详情：打开新页面
		 */
		// 在新页面打开自己发布文章的详情页面
		seePushArticle(index, row) {
			console.log("index",index, row);
			let goArtDel = this.$router.resolve({
				path: '/article/'+this.pushArticleData[index].articleid,
				query: {id: this.pushArticleData[index].articleid}
			});
			window.open(goArtDel.href, '_blank');
		},
		// 在新页面打开自己发布资料的详情页面
		seePushData(index) {
			window.open(this.pushDataData[index].datawebsite, '_blank');
		},
		// 在新页面打开自己收藏文章的详情页面
		seeCollArt(index) {
			let goCollArtDel = this.$router.resolve({
				path: '/article/'+this.collectionArtDelList[index].articleid,
				query: {id: this.collectionArtDelList[index].articleid}
			});
			window.open(goCollArtDel.href, '_blank');
		},

		// 展示图表
		showCircle() {
			let myChartCricle  = this.$echarts.init(document.getElementById('myChartCricle'));
			let option = [];
			let getData = [];
			getData.push({
				value: this.pushArticleData.length,
				name: '发布的文章'
			},{
				value: this.pushDataData.length,
				name: '发布的资料'
			},{
				value: this.collectionArtId.length,
				name: '收藏的文章'
			})
			// console.log(this.pushArticleData.length, this.pushDataData.length, this.collectionArtId.length);
			option = {
				title : {
					text: this.activeUserName+"的图表统计",
					subtext: '一览众山小',
					x:'center'
				},
				tooltip : {
					trigger: 'item',
				},
				series: [
					{
						name: 'cricle',
						type: 'pie',
						radius : '44%',
						center: ['50%', '50%'],
						data: getData
					}
				],
				itemStyle: {
					emphasis: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
			myChartCricle.setOption(option);
		}
	},
}
</script>

<style scoped lang="stylus">
@import '../../assets/common/stylus/user-center.styl'

</style>