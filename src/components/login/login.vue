<template>
  <div class="content">
    <el-card class="boxCard">
      <div class="header">
        <span>登录-系统</span>
      </div>
      <el-form
        :model="loginInfo"
        :rules="loginRules"
        ref="loginInfo">
        <el-form-item 
          prop="name">
          <el-input
            v-model="loginInfo.name"
            auto-complete="off"
            prefix-icon="el-icon-user"
            placeholder="昵称"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item
          prop="pass">
          <el-input
            show-password
            type="password"
            v-model="loginInfo.pass"
            auto-complete="off"
            prefix-icon="el-icon-lock"
            placeholder="密码"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitLogin('loginInfo')"
            class="registerBtn">
            登录
          </el-button>
        </el-form-item>
        <el-form-item>
          还没账号
          <router-link to="/register">
            <el-button type="text">
               注册
            </el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginInfo: {
        name: '',
        pass: ''
      },
      loginRules: {
       // 校验规则
       name: [{required: true,message: '请输入昵称',trigger: 'blur'},
             {min: 1,max: 8,message: '昵称长度在 1 到 8 个字符',trigger: 'blur'}],
       pass: [{required: true,message: '请输入密码',trigger: 'blur'},
              {min: 6,max: 12,message: '密码长度在 6 到 12 个字符',trigger: 'blur'}]
      }
    }
  },
  methods: {
    submitLogin (formName) {
      console.log('formName:', formName)
      let that = this
      that.$refs[formName].validate((valid) => {
        console.log('valid:', valid)
        if (valid) {
          console.log('valid:', valid)
          let name = that.loginInfo.name
          let pass = that.loginInfo.pass

					this.$http.post('/api/findUser', {
						name: name
					}).then((res) => {
						console.log("res:", res);
						if (res.data === 1) {
							// 账号不存在
							that.$showMessage('error', '该账号不存在')
						} else if (res.data === -1) {
							// 账号存在：进行登录
							this.loginGo(name, pass);
						}
					})
				} else {
					// 如果用户名和密码输入格式不正确
					return false;
				}
      })
    },
		loginGo: function(name, pass) {
			let that = this;
			that.$http.post('/api/login', {
				name: name,
				pass: pass
			}).then((res) => {
				// 如果密码错误
				if (res.data === -1) {
					that.$showMessage('error', '密码错误')
				} else if (res.data === 1) {
					// 密码正确
					that.$showMessage('success', '登录成功，正在跳转至首页')
					// 设置cookie
					window.document.cookie = "username" + '=' + name + ";path=/;expires=" + 2;
					setInterval(function() {
						that.$router.push('/')
					}, 2000)
				} else {
					// 其他情况
					console.log("error");
				}
			}).catch(err => {
					that.$showMessage('error', err)
			})
		}
  }
}
</script>

<style lang="stylus" scoped>
.content
  width: 100%
  height: 100%
  text-align: center
  margin: 0 auto
  .boxCard
    margin: 0 auto
    max-width: 480px
    margin-top: 100px
    .header
      font-size: 22px
      padding: 20px 0 40px
      letter-spacing: 1px
      font-weight: bold
    .el-form
      padding: 0 30px

.registerBtn
  width: 100%


</style>
