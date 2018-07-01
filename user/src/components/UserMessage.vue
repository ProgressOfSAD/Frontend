<template>
  <div id='messages'>
      <div v-if='noNews' id='note'>你没有新消息~</div>
        <Card v-else v-for='m in messages' :key='m'>
            <a @click='getMessage()'>{{ m.title }}</a>
        </Card>
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
  computed: {
      uid() {
          return this.$store.state.id
      }
  },
  created () {
      var that = this
      console.log(that.uid)
    axios({
      method: 'get',
      url: '/api/user_app/user_profile/' + that.uid + '/'
    })
    .then(function(res) {
      console.log(res.data)
      if (res.data.status === 'success') {
        var msg = JSON.parse(res.data.msg)
        // console.log(msg)
        for (var i in msg) {
          var tmp = {}
          tmp.bid = i
          var items = JSON.parse(msg[i])
          // console.log(items)
          tmp.cover = '../../static/img/' + items.cover
          tmp.bookname = items.name
          tmp.score = items.score
          tmp.author = items.author
          tmp.date = items.publish_time
          tmp.des = items.brief
          that.books.push(tmp)
        }
      } else {
        that.$Message.error(res.data.error_msg)
      }
    })
    .catch(function(err) {
        that.$Message.error('请求书籍信息失败。')
    })
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
