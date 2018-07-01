<template>
    <Layout>
        <Header>
            <Menu mode="horizontal">
                <a class="layout-logo" @click="jump('main')">
                    <img id='logo' src="../static/img/SunYet-sen.png">
                    <span id='logo-name'>云书架</span>
                </a>
                <div class="layout-nav">
                    <Form inline>
                        <FormItem prop='searchKey' id='search'>
                            <Input v-model="searchKey" placeholder="输入书名、作者、ISBN..." style="width: 200px"></Input>
                            <Button type="primary" @click="search()">搜索</Button>
                        </FormItem>
                        <a @click="jump('user')" v-if="isLogin">
                            <Avatar :src="avatar" />
                        </a>
                        <a @click="jump('login')" v-else>
                          <Avatar icon="person" />
                        </a>
                    </Form>
                </div>
            </Menu>
        </Header>
        <div id="content" style="height: 800px">
        <router-view></router-view>
        </div>
        <Footer class="layout-footer-center" style="margin-top: 50px">
          管理员系统:
          <a href="http://localhost:8080/#/login">登录</a><br/>
          联系我们:
          <a href='https://github.com/ProgressOfSAD'>Github</a>
        </Footer>
    </Layout>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      searchKey: ''
    }
  },
  computed: {
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
  created () {
    let id = window.localStorage.getItem('id')
    let name = window.localStorage.getItem('name')
    let avatar = window.localStorage.getItem('avatar')
    let isLogin = window.localStorage.getItem('isLogin')
    console.log(id, name, avatar, isLogin)
    this.$store.commit('setName', name)
    this.$store.commit('setId', id)
    this.$store.commit('setAvatar', avatar)
    this.$store.commit('setLogin', isLogin)
  },
  methods: {
    search() {
      console.log('change' + this.searchKey)
      this.$router.push({
        path: '/search',
        name: 'Search',
        params: {
          keyword: this.searchKey
        }
      })
    },
    updateKey: function() {
      console.log(this.$route.name)
      if (this.$route.name !== 'Search') {
        this.searchKey = ''
      }
    },
    jump: function(name) {
      switch (name) {
        case "main":
          name = "/";
          break;
        case "login":
          name = "/login";
          break;
        case "community":
          name = "/community";
          break;
        case "search":
          name = "/search";
          break;
        case "user":
          name = "/user";
          break;
        case "group":
          name = "/group";
          break;
        default:
          break;
      }
      this.$router.push(name);
    }
  },
  watch: {
        '$route' : 'updateKey'
    },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* .ivu-layout {
    height: 800px;
} */
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
    margin-top: 0;
}
</style>

