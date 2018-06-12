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
            <Form :model="settings" :label-width="80">
                <Row type="flex" justify="center" align="top" class="code-row-bg">
                    <Col span="20">
                            <FormItem label="邮箱">
                                <Input v-model="settings.email" :placeholder='settings.email' disabled></Input>
                            </FormItem>
                            <FormItem label="昵称">
                                <Input v-model="settings.name"></Input>
                            </FormItem>
                            <FormItem label="手机">
                                <Input v-model="settings.phone"></Input>
                            </FormItem>
                    </Col>
                    <Col span="4">
                        <Avatar :src="settings.avatar" style="width: 170px;height: 170px;margin-top: 40px;border-radius: 50%;"/>
                        <Upload action="//jsonplaceholder.typicode.com/posts/">
                            <Button type="ghost" icon="ios-cloud-upload-outline" style="margin:40%;">修改头像</Button>
                        </Upload>
                    </Col>
                </Row>
            </Form>
        </Col>
    </Row>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data: function() {
      return {
          active: 'setting',
          messages: [],
          noNews: true,
          settings: {
              'avatar': 'https://avatars0.githubusercontent.com/u/18616941?s=400&u=8968a9a5cd27249babe5fd7f2a61654b62da660b&v=4',
              'email': 'chenym63@mail2.sysu.edu.cn',
              'name': 'Young',
              'phone': '13719346096'
          }
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
.ivu-input-wrapper {
    width: 200px;
}
.ivu-form .ivu-form-item-label {
    font-size: 15px;
    margin: 10px 0px;
}
.ivu-menu {
    height: 700px;
}
.ivu-form-item {
    margin-top: 30px;
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
