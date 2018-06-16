<template>
  <div id='container'>
      <Tabs value='登录' id='tab'>
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
                        <Button type="primary" @click="signup">Sign up</Button>
                        <Button type="ghost" @click="cancel">Cancel</Button>
                    </div>
                </FormItem>
              </Form>
          </TabPane>
          <TabPane label='注册' class="tabs" id='signup'>
              <Form ref='signupData' :model='signupData' :rules='ruleValidate'>
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
                        <Button type="primary" @click="signup">Sign up</Button>
                        <Button type="ghost" @click="cancel">Cancel</Button>
                    </div>
                </FormItem>
              </Form>
          </TabPane>
      </Tabs>
  </div>
</template>

<style>
#container {
  background-color: #eeeeee;
  position: relative;
  margin: auto;
  width: 500px;
  height: 300px;
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
// import axios from 'axios'
// import qs from 'qs'

export default {
  data: function() {
    var that = this
    var loginPasswordValidate = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"))
      }
      callback()
    }
    var signupUsernameValidate = function(rule, value, callback) {
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
      if (value === "") {
        callback(new Error("请输入密码"))
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
      loginData: {
        loginUsername: "",
        loginPw: ""
      },
      signupData: {
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
          { validator: signupUsernameValidate, trigger: "blur" }
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
    // login: () => {
    //   this.$refs.loginData.validate((valid) => {
    //     if (valid) {
    //       axios({
    //         method: 'post',
    //         url: '/user_app/login',
    //         data: qs.stringify({
    //           username: this.loginData.loginUsername,
    //           password: this.loginData.loginPassword
    //         }),
    //         headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    //       })
    //         .then(function (res) {
    //           if (res.data) {
    //             that.$store.commit('setUser', that.loginData.loginUserid)
    //             that.loginData = {}
    //             that.signupData = {}
    //             that.isLogin = false
    //             that.$Message.success('登录成功')
    //             that.$router.push('/user')
    //           } else {
    //             that.$Message.error('登录失败，请稍后重试')
    //           }
    //         })
    //         .catch(function (err) {
    //           console.log(err)
    //           that.$Message.error('登录失败，请稍后重试')
    //         })
    //     } else {
    //       this.$Message.error('请先完成表单')
    //     }
    //   })
    // }
    signin: function() {
      var that = this
      this.$refs.loginData.validate((valid) => {
        if (valid) {
          that.$router.push('/')
        } else {
          that.$Message.error('请先完成表单')
        }
      })
    },
    signup: function () {
      var that = this
      this.$refs.signupData.validate((valid) => {
        if (valid) {
          that.$Message.success('注册成功')
          // that.$refs.signupData.signupUsername = ""
          // that.$refs.signupData.signupPw = ""
          // that.$refs.signupData.checkPw = ""
          // concole.log(that.$refs.signupData.signupUsername)
          // this.$router.push({
          //   path:this.$route.fullPath, // 获取当前连接，重新跳转
          //   query:{
          //   _time:new Date().getTime()/1000  // 时间戳，刷新当前router
          //   }
          // })
        } else {
          that.$Message.error('注册失败，请稍后尝试')
        }
      })
    },
    cancel: function() {
      this.$router.push('/')
    }
  }
}
</script>
