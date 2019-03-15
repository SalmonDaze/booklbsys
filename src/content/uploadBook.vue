 <template>
     <div class='upload_container'>
        <label>书名：</label><el-input v-model="title" placeholder="请输入书名"></el-input>
     </div>
 </template>
 <script>
 export default {
     data() {
         return{
             title: '',
             author: '',
             borrowCycle: '',
         }
     }
 }
 </script>
 <style>
 .upload_container {
    width: 800px;
    height: 600px;
    background: skyblue;
    position: absolute;
    top: 120px;
    left: 220px;
 }
 </style>
 