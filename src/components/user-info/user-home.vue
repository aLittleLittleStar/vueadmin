<template>
  <el-container>
    <el-row :gutter="0">
      <el-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16">
        <div class="content">
          <div class="avatar-info">
            <div class="avatar-top">
              <div class="left">
                <div class="avatar-left">
                  <div class="avatar-img">
                    <img :src="userHome.avator" alt="头像" />
                  </div>
                </div>
                <div class="avatar-right">
                  <div class="avatar-name">
                    <span>{{userHome.name}}</span>
                  </div>
                  <div class="avatar-sex">
                    <span class="iconfont icon-xingbie"></span>
                    <span>{{userHome.sex}}</span>
                  </div>
                  <div class="avatar-birth">
                    <span class="iconfont icon-shengri"></span>
                    <span>{{userHome.birth}}</span>
                  </div>
                </div>
              </div>
              <div class="right" v-if="isMe">
                <el-tooltip effect="dark" content="设置中心" placement="top-start">
                  <router-link
                    target="_blank"
                    :to="{
											path: '/user-center/',
											query: {name: userHome.name}
										}"
                  >
                    <div class="seting">
                      <span class="iconfont icon-shezhi"></span>
                    </div>
                  </router-link>
                </el-tooltip>
              </div>
            </div>
            <div class="avatar-bottom">
              <el-tabs type="card" v-model="activeTab" :stretch="false">
                <el-tab-pane label="发布的文章" name="first" />
                <el-tab-pane label="发布的资料" name="second"></el-tab-pane>
                <el-tab-pane label="收藏的文章" name="third"></el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div class="publish-info">
            <!-- 发布的文章 -->
            <div style="height: 100%" v-show="activeTab=='first'">
              <div v-show="publishArt.length" style="height: 100%">
                <div class="item" v-for="(item, idx) in publishArt" :key="idx">
                  <div class="item-top">
                    <div class="item-top-say" v-if="item.articlecollection > 6">推荐</div>
                    <div class="item-top-say" style="color: #f70" v-else>专栏</div>
                    <div class="item-top-user">{{item.articleavatar}}</div>
                    <div class="item-top-time">{{item.articletime}}</div>
                    <div class="item-top-type">{{item.ttype}}</div>
                  </div>
                  <div class="item-center">
                    <router-link
                      :to="{
											path: '/article/'+item.articleid,
											query: {id: item.articleid}}"
                    >
                      <div class="item-center-title">{{item.articletitle}}</div>
                      <div class="item-center-content">{{item.articlebrief}}</div>
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
                      <!-- 									<div class="item-bottom-look">
										浏览量 {{item.articlelook}}
                      </div>-->
                    </router-link>
                  </div>
                </div>
              </div>
              <div
                v-show="!publishArt.length"
                style="text-align: center;color: #999;font-size: 18px;margin-top: 40px;height: 100%; align-items: center; justify-content: center;display: flex;"
              >
                <div>发布文章空空如也!</div>
              </div>
            </div>

            <!-- 发布的资料 -->
            <div style="height: 100%" v-show="activeTab=='second'">
              <div v-show="publishData.length" style="height: 100%">
                <div class="item-card" v-for="item in publishData" :key="item.id">
                  <el-card shadow="hover" v-if="publishData.length">
                    <div class="card-top">
                      <div class="card-title">
                        发布者：
                        <router-link
                          :to="{
												path: '/user-home/',
												query: {name: item.datapushname}
											}"
                        >
                          <span>{{item.datapushname}}</span>
                        </router-link>
                      </div>
                    </div>
                    <a :href="item.datawebsite" target="_blank">
                      <div class="card-content">
                        <div class="content-left">
                          <img :src="item.dataicon" alt="Icon" />
                        </div>
                        <div class="card-right">
                          <div class="card-name">
                            名称：
                            <span>{{item.dataname}}</span>
                          </div>
                          <div class="card-introduct">
                            介绍：
                            <span>{{item.dataintroduce}}</span>
                          </div>
                        </div>
                      </div>
                    </a>
                    <div class="card-bottom">
                      <div class="card-type">
                        类别：
                        <span>{{item.datatype}}</span>
                      </div>
                      <div class="card-tag">
                        标签：
                        <span>{{item.datatags}}</span>
                      </div>
                    </div>
                  </el-card>
                  <div class v-else>空空如也</div>
                </div>
              </div>
              <div
                v-show="!publishData.length"
                style="text-align: center;color: #999;font-size: 18px;margin-top: 40px;height: 100%; align-items: center; justify-content: center;display: flex;"
              >
                <div>发布的学习资料空空如也!</div>
              </div>
            </div>

            <!-- 收藏的文章 -->
            <div style="height: 100%" v-show="activeTab=='third'">
              <div v-show="collectionArtDelList.length" style="height: 100%">
                <div
                  class="item"
                  v-show="activeTab=='third'"
                  v-for="item in collectionArtDelList"
                  :key="item.id"
                >
                  <div class="item-top">
                    <div class="item-top-say">专栏</div>
                    <div class="item-top-user">
                      <router-link
                        target="_blank"
                        :to="{
											path: '/user-home/',
											query: {name: item[0].articleavatar}
										}"
                      >{{item[0].articleavatar}}</router-link>
                    </div>
                    <div class="item-top-time">{{item[0].articletime}}</div>
                    <div class="item-top-type">{{item[0].ttype}}</div>
                  </div>
                  <div class="item-center">
                    <router-link
                      :to="{
											path: '/article/'+item[0].articleid,
											query: {id: item[0].articleid}}"
                    >
                      <div class="item-center-title">{{item[0].articletitle}}</div>
                      <div class="item-center-content">{{item[0].articlebrief}}</div>
                    </router-link>
                  </div>
                  <div class="item-bottom">
                    <router-link
                      :to="{
										path: '/article/'+item[0].articleid,
										query: {id: item[0].articleid}}"
                    >
                      <div class="item-bottom-like">点赞 {{item[0].articlelikes}}</div>
                      <div class="item-bottom-collection">收藏 {{item[0].articlecollection}}</div>
                      <!-- 									<div class="item-bottom-look">
										浏览量 {{item[0].articlelook}}
                      </div>-->
                    </router-link>
                  </div>
                </div>
              </div>
              <div
                v-show="!collectionArtDelList.length"
                style="text-align: center;color: #999;font-size: 18px;margin-top: 40px;height: 100%; align-items: center; justify-content: center;display: flex;"
              >
                <div>收藏的文章空空如也!</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </el-container>
