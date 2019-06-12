/*
* @Author: Star
* @Date:   2019-05-25 14:51:52
* @Last Modified by:   Star
* @Last Modified time: 2019-06-12 20:47:17
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
		console.log("loginInfo:", params);
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
	// 查找用户名是否存在
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
	// 查找用户ID
	findUserId(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.user.find;
			let params = req.body;
			connection.query(sql, params.name, (err, result) => {
				if (err) throw err;
				res.json(result)
				connection.release()
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
	// 查找用户信息
	getUserInfo(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.user.getInfo;
			let params = req.body;
			console.log("params:", params);
			connection.query(sql, params.name, (err, result) => {
				if (err) throw err;
				// 查找用户数据数据
				res.json(result)
				connection.release()
			})
		})
	},
	/*
		* 更新用户信息
		* 1、基本信息：昵称、性别、生日
		* 2、用户头像
		* 3、用户密码
	*/
	// 获取该用户名的id与当前用户的id进行判断：
	// 如果不相同则用户名重复
	findUserNameId(req, res, next) {
		let sql = sqlMap.user.findId;
		let params = req.body;

		pool.getConnection((err, connection) => {
			connection.query(sql, params.name, (err, result) => {
				if (err) {
					return callback(err);
				}
				// 返回查找的id
				res.json(result)
				connection.release()
			})
		})
	},
	upBaseInfo(req, res, next) {
		let sql = sqlMap.user.upBaseInfo;
		let params = req.body;
		// console.log("params:", params);
		pool.getConnection((err, connection) => {
			connection.query(sql, [params.name, params.sex, params.birth, params.id], (err, result) => {
				if (err) {
					return callback(err);
				}
				res.send({status:  200 });
			})
		})
	},
	modifyPass(req, res, next) {
		let sql = sqlMap.user.upPass;
		let params = req.body;
		pool.getConnection((err, connection) => {
			connection.query(sql, [ params.pass, params.id], (err, result) => {
				if (err) {
					return callback(err);
				}
				res.send({status: 200 });
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
	// 删除文章
	delArticle(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.article.delArticle;
			let params = req.body;
			connection.query(sql, params.articleid,  (err, result) => {
				if (err) {
					res.send({status:  -1 });
					console.log("err:", err);
				}
				// 插入文章数据
				res.send({status:  200 })
			})
		})
	},
	// 删除资料
	delData(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.pushdata.delData;
			let params = req.body;
			connection.query(sql, params.dataid,  (err, result) => {
				if (err) {
					res.send({status:  -1 });
					console.log("err:", err);
				}
				// 插入文章数据
				res.send({status:  200 })
			})
		})
	},
	// 取消收藏文章
	cancelArticle(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.usercoll.cancelStar;
			let params = req.body;
			connection.query(sql, [params.articleid, params.name],  (err, result) => {
				if (err) {
					res.send({status:  -1 });
					console.log("err:", err);
				}
				// 插入文章数据
				res.send({status:  200 })
			})
		})
	},
	// 查找用户发布的文章
	findPublish(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.article.searchPublish;
			let params = req.body;
			connection.query(sql, params.name, (err, result) => {
				if (err) throw err;
				// 查找用户发布的所有文章数据
				res.json(result)
				connection.release()
			})
		})
	},
	// 查找用户发布的资料
	findPublishData(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.pushdata.searchPublishData;
			let params = req.body;
			connection.query(sql, params.name, (err, result) => {
				if (err) throw err;
				// 查找用户发布的所有文章数据
				res.json(result)
				connection.release()
			})
		})
	},
	// 查找用户收藏文章ID
	findUserCollId(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.usercoll.searchUserCollId;
			let params = req.body;
			console.log("searchUserColl：", params);
			connection.query(sql, params.name, (err, result) => {
				if (err) throw err;
				// 查找用户发布的所有文章数据
				res.json(result)
				connection.release()
			})
		})
	},
	// 查找用户收藏文章ID
	findUserCollDel(req, res, next) {
		pool.getConnection((err, connection) => {
			let sql = sqlMap.usercoll.searchUserCollDel;
			let params = req.body;
			console.log("searchUserColl：", params);
			connection.query(sql, params.articleid, (err, result) => {
				if (err) throw err;
				// 查找用户发布的所有文章数据
				res.json(result)
				connection.release()
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
			console.log("params upStar:", params);
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
			console.log("params upColl:", params);
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
			console.log("params searchStar:", params);
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
			console.log("params upsearchStar:", params);
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
			console.log("params addUserStar:", params);
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
			console.log("params searchColl:", params);
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
			console.log("params upsearchColl:", params);
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
			console.log("params addUserColl:", params);
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
			console.log("params addData:", params);
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