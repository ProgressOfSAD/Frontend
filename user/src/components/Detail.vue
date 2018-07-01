<template>
        <div :style="{padding: '10px 50px 0px 50px'}">
            <div style="width:42%;margin:auto;">
                <Row type='flex' justify='center' class='row' style="padding-top:20px;">
                    <Col span='6'>
                        <img :src="book.cover" style="height: 200px">
                    </Col>
                    <Col span="12">
                        <p class="infos" style="font-size: 20px; font-weight:bold">{{ book.bookname }}</p>
                        <p class="infos"><span style="fontWeight: bold">作者:</span>{{ book.author }}</p>
                        <p class="infos"><span style="fontWeight: bold">出版社: </span>{{ book.press }}</p>
                        <p class="infos"><span style="fontWeight: bold">出版日期: </span>{{ book.date }}</p>
                        <p class="infos"><span style="fontWeight: bold">页数: </span>{{ book.page }}</p>
                        <p class="infos"><span style="fontWeight: bold">ISBN: </span>{{ book.ISBN }}</p>
                        <Button type="ghost" style='margin:0 0 10px 10px' v-if='book.isCollected' @click="disCollect()">取消收藏</Button>
                        <Button type="ghost" style='margin:0 0 10px 10px' v-else @click="collect()">收藏本书</Button>
                        <Button type="primary" @click='preserve=true' style='margin:0 0 10px 10px'>预约借书</Button>
                        <Modal v-model='preserve' title="Common Modal dialog box title">
                            <p slot="header" style="text-align:center">
                                <span>预约请求</span>
                            </p>
                            <p>库存数: {{ book.num }}</p>
                            <p>空闲本数: {{ book.available }}</p>
                            <div slot="footer">
                                <Button type="primary" size="large" @click="confirm()">确定借书</Button>
                                <Button size="large" @click="preserve=false">取消</Button>
                            </div>
                        </Modal>
                    </Col>
                    <Col span="6">
                        <div class="score">
                            <div class="currentScore">
                                同学评分:
                                <div style='font-size: 30px;'>{{ book.score.toFixed(1) }}</div>
                                <Rate disabled allow-half v-model="book.score"></Rate>
                            </div>
                            <div class="setScore">
                                对本书评分：
                                <Rate v-if='isScored' disabled allow-half v-model="book.myScore" @on-change="scoreing()"></Rate>
                                <Rate v-else show-text allow-half v-model="setScore" @on-change="scoreing()"><span style="color: #f5a623; font-size:15px;">{{ setScore }}</span></Rate>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div class="des">
                    <div class="titles">
                        内容简介-----
                    </div>
                    <div class="text">
                        {{ book.des }}
                    </div>
                </div>
                <div class='des'>
                    <Row class="titles" type='flex' justify='space-between'>
                        <Col span='18'>《{{ book.bookname }}》的书评-----</Col>
                        <Col span="4"><Button icon='ios-compose-outline' @click='writeComment()'>我来写书评</Button></Col>
                    </Row>
                    <Card class='comments' v-for='c in book.comment' :key='c.id'>
                        <a class="commentTitle" @click='findComment()'>{{ c.title }}</a>
                        <span class="icons">
                            <Icon type="android-favorite-outline"></Icon>{{ c.like }}
                            <Icon type="ios-chatbubble-outline"></Icon>{{ c.reply }}
                        </span>
                        <!-- <div class="authors"> -->
                            <br />
                            <img :src='c.avatar' style="height:25px;"/>
                            <span style="margin:3px;padding-left:10px; position:absolute;">
                                {{ c.author  }}
                            </span>
                        <!-- </div> -->
                        <div class="brief"> {{ c.des }}</div>
                    </Card>
                </div>
            </div>
        </div>
</template>

<style scoped>
.des {
    padding-top: 50px;
    /* width: 42%;
    margin: auto; */
}
.titles {
    color: #6791f0;
    font-size: 20px;
}
.text {
    font-size: 15px;
}
.infos {
    margin:0 0 10px 10px;
    font-size: 15px;
    color: grey;
}
.score {
    height: 200px;
    border-left: #eeeeee solid 2px;
    color: grey;
    font-size: 15px;

}
.currentScore,.setScore {
    padding-left: 10px;
}
.setScore {
    margin-top: 30px;
}
.commentTitle {
    font-weight: bold;
}
.authors {
    margin-top: 10px;
    height: 25px;
}
</style>

