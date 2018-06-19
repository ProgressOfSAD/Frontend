<template>
    
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="类型名称">
                        <el-input v-model="form.type"></el-input>
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
                    type: ''
                },
            }
        },
        methods: {
            onSubmit() {
                this.$axios.post('/manager_app/type_management/', this.$qs.stringify({
                    'protocol': '0',
                    'old': '',
                    'new': this.form.type
                }))
                .then((response)=>{
                    if (response.data.status == 'success') {
                        this.$message.success('提交成功！');
                    } else {
                        this.$message.error(response.data.error_msg);
                    }
                })
                
            },
            onClear() {
                this.form.type = '';
            }
        }
    }
</script>