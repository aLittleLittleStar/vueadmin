<template>
	<el-container>
		<el-row :gutter="0">
			<el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16">
				<div class="content">
					<div class="avatar-info">
						<div class="avatar-top">
							<div class="left">
								<div class="avatar-left">
									<div class="avatar-img">
										<img 
											:src="userHome.avator" 
											alt="头像">
									</div>
								</div>
								<div class="avatar-right">
									<div class="avatar-name">
										<span>{{userHome.name}}</span>
									</div>
									<div class="avatar-sex">
										<span class="iconfont icon-xingbie"></span>
										<span>{{userHome.sex}}</span>
									</div>
									<div class="avatar-birth">
										<span class="iconfont icon-shengri"></span>
										<span>{{userHome.birth}}</span>
									</div>
								</div>
							</div>
							<div class="right">
								<div class="seting">
									<span class="iconfont icon-setting"></span>
								</div>
							</div>
						</div>
						<div class="avatar-bottom">
							<el-tabs 
								type="card"
								v-model="activeTab" 
								:stretch="false"
								@tab-click="changTab">
								<el-tab-pane label="发布的文章" name="first" />
								<el-tab-pane label="发布的资料" name="second">
								</el-tab-pane>
								<el-tab-pane label="收藏的文章" name="third">
								</el-tab-pane>
							</el-tabs>
						</div>
					</div>
					<div class="publish-info">
						<div 
							class="item" 
							v-for="(item, idx) in publishArt"
							:key="idx">
							<div class="item-top">
								<div class="item-top-say">专栏</div>
								<div class="item-top-user">{{item.articleavatar}}</div>
								<div class="item-top-time">{{item.articletime}}</div>
								<div class="item-top-type">{{item.ttype}}</div>
							</div>
							<div
								class="item-center">
								<router-link 
									:to="{
											path: '/article/'+item.articleid,
											query: {id: item.articleid}}">
									<div class="item-center-title">
										{{item.articletitle}}
									</div>
									<div class="item-center-content">
										{{item.articlebrief}}
									</div>
								</router-link>
							</div>
							<div 
								class="item-bottom">
								<router-link 
									:to="{
										path: '/article/'+item.articleid,
										query: {id: item.articleid}}">
									<div class="item-bottom-like">
										点赞 {{item.articlelikes}}
									</div>
									<div class="item-bottom-collection">
										收藏 {{item.articlecollection}}
									</div>
									<div class="item-bottom-look">
										浏览量 {{item.articlelook}}
									</div>
								</router-link>
							</div>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</el-container>
</template>


<script>
export default {
	name: 'UserHome',
	data() {
		return {
			// 用户的基本信息
			userHome: '',
			// 发布的文章
			publishArt: '',
			// 收藏的文章
			collectionArt: '',
			// 发布的资料
			collectionData: '',
			activeTab: 'first',
		}
	},
	mounted() {
		this.getUserInfo();
		this.getPublishArt();
	},
	methods: {
		getUserInfo() {
			this.$http.post('/api/userHome', {
				name: this.$route.query.name
			}).then((res) => {
				console.log("res:", res);
				if (res.status === 200) {
					this.userHome = res.data[0];
					this.userHome.birth = res.data[0].birth.slice(0,10)
				} else {
					console.log("err");
				}
			})
		},
		getPublishArt() {
			let that = this;
			that.$http.post('/api/findPublish', {
				name: that.$route.query.name
			}).then((res) => {
				console.log("res:", res);
				if (res.status === 200) {
					that.publishArt = res.data;
					console.log("res.data:", res.data);
					for(let i = 0; i < res.data.length; i++) {
						that.publishArt[i].articletime = that.publishArt[i].articletime.slice(0,10)
					}
				} else {
					console.log("err");
				}
			})
		},
		getCollectionArt() {
			let that = this;
			that.$http.post('/api/findColl', {
				name: that.$route.query.name
			}).then((res) => {
				console.log("res:", res);
				if (res.status === 200) {
					that.collectionArt = res.data;
					console.log("res.data:", res.data);
					for(let i = 0; i < res.data.length; i++) {
						that.collectionArt[i].articletime = that.collectionArt[i].articletime.slice(0,10)
					}
				} else {
					console.log("err");
				}
			})
		},
		getPublishData() {
			let that = this;
			that.$http.post('/api/findData', {
				name: that.$route.query.name
			}).then((res) => {
				console.log("res:", res);
				if (res.status === 200) {
					that.collectionData = res.data;
					console.log("res.data:", res.data);
					// for(let i = 0; i < res.data.length; i++) {
						// that.publishArt[i].articletime = that.publishArt[i].articletime.slice(0,10)
					// }
				} else {
					console.log("err");
				}
			})
		},
		changTab() {
			console.log("activeTab:", this.activeTab);
		}
	}
}
</script>

