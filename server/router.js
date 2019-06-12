/*
* @Author: Star
* @Date:   2019-05-25 14:52:01
* @Last Modified by:   Star
* @Last Modified time: 2019-06-12 20:47:47
*/
const express = require('express');
const router = express.Router();
const api = require('./api');
const multer = require('multer');//接收图片
/*
	*用户
 */
router.post('/login', (req, res, next) => {
	api.userLogin(req, res, next);
});

router.post('/findUser', (req, res, next) => {
	api.findUserName(req, res, next);
});

router.post('/register', (req, res, next) => {
	api.userRegister(req, res, next);
});
// 获取用户信息
router.post('/userHome', (req, res, next) => {
  api.getUserInfo(req, res, next);
});
router.post('/userId', (req, res, next) => {
  api.findUserId(req, res, next);
});
/*
	* 更新用户信息
	* 1、基本信息：昵称、性别、生日
	* 2、用户头像
	* 3、用户密码
*/
router.post('/findUserNameId', (req, res, next) => {
	api.findUserNameId(req, res, next);
});
router.post('/upBaseInfo', (req, res, next) => {
  api.upBaseInfo(req, res, next);
});
//更新当前密码
router.post('/modifyPass', (req, res, next) => {
  api.modifyPass(req, res, next);
});



/*
	* 文章
 */

// 查找文章的总条数
router.get('/getArticleLen', (req, res, next) => {
  api.getArticleLen(req, res, next);
});
// 查询所有文章信息:默认按照时间先后顺序
router.post('/articleSearch', (req, res, next) => {
	api.articleInfo(req, res, next);
});
// 最热：按照点赞量依次排序
router.post('/articleSearchFir', (req, res, next) => {
	api.articleInfoFir(req, res, next);
});
// 用户发布文章
router.post('/publish', (req, res, next) => {
	api.articleAdd(req, res, next);
});



// 文章详情
router.post('/article', (req, res, next) => {
	api.articleDetail(req, res, next);
});
// 更新文章点赞数量
router.post('/upstar', (req, res, next) => {
	api.updateStar(req, res, next);
});
// 更新文章点赞数量
router.post('/upcoll', (req, res, next) => {
	api.updateColl(req, res, next);
});

// 查询用户发布的文章
router.post('/findPublish', (req, res, next) => {
  api.findPublish(req, res, next);
});
// 查询用户发布的资料
router.post('/findPublishData', (req, res, next) => {
  api.findPublishData(req, res, next);
});
// 查询用户收藏的文章
router.post('/findUserCollId', (req, res, next) => {
  api.findUserCollId(req, res, next);
});
router.post('/findUserCollDel', (req, res, next) => {
  api.findUserCollDel(req, res, next);
});

/*
 * 用户删除发布的文章、资料、取消收藏的文章
 */
router.post('/delArticle', (req, res, next) => {
  api.delArticle(req, res, next);
});
router.post('/delData', (req, res, next) => {
  api.delData(req, res, next);
});
router.post('/cancelArticle', (req, res, next) => {
  api.cancelArticle(req, res, next);
});
/*
  文章的点赞：
  思路： 判断用户是否从未点赞过该文章【判断用户点赞状态】
  是： 插入用户的昵称、文章的id、点赞的状态
  否： 更新文章的点赞状态
*/
// 获取用户点赞的状态
router.post('/starstatus', (req, res, next) => {
	api.searchUserStar(req, res, next);
});
// 更新用户点赞的状态
router.post('/upstarstatus', (req, res, next) => {
	api.upsearchUserStar(req, res, next);
});
// 插入用户点赞的状态
router.post('/addUserStar', (req, res, next) => {
	api.addUserStar(req, res, next);
});
/*
  文章的收藏：思路和点赞一致
 */
// 获取用户点赞的状态
router.post('/collstatus', (req, res, next) => {
	api.searchUserColl(req, res, next);
});
// 更新用户点赞的状态
router.post('/upcollstatus', (req, res, next) => {
	api.upsearchUserColl(req, res, next);
});
// 插入用户点赞的状态
router.post('/addUsercoll', (req, res, next) => {
	api.addUserColl(req, res, next);
});

/*
 * 学习资料页面
 */
// 插入数据
router.post('/addData', (req, res, next) => {
  api.addData(req, res, next);
});
// 获取所有的学习资源
router.get('/searchData', (req, res, next) => {
  api.searchData(req, res, next);
});
// 搜索学习资料的结果
router.post('/getSearchInfo', (req, res, next) => {
  api.getSearchInfo(req, res, next);
});





module.exports = router;