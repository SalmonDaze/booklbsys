<template>
    <div class='msg_content'>
        <el-form label-width="80px">
            <el-form-item label="收信人">
                <el-input v-model='recipient'></el-input>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model='title'></el-input>
            </el-form-item>
            <el-form-item label>
                <el-input type='textarea' class='msg' rows='12' v-model='content'></el-input>
            </el-form-item>
            <el-button plain type='primary' class='reply' @click='sendMsg'>发送</el-button>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            recipient: '',
            title: '',
            content: '',
        }
    },
    methods: {
        sendMsg() {
            this.$ajax({
                url: '/api/sendMsg',
                method: 'post',
                data: {
                    _id: this.$store.state.user._id,
                    phone: this.recipient,
                    content: this.content,
                    title: this.title
                }
            }).then( res => {
                this.$socket.emit('sendMsg', this.recipient)
                if(!res.data.success) {
                    this.$message.error(res.data.msg)
                } else {
                    this.$message.success(res.data.msg)
                    setTimeout(() => {
                        window.location.reload()
                    }, 100000)
                }
            })
        }
    },
    created() {
        this.recipient = this.$route.query.to || ''
    },
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