<style lang="stylus" scoped>
.el-container
	background: #eee
	display: flex
	justify-content: center
	.el-row
		margin-left: -5px
		margin-right: -5px
		width: 100%
		height: 100%
		display: flex
		justify-content: center
		.el-col
			.content
				height: 100%
				display: flex
				flex-direction: column
				.avatar-info
					height: 14rem
					background: orange
					width: 100%
					display: flex
					flex-direction: column
					justify-content: space-between
					background: #fff
					margin-top: 4rem
					border-radius: 0.2rem
					box-shadow: 0 1px 2px rgba(0, 0, 0, .1)
					.avatar-top
						display: flex
						justify-content: space-between
						.left
							display: flex
							margin-left: 1rem
							.avatar-left
								margin-top: -2rem
								margin: -2rem 1rem 0 0rem
								.avatar-img
									width: 6rem
									height: 6rem
									box-sizing: border-box
									img
										width: 6rem
										height: 6rem
										border: 0.08rem solid #fff
										border-radius: 0.4rem
										box-shadow: 0 1px 2px rgba(0, 0, 0, .2)
							.avatar-right
								margin-top: 1rem
								.avatar-name
									span
										font-weight: 600
										letter-spacing: 0.1rem
										margin-bottom: 0.4rem
										color: #444
								.avatar-sex
									padding: 0.4rem 0
									span
										color: #444
										padding-right: 0.3rem
								.avatar-birth
									span
										padding-right: 0.3rem
										color: #444
						.right
							.seting
								margin: 1rem
								padding: 0.2rem 0.4rem
								background: #eee
								border-radius: 0.1rem
								&:hover
									cursor: pointer
									background: #d9d9d9
					.avatar-bottom
						padding: 0 1rem
				.publish-info
					margin-top: 1rem
					min-height: 30rem

// 引用recommend.styl
.item
	display: flex
	flex-direction: column
	border-bottom: 1px solid #eee
	padding: 1rem
	border-radius: 0.2rem
	background: #fff
	&:hover
		background: #e5e9f2
	.item-top
		display: flex
		color: #b2bac2
		font-size: 0.9rem
		.item-top-say
			margin-right: 0.8rem
			color: #b71ed7
		.item-top-user
			cursor: pointer
			&:hover
				color: #6fbd69
		.item-top-time
			margin: 0 0.8rem
		.item-top-type
			&:hover
				color: #f7b87b
	.item-center
		cursor: pointer
		display: flex
		flex-direction: column
		margin: 0.4rem 0
		.item-center-title
			font-size: 1.2rem
			margin-bottom: 0.4rem
			font-weight: 600
			letter-spacing: 0.1rem
			&:hover
				text-decoration: underline
		.item-center-content
			font-size: 1rem
			letter-spacing: 0.08rem
	.item-bottom
		display: flex
		color: #b2bac2
		font-size: 0.9rem
		.item-bottom-like
			cursor: pointer
			margin-right: 0.8rem
		.item-bottom-collection
			cursor: pointer
			margin-right: 0.8rem
		.item-bottom-look
			cursor: pointer

.item-center a,
.item-center a:hover{
	color: #ef8b80;
	text-decoration: none;
}

.item-bottom a,
.item-bottom a:hover{
	display: inline-flex;
	text-decoration: none;
	font-weight: 600;
	color: #6464de;
}
</style>