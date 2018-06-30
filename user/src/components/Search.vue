<template>
    <div id="search" style="padding: 10px 50px 0 50px">
        <div class="keyword">
            搜索"{{ keyword }}",
            共{{ num }}条记录
        </div>
        <div class="details">
            <Card v-for="b in items" :key="b.bookname">
                <Row type='flex' align='top' class='bookItem' justify='start'>
                    <Col span='2'>
                    <a @click="findBook()">
                        <img :src="b.cover" style="height: 150px">
                    </a>
                    </Col>
                    <Col span="22">
                    <a @click="findBook()" class='bookname' style="height: 30px; fontSize: 20px; fontWeight: bold;">{{ b.bookname }}</a>
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
            num: 3,
            items: [
            {
              cover: "https://img3.doubanio.com/view/subject/m/public/s27264181.jpg",
              score: 4.3,
              author: '东野圭吾',
              bookname: "解忧杂货店",
              des: `现代人内心流失的东西，这家杂货店能帮你找回——
                  僻静的街道旁有一家杂货店，只要写下烦恼投进卷帘门的投信口，第二天就会在店后的牛奶箱里得到回答。
                  因男友身患绝症，年轻女孩静子在爱情与梦想间徘徊；克郎为了音乐梦想离家漂泊，却在现实中寸步难行；少年浩介面临家庭巨变，挣扎在亲情与未来的迷茫中……
                  他们将困惑写成信投进杂货店，随即奇妙的事情竟不断发生。
                  生命中的一次偶然交会，将如何演绎出截然不同的人生？
                  如今回顾写作过程，我发现自己始终在思考一个问题：站在人生的岔路口，人究竟应该怎么做？我希望读者能在掩卷时喃喃自语：我从未读过这样的小说。——东野圭吾`,
              date: "2014-5"
            },
            {
              cover: "https://img3.doubanio.com/view/ark_article_cover/retina/public/1162265.jpg?v=1395394775.0",
              bookname: "追风筝的人",
              score: 4.5,
              author: '卡勒德·胡赛尼',
              des: `12岁的阿富汗富家少爷阿米尔与仆人哈桑情同手足。然而，在一场风筝比赛后，发生了一件悲惨不堪的事，阿米尔为自己的懦弱感到自责和痛苦，逼走了哈桑，不久，自己也跟随父亲逃往美国。
                    成年后的阿米尔始终无法原谅自己当年对哈桑的背叛。为了赎罪，阿米尔再度踏上暌违二十多年的故乡，希望能为不幸的好友尽最后一点心力，却发现一个惊天谎言，儿时的噩梦再度重演，阿米尔该如何抉择？
                    故事如此残忍而又美丽，作者以温暖细腻的笔法勾勒人性的本质与救赎，读来令人荡气回肠。`,
              date: "2006-5"
            },
            {
              cover: "https://img3.doubanio.com/view/subject/l/public/s6384944.jpg",
              bookname: "百年孤独",
              score: 4.6,
              author: '加西亚·马尔克斯',
              des: `《百年孤独》是魔幻现实主义文学的代表作，描写了布恩迪亚家族七代人的传奇故事，以及加勒比海沿岸小镇马孔多的百年兴衰，反映了拉丁美洲一个世纪以来风云变幻的历史。作品融入神话传说、民间故事、宗教典故等神秘因素，巧妙地糅合了现实与虚幻，展现出一个瑰丽的想象世界，成为20世纪最重要的经典文学巨著之一。1982年加西亚•马尔克斯获得诺贝尔文学奖，奠定世界级文学大师的地位，很大程度上乃是凭借《百年孤独》的巨大影响。`,
              date: "2011-6"
            }
          ]
        }
    },
    methods: {
        updateData() {
            console.log('update')

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
            axios.get('/api/user_app/retrieve/key=' + vm.keyword)
            .then(function(res) {
                if (res.data.status === 'success') {
                    
                } else {
                    vm.$Message.error(res.data.error_msg)
                }
            })
            .catch(function(err) {
                vm.$Message.error('请稍后重试')
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

