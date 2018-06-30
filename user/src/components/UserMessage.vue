<template>
  <div id='messages'>
            <Card v-for='m in messages' :key='m'>
                <a @click='getMessage()'>{{ m.title }}</a>
            </Card>
            <div v-if='noNews' id='note'>You do not have any news~</div>
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
#note {
    font-size: 20px;
    font-weight: bold;
    padding: 50px 50px;
}
</style>
