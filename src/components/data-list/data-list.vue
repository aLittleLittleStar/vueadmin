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
								placeholder="以最快的速度获取想要的资源"
								@keyup.native.enter="searchList"
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
													发布者：<span>{{item.datapushname}}</span>
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
			this.$message.error('请先输入关键字进行搜索');
		},
	},
	components: {
		MHeader
	}
}
</script>

<style lang="stylus" scoped>
@import '../../assets/common/stylus/data-list.styl'
</style>