<template>
  <div id='shelf'>
            <Card class="books" v-for='b in books' :key='b.bookname'>
                <Row type='flex' align='middle' class='bookItem' justify='start'>
                    <!-- <Col span='2'>
                    <a @click="findBook(b.bid)">
                        <img :src="b.cover" style="height: 150px">
                    </a>
                    </Col>
                    <Col span="10"> -->
                    <a @click="findBook(b.bid)">{{ b.bookname }}</a>
                    <!-- <p class="score" style="height: 20px"><span style="fontWeight: bold">Score: </span>{{ b.score }}</p> -->
                    <!-- <p class="author" style="height: 20px"><span style="fontWeight: bold">Author: </span>{{ b.author }}</p> -->
                    <!-- <p class="date" style="height: 20px"><span style="fontWeight: bold">Publish: </span>{{ b.date }}</p>
                    <p class="des" style="height: 40px">{{ b.des }}</p> -->
                    <!-- </Col> -->
                </Row>
            </Card>
    </Row>
  </div>
</template>

<script>
/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
export default {
  data: function() {
      return {
          books: []
      }
  },
  methods: {
    findBook: function(bid) {
        this.$router.push('/detail/' + bid)
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
      if (res.data.status === 'success') {
        var msg = JSON.parse(res.data.msg)
        console.log(msg)
        msg = JSON.parse(msg.collections)
        for (var i in msg) {
          var tmp = {}
          tmp.bid = i
          tmp.bookname = msg[i]
        //   var items = JSON.parse(msg[i])
          // console.log(items)
        //   tmp.cover = '../../static/img/' + items.cover
        //   tmp.bookname = items.name
        //   tmp.author = items.author
        //   tmp.date = items.publish_time
        //   tmp.des = items.brief
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
</style>
