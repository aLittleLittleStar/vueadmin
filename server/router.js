/*
* @Author: Star
* @Date:   2019-05-25 14:52:01
* @Last Modified by:   Star
* @Last Modified time: 2019-05-30 20:18:40
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
router.get('/searchData', (req, res, next) => {
  api.searchData(req, res, next);
});


/*
// 获取时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate.toString();
}


// 上传头像：【测试】: 未成功

var datatime = 'uploadPath/'+getNowFormatDate();

//定义图片上传的临时目录
var storage = multer.diskStorage({
    // 如果你提供的 destination 是一个函数，你需要负责创建文件夹
    destination: datatime,
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        cb(null,  file.originalname);
     }
}); 


let upload = multer({storage: storage});


router.post('/uploads', upload.single('picUrl'), function(req, res, next) {
	// req.file 是 前端表单name=="imageFile" 的文件信息（不是数组）
	console.log(req.body.picTitle)//console.log(req.query.picTitle);//get
	console.log(req.body.picType)
	console.log(req.file)//req.file文件的具体信息

	res.send({ret_code: datatime});
});

*/




module.exports = router;