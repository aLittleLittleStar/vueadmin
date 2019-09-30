<template>
	<el-container>
		<el-header>
			<p>文章详情</p>
		</el-header>
		<el-row>
			<el-col 
				:xs="22" :sm="20" :md="18" :lg="16" :xl="14">
				<div class="article">
					<div class="article-top">
						<!-- 发布者信息 -->
						<div class="article-avatar">
							<div class="avatar-top">
								<div class="avatar-img">
									<img :src="articleInfo.avator" alt="头像">
								</div>
								<div class="avatar-name">
									<router-link
										target="_blank"
										:to="{
											path: '/user-home/',
											query: {name: articleInfo.articleavatar}
										}">
									{{articleInfo.articleavatar}}
									</router-link>
								</div>
								<el-tag type="info">
									{{articleInfo.ttype}}
								</el-tag>
							</div>
							<div class="avatar-bottom">
								<div class="avatar-time">
									{{articleInfo.articletime}}
								</div>
								<div class="avatar-look">
									浏览量 {{articleInfo.articlelook}}
								</div>
							</div>
						</div>
						<!-- 文章信息 -->
						<div class="article-info">
							<div class="article-info-top">
								<div class="article-info-title">
									{{articleInfo.articletitle}}
								</div>
								<div 
									class="article-info-content"
									v-html="articleInfo.articlecontent">
									<!-- {{articleInfo.articlecontent}} -->
								</div>
							</div>
							<div class="article-info-bottom">
								<div 
									class="article-info-like">
									<span 
										class="iconfont"
										:class="{changeColor: starType}"
										@click="userStar(starNumber)">
										&#xe615;
									</span>
										{{starNumber}}
								</div>
								<div 
									class="article-info-collection">
									<span 
										class="iconfont"
										:class="{changeColor: collectionType}"
										@click="userCollection(collectionNumber)">
										&#xe620;
									</span>
									{{collectionNumber}}
								</div>
							</div>
						</div>
					</div><!-- article-top -->
					<!-- 下方评论 -->
					<div class="article-bottom">
						<!-- 暂不处理 -->
					</div>
				</div>
			</el-col>
		</el-row>
	</el-container>
</template>

