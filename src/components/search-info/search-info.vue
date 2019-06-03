<template>
	<el-container>
		<el-header>
			<p>搜索结果</p>
		</el-header>
		<el-main>
			<el-row>
				<el-col 
					:xs="24" :sm="18" 
					:md="18" :lg="19" :xl="21">
					<div class="search-result">
						关键词<strong> {{keywords}} </strong>的搜索结果，共 <strong>{{searchLength}}</strong> 条结果
					</div>
					<div class="content">
						<div class="item">
							<div class="item-list">
								<el-row 
									type="flex"
									:gutter="10">
									<el-col 
										:xs="24" 
										:sm="12" 
										:md="8" 
										:lg="8" 
										:xl="8" 
										v-for="(item, idx) in searchResult"
										:key="idx">
										<el-card shadow="hover">
											<div class="card-top">
												<div class="card-title">
													发布者：<span>{{item.datapushname}}</span>
												</div>
											</div>
											<a
												:href="item.datawebsite"
												target="_blank">
											<div class="card-content">
												<div class="content-left">
													<img :src="item.dataicon" alt="Icon">
												</div>
												<div class="card-right">
													<div class="card-name">名称：
														<span>{{item.dataname}}</span>
													</div>
													<div class="card-introduct">介绍：
														<span>
															{{item.dataintroduce}}
														</span>
													</div>
												</div>
											</div>
											</a>
											<div class="card-bottom">
												<div class="card-type">类别：
													<span>{{item.datatype}}</span>
												</div>
												<div class="card-tag">标签：
													<span>{{item.datatags}}</span>
												</div>
											</div>
										</el-card>
									</el-col>
									<div 
										v-show="searchLength == 0"
										class="empty-result">
										<span>没有找到相关内容，请换个合适的关键词再试一次。</span>
									</div>
								</el-row>
							</div>
						</div>
					</div>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
export default {
	name: 'SearchInfo',
	data() {
		return {
			keywords: '',
			searchResult: '',
			searchLength: ''
		}
	},
	mounted() {
		this.getSearchInfo()
	},
	methods: {
		getSearchInfo() {
			this.keywords = this.$route.query.keywords;
			this.$http.post('/api/getSearchInfo', {
				name: this.keywords,
				content: this.keywords
			}).then((res) => {
				if (res.status === 200) {
					this.searchResult = res.data;
					console.log("this.searchResult:", this.searchResult);
					this.searchLength = this.searchResult.length;
				}
			})
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
		padding: 1.5rem
		.el-row
			display: flex
			justify-content: center

.item
	margin-top: 3rem
	.item-title
	.item-list
		.el-row
			display: flex
			flex-direction: column
			flex-wrap: wrap
			align-items: flex-start
			flex-direction: row
			.el-col
				margin-bottom: 1rem

.card-top
	display: flex
	justify-content: space-between
	.card-title
		color: #999
		span
			color: #000
			font-weight: 600
	.card-coll
		margin-right: 0.2rem
		display: flex
		align-items: center
.card-content
	margin: 0.4rem 0
	display: flex
	.content-left
		margin-right: 0.4rem
		img
			width: 3rem
			height: 3rem
			border: 1px solid rgba(189, 200, 204, 0.6)
			border-radius: 0.4rem
	.card-right
		.card-name
			color: #999
			span
				font-weight: 600
				color: #444
		.card-introduct
			color: #999
			span
				font-size: 0.9rem
				flex-wrap: wrap
				color: #bbb
.card-bottom
	font-size: 0.9rem
	color: #999
	.card-type
		span
			color: #000
	.card-tag
		margin-top: 0.2rem
		span
			color: #888
			background: #eee
			padding: 0.1rem 0.4rem
			border-radius: 0.2rem

a,
a:hover {
	text-decoration: none
}

// 搜索提示
.search-result
	color: #444
	font-size: 1.2rem

// 没有找到资源的样式
.empty-result
	color: #999
	font-weight: 600
	margin-top: 10rem
	font-size: 1.1rem
</style>