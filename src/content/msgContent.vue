<template>
    <div class='msg_content'>
        <el-form label-width="80px">
            <el-form-item label="发信人">
                <el-input readonly></el-input>
            </el-form-item>
            <el-form-item label="收信人">
                <el-input readonly></el-input>
            </el-form-item>
            <el-form-item label>
                <el-input type='textarea' readonly class='msg' rows='12'></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.msg_content {
    position: absolute;
    top: 130px;
    left: 250px;
    width: 600px;
    height: 500px;
}
.msg {
    resize: none;
}
</style>
