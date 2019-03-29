<template>
    <div class='msg_content'>
        <el-form label-width="80px">
            <el-form-item label="发信人">
                <el-input readonly v-model='sendBy'></el-input>
            </el-form-item>
            <el-form-item label="收信人">
                <el-input readonly v-model='recipient'></el-input>
            </el-form-item>
            <el-form-item label="标题">
                <el-input readonly v-model='title'></el-input>
            </el-form-item>
            <el-form-item label>
                <el-input type='textarea' readonly class='msg' rows='12' v-model='content'></el-input>
            </el-form-item>
            <el-button plain type='primary' class='reply' @click='reply'>回复</el-button>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return{
            sendBy: '',
            recipient: '',
            title: '',
            content: '',
            sendByPhone: ''
        }
    },
    methods: {
        reply() {
            this.$router.push({
                name: 'sendMessage',
                query: {
                    to:this.sendByPhone
                }
            })
        }
    },
    created() {
        this.$ajax({
            url: '/api/getMsgContent',
            method: 'post',
            data: {
                _id: this.$route.params.msgid
            }
        }).then(res => {
            this.sendBy = res.data.data.sendBy.username
            this.recipient = res.data.data.sendTo.username
            this.title = res.data.data.title
            this.content = res.data.data.content
            this.sendByPhone = res.data.data.sendBy.phone
            this.$ajax({
                url: '/api/reciveMsg',
                method: 'post',
                data: {
                    _id: this.$route.params.msgid
                }
            })
        })
    }
}
</script>
<style scoped>
.msg_content {
    position: absolute;
    top: 130px;
    left: 250px;
    width: 600px;
    height: 550px;
}
.msg {
    resize: none;
}
.reply {
    margin-left: 80px;
    width: 100px;
}
</style>
