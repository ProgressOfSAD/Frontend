<template>
<div class="table">
    <div class="container">
        <div class="handle-box">
            <el-input v-model="select_word" placeholder="搜索关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="getSearchItem()">搜索</el-button>
        </div>
        <el-table v-if="isTableShow" :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="书目名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="作者">
                            <span>{{ props.row.author }}</span>
                        </el-form-item>
                        <el-form-item label="ISBN">
                            <span>{{ props.row.ISBN }}</span>
                        </el-form-item>
                        <el-form-item label="出版社">
                            <span>{{ props.row.press }}</span>
                        </el-form-item>
                        <el-form-item label="出版时间">
                            <span>{{ props.row.publish_time }}</span>
                        </el-form-item>
                        <el-form-item label="简介">
                            <span>{{ props.row.brief }}</span>
                        </el-form-item>
                        <el-form-item label="目录">
                            <span>{{ props.row.contents }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>

            <el-table-column prop="name" label="书目名称" width="180">
            </el-table-column>
            <el-table-column prop="author" label="作者" width="180">
            </el-table-column>
            <el-table-column prop="ISBN" label="ISBN">
            </el-table-column>
            <el-table-column prop="press" label="出版社">
            </el-table-column>
            <el-table-column prop="publish_time" label="出版时间">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
        <el-form ref="form" :model="form" label-width="50px">
            <el-form-item label="书目名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="作者">
                <el-input v-model="form.author"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="form.types" multiple placeholder="请选择">
                    <el-option v-for="option in options" 
                        :key="option.value" 
                        :label="option.label" 
                        :value="option.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="简介">
                <el-input type="textarea" rows="3" v-model="form.brief"></el-input>
            </el-form-item>
            <el-form-item label="ISBN">
                <el-input v-model="form.ISBN"></el-input>
            </el-form-item>
            <el-form-item label="出版社">
                <el-input v-model="form.press"></el-input>
            </el-form-item>
            <el-form-item label="出版时间">
                <el-input v-model="form.publish_time"></el-input>
            </el-form-item>
            <el-form-item label="目录">
                <el-input type="textarea" rows="3" v-model="form.contents"></el-input>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
    </el-dialog>

</div>
</template>

<script>
export default {
    data() {
        return {
            options: [
                {
                    value: '0',
                    label: '文学'
                },
                {
                    value: '1',
                    label: '教育'
                },
                {
                    value: '2',
                    label: '金融'
                },
                {
                    value: '3',
                    label: '计算机'
                },
                {
                    value: '4',
                    label: '经管'
                }
            ],
            select_word: '',
            editVisible: false,
            tableLen: 1,
            form: {
                name: '',
                author: '',
                brief: '',
                ISBN: '',
                publish_time: '',
                press: '',
                contents: '',
                types: []
            },
            tableData: [{
                id: '',
                name: '五年高考三年模拟',
                author: '曲一线',
                brief: '寄快递那边VS v v VS VS VS VS VS VS VS VS VS VS v',
                ISBN: '1111111111111111111111111111111',
                publish_time: '1980-01-21',
                press: '曲一线出版社',
                contents: '范德萨范德萨防守对方的vv房贷首付是',
                types: []
            }, {
                id: '',
                name: '法大师傅大师傅收到',
                author: '法大师傅大师傅',
                brief: '反对犯得上',
                ISBN: '法大师傅士大夫大师傅',
                publish_time: '犯得上发射点发射点发射点犯得上',
                press: '反倒是范围范围v我',
                contents: '犯得上犯得上发射点废物废物',
                types: []
            }, {
                id: '',
                name: '法大师傅士大夫违法v哥特人哥哥',
                author: '都i群文件都i去忘记哦i顶级武器',
                brief: '犬瘟热物权法测微器陈乔恩',
                ISBN: '父亲为非v为v维尔v',
                publish_time: '的身份物权法测得的我',
                press: '付水电费我去侧王妃的队伍',
                contents: '房费未付未付从威风威风威风威风',
                types: []
            }, {
                id: '',
                name: '范德萨范德萨v侧王妃策恶策问财务',
                author: '犯得上发射点纷纷威风威风威风威风',
                brief: '房贷首付测网侧王妃微风威锋网',
                ISBN: '幅度萨芬我从未发的威风威风威风',
                publish_time: '分段收费为侧我的法文德文法文',
                press: '纷纷威风威风威风威风',
                contents: '非法违法我v和港台日韩天热过热',
                types: []
            }]
        }
    },
    methods: {
        // 保存编辑
        handleEdit(index, row) {
            this.idx = index;
            const item = this.tableData[index];
            this.form = {
                name: item.name,
                author: item.author,
                brief: item.brief,
                ISBN: item.ISBN,
                publish_time: item.publish_time,
                press: item.press,
                contents: item.contents,
                types: item.types
            }
            this.editVisible = true;
        },
        saveEdit() {
            this.$set(this.tableData, this.idx, this.form);
            this.editVisible = false;

            var msgItem = {
                    'cover': '',
                    'name': this.form.name,
                    'author': this.form.author,
                    'brief': this.form.brief,
                    'ISBN': this.form.ISBN,
                    'publish_time': this.form.publish_time,
                    'press': this.form.press,
                    'contents': this.form.contents,
                    'inventory': '',
                    'types': this.form.types
            };
            msgItem = JSON.stringify(msgItem);
            this.$axios.post('/manager_app/inventory_management', {
                    'protocol': '1',
                    'msg': msgItem
            })
            .then((response)=>{
                if (response.status == 'success') {
                    this.$message.success('修改成功！');
                } else {
                    this.$message.error(response.error_msg);
                }
            })
        },
        getSearchItem() {
            this.$axios.get('/manager_app/inventory_management', {
                params: {
                    key: this.select_word
                }
            })
            .then((response)=>{
                if (response.status == 'success') {
                    const msgItem = JSON.parse(response.msg);
                    var i = 0;
                    for (var key in msgItem) {
                        tableData[i].id = key;
                        tableData[i].cover = msgItem[key].cover;
                        tableData[i].name = msgItem[key].name;
                        tableData[i].author = msgItem.author;
                        tableData[i].brief = msgItem.brief;
                        tableData[i].ISBN = msgItem.ISBN;
                        tableData[i].publish_time = msgItem.publish_time;
                        tableData[i].press = msgItem.press;
                        tableData[i].contents = msgItem.contents;
                        tableData[i].types = msgItem.types;
                        i = i+1;
                    }
                } else {
                    this.$message.error(response.error_msg);
                }
            })
        }
    },

    computed: {
        isTableShow(){
            return this.tableLen > 0;
        }
    }
}

</script>

<style>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
</style>
