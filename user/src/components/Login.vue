<template>
  <div id='container'>
      <Tabs :value='active' id='tab'>
          <TabPane class="tabs login" label='登录'>
              <Form ref='loginData' :model='loginData' :rules='ruleValidate'>
                <FormItem prop='loginUsername'>
                  <Input placeholder="请输入用户名" v-model="loginData.loginUsername"></Input>
                </FormItem>
                <FormItem prop='loginPw'>
                  <Input type="password" placeholder="请输入密码" v-model="loginData.loginPw"></Input>
                </FormItem>
                <FormItem>
                    <div class="in-buttons">
                        <Button type="primary" @click="login(loginData)">登录</Button>
                        <Button type="ghost" @click="cancel">取消</Button>
                    </div>
                </FormItem>
              </Form>
          </TabPane>
          <TabPane label='注册' class="tabs" id='signup'>
              <Form ref='signupData' :model='signupData' :rules='ruleValidate'>
                <FormItem prop='signupEmail'>
                  <Input placeholder="请输入注册邮箱" v-model="signupData.signupEmail"></Input>
                </FormItem>
                <FormItem prop='signupUsername'>
                  <Input placeholder="请输入用户名" v-model="signupData.signupUsername"></Input>
                </FormItem>
                <FormItem prop='signupPw'>
                  <Input type="password" placeholder="请输入密码" v-model="signupData.signupPw"></Input>
                </FormItem>
                <FormItem prop='checkPw'>
                  <Input type="password" placeholder='确认密码' v-model="signupData.checkPw"></Input>
                </FormItem>
                <FormItem>
                    <div class="up-buttons">
                        <Button type="primary" @click="signup(signupData)">注册</Button>
                        <Button type="ghost" @click="cancel()">取消</Button>
                    </div>
                </FormItem>
              </Form>
          </TabPane>
      </Tabs>
  </div>
</template>

<style>
#container {
  margin-top: 30px !important;
  background-color: #eeeeee;
  position: relative;
  margin: auto;
  width: 500px;
  height: 350px;
}
#signup .ivu-form-item {
    margin-bottom: 9px;
}
#tab .nav-text {
  margin-left: 23%;
  font-size: 25px;
}
#tab {
  width: 70%;
  position: relative;
  margin: auto;
}
.in-buttons {
  margin-left: 30%;
  margin-top: 30px;
}
.up-buttons {
    margin-left: 30%;
}
#signinButt {
  position: relative;
  margin: auto;
  width: 27%;
  top: 10%;
}
</style>

<script>
/* eslint-disable */
import axios from 'axios'
import qs from 'qs'

export default {
  data: function() {
    var that = this
    var loginPasswordValidate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      }
      callback()
    }
    var signupEmailValidate = function(rule, value, callback) {
      var reg = /^[\w\.\_]+\@[\w\.]+$/
      if (value === "") {
        callback(new Error("请输入用户名"))
      } else if (!reg.test(value)) {
        callback(new Error("用户名需要为一个有效邮箱"))
      } else {
        callback()
      }
    }
    var signupPasswordValidate = (rule, value, callback) => {
      var reg = /^[\w]{6,12}$/
      if (value === "") {
        callback(new Error("请输入密码"))
      } else if (!reg.test(value)) {
        callback(new Error("密码要求是6到12位的数字和字母或下划线"))
      }
      callback()
    }
    var signupCpasswordValidate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"))
      } else if (value !== that.signupData.signupPw) {
        callback(new Error("两次输入的密码不匹配"))
      } else {
        callback()
      }
    }
    return {
      active: '登录',
      loginData: {
        loginUsername: "",
        loginPw: ""
      },
      signupData: {
        signupEmail: '',
        signupUsername: "",
        signupPw: "",
        checkPw: ""
      },
      ruleValidate: {
        loginUsername: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        loginPw: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ],
        signupUsername: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        signupEmail: [
          { validator: signupEmailValidate, trigger: "blur" }
        ],
        signupPassword: [
          { validator: signupPasswordValidate, trigger: "blur" }
        ],
        checkPw: [{ validator: signupCpasswordValidate, trigger: "blur" }],
        loginPassword: [{ validator: loginPasswordValidate, trigger: "blur" }]
      }
    }
  },
  methods: {
    login (loginData) {
      var that = this
      this.$refs.loginData.validate((valid) => {
        if (valid) {
          axios({
            method: 'post',
            url: 'api/user_app/login/',
            data: qs.stringify({
              username: this.loginData.loginUsername,
              password: this.loginData.loginPw
            }),
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
          })
            .then(function (res) {
              console.log(res.data)
              if (res.data.status === 'success') {
                
                that.$store.commit('setName', that.loginData.loginUsername)
                window.localStorage.setItem('name', that.loginData.loginUsername)
                // 对msg串处理
                var str = JSON.parse(res.data.msg)
                window.localStorage.setItem('id', str.uid) //存储数据，value为string类型，如果要存对象，先转换
                that.$store.commit('setId', str.uid)

                that.$store.commit('setAvatar', '../../static/img/' + 'avatar1.jpeg')
                window.localStorage.setItem('avatar', '../../static/img/' + 'avatar1.jpeg')

                that.$store.commit('setLogin', true)
                window.localStorage.setItem('isLogin', that.$store.state.isLogin)
                console.log(that.$store.state)
                that.$Message.success('登录成功')
                that.$router.push('/')
              } else {
                console.log(res.data.error_msg)
                that.$Message.error(res.data.error_msg)
              }
            })
            .catch(function (err) {
              console.log(err)
              that.$Message.error('登录失败，请稍后重试')
            })
        } else {
          this.$Message.error('请先完成表单')
        }
      })
    },
    signup (signupData) {
      var that = this
      this.$refs.signupData.validate((valid) => {
        if (valid) {
          axios({
            url: 'api/user_app/registry/',
            method: 'post',
            data: qs.stringify({
              email: signupData.signupEmail,
              username: signupData.signupUsername,
              password: signupData.signupPw
            }),
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
          })
          .then(function (res) {
              console.log(res.data)
              if (res.status === 200)
                if (res.data.status === 'success') {
                that.reset()
                that.$Message.success('验证邮件已经发送到您的邮箱，点击验证链接后成功注册。')
                that.$router.push('/login')
              } else {
                console.log(res.data.error_msg)
                that.$Message.error(res.data.error_msg)
              }
            })
            .catch(function (err) {
              console.log(err)
              that.$Message.error('注册失败，请稍后重试')
            })
        } else {
          this.$Message.error('请先完成表单')
          this.reset()
        }
      })
    },
    cancel: function() {
      this.$router.push('/')
    },
    reset: function() {
      console.log(this.loginData.loginUsername)
      this.loginData.loginUsername = "",
      console.log(this.loginData.loginUsername)
      this.loginData.loginPw = ""
      this.signupData.signupUsername = ""
      this.signupData.signupPw = ""
      this.signupData.checkPw = ""
    }
  },
  created () {
    this.active = '登录'
  }
}
</script>
