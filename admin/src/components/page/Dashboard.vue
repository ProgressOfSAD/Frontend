<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8">
                <el-row>
                    <el-col>
                        <el-card shadow="hover" class="mgb20">
                            <div class="user-info">
                                <img src="static/img/adminAva.jpg" class="user-avator" alt="">
                                <div class="user-info-cont">
                                    <div class="user-info-name">{{name}}</div>
                                    <div>{{role}}</div>
                                </div>
                            </div>
                            <div class="user-info-list">性别：   <span>{{gender}}</span></div>
                            <div class="user-info-list">邮箱： <span>{{email}}</span></div>
                            <div class="user-info-list">电话： <span>{{phonenum}}</span></div>
                            <div class="user-info-list">简介： <span>{{other}}</span></div>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                istest: false,
                name: localStorage.getItem('ms_username'),
                gender: '男',
                email: 'admin@sad.com',
                phonenum: '123456789',
                other: 'Hello!'
            }
        },
        computed: {
            role() {
                return '管理员';
            }
        },
        activated() {
            if (!this.istest) {
                this.getUserInfo();
            }
        },
        methods: {
            getUserInfo() {
                this.$axios.get('/manager_app/manager_info/')
                .then((response)=>{
                    if (response.data.status == 'success') {
                        const infoItem = JSON.parse(response.data.msg);
                        this.name = infoItem.username;
                        this.gender = infoItem.gender;
                        this.email = infoItem.email;
                        this.phonenum = infoItem.phone;
                        this.other = infoItem.other;
                    } else {
                        this.$message.error(response.data.error_msg);
                        
                    }
                });
            }
        }
    }

</script>


<style scoped>
    .el-row {
        margin-bottom: 20px;
    }

    .grid-content {
        display: flex;
        align-items: center;
        height: 100px;
    }

    .grid-cont-right {
        flex: 1;
        text-align: center;
        font-size: 12px;
        color: #999;
    }

    .grid-num {
        font-size: 30px;
        font-weight: bold;
    }

    .grid-con-icon {
        font-size: 50px;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        color: #fff;
    }

    .grid-con-1 .grid-con-icon {
        background: rgb(45, 140, 240);
    }

    .grid-con-1 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-2 .grid-con-icon {
        background: rgb(100, 213, 114);
    }

    .grid-con-2 .grid-num {
        color: rgb(45, 140, 240);
    }

    .grid-con-3 .grid-con-icon {
        background: rgb(242, 94, 67);
    }

    .grid-con-3 .grid-num {
        color: rgb(242, 94, 67);
    }

    .user-info {
        display: flex;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #ccc;
        margin-bottom: 20px;
    }

    .user-avator {
        width: 120px;
        height: 120px;
        border-radius: 50%;
    }

    .user-info-cont {
        padding-left: 50px;
        flex: 1;
        font-size: 14px;
        color: #999;
    }

    .user-info-cont div:first-child {
        font-size: 30px;
        color: #222;
    }

    .user-info-list {
        font-size: 14px;
        color: #999;
        line-height: 25px;
    }

    .user-info-list span {
        margin-left: 70px;
    }

    .mgb20 {
        margin-bottom: 20px;
    }

    .todo-item {
        font-size: 14px;
    }

    .todo-item-del {
        text-decoration: line-through;
        color: #999;
    }

</style>
