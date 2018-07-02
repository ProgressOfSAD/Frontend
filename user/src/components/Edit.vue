<template>  
    <div class="app-container">  
        <div>  
            <!-- 组件有两个属性 value 传入内容双向绑定 setting传入配置信息 -->  
            <editor class="editor" :value="content"  :setting="editorSetting" @input="(content)=> this.content = content"></editor>  
        </div>
        <Button @click="submit">提交</Button>
    </div>
</template>  
  
<script>  
    import editor from '@/components/editor'  
  
  
    export default {  
        name: "editor-demo",  
        data: function () {  
            return {  
                content:'我是富文本编辑器的内容',  
                //tinymce的配置信息 参考官方文档 https://www.tinymce.com/docs/configure/integration-and-setup/  
                editorSetting:{  
                    height:400,  
                }
            }  
        },
        components:{  
            'editor':editor  
        },
        methods: {
            submit() {
                console.log(this.content)
            }
        }
    }  
</script>  
  
<style scoped>  
.app-container {
    padding: 10px 50px 0 50px
}
</style>  