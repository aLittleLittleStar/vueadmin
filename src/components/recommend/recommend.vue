<template>
  <el-container>
    <el-header>
      <MHeader></MHeader>
    </el-header>
    <el-main>
      <el-row :gutter="10">
        <el-col :xs="24" :sm="20" :md="20" :lg="18" :xl="18">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="最新" name="first">
              <div class="content">
                <div
                  class="item"
                  v-for="(item, idx) in articleInfo"
                  :key="idx"
                  v-show="activeName === 'first'"
                >
                  <div class="item-top">
                    <div class="item-top-say" v-if="item.articlecollection > 6">推荐</div>
                    <div class="item-top-say" style="color: #f70" v-else>专栏</div>
                    <router-link
                      target="_blank"
                      :to="{
												path: '/user-home/',
												query: {name: item.articleavatar}
											}"
                    >
                      <div class="item-top-user">{{item.articleavatar}}</div>
                    </router-link>
                    <div class="item-top-time">{{item.articletime}}</div>
                    <div class="item-top-type">{{item.ttype}}</div>
                  </div>
                  <div class="item-center">
                    <router-link
                      target="_blank"
                      :to="{
													path: '/article/'+item.articleid,
													query: {id: item.articleid}}"
                    >
                      <div class="item-center-title">{{item.articletitle}}</div>
                      <div class="item-center-content" v-html="item.articlebrief"></div>
                      <!-- {{item.articlecontent}} -->
                    </router-link>
                  </div>
                  <div class="item-bottom">
                    <router-link
                      :to="{
												path: '/article/'+item.articleid,
												query: {id: item.articleid}}"
                    >
                      <div class="item-bottom-like">点赞 {{item.articlelikes}}</div>
                      <div class="item-bottom-collection">收藏 {{item.articlecollection}}</div>
                      <!-- 											<div class="item-bottom-look">
												浏览量 {{item.articlelook}}
                      </div>-->
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
                  v-show="activeName === 'secnod'"
                >
                  <div class="item-top">
                    <div class="item-top-say" v-if="item.articlecollection > 6">推荐</div>
                    <div class="item-top-say" style="color: #f70" v-else>专栏</div>
                    <router-link
                      target="_blank"
                      :to="{
												path: '/user-home/',
												query: {name: item.articleavatar}
											}"
                    >
                      <div class="item-top-user">{{item.articleavatar}}</div>
                    </router-link>
                    <div class="item-top-time">{{item.articletime}}</div>
                    <div class="item-top-type">{{item.ttype}}</div>
                  </div>
                  <div class="item-center">
                    <router-link
                      target="_blank"
                      :to="{
												path: '/article/'+item.articleid,
												query: {id: item.articleid}}"
                    >
                      <div class="item-center-title">{{item.articletitle}}</div>
                      <div class="item-center-content" v-html="item.articlebrief"></div>
                    </router-link>
                  </div>
                  <div class="item-bottom">
                    <router-link
                      :to="{
												path: '/article/'+item.articleid,
												query: {id: item.articleid}}"
                    >
                      <div class="item-bottom-like">点赞 {{item.articlelikes}}</div>
                      <div class="item-bottom-collection">收藏 {{item.articlecollection}}</div>
                      <!-- 											<div class="item-bottom-look">
												浏览量 {{item.articlelook}}
                      </div>-->
                    </router-link>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <!-- 				<el-col :xs="0" :sm="6" :md="6" :lg="5" :xl="3">
						<div class="grid-content bg-purple-light">
							排行榜
					</div>
        </el-col>-->
      </el-row>
      <el-row :gutter="10" class="pageNum">
        <el-col :xs="24" :sm="20" :md="20" :lg="18" :xl="18">
          <el-pagination
            :background="true"
            :total="InfoLength"
            layout="total, prev, next"
            @prev-click="pageDel"
            @next-click="pageAdd"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
/*
 * 分页：思路
 * 首次加载时：默认为第一页10条数据
 * 当点击上一页、下一页时把当前的页码传到后台进行数据加载
 * 有一个页码的总长度：
 *   当前页码等于总长度时：点击下一页【进行提示已是尾页】
 *   当当前页码等于一时：点击上一页【提示当前已是首页】
 * 当点击切换选项卡时：当前页码重置为一
 */
import MHeader from "../../components/header/header";
export default {
  name: "Recomment",
  data() {
    return {
      activeName: "first",
      // 最新
      articleInfo: [],
      // 最热
      articleInfoFir: [],
      // 当前页数
      nowPaging: 1,
      // 页数的总长度
      pageSize: 1,
      // 数据的总长度
      InfoLength: 1
    };
  },
  mounted: function() {
    if (this.articleInfo == "") {
      this.colesFullScreen();
    }
    this.colesFullScreen();
    // 先获取页面的数据总长度【多少条】
    this.getArticleLen();
    // 再进行加载数据
    this.getArticleInfo(this.activeName, this.nowPaging);
  },
  methods: {
    // 点击切换选项卡时：当前页面重置为1
    handleClick: function(tab, event) {
      this.nowPaging = 1;
      this.getArticleInfo(this.activeName, this.nowPaging);
    },
    // 获取文章的数据
    getArticleInfo(nowName, nowPage) {
      let that = this;
      if (nowName === "first") {
        this.getInfo("/api/articleSearch", nowPage);
      } else if (nowName === "secnod") {
        this.getInfo("/api/articleSearchFir", nowPage);
      }
    },
    getArticleLen: function() {
      this.$http.get("/api/getArticleLen").then(res => {
        if (res.status === 200) {
          // 数据的总条数
          let num = res.data[0]["count(*)"];
          this.InfoLength = num;
          // 数据除以10的余数
          let Remain = num % 10;
          // 数据的除以10的结果
          let Len = num / 10;
          // 向下取整
          Len = Math.floor(Len);
          // 当除以10余数大于0时：页数的长度
          if (Remain >= 0) {
            Len += 1;
          }
          this.pageSize = Len - 1;
        }
      });
    },
    // 点击上一页
    pageDel() {
      if (this.nowPaging <= 1) {
        return;
      }
      this.nowPaging--;
      this.getArticleInfo(this.activeName, this.nowPaging);
    },
    // 点击下一页
    pageAdd() {
      if (this.nowPaging >= this.pageSize + 1) {
        return;
      }
      this.nowPaging++;
      this.getArticleInfo(this.activeName, this.nowPaging);
    },
    getInfo(url, page) {
      this.$http
        .post(url, {
          page: page
        })
        .then(res => {
          if (res.status === 200) {
            console.log("res:", res);
            // 找到数据
            this.articleInfo = res.data;
            // 截取时间格式
            for (let i = 0; i < res.data.length; i++) {
              this.articleInfo[i].articletime = this.articleInfo[
                i
              ].articletime.slice(0, 10);
            }
          } else {
            // 数据加载失败
            console.log("error");
          }
        });
    },
    // 加载loading 动画
    colesFullScreen() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.4)"
      });
      loading.close();
    }
  },
  components: {
    MHeader
  }
};
</script>

<style scoped lang="stylus">
@import '../../assets/common/stylus/recommend.styl';
</style>