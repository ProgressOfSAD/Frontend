<template>
  <div id='user' :style="{padding: '10px 50px 0px 50px'}">
    <Row>
        <Col span=4>
            <Menu :active-name='active' ref="leftMenu" @on-select='selectFn'>
                <MenuItem name="shelf">
                <Icon type="ios-book"></Icon>
                个人书架
                </MenuItem>
                <MenuItem name="message">
                <Icon type="ios-bell"></Icon>
                消息提醒
                </MenuItem>
                <MenuItem name="comment">
                <Icon type="document-text"></Icon>
                我的书评
                </MenuItem>
                <MenuItem name="setting">
                <Icon type="gear-b"></Icon>
                设置
                </MenuItem>
            </Menu>
        </Col>
        <Col id='userContent' span=20 style="height: 700px; background: white">
            <router-view></router-view>
        </Col>
    </Row>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data: function() {
      return {
          active: 'shelf',
      }
  },
  methods: {
    selectFn (a) {
        this.active = a
        console.log(this.active)
        if (a === 'shelf') {
            this.$router.push('/user')
            return
        }
        console.log('/user/' + a)
        this.$router.push('/user/' + a)
    },
    handleSelect: function(name) {
        console.log(name)
        if (name === 'message') {
            this.$router.push('/user/message')
        } else if (name==='comment') {
            this.$router.push('/user/comment')
        } else if (name==='setting') {
            this.$router.push('/user/setting')
        }
    }
  },
  created () {
      console.log('path:' + this.$route.path)
      this.active = this.$route.path.substring(6)
      console.log(this.active)
  }
}
</script>

<style scoped>
.ivu-menu {
    height: 700px;
}
#user-content {
    width: 60%;
    height: 500px;
    background: white;
}
</style>
