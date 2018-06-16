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
            <Card v-for='c in comments' :key='c'>
                <a @click='getMessage()'>{{ c.title }}</a>
            </Card>
            <div v-if='noComments'>You do not have any comments~</div>
        </Col>
    </Row>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data: function() {
      return {
          active: 'comment',
          comments: [
              {
                  title: 'Thinking in Java is a good book!',
                  date: '2018/06/03',
                  des: 'In my opinion...'
              },
              {
                  title: 'The book is awsome',
                  date: '2018/06/01',
                  des: 'I\'ve never read such a awsome book like this...'
              }
          ],
          noNews: false
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
</style>
