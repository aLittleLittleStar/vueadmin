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
						path: '/publish/',
						query: {id: this.nowUserId}
					}">
				<i class="el-icon-edit"></i>
					发布文章
				</router-link>
			</el-menu-item>
			<el-menu-item>
				<router-link
					target="_blank"
					:to="{
						path: '/publishdata/',
						query: {id: this.nowUserId}
					}">
				<i class="el-icon-edit-outline"></i>
					发布资料
				</router-link>
			</el-menu-item>
			<el-menu-item>
				<router-link
					target="_blank"
					:to="{
						path: '/user-home/',
						query: {name: this.nowUserName}
					}">
					<i class="el-icon-user"></i>
					个人主页
				</router-link>
			</el-menu-item>
			<el-menu-item>
				<router-link
					target="_blank"
					:to="{
						path: '/user-center/',
						query: {id: this.nowUserId}
					}">
					<i class="el-icon-setting"></i>
					个人设置
				</router-link>
			</el-menu-item>
			<el-menu-item
				@click="unLogin"
				v-if="nowUserName"
				index="/login">
				<i class="el-icon-switch-button"></i>
				退出登录
			</el-menu-item>
		</el-submenu>
<!-- 		<el-menu-item
			@click="unLogin"
			v-if="nowUserName"
			index="/login">
			退出
		</el-menu-item> -->
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
<!-- 		<el-menu-item
			index="/talk">
			讨论
		</el-menu-item> -->
		<el-menu-item
			index="/">
			首页
		</el-menu-item>
		<div class="left">
			个人技术论坛
		</div>
	</el-menu>

</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '/',
				nowUserName: '',
				nowUserId: ''
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
				this.$http.post('/api/userId', {
					name: this.nowUserName
				}).then((res) => {
					console.log("res.id", res);
					console.log("res.id", res.data[0].id);
					this.nowUserId = res.data[0].id
				})
			},
			unLogin() {
				window.document.cookie = "username" + '=' + '' + ";path=/;expires=" + -1;
			}
		}
	}
</script>

<style lang="stylus" scoped>
.el-menu
	box-shadow: 0 2px 17px rgba(0, 0, 0, 0.3)
.el-menu-item
	&:hover
		background: #eee;
	a
		color: #909399
		text-decoration: none

.left
	position: relative
	margin: auto auto auto 2rem
	color: blueviolet
	font-size: 1.25rem
</style>