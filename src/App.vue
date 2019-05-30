<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<style lang="stylus">
@media only screen and (min-width:960px) and (max-width:1024px) {
  html {
    font-size: 13px;
  }
}
@media only screen and (min-width:600px) and (max-width:960px) {
  html {
    font-size: 12px;
  }
}
@media only screen and (min-width:0px) and (max-width:600px) {
  html {
    font-size: 11px;
  }
}

html
  display: flex
  justify-content: center
  align-items: center
  width: 100%
  height: 100%
  body
    width: 100%
    height: 100%
    margin: 0

#app
	width: 100%
	height: 100%
	display: flex


// 修改发布文章页面的样式
.content-say
  display: flex
  flex-direction: column
  .el-form-item__label
    text-align: left



// 修改发布资源页面的样式
.el-form-item__content .el-select.selectTag .el-input {
  width: 100%;
  min-width: 20rem;
}
</style>
