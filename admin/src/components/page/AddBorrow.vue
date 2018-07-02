<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="用户名">
                        <el-input v-model="form.borrowname"></el-input>
                    </el-form-item>
                    <el-form-item label="ISBN">
                        <el-input v-model="form.ISBN"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                        <el-button @click="onClear">清空</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        data: function(){
            return {
                form: {
                    borrowname: '',
                    ISBN: '',
                },
            }
        },
        methods: {
            onSubmit() {
                var getBid;
                this.$axios.get('/manager_app/inventory_management/', {
                    params: {
                        key: this.form.ISBN
                    }
                })
                .then((response)=>{
                    if (response.data.status == 'success') {
                        const msgItem = JSON.parse(response.data.msg);
                        var hasBook = false;
                        for (var key in msgItem) {
                            const msgInner = JSON.parse(msgItem[key]);
                            if (msgInner.ISBN == this.form.ISBN) {
                                getBid = key;
                                hasBook = true;
                                var newmsgItem = {
                                    username: this.form.borrowname,
                                    bid: getBid
                                }
                                newmsgItem = JSON.stringify(newmsgItem);
                                this.$axios.post('/manager_app/debit/', this.$qs.stringify({
                                    msg: newmsgItem
                                }))
                                .then((response)=>{
                                    if (response.data.status == 'success') {
                                        this.$message.success('借阅成功！');
                                    } else {
                                        this.$message.error(response.data.error_msg);
                                    }
                                });
                                break;
                            }
                        }
                        if (!hasBook) this.$message.error('no such book');
                    } else {
                        this.$message.error(response.data.error_msg);
                    }
                })
            },
            onClear() {
                this.form.borrowname = '';
                this.form.ISBN = '';
            }
        }
    }
</script>