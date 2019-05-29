<template>
	<el-menu
		:default-active="activeIndex"
		mode="horizontal"
		@select="handleSelect">
		<el-submenu
			index="6">
			<template slot="title">我的</template>
			<el-menu-item index="6-1">个人中心</el-menu-item>
			<el-menu-item index="6-1">个人主页</el-menu-item>
		</el-submenu>
		<el-menu-item
			index="5">
			退出
		</el-menu-item>
		<el-menu-item
			index="4">
			注册
		</el-menu-item>
		<el-menu-item
			index="3">
			登录
		</el-menu-item>
		<el-menu-item
			index="2">
			讨论
		</el-menu-item>
		<el-menu-item
			index="1">
			首页
		</el-menu-item>
	</el-menu>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1'
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			}
		}
	}
</script>