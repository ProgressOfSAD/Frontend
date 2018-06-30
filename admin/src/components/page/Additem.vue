<template>
    
    <div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
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
                imageName: '',
                imageUrl: '',
                ready: false,
                options: [],
                /*options: [
                    {
                        value: 'lit',
                    },
                    {
                        value: 'edu',
                    },
                    {
                        value: 'fin',
                    }
                ],*/
                form: {
                    name: '',
                    author: '',
                    brief: '',
                    ISBN: '',
                    publish_time: '',
                    press: '',
                    contents: '',
                    inventory: 0,
                    types: []
                },
            }
        },
        methods: {
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
            onSubmit() {
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
                    'protocol': '0',
                    'msg': msgItem
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
                this.form.name = '';
                this.form.author = '';
                this.form.brief = '';
                this.form.ISBN = '';
                this.form.publish_time = '';
                this.form.press = '';
                this.form.contents = '';
                this.form.types = [];
                this.form.inventory = 0;
                this.imageName = '';
                this.imageUrl = '';
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
