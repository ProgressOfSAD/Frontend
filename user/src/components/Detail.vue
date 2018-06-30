<template>
        <div :style="{padding: '10px 50px 0px 50px'}">
            <div style="width:42%;margin:auto;">
                <Row type='flex' justify='center' class='row' style="padding-top:20px;">
                    <Col span='6'>
                        <img :src="book.cover" style="height: 200px">
                    </Col>
                    <Col span="12">
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
            // book: {
            //     cover: "https://img3.doubanio.com/view/subject/l/public/s3563113.jpg",
            //     score: 4.5,
            //     myScore: 5.0,
            //     author: '三毛',
            //     bookname: "撒哈拉的故事",
            //     des: `三毛作品中最膾炙人口的《撒哈拉的故事》
            //         由12篇精采動人的散文結合而成﹐
            //         其中＜沙漠中的飯店＞﹐
            //         是三毛適應荒涼單調的沙漠生活後﹐
            //         重新拾筆的第一篇文字﹐
            //         自此之後﹐三毛便寫出一系列以沙漠為背景的故事﹐
            //         風靡了全世界的中文讀者。`,
            //     date: "1976",
            //     ISBN: '9789573305545',
            //     press: '皇冠出版社',
            //     page: '240',
            //     isCollected: false,
            //     num: 10,
            //     available: 2,
            //     comment: [
            //         {
            //             title: "流浪到天明",
            //             id: '1',
            //             author: '清隐',
            //             like: 102,
            //             reply: 48,
            //             avatar: 'https://img3.doubanio.com/icon/u1282831-50.jpg',
            //             des: `前段时间看齐豫的专访，不例外地提到三毛。
            //                 她说初见三毛很有些吃惊，极瘦小一个女子，觉察不出经历过那么多故事。
            //                 三毛的确貌不惊人，连“三毛”这名字也嫌潦草——也不知是她明了自身天性取了这名字，还是这个流浪的名字注定了她一生颠沛。`
            //         },
            //         {
            //             title: '三毛作品的出版顺序',
            //             id: '2',
            //             author: '甲',
            //             like: 198,
            //             reply: 55,
            //             avatar: 'https://img3.doubanio.com/icon/u158786819-1.jpg',
            //             des: `我想从头到尾系统地看三毛的书，所以找了三毛作品的出版顺序，供想读三毛的人参考：`
            //         }
            //     ]
            // }
        }
    },
    computed: {
        isLogin() {
            return this.$store.state.isLogin
        }
    },
    methods: {
        disCollect() {
            this.$set(this.book, 'isCollected', false)
            this.$Message.info('已经取消对该书的收藏。')
        },
        collect() {
            let that = this
            axios({
                method: 'post',
                url: '/api/user_app/collect_book/',
                data: qs.stringify({
                    bid: that.bid,
                    
                })
            })
           .then(function(res) {
                if (res.data.status === 'success') {
                    that.$set(this.book, 'isCollected', true)
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
            console.log('now:', this.bid)
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
            axios.get('/api/user_app/comment_section/' + bid)
            .then(function(res) {
                if (res.data.status === 'success') {
                    var msg = qs.parse(res.data.msg)
                    console.log(msg)
                    book.cover = msg.cover
                } else {
                    vm.$Message.error(res.data.error_msg)
                }
            })
            .catch(function(err) {
                that.$Message.error('获取书评信息失败，请重试')
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
                    // console.log(msg)
                    var info
                    // console.log('k in msg:')
                    for (var k in msg) {
                        info = msg[k]
                        vm.bid = k
                        // console.log(k)
                    }
                    
                    info = JSON.parse(info)
                    vm.book.bookname = info.name
                    vm.book.cover = info.cover
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
            // vm.loadComments(vm.$route.params.bid)
        })
        next()
    }
}
</script>