<script>
/* eslint-disable */
import axios from 'axios'
import qs from 'qs'

export default {
    data: function() {
        return {
            bid: 0,
            preserve: false,
            isScored: false,
            setScore: 0,
            book: {
                cover: '',
                score: 0,
                author: '',
                bookname: '',
                des: '',
                ISBN: '',
                date: '',
                press: '',
                page: '',
                num: 1,
                available: 1
            }
        }
    },
    computed: {
        isLogin() {
            return this.$store.state.isLogin
        }
    },
    methods: {
        collect() {
            if (!this.isLogin) {
                this.$Message.info('你尚未登录。')
                return
            }
            let that = this
            axios({
                method: 'post',
                url: '/api/user_app/collect_book/',
                data: qs.stringify({
                    bid: that.bid,
                    protocol: 1
                })
            })
           .then(function(res) {
                if (res.data.status === 'success') {
                    that.$Message.info('收藏成功，可以在“我的书架”上找到该书籍。')
                } else {
                    that.$Message.error(res.data.error_msg)
                }
            })
            .catch(function(err) {
                that.$Message.error('收藏书籍失败，请重试')
            })
        },
        scoreing() {
            if (!this.isLogin) {
                this.$Message.info('你尚未登录。')
                return
            }
            let that = this
            axios({
                method: 'post',
                url: '/api/user_app/star_book/',
                data: qs.stringify({
                    bid: that.bid,
                    star: that.setScore
                })
            })
           .then(function(res) {
                if (res.data.status === 'success') {
                    this.isScored = true
                    this.$Message.info('评分成功！')
                } else {
                    that.$Message.error(res.data.error_msg)
                }
            })
            .catch(function(err) {
                that.$Message.error('评分失败.')
            })
        },
        confirm() {
            let that = this
            if (!this.isLogin) {
                this.$Message.info('你尚未登录。')
                return
            }
            axios({
                method: 'post',
                url: '/api/user_app/subscribe_book/',
                data: qs.stringify({
                    bid: that.bid
                })
            })
           .then(function(res) {
                if (res.data.status === 'success') {
                    that.preserve = false
                    that.$Message.info('预约成功！')
                } else {
                    that.$Message.error(res.data.error_msg)
                }
            })
            .catch(function(err) {
                that.$Message.error('没有可预约借阅的单册。')
            })
        },
        findUser() {
            this.$router.push('/user/shelf')
        },
        loadComments(bid) {
            var that = this
            console.log(bid)
            axios({
                url: '/api/user_app/comment_section/' + bid + '/',
                method: 'get'
            })
            .then(function(res) {
                if (res.data.status === 'success') {
                    var msg = JSON.parse(res.data.msg)
                    console.log(msg)
                } else {
                    vm.$Message.error(res.data.error_msg)
                }
            })
            .catch(function(err) {
                that.$Message.error(err)
            })
        },
        findComment() {
            this.$router.push('/comment')
        },
        writeComment() {
            this.$router.push('/edit')
        }
    },
    beforeRouteEnter (to, from, next) {
        // console.log('update')
        next(vm => {
            console.log(vm.$route.params.bid)
            vm.bid = vm.$route.params.bid
            console.log('bid :', vm.bid)
            axios({
                url: '/api/user_app/detail/' + vm.$route.params.bid + '/',
                method: 'get'
                })
            .then(function(res) {
                // console.log(res)
                if (res.data.status === 'success') {
                    var msg = JSON.parse(res.data.msg)
                    console.log(msg)
                    var info
                    // console.log('k in msg:')
                    for (var k in msg) {
                        info = msg[k]
                        vm.bid = k
                        // console.log(k)
                    }
                    
                    info = JSON.parse(info)
                    vm.book.bookname = info.name
                    vm.book.cover = '../../static/img/' + info.cover
                    vm.book.score = Number(info.score)
                    vm.book.author = info.author
                    vm.book.press = info.press
                    vm.book.date = info.publish_time
                    vm.book.ISBN = info.ISBN
                    vm.book.des = info.brief
                } else {
                    vm.$Message.error(res.data.error_msg)
                }
            })
            .catch(function(err) {
                console.log('err: ', err)
                vm.$Message.error('error:', err)
            })
            vm.loadComments(vm.$route.params.bid)
        })
        next()
    }
}
</script>

