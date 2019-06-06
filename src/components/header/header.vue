<template>
	<el-menu
		:default-active="$route.path"
		mode="horizontal"
		@select="handleSelect"
		router>
		<el-submenu
			v-if="nowUserName"
			index="/user">
			<template slot="title">{{this.nowUserName}}</template>
			<el-menu-item>
				<router-link
					target="_blank"
					:to="{
						path: '/user-center/',
						query: {name: this.nowUserName}
					}">
					个人中心
				</router-link>
			</el-menu-item>
			<el-menu-item>
				<router-link
					target="_blank"
					:to="{
						path: '/user-home/',
						query: {name: this.nowUserName}
					}">
					个人主页
				</router-link>
			</el-menu-item>
		</el-submenu>
		<el-menu-item
			@click="unLogin"
			v-if="nowUserName"
			index="/login">
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
				// this.$router.push(keyPath);
			},
			getCookie: function() {
				if (document.cookie.length > 0) {
					this.nowUserName = document.cookie.slice(9);
				}
			},
			unLogin() {
				window.document.cookie = "username" + '=' + '' + ";path=/;expires=" + -1;
			}
		}
	}
</script>

<style lang="stylus" scoped>
.el-menu-item
	a
		color: #909399
		text-decoration: none
</style>