<template>
<div class="table">
    <div class="container">
        <div class="handle-box">
            <el-input v-model="select_word" placeholder="搜索用户名" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="getSearchReturn">搜索</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="借阅用户">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="书目名称">
                            <span>{{ props.row.bookname }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>

            <el-table-column prop="name" label="借阅用户" width="180">
            </el-table-column>
            <el-table-column prop="bookname" label="书目名称">
            </el-table-column>
            
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleReturn(scope.$index, scope.row)">归还</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <el-dialog title="确认归还信息" :visible.sync="editVisible" width="30%">
        <span>
            <div>借阅用户：<el-tag>{{form.name}}</el-tag></div>
            <br>
            <div>书籍名称：<el-tag type="success">{{form.bookname}}</el-tag></div>
            <br>
        </span>
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
            select_word: '',
            editVisible: false,
            tableLen: 1,
            form: {
                id: '',
                name: '',
                bookname: '',
                ISBN: '',
            },
            tableData: [{
                name: 'zhangsan',
                bookname: '五年高考三年模拟',
            }, {
                name: 'lisi',
                bookname: '法大师傅大师傅收到',
            }]
        }
    },
    methods: {
        // 保存编辑
        handleReturn(index, row) {
            this.idx = index;
            const item = this.tableData[index];
            this.form = {
                name: item.name,
                bookname: item.bookname,
            }
            this.editVisible = true;
        },
        saveEdit() {
            this.$set(this.tableData, this.idx, this.form);
            this.editVisible = false;
            const item = this.tableData.splice(this.idx, 1);

            this.$axios.post('/manager_app/return', {
                rid: this.form.id
            })
            .then((response)=>{
                if (response.status == 'success') {
                    this.$message.success(`归还成功`);
                } else {
                    this.$message.success(response.error_msg);
                }
            }); 
        },
        getSearchReturn() {
            this.$axios.get('/manager_app/return', {
                params: {
                    username: this.form.name
                }
            })
            .then((response)=> {
                if (response.status == 'success') {
                    const msgItem = JSON.parse(response.msg);
                    var i = 0;
                    for (var key in msgItem) {
                        tableData[i].id = key;
                        tableData[i].name = msgItem[key].username;
                        tableData[i].bookname = msgItem[key].book;
                        i = i+1;
                    }
                } else {
                    this.$message.error(response.error_msg);
                }
            });
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
