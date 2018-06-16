<template>
  <div id='user' :style="{padding: '10px 50px 0px 50px'}">
    <Row>
        <Col span=4>
            <Menu :active-name='$route.path' ref="leftMenu" @on-select='selectFn'>
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
            <Card class="books" v-for='b in book' :key='b'>
                <Row type='flex' align='middle' class='bookItem' justify='start'>
                    <Col span='2'>
                    <a @click="findBook()">
                        <img :src="b.cover" style="height: 150px">
                    </a>
                    </Col>
                    <Col span="10">
                    <a @click="findBook()" class='bookname' style="height: 30px; fontSize: 20px; fontWeight: bold;">{{ b.bookname }}</a>
                    <p class="score" style="height: 20px"><span style="fontWeight: bold">Score: </span>{{ b.score }}</p>
                    <p class="author" style="height: 20px"><span style="fontWeight: bold">Author: </span>{{ b.author }}</p>
                    <p class="date" style="height: 20px"><span style="fontWeight: bold">Publish: </span>{{ b.date }}</p>
                    <p class="des" style="height: 40px">{{ b.des }}</p>
                    </Col>
                </Row>
            </Card>
        </Col>
    </Row>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data: function() {
      return {
          active: 'bookshelf',
          book: [
            {
              cover: "https://img3.doubanio.com/view/subject/m/public/s27264181.jpg",
              score: 10,
              author: 'Young',
              bookname: "c++ primere1",
              des: "this is a book",
              date: "2018/02/02"
            },
            {
              cover: "https://img3.doubanio.com/view/subject/m/public/s27264181.jpg",
              bookname: "c++ 2",
              score: 10,
              author: 'Young',
              des: "this is a book",
              date: "2018/02/02"
            },
            {
              cover: "https://img3.doubanio.com/view/subject/m/public/s27264181.jpg",
              bookname: "c++ 3",
              score: 10,
              author: 'Young',
              des: "this is a book",
              date: "2018/02/02"
            }
          ]
      }
  },
  methods: {
    selectFn (a) {
        console.log(a, this.$route.path)
        this.$router.push({
          path: a
        })
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
