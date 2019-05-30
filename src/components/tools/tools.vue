<template>
	<el-container>
		<el-header>
			<MHeader></MHeader>
		</el-header>
	</el-container>
</template>

<script>
import MHeader from '../header/header'
export default {
	name: 'Tools',
	data() {
		return {

		}
	},
	components: {
		MHeader
	}
}
</script>

<style lang="stylus" scoped>
.el-container
	display: flex
	flex-direction: column
	.el-header
		.el-menu
			display: flex
			overflow-x: auto
			flex-direction: row-reverse;
	.el-main
		padding: 1.5rem
</style>