<script>
export default {
	name: 'Article',
	data() {
		return {
			// 如果登陆：当前登录者的ID
			nowUserName: '',
			// 文章数据
			articleInfo: [],
			articleId: '',
			// 文章的作者id
			articleAvatarId: '',
			// 点赞状态
			starType: false,
			// 用户是否点赞过该文章
			userFirStar: true,
			// 收藏状态
			collectionType: false,
			// 用户是否收藏过该文章
			userFirColl: true,
			starNumber: '',
			collectionNumber: ''
		}
	},
	mounted() {
		if (this.articleInfo =='') {
			this.colesFullScreen()
		}
		this.getInfo(); //获取文章信息

		this.getCookie();
		// 如果用户登录：判断用户点赞的状态
		if (this.nowUserName) {
			this.getStarStatus();
			this.getCollStatus();
		}
	},
	methods: {
		// 用户是否登录储存在本地
		// 先判断当前用户是否点赞或者收藏该文章
		// 如果是：点亮状态
		// 否：点暗状态
		getInfo() {
			// 文章的id
			console.log("articleId:", this.$route.query.id);
			this.articleId = this.$route.query.id;
			this.$http.post('/api/article', {
				articleid: this.articleId
			}).then((res) => {
				// 如果返回200则拿到数据
				if(res.status === 200) {
					console.log("res.data", res.data);
					this.articleInfo = res.data[0];
					console.log(this.articleInfo);
					// 截取时间：时间格式化
					this.articleInfo.articletime = res.data[0].articletime.slice(0, 10)
					// 保存当前文章点赞和收藏的数量
					this.starNumber = res.data[0].articlelikes;
					this.collectionNumber = res.data[0].articlecollection;
				} else {
					// 未拿到数据
					console.log("err");
				}
			})
		},
		// 如果用户登录：获取当前登录用户的点赞状态
		getStarStatus: function() {
			console.log("this.$router.push", );
			this.$http.post('/api/starstatus', {
				articleid: this.articleId,
				username: this.nowUserName,
			})
				.then((res) => {
					if (res.status === 200) {
						// 如果后台数据++--成功:相应的改变点赞状态
						if (res.data == '') {
							// 如果用户未点赞：记录一下用户的点赞数据：
							// 只有当点赞的时候才往数据库插入数据
							// 数据为空：用户未点赞过
							this.userFirStar = true;
							return;
						} else {
							this.userFirStar = false;
							if (res.data[0].starstatus === 0) {
								this.starType = false
							} else {
								this.starType = true
							}
						}
					} else {
						console.log("err");
					}
			})
		},
		// 如果用户登录：获取当前登录用户的收藏状态
		getCollStatus: function() {
			this.$http.post('/api/collstatus', {
				articleid: this.articleId,
				username: this.nowUserName,
			}).then((res) => {
					if (res.status === 200) {
						// 如果后台数据++--成功:相应的改变收藏状态
						if (res.data == '') {
							// 如果用户未收藏：记录一下用户的收藏数据：
							// 只有当收藏的时候才往数据库插入数据
							// 数据为空：用户未收藏过
							this.userFirColl = true;
							return;
						} else {
							this.userFirColl = false;
							if (res.data[0].collstatus === 0) {
								this.collectionType = false
							} else {
								this.collectionType = true
							}
						}
					} else {
						console.log("err");
					}
			})
		},
		/*
		* 点赞:逻辑
		* 先判断用户是否登录
		* 点击颜色改变：前端先数量变换：再把点赞状态传入后台
		* 后台进行真正的++--
		*/
		userStar: function() {
			// 判断登录状态
			if (this.nowUserName === '') {
				this.$showMessage('warning', '提醒只有登录之后才能点赞')
				return
			}
			// 切换点赞颜色
			this.starType = !this.starType
			
			// 点赞++--
			if (this.starType) {
				this.$showMessage('success', '点赞成功')
				this.starNumber++
			} else {
				this.$showMessage('success', '取消点赞成功')
				this.starNumber--
			}
			// 发送点赞的数据：如果用户没有点赞过该文章
			// 则插入用户的id文章的id及点赞的状态
			// 否则更新点赞的状态
			// 如果用户未点过赞【插入数据】||否则更新数据
			if (this.userFirStar) {
				this.userFirStar = false;
				this.$http.post('/api/addUserStar', {
					starstatus: 1,
					articleid: this.articleId,
					username: this.nowUserName
				}).then((res) => {
					if (res.status === 200) {
						// 如果后台数据++--成功:不用管
						console.log("res.data:", res.data);
					} else {
						console.log("err");
					}
				})
			} else {
				// 把当前用户点赞的状态传入点赞表
				let nowUserStarStatus = 0;
				if (this.starType) {
					nowUserStarStatus = 1;
				} else {
					nowUserStarStatus = 0;
				}
				console.log("nowUserStarStatus:", nowUserStarStatus);
				// 更新点赞
				this.$http.post('/api/upstarstatus', {
					starstatus: nowUserStarStatus,
					articleid: this.articleId,
					username: this.nowUserName
				}).then((res) => {
					if (res.status === 200) {
						// 如果后台数据++--成功:不用管
						console.log("succ");
						console.log("res.data:", res.data);
					} else {
						console.log("err");
					}
				})
			}
			// 更新点赞数量
			this.$http.post('/api/upstar', {
				articlelikes: this.starNumber,
				articleid: this.articleId
			}).then((res) => {
				if (res.status === 200) {
					// 如果后台数据++--成功:不用管
					console.log("res.data:", res.data);
				} else {
					console.log("err");
				}
			})
		},
		// 收藏
		userCollection: function() {
			if (this.nowUserName === '') {
				this.$showMessage('warning', '请登录之后进行收藏')
				return;
			}
			this.collectionType = !this.collectionType

			if (this.collectionType) {
				this.$showMessage('success', '收藏成功')
				this.collectionNumber++
			} else {
				this.$showMessage('success', '取消收藏成功')
				this.collectionNumber--
			}


			if (this.userFirColl) {
				console.log("this.userFirColl:", this.userFirColl);
				this.userFirColl = false;
				this.$http.post('/api/addUsercoll', {
					collstatus: 1,
					articleid: this.articleId,
					username: this.nowUserName
				})
					.then((res) => {
						if (res.status === 200) {
							// 如果后台数据++--成功:不用管
							console.log("succ");
							console.log("res.data:", res.data);
						} else {
							console.log("err");
						}
				})
			} else {
				// 把当前用户点赞的状态传入点赞表
				let nowUserCollStatus = 0;
				if (this.collectionType) {
					nowUserCollStatus = 1;
				} else {
					nowUserCollStatus = 0;
				}
				console.log("nowUserCollStatus:", nowUserCollStatus);
				// 更新点赞
				this.$http.post('/api/upcollstatus', {
					collstatus: nowUserCollStatus,
					articleid: this.articleId,
					username: this.nowUserName
				})
					.then((res) => {
						if (res.status === 200) {
							// 如果后台数据++--成功:不用管
							console.log("succ");
							console.log("res.data:", res.data);
						} else {
							console.log("err");
						}
				})
			}
			// 更新点赞数量
			this.$http.post('/api/upcoll', {
				articlecollection: this.collectionNumber,
				articleid: this.articleId
			}).then((res) => {
				if (res.status === 200) {
					// 如果后台数据++--成功:不用管
					console.log("res.data:", res.data);
				} else {
					console.log("err");
				}
			})
		},

		/*
		  封装请求
		*/
		// 封装axios请求
		sendInfo: function(userType, url) {
			// userId： 当前登录用户的ID
			// userType： 当前用户点赞或者评论【】
			this.$http.post(url, {
				articleid: this.articleId,
				articlelikes: userType,
			})
				.then((res) => {
					if (res.status === 200) {
						// 如果后台数据++--成功:不用管
						console.log("succ");
						console.log("res.data:", res.data);
					} else {
						console.log("err");
					}
			})
		},
		// 获取cookie
		getCookie: function() {
			if (document.cookie.length > 0) {
				this.nowUserName = document.cookie.slice(9);
			}
		},
		// 加载loading 动画
		colesFullScreen() {
			const loading = this.$loading({
				lock: true,
				text: 'Loading',
				spinner: 'el-icon-loading',
				background: 'rgba(0, 0, 0, 0.4)'
			})
			loading.close();
		}
	}
}
</script>
<style lang="stylus" scoped>
// 引入阿里巴巴矢量图标：点赞收藏图标
@import '../../assets/common/fonts/iconfont.css'
@import '../../assets/common/stylus/article.styl'
</style>