<style scoped>
.layout {
  border: 1px solid #eeeeee;
  /* background: #eeeeee */
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.ivu-layout-header {
  background: #f5f7f9;
}
.ivu-layout-sider {
  background: white;
}
.layout-logo {
  width: 200px;
  /* height: 30px */
  /* background: #5b6270 */
  border-radius: 3px;
  float: left;
  position: relative;
  /* top: 15px */
  left: 20px;
}
#logo-name {
  font-size: 15px;
  margin-left: 10px;
  color: grey;
  font-weight: 600;
}
#logo {
  position: relative;
  vertical-align: middle;
  width: 40px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 0px;
}
.layout-footer-center {
  text-align: center;
}
.ivu-form-item-content {
  margin-top: 12px;
}
#search {
  margin-top: 12px;
}
</style>
<template>
    <Layout>
        <Content :style="{padding: '10px 50px 0px 50px'}">
            <Tabs id='types' @on-click='changeType' v-model='currentType'>
                <TabPane v-for="(val, index) in types" :label="val" :key='index' :name='val'>
                  <!-- <div style="width:42%;"> -->
                    <Card class="books" v-for='b in books' :key='b.bookname'>
                        <Row type='flex' align='top'  class='bookItem' justify='start'>
                            <Col span='2'>
                            <a @click="findBook(b.id)" class="covers">
                                <img :src="b.cover" style="height: 150px">
                            </a>
                            </Col>
                            <Col span="22">
                            <a @click="findBook(b.bid)" class='booknames' style="height: 30px; fontSize: 20px; fontWeight: bold;">{{ b.bookname }}</a>
                            <!-- <p class="score" style="height: 20px"><span style="fontWeight: bold">评分: </span>{{ b.score }}</p> -->
                            <p class="author" style="height: 20px"><span style="fontWeight: bold">作者: </span>{{ b.author }}</p>
                            <p class="date" style="height: 20px"><span style="fontWeight: bold">出版日期: </span>{{ b.date }}</p>
                            <p class="des">{{ b.des }}</p>
                            </Col>
                        </Row>
                    </Card>
                  <!-- </div> -->
                </TabPane>
            </Tabs>
        </Content>
    </Layout>
</template>
<script>
/* eslint-disable */
import axios from 'axios'
import qs from 'qs'

export default {
  data: function() {
    return {
      currentType: '文学',
      tids: [],
      types: [],
      books: []
    };
  },
  methods: {
    setCover: function(b) {
      b.cover = ('../../static/img/') + b.cover
      console.log(b.cover)
    },
    findBook: function(id) {
        this.$router.push('detail/' + id);
    },
    changeType: function(name) {
      console.log(name)
      var that = this
      that.books = []
      that.currentType = name
      var tid = this.tids[String(this.types.indexOf(name))]
      console.log(tid)
      axios({
        url:'api/user_app/category/' + tid + '_0-9/',
        method: 'get'
        })
      .then(function(res) {
        console.log(res.data)
        if (res.data.status === 'success') {
          var msg = JSON.parse(res.data.msg)
          console.log(msg)
          for (var i in msg) {
            var tmp = {}
            tmp.bid = i
            var items = JSON.parse(msg[i])
            // console.log(items)
            tmp.cover = items.cover
            that.setCover(tmp)
            tmp.bookname = items.name
            tmp.score = items.score
            tmp.date = items.publish_time
            tmp.author = items.author
            tmp.des = items.brief
            that.books.push(tmp)
          }
        } else {
          that.$Message.error(res.data.error_msg)
        }
      })
      .catch(function(err) {
        that.$Message.error(err)
      })
    }
  },
  created () {
    var that = this
    axios({
      method: 'get',
      url: '/api/user_app/book_type/'
    })
    .then(function(res) {
      if (res.data.status === 'success') {
          var msg = JSON.parse(res.data.msg)
          // console.log(msg)
          for (var k in msg) {
              that.tids.push(k)
              that.types.push(msg[k])
              // console.log(msg[k])
          }
          // console.log(that.tids)
      } else {
        that.$Message.error(res.data.error_msg)
      }
    })
    .catch(function(err){
      console.log(err)
      that.$Message.error(err)
    })
    axios({
      method: 'get',
      url: '/api/user_app/category/' + '9_0-9/'
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
          tmp.cover = items.cover
          that.setCover(tmp)
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
};
</script>
