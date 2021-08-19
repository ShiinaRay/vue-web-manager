<template>
  <el-container>
    <el-header class="flexHeader">
      <!-- 用全局过滤器实现格式化时间的处理 -->
      <!-- plus -->
      <span v-cloak>北京时间：{{ date | dateFormat }}</span>
      <el-button class="home" type="primary" @click="pageUpdate()"
  ><i class="el-icon-folder"></i>文件管理</el-button
>
      <i class="el-icon-s-custom">当前用户: {{ username }}</i>
      <el-button type="success" @click="back">返回</el-button>
    </el-header>
    <el-main>
      <el-upload
        class="upload-demo"
        drag
        :action="$http.defaults.baseURL + 'upload'"
        :on-success="afterUpload"
        multiple
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip"></div>
      </el-upload>

      <!-- http://127.0.0.1:3001/api//upload       Cannot POST /api//upload   请求地址写错了！！！   多了一个/        'upload'        '/upload'   -->
      <!-- Vue.prototype.$http = axios.create({ -->
      <!-- baseURL:'http://127.0.0.1:3001/api/'   根地址有了/  后面不需要加！-->

      <h1 class="tplb">文件列表</h1>
      <el-table :data="fileList" style="width: 100%">
        <el-table-column prop="name" label="文件名称"> </el-table-column>
        <el-table-column prop="url" label="文件（下载）地址"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="remove(scope.row._id)" type="danger" size="mini"
              >删除文件</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <!-- <el-upload -->
    <!-- class="avatar-uploader" -->
    <!-- :action="$http.defaults.baseURL + 'upload'" -->
    <!-- :show-file-list="true" -->
    <!-- :on-success="afterUpload" -->
    <!-- > -->
    <!-- <img v-if="file.url" :src="file.url" class="avatar" /> -->
    <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
    <!-- <div class="sctp">上传文件</div> -->
    <!-- </el-upload> -->
  </el-container>
</template>




<script>
export default {
  data() {
    return {
      username: "",
      date: new Date(),
      file: {
        name: "",
        url: "",
      },
      fileList: [],
    };
  },
  created() {
    // this.fetch();
    this.username = window.sessionStorage.getItem("username");
    this.pageUpdate();
  },
  mounted() {
    var that = this; //声明一个变量指向vue实例this,保证作用域一致
    this.timer = setInterval(function () {
      that.date = new Date() / 1000; //修改数据date
    }, 10);
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); //在vue实例销毁前，清除我们的定时器
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    afterUpload(res) {
      //this.$set(this.file, 'url', res.url); ？？？

      this.file.url = res.url;
      this.file.name = res.name;
      this.pageUpdate(); //pageUpdate()  无this   ！！！切记 error
      this.$message({
        message: "上传文件成功",
        type: "success",
      });
    },
    pageUpdate() {
      let that = this;
      this.$http.get("getfileList").then((res) => {
        that.fileList = res.data;
        console.log(res); //前端 浏览器 终端控制台 f12 查看 数据的组成
      });
    },

    // remove(id) {
      // this.$http.delete(`files/${id}`).then(() => {
        // this.$message({
          // message: "删除文件成功",
          // type: "success",
        // });
        // this.pageUpdate();
      // });
    // },

    //plus2
    remove(id) {
      this.$confirm("确认删除文件?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.delete(`files/${id}`).then(() => {
            this.$message({
              message: "删除文件成功",
              type: "success",
            });
            this.pageUpdate();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>


<style scoped>
/* .avatar-uploader .el-upload {   上传头像？？？  css  类选择器等   .  ,  等区分 */
/* border: 3px dashed #ebd50f; */
/* border-radius: 6px; */
/* cursor: pointer; */
/* position: relative; */
/* position: absolute; */
/* overflow: hidden; */
/* text-align: center; */
/* } */
/* .avatar-uploader .el-upload:hover { */
/* border-color: #9940ff; */
/* } */
/* .avatar-uploader-icon { */
/* font-size: 30px; */
/* color: #e90606; */
/* width: 200px; */
/* height: 200px; */
/* line-height: 200px; */
/* text-align: center; */
/* } */
/* .avatar { */
/* width: 200px; */
/* height: 200px; */
/* display: block; */
/* } */

.el-header {
  background-color: rgb(248, 248, 226);
}
.el-main {
  text-align: center;
  justify-content: center;
}
.sctp {
  color: rgb(200, 62, 255);
}
.tplb {
  color: rgb(82, 53, 248);
  text-align: center;
}
.upload-demo {
  text-align: center;
}
</style>
