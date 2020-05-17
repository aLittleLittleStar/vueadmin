/*
 * @Author: Star
 * @Date:   2019-05-25 14:51:22
 * @Last Modified by:   Star
 * @Last Modified time: 2020-03-20 19:42:01
 */
// sql语句
let sqlMap = {
  // 用户
  user: {
    add: "insert into userInfo(name, pass,sex, birth) values (?, ?, ?, ?)",
    find: "select * from userInfo where name = ?",
    findId: "select id from userInfo where name = ?",
    search: "select * from userInfo",
    login: "select id from userInfo where name = ? and pass = ?",
    getInfo: "select id, name, birth, sex, avator from userInfo where name = ?",
    // 校验密码
    // findPass: 'select id from userInfo where pass = ?'
    // 更新昵称、性别、生日
    upBaseInfo: "update userInfo set name = ?, sex = ?, birth = ? where id = ?",
    // 更新头像
    upImg: "",
    /*更新密码*/
    upPass: "update userInfo set pass = ? where id = ?",
  },
  article: {
    // 按照时间先后顺序查询: DESC倒序
    search: "select * from article order by articletime DESC limit ?, 10",
    // 按照点赞数进行查询：DESC倒序
    searchFir: "select * from article order by articlelikes DESC limit ?, 10",
    // 查询数据的总长度
    searchLength: "select count(*) from article",
    // 查询一篇文章
    searchOne:
      "select * from article as a inner join userInfo as b on a.articleavatar = b.name where a.articleid = ?",
    // 添加文章
    add:
      "insert into article(articleavatar, articletitle, articlecontent, articlebrief, ttype) values (? , ?, ?, ?, ?)",
    addCommit:
      "insert into articlecommit(commituser, commitarticeid, value) values (? , ?, ?)",
    findCommit:
      "select * from articlecommit where commitarticeid = ?  order by committime DESC",
    // 更新文章点赞数量：
    upStar: "update article set articlelikes = ? where articleid = ?",
    // 更新文章的收藏数量
    upColl: "update article set articlecollection = ? where articleid = ?",
    addArticleId: "update userlikes set articleid = ? where userid = ?",
    addColl: "insert into article(articlecollection) where articleid = ?",
    // 查询用户发布的文章
    searchPublish: "select * from article where articleavatar = ?",
    // 删除文章
    delArticle: "delete from article where articleid = ?",
  },
  /*
	 用户点赞的判断
	*/
  userlike: {
    // 查找用户点赞状态
    searchStar: "select * from userlikes where articleid = ? and username = ?",
    // 插入用户的点赞的数据
    addUserStar:
      "insert into userlikes(starstatus, articleid, username) values (? , ?, ?)",
    // 更新用户点赞状态
    upsearchStar:
      "update userlikes set starstatus = ? where articleid = ? and username = ?",
  },
  /*
   * 用户收藏的判断
   */
  usercoll: {
    // 查找用户收藏状态
    searchColl:
      "select * from usercollection where articleid = ? and username = ?",
    // 插入用户的收藏的数据
    addUserColl:
      "insert into usercollection(collstatus, articleid, username) values (? , ?, ?)",
    // 更新用户收藏状态
    upsearchColl:
      "update usercollection set collstatus = ? where articleid = ? and username = ?",
    // 查询出用户收藏文章的ID
    searchUserCollId:
      "select articleid from usercollection where username = ? and collstatus = 1",
    // 查询出用户收藏文章的详情
    searchUserCollDel: "select * from article where articleid = ?",
    // 取消收藏
    cancelStar:
      "update usercollection set collstatus = 0 where articleid = ? and username = ?",
  },
  /*
   * 学习资料
   */
  pushdata: {
    // 插入资料
    addData:
      "insert into learndata(dataname, dataicon, datawebsite, dataintroduce, datatype, datatags, datapushname) values (?, ?, ?, ?, ?, ?, ?)",
    // 删除资料
    // 查找资料
    searchData: "select * from learndata order by datacollection DESC",
    // 模糊匹配搜索结果
    findKeyWords:
      "select * from learndata where dataname like ? or dataintroduce like ?",
    // 查询用户发布的文章
    searchPublishData: "select * from learndata where datapushname = ?",
    // 删除资料
    delData: "delete from learndata where dataid = ?",
  },
};

module.exports = sqlMap;
