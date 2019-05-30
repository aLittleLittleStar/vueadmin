<template>
	<el-menu
		:default-active="$route.path"
		mode="horizontal"
		@select="handleSelect"
		router>
		<el-submenu
			v-if="nowUserName"
			index="/user">
			<template slot="title">我的</template>
			<el-menu-item 
				index="/user-page">
				个人中心
			</el-menu-item>
			<el-menu-item 
				index="/user-home">
				个人主页
			</el-menu-item>
		</el-submenu>
		<el-menu-item
			v-if="nowUserName"
			index="/unlogin">
			退出
		</el-menu-item>
		<el-menu-item
			v-if="!nowUserName"
			index="/register">
			注册
		</el-menu-item>
		<el-menu-item
			v-if="!nowUserName"
			index="/login">
			登录
		</el-menu-item>
		<el-menu-item
			index="/datalist">
			学习资源
		</el-menu-item>
		<el-menu-item
			index="/talk">
			讨论
		</el-menu-item>
		<el-menu-item
			index="/">
			首页
		</el-menu-item>
	</el-menu>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '/',
				nowUserName: ''
			}
		},
		mounted() {
			this.getCookie();
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
				this.$router.push(key);
			},
			getCookie: function() {
				if (document.cookie.length > 0) {
					this.nowUserName = document.cookie.slice(9);
				}
			}
		}
	}
</script>