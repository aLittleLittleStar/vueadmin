<template>
	<el-container>
		<el-header>
			<MHeader></MHeader>
		</el-header>
		<el-main>
			<el-row :gutter="10">
				<el-col :xs="24" :sm="18" :md="18" :lg="19" :xl="21">
					<el-tabs 
						v-model="activeName" 
						@tab-click="handleClick">
						<el-tab-pane label="最新" name="first">
							<div class="content">
								<div 
									class="item" 
									v-for="(item, idx) in articleInfo"
									:key="idx"
									v-show="activeName === 'first'">
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
												{{item.articlecontent}}
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
						</el-tab-pane>
						<el-tab-pane label="最热" name="secnod">
							<div class="content">
								<div 
									class="item" 
									v-for="(item, idx) in articleInfo"
									:key="idx"
									v-show="activeName === 'secnod'">
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
						</el-tab-pane>
					</el-tabs>
				</el-col>
				<el-col :xs="0" :sm="6" :md="6" :lg="5" :xl="3">
						<div class="grid-content bg-purple-light">
							排行榜
					</div>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
import MHeader from '../../components/header/header'
export default {
	name: 'Recomment',
	data() {
		return {
			activeName: 'first',
			articleInfo: [],
			articleInfoFir: []
		}
	},
	mounted: function() {
		this.getArticleInfo(this.activeName);
	},
	methods: {
		handleClick: function(tab, event) {
			this.getArticleInfo(this.activeName);
		},
		getArticleInfo(nowName) {
			let that = this;
			if (nowName === 'first') {
				this.getInfo('/api/articleSearch');
			} else if(nowName === 'secnod') {
				this.getInfo('/api/articleSearchFir');
			}
		},
		getInfo(url) {
			this.$http.get(url)
			.then((res) => {
				if (res.status === 200) {
					console.log("res:", res);
					// 找到数据
					this.articleInfo = res.data;
					// 截取时间格式
					for(let i = 0; i < res.data.length; i++) {
						this.articleInfo[i].articletime = this.articleInfo[i].articletime.slice(0, 10);
					}
				} else {
					// 数据加载失败
					console.log("error");
				}
			})
		},
		// 路由跳转
		goToDetail: function(articleId) {
			this.$router.push({
				path: `/article/${articleId}`
			})
		}
	},
	components: {
		MHeader
	}
}
</script>

<style scoped lang="stylus">
@import '../../assets/common/stylus/recommend.styl'
</style>