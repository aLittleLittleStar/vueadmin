<template>
	<el-container>
		<el-header>
			<MHeader></MHeader>
		</el-header>
		<el-main>
			<el-row>
				<el-col 
					:xs="24" :sm="18" 
					:md="18" :lg="19" :xl="21">
					<el-form ref="form" :model="form">
						<el-form-item>
							<el-input 
								v-model="form.name"
								placeholder="请输入资源名称"
								@keydown.enter.native="keyCodeSearch"
								clearable>
								<el-button 
									slot="append" 
									icon="el-icon-search"
									@click="searchList">
								</el-button>
							</el-input>
						</el-form-item>
					</el-form>
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
										v-for="(item, idx) in dataList"
										:key="idx">
										<el-card shadow="hover">
											<div class="card-top">
												<div class="card-title">
													发布者：
													<router-link
														target="_blank"
														:to="{
															path: '/user-home/',
															query: {name: item.datapushname}
														}">
														<span>{{item.datapushname}}</span>
													</router-link>
												</div>
<!-- 												<div class="card-coll">
													<span class="iconfont">&#xe620;</span>
													{{item.datacollection}}
												</div> -->
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
import MHeader from '../header/header'
export default {
	name: 'DataList',
	data() {
		return {
			dataList: '',
			findData: '',
			form: {
				name: ''
			}
		}
	},
	mounted() {
		if (this.dataList ==='') {
			this.colesFullScreen()
		}
		this.getDataList();
	},
	methods: {
		getDataList: function() {
			this.$http.get('/api/searchData').then((res) => {
				if (res.status === 200) {
					console.log("res.data:", res);
					this.dataList = res.data;
				} else {
					console.log("error");
				}
			})
		},
		// 回车键进行搜索
		keyCodeSearch(e) {
			let keyCode = window.event ? e.keyCode : e.which;
			if(keyCode === 13) {
				this.searchList()
			}
		},
		searchList: function() {
			let value = this.form.name;
			if (value === '') {
				this.errOpen();
				return;
			}
			this.$router.push({
				path: '/searchInfo',
				query: {
					keywords: value
				}
			})
		},
		errOpen() {
			this.$showMessage('warning', '请先输入关键字进行搜索')
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
	},
	components: {
		MHeader
	}
}
</script>

<style lang="stylus" scoped>
@import '../../assets/common/stylus/data-list.styl'
</style>