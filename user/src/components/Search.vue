<template>
    <div id="search" style="padding: 10px 50px 0 50px">
        <div class="keyword">
            搜索"{{ keyword }}",
            共{{ num }}条记录
        </div>
        <div class="details">
            <Card v-for="b in books" :key="b.bookname">
                <Row type='flex' align='top' class='bookItem' justify='start'>
                    <Col span='2'>
                    <a @click="findBook()">
                        <img :src="b.cover" style="height: 150px">
                    </a>
                    </Col>
                    <Col span="22">
                    <a @click="findBook(b.bid)" class='bookname' style="height: 30px; fontSize: 20px; fontWeight: bold;">{{ b.bookname }}</a>
                    <p class="score" style="height: 20px">
                        <span style="fontWeight: bold">评分: </span>{{ b.score }}</p>
                    <p class="author" style="height: 20px">
                        <span style="fontWeight: bold">作者: </span>{{ b.author }}</p>
                    <p class="date" style="height: 20px">
                        <span style="fontWeight: bold">出版日期: </span>{{ b.date }}</p>
                    <p class="des">{{ b.des }}</p>
                    </Col>
                </Row>
            </Card>
        </div>
    </div>
</template>

<style scoped>
.keyword {
    font-size: 15px;
    padding-bottom: 10px;
    color: #6791F0;
}
</style>

<script>
/* eslint-disable */
import axios from 'axios'
import qs from 'qs'

export default {
    data: function() {
        return {
            keyword: '小说',
            num: 0,
            books: []
        }
    },
    methods: {
        findBook(bid) {
            this.$router.push('/detail/' + bid)
        }
    },
    watch: {
        '$route' : 'updateData'
    },
    beforeRouteEnter(to, from, next) {
        console.log('enter')
        next(vm => {
            console.log(vm.$route.params.keyword)
            vm.keyword = vm.$route.params.keyword
            axios({
                url: '/api/user_app/retrieve/?key=' + vm.keyword,
                method: 'get'
                })
            .then(function(res) {
                if (res.data.status === 'success') {
                    // console.log(res.data.msg)
                    var msg = JSON.parse(res.data.msg)
                    for (var i in msg) {
                        var tmp = {}
                        tmp.bid = i
                        var items = JSON.parse(msg[i])
                        console.log(items)
                        tmp.cover = '../../static/img/' + items.cover
                        tmp.bookname = items.name
                        tmp.score = items.score
                        tmp.author = items.author
                        tmp.date = items.publish_time
                        tmp.des = items.brief
                        vm.books.push(tmp)
                    }
                    vm.num = vm.books.length
                } else {
                    vm.$Message.error(res.data.error_msg)
                }
            })
            .catch(function(err) {
                vm.$Message.error(err)
            })
        })
    },
    // beforeRouteUpdate(to, from, next) {
    //     console.log('update')
    //     next(vm => {
    //         console.log(vm.$route.params.keyword)
    //         vm.keyword = vm.$route.params.keyword
    //         axios.get('api/user_app/retrieve/?key=' + vm.keyword)
    //         .then(function(res) {
    //             if (res.data.status === 'success') {
                    
    //             } else {
    //                 vm.$Message.error(res.data.error_msg)
    //             }
    //         })
    //         .catch(function(err) {
    //             vm.$Message.error('请稍后重试')
    //         })
    //     })
    // }
}
</script>

