<template>
  <div id='comment'>
            <Card v-for='c in comments' :key='c.title'>
                <a @click='getMessage()'>{{ c.title }}</a>
            </Card>
            <div v-if='noComments'>You do not have any comments~</div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data: function() {
      return {
          noComments: false,
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
.ivu-menu {
    height: 700px;
}
#user-content {
    width: 60%;
    height: 500px;
    background: white;
}
</style>
