<style scoped>
.ivu-input-wrapper {
    width: 200px;
}
.ivu-form >>> .ivu-form-item-label {
    font-size: 15px;
    margin: 10px 0px;
}
.ivu-menu {
    height: 700px;
}
.ivu-form-item {
    margin-top: 30px;
}
#user-content {
    width: 60%;
    height: 500px;
    background: white;
}
#bt >>> .ivu-form-item-content {
    margin-left:45% !important;
    margin-top:20%;
}
</style>

<template>
  <div id='user'>
            <Form :model="settings" :label-width="80">
                <Row type="flex" justify="center" align="top" class="code-row-bg">
                    <Col span="20">
                            <FormItem label="邮箱">
                                <Input v-model="settings.email" :placeholder='settings.email' disabled></Input>
                            </FormItem>
                            <FormItem label="昵称">
                                <Input v-model="settings.username"></Input>
                            </FormItem>
                            <FormItem label="手机">
                                <Input v-model="settings.phone"></Input>
                            </FormItem>
                    </Col>
                    <Col span="4">
                        <Avatar v-if='hasA' :src="settings.avatar" style="width: 170px;height: 170px;margin-top: 40px;border-radius: 50%;"/>
                        <Avatar v-else style="width: 170px;height: 170px;margin-top: 40px;border-radius: 50%;" />
                        <Upload ref='upload' :format="['jpg','jpeg','png']" :max-size="2048" :before-upload="handleUpload" action="../../static/img">
                            <Button type="ghost" icon="ios-cloud-upload-outline" style="margin:40%;" @click='changeAvatar'>修改头像</Button>
                        </Upload>
                    </Col>
                </Row>
                <FormItem id='bt'>
                    <Button type="primary" @click="changeSettings">确认修改</Button>
                    <Button  @click="logout()">退出账号</Button>
                </FormItem>
            </Form>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
export default {
  data: function() {
      return {
          active: 'settings',
          settings: {
              avatar: '',
              phone: '',
              username: '',
              email: ''
          }
      }
  },
  computed: {
    hasA() {
        if (this.settings.avatar === '' || this.settings.avatar == '../../static/img/') {
            return false
        }
        return true
    },
    id() {
      return this.$store.state.id
    },
    avatar() {
      return this.$store.state.avatar
    },
    isLogin() {
      return this.$store.state.isLogin
    }
  },
  methods: {
    changeAvatar() {
        // this.settings.avatar = '../../static/img' + 
    },
    handleUpload (file) {
        // this.settings.avatar = '../../static/img/' + file.name
        var str = '../../static/img/' + file.name
        this.$set(this.settings, "avatar", str)
        console.log(this.settings.avatar)
        return false
    },
    changeSettings() {
        let that = this
        let set = this.settings
        set.avatar = set.avatar.substring(17)
        console.log(set.avatar)
        axios({
            url: '/api/user_app/user_profile/' + that.id +'/',
            method: 'post',
            data: qs.stringify(set),
            headers: {'Content-Type':'application/x-www-form-urlencoded'}
        })
        .then(function(res) {
          if (res.data.status === 'success') {
              that.$Message.info('修改成功!')
          } else {
                that.$Message.error(res.data.error_msg)
            }
        })
        .catch(function(err) {
            that.$Message.error('获取用户信息失败，请稍后重试')
        })
    },
    logout() {
        var that = this
        axios({
            method: 'post', 
            url: '/api/user_app/logout/'
        })
            .then (function(res) {
                if (res.data.status === 'success') {
                    that.$Message.info('登出成功')
                    that.$store.commit('setId', -1)
                    that.$store.commit('setAvatar', '')
                    that.$store.commit('setLogin', false)
                    that.$store.commit('setName', '')
                    window.localStorage.removeItem('id')
                    window.localStorage.removeItem('name')
                    window.localStorage.removeItem('avatar')
                    window.localStorage.removeItem('isLogin')
                    that.$router.push('/')
                } else {
                    that.$Message.error(res.data.error_msg)
                }
            })
            .catch(function(err) {
                that.$Message.error('登出失败，请稍后重试')
            })
    }
  },
  created () {
      let that = this
      console.log(this.id)
      axios({
          url: '/api/user_app/user_profile/' + this.id + '/',
          method: 'get'
      })
      .then(function(res) {
          if (res.data.status === 'success') {
              let msg = JSON.parse(res.data.msg)
              console.log(msg)
              that.settings.email = msg.email
              that.settings.avatar = '../../static/img/' + 'avatar1.jpeg'
              that.settings.username = msg.username
              that.settings.phone = msg.phone
              console.log(that.settings)
          } else {
                that.$Message.error(res.data.error_msg)
          }
        })
        .catch(function(err) {
            that.$Message.error('获取用户信息失败，请稍后重试')
        })
  }
}
</script>
