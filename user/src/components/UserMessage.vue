<template>
  <div id='user' :style="{padding: '10px 50px 0px 50px'}">
    <Row>
        <Col span=4>
            <Menu :active-name='active' ref="leftMenu" @on-select='selectFn'>
                <MenuItem name="bookshelf">
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
            <Card v-for='m in messages' :key='m'>
                <a @click='getMessage()'>{{ m.title }}</a>
            </Card>
            <div v-if='noNews' id='note'>You do not have any news~</div>
        </Col>
    </Row>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data: function() {
      return {
          active: 'message',
          messages: [],
          noNews: true
      }
  },
  methods: {
    selectFn (a) {
        console.log(a, this.$route.path)
        this.$router.push({
          path: a
        })
    },
    findBook: function() {
        this.$router.push('/detail')
    }
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
#note {
    font-size: 20px;
    font-weight: bold;
    padding: 50px 50px;
}
</style>
