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
            <Tabs id='types'>
                <TabPane v-for="t in types" :label="t.name" :key='t'>
                    <Card class="books" v-for='b in t.book' :key='b'>
                        <Row type='flex' align='middle' class='bookItem' justify='start'>
                            <Col span='2'>
                            <a @click="findBook()">
                                <img :src="b.cover" style="height: 150px">
                            </a>
                            </Col>
                            <Col span="10">
                            <a @click="findBook()" class='bookname' style="height: 30px; fontSize: 20px; fontWeight: bold;">{{ b.bookname }}</a>
                            <p class="score" style="height: 20px"><span style="fontWeight: bold">评分: </span>{{ b.score }}</p>
                            <p class="author" style="height: 20px"><span style="fontWeight: bold">作者: </span>{{ b.author }}</p>
                            <p class="date" style="height: 20px"><span style="fontWeight: bold">出版日期: </span>{{ b.date }}</p>
                            <p class="des" style="height: 40px">{{ b.des }}</p>
                            </Col>
                        </Row>
                    </Card>
                </TabPane>
            </Tabs>
        </Content>
    </Layout>
</template>
<script>
/* eslint-disable */
export default {
  data: function() {
    return {
      types: [
        {
          name: "all",
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
        },
        {
          name: "tech",
          book: [
            {
              cover: "https://img3.doubanio.com/view/subject/m/public/s27264181.jpg",
              bookname: "c++ primere1",
              des: "this is a book",
              date: "2018/02/02"
            },
            {
              cover: "https://img3.doubanio.com/view/subject/m/public/s27264181.jpg",
              bookname: "c++ primere1",
              des: "this is a book",
              date: "2018/02/02"
            },
            {
              cover: "https://img3.doubanio.com/view/subject/m/public/s27264181.jpg",
              bookname: "c++ primere1",
              des: "this is a book",
              date: "2018/02/02"
            }
          ]
        }
      ]
    };
  },
  methods: {
    jump: function(name) {
      switch (name) {
        case "main":
          name = "/";
          break;
        case "login":
          name = "/login";
          break;
        case "detail":
          name = "/detail";
          break;
        case "search":
          name = "/search";
          break;
        case "user":
          name = "/user";
          if (this.$store.state.userId === "") {
            this.isLogin = true;
            return;
          }
          break;
        case "group":
          name = "/group";
          break;
        default:
          break;
      }
      this.$router.push(name);
    },
    findBook: function() {
        this.jump('detail');
    }
  }
};
</script>
