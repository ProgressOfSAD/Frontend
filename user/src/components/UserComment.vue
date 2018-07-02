<template>
  <div id='comment'>
      <div id="note" v-if='noComments'>你还没写过书评~</div>
        <Card v-else v-for='c in comments' :key='c.title'>
            <a @click='getMessage()'>{{ c.title }}</a>
        </Card>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data: function() {
      return {
          noComments: true,
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
  }
}
</script>

<style scoped>
#note {
    font-size: 20px;
    font-weight: bold;
    padding: 50px 50px;
}
.ivu-menu {
    height: 700px;
}
#user-content {
    width: 60%;
    height: 500px;
    background: white;
}
</style>
