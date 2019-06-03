/*
* @Author: Star
* @Date:   2019-05-25 14:51:52
* @Last Modified by:   Star
* @Last Modified time: 2019-06-03 20:26:55
*/
const mysql = require('mysql')
const dbConfig = require('./db')
const sqlMap = require('./sqMap')

// 连接池
const pool = mysql.createPool({
	host: dbConfig.mysql.host,
	user: dbConfig.mysql.user,
	password: dbConfig.mysql.password,
	database: dbConfig.mysql.database,
	port: dbConfig.mysql.port,
	multipleStatements: true    // 多语句查询
})

module.exports = {
	// 登录
	userLogin(req, res, next) {
		let sql = sqlMap.user.login;
		let params = req.body;
		// console.log("params:", params);
		pool.getConnection((err, connection) => {
			connection.query(sql, [params.name, params.pass], (err, result) => {
				// 如果错误打印错误原因
				if (err) {
					console.log("err:", err);
				} else {
					// 如果输入的用户名和密码不为空且数据库有该信息
					if (params.name != '' && params.pass != '' && result != '') {
						res.send('1');
					} else if (result == '') {
						// 账号不存在||用户名密码错误
						res.send('-1');
					}
				}
			})
		})
	},
	// 查找
	findUserName(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.user.find;
			let params = req.body;
			connection.query(sql, params.name, (err, result) => {
				if (err) throw err;
				// 没有找到该用户名：则可以注册
				if (result == '') {
					console.log("result:", result);
					res.send('1');
				} else if(result != '') {
					res.send('-1');
				}
			})
		})
	},
	// 注册
	userRegister(req, res, next) {
		let sql = sqlMap.user.add;
		let params = req.body;
		console.log("params:", params);
		pool.getConnection((err, connection) => {
			connection.query(sql, [params.name, params.pass, params.sex, params.birth], (err, result) => {
				if (err) {
					return callback(err);
				}
				res.send({status:  200 });
			})
		})
	},
	// 查找文章数据 : 分页查找
	articleInfo(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.article.search;
			let params = req.body;
			console.log("params:", params);
			connection.query(sql, (params.page-1)*10, (err, result) => {
				if (err) throw err;
				// 查找所有文章数据
				res.json(result)
				connection.release()
			})
		})
	},
	articleInfoFir(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.article.searchFir;
			let params = req.body;
			connection.query(sql, (params.page-1)*10,(err, result) => {
				if (err) throw err;
				// 查找所有文章数据
				res.json(result)
				connection.release()
			})
		})
	},
	// 获取文章的总条数
	getArticleLen(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.article.searchLength;
			connection.query(sql, (err, result) => {
				if (err) throw err;
				// 查找所有文章数据
				res.json(result)
				connection.release()
			})
		})
	},

	articleAdd(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.article.add;
			let params = req.body;
			connection.query(sql, [params.articleavatar, params.articletitle, params.articlecontent, params.articlebrief, params.ttype],  (err, result) => {
				if (err) {
					res.send({status:  -1 });
					console.log("err:", err);
				}
				// 插入文章数据
				res.send({status:  200 });
			})
		})
	},

	// 文章详情
	articleDetail(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.article.searchOne;
			let params = req.body;
			connection.query(sql, params.articleid, (err, result) => {
				if (err) throw err;
				// 查找所有文章数据
				res.json(result)
				connection.release()
			})
		})
	},
	// 更新点赞
	updateStar(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.article.upStar;
			let params = req.body;
			console.log("params:", params);
			connection.query(sql, [params.articlelikes, params.articleid],  (err, result) => {
				if (err) {
					res.send({status:  -1 });
					console.log("err:", err);
				}
				console.log("result:", result);
				res.send({status:  200 });
			})
		})
	},
	// 更新收藏
	updateColl(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.article.upColl;
			let params = req.body;
			console.log("params:", params);
			connection.query(sql, [params.articlecollection, params.articleid],  (err, result) => {
				if (err) {
					res.send({status:  -1 });
					console.log("err:", err);
				}
				console.log("result:", result);
				res.send({status:  200 });
			})
		})
	},

	/*
	  点赞
	*/
	// 查找当前用户点赞状态
	searchUserStar(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.userlike.searchStar;
			let params = req.body;
			console.log("params:", params);
			connection.query(sql, [params.articleid, params.username],  (err, result) => {
				if (err) {
					res.send({status:  -1 });
					console.log("err:", err);
				}
				res.json(result)
				connection.release()
			})
		})
	},
	// 更新用户点赞状态
	upsearchUserStar(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.userlike.upsearchStar;
			let params = req.body;
			console.log("params:", params);
			connection.query(sql, [params.starstatus, params.articleid, params.username],  (err, result) => {
				if (err) {
					res.send({status:  -1 });
					console.log("err:", err);
				}
				console.log("result:", result);
				res.send({status:  200 });
			})
		})
	},
	// 插入用户点赞状态
	addUserStar(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.userlike.addUserStar;
			let params = req.body;
			console.log("params:", params);
			connection.query(sql, [params.starstatus, params.articleid, params.username],  (err, result) => {
				if (err) {
					res.send({status:  -1 });
					console.log("err:", err);
				}
				console.log("result:", result);
				res.send({status:  200 });
			})
		})
	},
	/*
	  用户收藏
	*/
	// 查找当前用户收藏状态
	searchUserColl(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.usercoll.searchColl;
			let params = req.body;
			console.log("params:", params);
			connection.query(sql, [params.articleid, params.username],  (err, result) => {
				if (err) {
					res.send({status:  -1 });
					console.log("err:", err);
				}
				res.json(result)
				connection.release()
			})
		})
	},
	// 更新用户收藏状态
	upsearchUserColl(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.usercoll.upsearchColl;
			let params = req.body;
			console.log("params:", params);
			connection.query(sql, [params.collstatus, params.articleid, params.username],  (err, result) => {
				if (err) {
					res.send({status:  -1 });
					console.log("err:", err);
				}
				console.log("result:", result);
				res.send({status:  200 });
			})
		})
	},
	// 插入用户收藏状态
	addUserColl(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.usercoll.addUserColl;
			let params = req.body;
			console.log("params:", params);
			connection.query(sql, [params.collstatus, params.articleid, params.username],  (err, result) => {
				if (err) {
					res.send({status:  -1 });
					console.log("err:", err);
				}
				console.log("result:", result);
				res.send({status:  200 });
			})
		})
	},

	/*
	 * 用户发布资料
	*/
	addData(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.pushdata.addData;
			let params = req.body;
			console.log("params:", params);
			connection.query(sql, [params.dataname, params.dataicon, params.datawebsite, params.dataintroduce, params.datatype, params.datatags, params.datapushname],  (err, result) => {
				if (err) {
					res.send({status:  -1 });
					console.log("err:", err);
				}
				console.log("result:", result);
				res.send({status:  200 });
			})
		})
	},
	// 获取所有的资料
	searchData(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.pushdata.searchData;
			connection.query(sql, (err, result) => {
				if (err) {
					res.send({status:  -1 });
					console.log("err:", err);
				}
				res.json(result)
				connection.release()
			})
		})
	},
	// 搜索学习资料关键词得到的结果
	getSearchInfo(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.pushdata.findKeyWords;
			let params = req.body;
			let name = ["%" + params.name + "%"];
			let content = ["%" + params.content + "%"];
			connection.query(sql, [name, content], (err, result) => {
				if (err) {
					res.send({status:  -1 });
					console.log("err:", err);
				}
				res.json(result)
				connection.release()
			})
		})
	},



}