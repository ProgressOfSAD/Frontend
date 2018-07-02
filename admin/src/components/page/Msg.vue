<template>
    <div class="">
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`未处理举报(${unread.length})`" name="first">
                    <el-table :data="unread" :show-header="false" style="width: 100%">
                        <el-table-column :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <span>{{scope.row.content}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column width="70">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleRead(scope.$index)">查看</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column width="70">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleIgnore(scope.$index)" type="primary">忽略</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column width="100">
                            <template slot-scope="scope">
                                <el-button size="small" @click="handleDelete(scope.$index)" type="danger">删除评论</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>

        <el-dialog title="确认举报详情" :visible.sync="editVisible" width="30%">
        <span>
            <div>评论内容：{{form.content}}
                <br>
                <br>
                举报理由及人数：
                <br>
                <div>&nbsp;&nbsp;广告或垃圾信息：<el-tag type="danger">{{form.report_reasons.r0}}</el-tag>人 <br>
                     &nbsp;&nbsp;低俗或色情：<el-tag type="danger">{{form.report_reasons.r1}}</el-tag>人 <br>
                     &nbsp;&nbsp;违反相关法律法规或管理规定：<el-tag type="danger">{{form.report_reasons.r2}}</el-tag>人 <br>
                     &nbsp;&nbsp;辱骂或不友善：<el-tag type="danger">{{form.report_reasons.r3}}</el-tag>人 <br>
                     &nbsp;&nbsp;引战或过于偏激的主观判断：<el-tag type="danger">{{form.report_reasons.r4}}</el-tag>人 <br>
                     &nbsp;&nbsp;泄露他人隐私：<el-tag type="danger">{{form.report_reasons.r5}}</el-tag>人 <br>
                     &nbsp;&nbsp;与作品或讨论区主题无关：<el-tag type="danger">{{form.report_reasons.r6}}</el-tag>人 <br>
                     &nbsp;&nbsp;刷屏：<el-tag type="danger">{{form.report_reasons.r7}}</el-tag>人 <br>
                     &nbsp;&nbsp;其他理由：<el-tag type="danger">{{form.report_reasons.r8}}</el-tag>人 <br>
                 </div>
            </div>
        </span>    
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">关闭</el-button>
        </span>
    </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                istest: false,
                editVisible: false,
                message: 'first',
                showHeader: false,
                unread: [],
                /*unread: [{
                    id: '',
                    content: '草泥马你个傻掉有种拿刀来砍老子',
                    report_reasons: {
                        r0: '3',
                        r1: '4',
                        r2: '654',
                        r3: '4326',
                        r4: '4324',
                        r5: '432',
                        r6: '4324',
                        r7: '4324',
                        r8: '2664',
                    }
                },{
                    id: '',
                    content: '这本书真的是我读过的最垃圾的书没有之一，完全不知道作者在想些什么。作者应该是吃了屎才能写出这么垃圾的作品',
                    report_reasons: {
                        r0: '3',
                        r1: '4',
                        r2: '654',
                        r3: '4326',
                        r4: '4324',
                        r5: '432',
                        r6: '4324',
                        r7: '4324',
                        r8: '2664',
                    }
                }],*/
                form: {
                    id: '',
                    content: '',
                    report_reasons: {
                        r0: '',
                        r1: '',
                        r2: '',
                        r3: '',
                        r4: '',
                        r5: '',
                        r6: '',
                        r7: '',
                        r8: '',
                    }
                }
            }
        },
        methods: {
            handleRead(index) {
                const item = this.unread[index];
                this.form = {
                    id: item.id,
                    content: item.content,
                    report_reasons: item.report_reasons
                }
                this.editVisible = true;
            },
            handleIgnore(index) {
                const item = this.unread.splice(index, 1);
                console.log(item);

                this.$axios.post('/manager_app/report_info_box/', this.$qs.stringify({
                    'protocol': '1',
                    'cid': item.id
                }))
                .then((response)=>{
                    if (response.data.status == 'success') {
                        this.$message.success(`成功忽略`);
                    } else {
                        this.$message.error(response.data.error_msg);
                    }
                });
            },
            handleDelete(index) {
                const item = this.unread.splice(index, 1);
                console.log(item);

                this.$axios.post('/manager_app/report_info_box/', {
                    'protocol': '0',
                    'cid': item.id
                })
                .then((response)=>{
                    if (response.data.status == 'success') {
                        this.$message.success(`成功删除被举报评论`);
                    } else {
                        this.$message.error(response.data.error_msg);
                    }
                });
            },
            getReportInfo() {
                this.$axios.get('/manager_app/report_info_box/')
                .then((response)=>{
                    if (response.data.status == 'success') {
                        const reportItem = JSON.parse(response.data.msg);
                        const reportLen = reportItem.length;
                        var i = 0;
                        for (var key in reportItem) {
                            unread[i].id = key;
                            unread[i].content = reportItem[key].content;
                            unread[i].report_reasons.r0 = reportItem[key].report_reasons['0'];
                            unread[i].report_reasons.r1 = reportItem[key].report_reasons['1'];
                            unread[i].report_reasons.r2 = reportItem[key].report_reasons['2'];
                            unread[i].report_reasons.r3 = reportItem[key].report_reasons['3'];
                            unread[i].report_reasons.r4 = reportItem[key].report_reasons['4'];
                            unread[i].report_reasons.r5 = reportItem[key].report_reasons['5'];
                            unread[i].report_reasons.r6 = reportItem[key].report_reasons['6'];
                            unread[i].report_reasons.r7 = reportItem[key].report_reasons['7'];
                            unread[i].report_reasons.r8 = reportItem[key].report_reasons['8'];
                            i = i+1;
                        }
                    } else {
                        this.$message.console.error(response.data.error_msg);
                    }
                });
            }
        },
        computed: {
            unreadNum(){
                return this.unread.length;
            }
        },
        mounted() {
            if (!this.istest) {
                this.getReportInfo();
            }
        },
    }

</script>

<style>
.handle-row{
    margin-top: 30px;
}
</style>

