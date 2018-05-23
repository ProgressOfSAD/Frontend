<template>
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
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
                        <el-input type="textarea" rows="3" v-model="form.brief"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">表单提交</el-button>
                        <el-button>取消</el-button>
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
                form: {
                    name: '',
                    author: '',
                    brief: '',
                    ISBN: '',
                    publish_time: '',
                    press: '',
                    contents: '',
                    types: []
                }
            }
        },
        methods: {
            onSubmit() {
                this.$message.success('提交成功！');
            }
        }
    }
</script>