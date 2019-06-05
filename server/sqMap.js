/*
* @Author: Star
* @Date:   2019-05-25 14:51:22
* @Last Modified by:   Star
* @Last Modified time: 2019-06-05 09:31:53
*/
// sql语句
let sqlMap = {
	// 用户
	user: {
		add: 'insert into userInfo(name, pass,sex, birth) values (?, ?, ?, ?)',
		find: 'select * from userInfo where name = ?',
		search: 'select * from userInfo',
		login: 'select * from userInfo where name = ? and pass = ?',
		getInfo: 'select name, birth, sex, avator from userInfo where name = ?'
	},
	article: {
		// 按照时间先后顺序查询: DESC倒序
		search: 'select * from article order by articletime DESC limit ?, 10',
		// 查询数据的总长度
		searchLength: 'select count(*) from article',
		// 查询一篇文章
		searchOne: 'select * from article as a inner join userInfo as b on a.articleavatar = b.name where a.articleid = ?',
		// 按照浏览量进行查找
		searchFir: 'select * from article order by articlelook DESC limit ?, 10',
		// 添加文章
		add: 'insert into article(articleavatar, articletitle, articlecontent, articlebrief, ttype) values (? , ?, ?, ?, ?)',
		// 更新文章点赞数量：
		upStar: 'update article set articlelikes = ? where articleid = ?',
		// 更新文章的收藏数量
		upColl: 'update article set articlecollection = ? where articleid = ?',
		addArticleId: 'update userlikes set articleid = ? where userid = ?',
		addColl: 'insert into article(articlecollection) where articleid = ?',
		// 查询用户发布的文章
		searchPublish: 'select * from article where articleavatar = ?'
	},
	/*
	 用户点赞的判断
	*/
	userlike: {
		// 查找用户点赞状态
		searchStar: 'select * from userlikes where articleid = ? and username = ?',
		// 插入用户的点赞的数据
		addUserStar: 'insert into userlikes(starstatus, articleid, username) values (? , ?, ?)',
		// 更新用户点赞状态
		upsearchStar: 'update userlikes set starstatus = ? where articleid = ? and username = ?',
	},
	/*
	* 用户收藏的判断
	*/
	usercoll: {
		// 查找用户点赞状态
		searchColl: 'select * from usercollection where articleid = ? and username = ?',
		// 插入用户的点赞的数据
		addUserColl: 'insert into usercollection(collstatus, articleid, username) values (? , ?, ?)',
		// 更新用户点赞状态
		upsearchColl: 'update usercollection set collstatus = ? where articleid = ? and username = ?',
		// 用户收藏的文章
		searchUserColl: 'select * from usercollection where username = ?'
	},
	/*
	 * 学习资料
	*/
	pushdata: {
		// 插入资料
		addData: 'insert into learndata(dataname, dataicon, datawebsite, dataintroduce, datatype, datatags, datapushname) values (?, ?, ?, ?, ?, ?, ?)',
		// 删除资料
		// 查找资料
		searchData: 'select * from learndata order by datacollection DESC',
		// 模糊匹配搜索结果
		findKeyWords: 'select * from learndata where dataname like ? or dataintroduce like ?',
		// 查询用户发布的文章
		searchPublishData: 'select * from learndata where datapushname = ?'
	}
}

module.exports = sqlMap;