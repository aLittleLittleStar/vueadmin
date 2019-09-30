<template>
  <div class="content">
    <el-card class="boxCard">
      <div class="header">
        <span>注册-XX优化</span>
      </div>
      <el-form
        :model="registerInfo"
        :rules="registerRules"
        ref="registerInfo">
        <el-form-item prop="name">
          <el-input
            type="name"
            v-model="registerInfo.name"
            auto-complete="off" 
            prefix-icon="el-icon-user"
            placeholder="用户昵称"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            show-password
            type="password"
            v-model="registerInfo.pass"
            auto-complete="off"
            prefix-icon="el-icon-lock"
            placeholder="密码"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input
            show-password
            type="password"
            v-model="registerInfo.checkPass"
            auto-complete="off"
            prefix-icon="el-icon-lock"
            placeholder="确认密码"
            clearable>
          </el-input>
        </el-form-item>
        <el-form-item 
          prop="sex">
          <el-radio-group 
            v-model="registerInfo.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          prop="birth">
          <el-date-picker
            v-model="registerInfo.birth"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            suffix-icon="el-icon-date">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitRegister('registerInfo')"
            class="registerBtn">
            注册
          </el-button>
        </el-form-item>
        <el-form-item>
          已有账号  
          <router-link to="/login">
            <el-button type="text">
               登录
            </el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    let checkEmail = (rule, value, callback) => {
      // 验证邮箱格式
      const nameReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      console.log('value：', value)
      if (!value) {
        return callback(new Error('邮箱不能为空！'))
      } else if (!nameReg.test(value)) {
        return callback(new Error('请输入正确的邮箱格式'))
      }
      callback()
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.registerInfo.checkPass !== '') {
          this.$refs.registerInfo.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerInfo.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      registerInfo: {
        name: '',
        pass: '',
        checkPass: '',
        sex: '',
        birth: ''
      },
			// 生日选择：不能大于当前时间
			pickerOptions: {
				disabledDate(time) {
					return time.getTime() > Date.now();
				}
			},
      registerRules: {
        name: [{ required: true, message: '请输入昵称', trigger: 'blur' },
               {min: 1, max: 8, message: '昵称长度在 1 到 8 个字符',trigger: 'blur'}],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 12, message: '确认密码长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        birth: [{ required: true, message: '请选择生日', trigger: 'change' }]
      }
    }
  },
  methods: {
		// 注册
		submitRegister: function(formName) {
			let that = this
			that.$refs[formName].validate((valid) => {
				// 如果数据都进行了填写
				if (valid) {
					let name = that.registerInfo.name;
					let pass = that.registerInfo.pass;
					let checkPass = that.registerInfo.checkPass;
					let sex = that.registerInfo.sex;
					let birth = that.registerInfo.birth;
					console.log("info:", name, pass, checkPass, birth);
					that.$http.post('/api/findUser', {
						name: name
					}).then((res) => {
						if (res.data === -1) {
							// 账号已存在:警告
							that.$showMessage('warning', '非常抱歉该账号已存在')
						} else if(res.data === 1) {
							// 进行注册
							console.log("res.data:", res.data);
							that.register(name, pass,sex, birth);
						}
					})
				} else {
					that.$showMessage('error', '请正确填写信息')
					return false;
				}
			});
		},
		register: function(name, pass,sex, birth) {
			let that = this
			that.$http.post('/api/register', {
				name: name,
				pass: pass,
				sex: sex,
				birth: birth
			}).then((res) => {
				if (res.status === 200) {
					// 注册成功：success
					that.$showMessage('success', '恭喜你，注册成功，正跳转至登录页面')
					// 进行跳转到登录页面
					setInterval(function() {
						that.$router.push({
							path: '/login',
							query:{
								// 防止从外部进来登录
								redirect: location.hostname
							}
						})
					}, 2000)
				} else {
					// 注册失败： error
					that.$showMessage('error', '非常抱歉注册失败')
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
    margin-top: 40px
    .header
      font-size: 22px
      padding: 20px 0 40px
      letter-spacing: 1px
      font-weight: bold
    .el-form
      padding: 0 30px


.el-input
  width: 100%

.el-button--primary
  width: 100%

</style>