</template>


<script>
export default {
  name: "UserHome",
  data() {
    return {
      // 判断浏览主页的用户是否为本人
      isMe: false,
      // 用户的基本信息
      userHome: "",
      // 发布的文章
      publishArt: "",
      // 收藏文章的Id
      collectionArtId: "",
      // 收藏文章的详情
      collectionArtDel: [],
      // 把点赞的文章详情保存在列表里面
      collectionArtDelList: [],
      // 发布的资料
      publishData: "",
      activeTab: "first"
    };
  },
  mounted() {
    this.getUserInfo();
    this.getPublishArt();
    this.getPublishData();
    this.getCollectionArtId();
  },
  methods: {
    // 获取用户信息
    getUserInfo() {
      if (document.cookie.slice(9) == this.$route.query.name) {
        this.isMe = true;
      } else {
        this.isMe = false;
      }
      this.$http
        .post("/api/userHome", {
          name: this.$route.query.name
        })
        .then(res => {
          console.log("res:", res);
          if (res.status === 200) {
            this.userHome = res.data[0];
            this.userHome.birth = res.data[0].birth.slice(0, 10);
          } else {
            console.log("err");
          }
        });
    },
    // 获取用户发布的文章
    getPublishArt() {
      let that = this;
      that.$http
        .post("/api/findPublish", {
          name: that.$route.query.name
        })
        .then(res => {
          console.log("res:", res);
          if (res.status === 200) {
            that.publishArt = res.data;
            // console.log("res.data:", res.data);
            for (let i = 0; i < res.data.length; i++) {
              that.publishArt[i].articletime = that.publishArt[
                i
              ].articletime.slice(0, 10);
            }
          } else {
            console.log("err");
          }
        });
    },
    // 获取用户发布的资料
    getPublishData() {
      let that = this;
      that.$http
        .post("/api/findPublishData", {
          name: that.$route.query.name
        })
        .then(res => {
          console.log("res:", res);
          if (res.status === 200) {
            that.publishData = res.data;
            console.log("res.publishData:", res.data);
          } else {
            console.log("err");
          }
        });
    },
    // 获取用户收藏文章的ID
    getCollectionArtId() {
      let that = this;
      that.$http
        .post("/api/findUserCollId", {
          name: that.$route.query.name
        })
        .then(res => {
          console.log("res:", res);
          if (res.status === 200) {
            that.collectionArtId = res.data;
            console.log("res.collectionArtId:", res);
            that.getCollectionArtDel();
          } else {
            console.log("err");
          }
        });
    },
    // 获取用户收藏文章的ID
    getCollectionArtDel() {
      let that = this;
      for (let i = 0; i < that.collectionArtId.length; i++) {
        that.$http
          .post("/api/findUserCollDel", {
            articleid: that.collectionArtId[i].articleid
          })
          .then(res => {
            console.log("res:", res);
            if (res.status === 200) {
              // console.log("res.data[0].articletime：", res.data);
              res.data[0].articletime = res.data[0].articletime.slice(0, 10);
              that.collectionArtDel = res.data;
              // that.collectionArtDel[0].articletime = that.collectionArtDel[0].articletime.slice(0,10);
              console.log("res.collectionArtDel:", res);
              that.collectionArtDelList.push(that.collectionArtDel);
              console.log("collectionArtDelList:", that.collectionArtDelList);
            } else {
              console.log("err");
            }
          });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../assets/common/stylus/user-home.styl';
@import '../../assets/common/fonts/iconfont.css';
</style>