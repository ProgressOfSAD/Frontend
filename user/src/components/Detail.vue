<template>
    <Layout>
        <Content :style="{padding: '10px 50px 0px 50px'}">
            <div id='content'>
                <Row type='flex' justify='center' class='row' style="padding-top:20px;">
                    <Col span="2">
                        <img :src="book.cover" style="height: 200px">
                    </Col>
                    <Col span="6">
                        <p class="infos"><span style="fontWeight: bold">作者: </span>{{ book.author }}</p>
                        <p class="infos"><span style="fontWeight: bold">出版社: </span>{{ book.press }}</p>
                        <p class="infos"><span style="fontWeight: bold">出版日期: </span>{{ book.date }}</p>
                        <p class="infos"><span style="fontWeight: bold">页数: </span>{{ book.page }}</p>
                        <p class="infos"><span style="fontWeight: bold">ISBN: </span>{{ book.ISBN }}</p>
                        <Button type="ghost" style='margin:0 0 10px 10px' v-if='book.isCollected' @click="disCollect()">取消收藏</Button>
                        <Button type="ghost" style='margin:0 0 10px 10px' v-else @click="collect()">收藏本书</Button>
                    </Col>
                    <Col span="2">
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
            </div>
        </Content>
    </Layout>
</template>

<style scoped>
/* #content {
    background: white;
    height: 800px;;
} */
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
</style>

<script>
/* eslint-disable */
export default {
    data: function() {
        return {
            isScored: false,
            setScore: 0,
            book: {
                cover: "https://img3.doubanio.com/view/subject/l/public/s3563113.jpg",
                score: 4.5,
                myScore: 5.0,
                author: '三毛',
                bookname: "撒哈拉的故事",
                des: `三毛作品中最膾炙人口的《撒哈拉的故事》
                    由１２篇精采動人的散文結合而成﹐
                    其中＜沙漠中的飯店＞﹐
                    是三毛適應荒涼單調的沙漠生活後﹐
                    重新拾筆的第一篇文字﹐
                    自此之後﹐三毛便寫出一系列以沙漠為背景的故事﹐
                    風靡了全世界的中文讀者。`,
                date: "1976",
                ISBN: '9789573305545',
                press: '皇冠出版社',
                page: '240',
                isCollected: false,
                comment: [
                    {
                        title: "流浪到天明",
                        id: '1',
                        des: `前段时间看齐豫的专访，不例外地提到三毛。
                            她说初见三毛很有些吃惊，极瘦小一个女子，觉察不出经历过那么多故事。
                            三毛的确貌不惊人，连“三毛”这名字也嫌潦草——也不知是她明了自身天性取了这名字，还是这个流浪的名字注定了她一生颠沛。`
                    },
                    {
                        title: '三毛作品的出版顺序',
                        id: '2',
                        des: `我想从头到尾系统地看三毛的书，所以找了三毛作品的出版顺序，供想读三毛的人参考：`
                    }
                ]
            }
        }
    },
    methods: {
        disCollect() {
            this.$set(this.book, 'isCollected', false)
            this.$Message.info('已经取消对该书的收藏。')
        },
        collect() {
            this.$set(this.book, 'isCollected', true)
            this.$Message.info('收藏成功，可以在“我的书架”上找到该书籍。')
        },
        scoreing() {
            console.log('click')
            this.isScored = true
            this.$Message.info('评分成功！')
        }
    }
}
</script>

