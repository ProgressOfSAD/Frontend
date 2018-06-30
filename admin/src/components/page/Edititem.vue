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
                        <el-form-item label="库存">
                            <span>{{ props.row.inventory }}</span>
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
        <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="书目名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="封面">
                <el-upload
                    action="string"
                    class="avatar-uploader"
                    :show-file-list="false"
                    :http-request="setImageUrl">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="作者">
                <el-input v-model="form.author"></el-input>
            </el-form-item>
            <el-form-item label="库存">
                <el-input-number v-model="form.inventory" :min="0" label="库存"></el-input-number>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-if="ready" v-model="form.types" multiple placeholder="请选择">
                    <el-option v-for="option in options" 
                            :key="option.value"
                            :value="option.value" ></el-option>
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
            imageName: '',
            imageUrl: '',
            ready: false,
            isTableShow: false,
            options: [],
            select_word: '',
            editVisible: false,
            form: {
                cover: '',
                name: '',
                author: '',
                brief: '',
                ISBN: '',
                publish_time: '',
                press: '',
                contents: '',
                types: []
            },
            tableData: [],
            /*tableData: [{
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
            }]*/
        }
    },
    methods: {
        // 保存编辑
        handleEdit(index, row) {
            this.idx = index;
            const item = this.tableData[index];
            this.form = {
                cover: item.cover,
                name: item.name,
                author: item.author,
                brief: item.brief,
                ISBN: item.ISBN,
                publish_time: item.publish_time,
                press: item.press,
                contents: item.contents,
                inventory: item.inventory,
                types: item.types
            }
            this.editVisible = true;
            this.imageName = item.cover;
            this.imageUrl = '/static/img/' + this.imageName;
        },
        saveEdit() {
            var typeItem = {
            };
            var i = 1;
            for (var key in this.form.types) {
                typeItem["" + i] = this.form.types[key];
                i = i + 1;
            }
            var msgItem = {
                    'cover': this.imageName,
                    'name': this.form.name,
                    'author': this.form.author,
                    'brief': this.form.brief,
                    'ISBN': this.form.ISBN,
                    'publish_time': this.form.publish_time,
                    'press': this.form.press,
                    'contents': this.form.contents,
                    'inventory': this.form.inventory,
                    'types': JSON.stringify(typeItem)
            };
            msgItem = JSON.stringify(msgItem);
            this.$axios.post('/manager_app/inventory_management/', this.$qs.stringify({
                    'protocol': '1',
                    'msg': msgItem
            }))
            .then((response)=>{
                if (response.data.status == 'success') {
                    this.$message.success('修改成功！');
                    this.$set(this.tableData, this.idx, this.form);
                    this.tableData[this.idx].cover = this.imageName;
                    this.editVisible = false;
                    this.imageName = '';
                    this.imageUrl = '';
                } else {
                    this.$message.error(response.data.error_msg);
                }
            })
        },
        getSearchItem() {
            if (this.select_word == '') {
                this.$message.error('搜索关键字不能为空！');
                return;
            }
            this.isTableShow = false;
            this.tableData = [];
            this.$axios.get('/manager_app/inventory_management/', {
                params: {
                    key: this.select_word
                }
            })
            .then((response)=>{
                if (response.data.status == 'success') {
                    const msgItem = JSON.parse(response.data.msg);
                    console.log(msgItem);
                    var i = 0;
                    for (var key in msgItem) {
                        var msgItemkey = JSON.parse(msgItem[key]);
                        var typeItem = JSON.parse(msgItemkey.types);
                        var j = 0;
                        var msgTypes = [];
                        for (var typekey in typeItem) {
                            msgTypes[j] = typeItem[typekey];
                            j = j+1;
                        }
                        this.tableData[i] = {
                            id: key,
                            cover: msgItemkey.cover,
                            name: msgItemkey.name,
                            author: msgItemkey.author,
                            brief: msgItemkey.brief,
                            ISBN: msgItemkey.ISBN,
                            publish_time: msgItemkey.publish_time,
                            press: msgItemkey.press,
                            contents: msgItemkey.contents,
                            inventory: msgItemkey.inventory,
                            types: msgTypes,
                        }
                        console.log(this.tableData);
                        i = i+1;
                    }
                    if (i > 0) {
                        this.isTableShow = true;
                    }
                } else {
                    this.$message.error(response.data.error_msg);
                }
            })
        },
        getTypes() {
                this.ready = false;
                this.$axios.get('/manager_app/type_management/')
                .then((response)=>{
                    if (response.data.status == 'success') {
                        var msgItem = JSON.parse(response.data.msg);
                        var i = 0;
                        for (var key in msgItem) {
                            this.options[i] = {
                                value: msgItem[key]
                            };
                            i = i+1;
                        }
                        console.log(this.options);
                        this.ready = true;
                    } else {
                        this.$message.error(response.data.error_msg);
                    }
                })
        },
        setImageUrl(param) {
            this.imageName = param.file.name;
            this.imageUrl = '/static/img/' + this.imageName;
            // console.log(this.imageUrl);
        }
    },
    activated() {
        this.getTypes();
    },
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

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        width: 200px;
        height: 200px;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 200px;
        height: 200px;
        line-height: 200px;
        text-align: center;
    }
    .avatar {
        width: 200px;
        height: 200px;
        display: block;
    }
</style>
