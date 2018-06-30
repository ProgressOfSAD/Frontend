<template>
  <div id='shelf'>
            <Card class="books" v-for='b in book' :key='b.bookname'>
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
    findBook: function(bid) {
        this.$router.push('/detail/:' + bid)
    }
  },
  computed: {
      uid() {
          return this.$store.state.id
      }
  },
//   created () {
//       axios.get('api/user_app/user_profile/' + this.uid) {
          
//       }
//   }
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
