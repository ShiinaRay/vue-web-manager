<template>
  <el-container>
    <transition name="el-zoom-in-top">
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogFormVisible"
        size="mini"
        v-show="dialogFormVisible"
        class="transition-box"
      >
        <el-form
          :inline="true"
          :model="addstudent"
          class="demo-form-inline"
          size="mini"
        >
          <!--  :model="addstudent"   与后面 addstudent 文档 单向 动态绑定数据-->
          <el-divider content-position="left">基本信息：</el-divider>
          <el-form-item label="学号:" prop="snumber">
            <el-input
              v-model="addstudent.snumber"
              placeholder="190712xxxx"
              :rules="[
                { required: true, message: '请输入有效学号', trigger: 'blur' },
                {
                  type: 'number',
                  message: '请输入正确的字符',
                  trigger: 'blur,change',
                },
              ]"
            >
            </el-input>
          </el-form-item>
          <el-form-item label="班级:">
            <el-input
              v-model="addstudent.class"
              placeholder="19计算机2班"
            ></el-input>
          </el-form-item>
          <el-form-item label="姓名:">
            <el-input v-model="addstudent.name" placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <el-radio-group
              v-model="addstudent.sex"
              style="margin-left: 40px; margin-right: 40px"
            >
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-divider content-position="left">各科成绩：</el-divider>
          <el-form-item label="web设计:">
            <el-input
              v-model="addstudent.webGrade"
              placeholder="1-100"
              style="width: 80px"
            ></el-input>
          </el-form-item>
          <el-form-item label="数据库:">
            <el-input
              v-model="addstudent.dbGrade"
              placeholder="1-100"
              style="width: 80px"
            ></el-input>
          </el-form-item>
          <el-form-item label="C语言:">
            <el-input
              v-model="addstudent.cGrade"
              placeholder="1-100"
              style="width: 80px"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="close()" size="mini"
            >取消</el-button
          >
          <el-button type="success" @click="addAndUpdateStudent()" size="mini"
            >确定</el-button
          >
        </div>
      </el-dialog>
    </transition>

    <!--  plus update header   style    and  methods:  disuse the method of fetch()  while  use pageUpdate()  -->
    <el-header class="flexHeader">
      <!-- 用全局过滤器实现格式化时间的处理 -->
      <span v-cloak>北京时间：{{ date | dateFormat }}</span>

      <!-- <a href="http://localhost:8081/home"><i class="el-icon-s-home" @click="pageUpdate()">学生成绩信息管理系统</i></a> -->
      <!-- <a href=""><i class="el-icon-s-home" @click="pageUpdate()">学生成绩信息管理系统</i></a> -->
      <!-- 路由导航 守卫 过不去 ? -->
      <!-- @click="pageUpdate()   or   @click=" this.$router.push("/home") "  or   @click="goHome()"  -->
      <!-- main.js 中导入   import './assets/fonts/iconfont.css'  即可使用   -->
      <!-- <i class="iconfont icon-user">当前用户: {{ username }}</i> -->
      <!-- 超链接…… ？  原生 html ？-->
      <!-- 区分 -->
      <!-- <i class="el-icon-s-home" @click="pageUpdate()">学生成绩信息管理系统</i> -->
      <!-- <el-button type="primary" @click="pageUpdate()"><i class="el-icon-s-home">学生成绩信息管理系统</i></el-button>  -->
      <el-button class="home" type="primary" @click="pageUpdate()"
        ><i class="el-icon-s-home"></i>学生成绩信息管理系统</el-button
      >
      <!-- <el-button type="primary" icon="el-icon-s-home" @click="pageUpdate()">学生成绩信息管理系统</el-button> -->
      <i class="el-icon-s-custom">当前用户: {{ username }}</i>

      <el-button type="danger" @click="logout">退出</el-button>
    </el-header>

    <!--plus  update modify format pagestyle   form表单……  详见element ui  -->
    <el-form
      :inline="true"
      :model="xstudent"
      class="demo-form-inline"
      size="mini"
      ref="xstudent"
    >
      <el-form-item
        label="学号"
        prop="snumber"
        :rules="[
          { min: 10, max: 10, message: '请输入10位数字', trigger: 'blur' },
        ]"
      >
        <el-input
          v-model="xstudent.snumber"
          placeholder="精确查询:如190712xxxx"
        ></el-input>
      </el-form-item>

      <el-form-item
        label="姓名"
        prop="name"
        :rules="[
          { min: 0, max: 4, message: '长度不在有效范围内', trigger: 'blur' },
        ]"
      >
        <el-input
          v-model="xstudent.name"
          placeholder="模糊查询:输入名字"
        ></el-input>
      </el-form-item>
      <!-- <el-alert calss="alert" show-icon title="注意：参数！" type="default" :closable="false"></el-alert> -->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="onSubmit('xstudent')"
          >查询</el-button
        >
        <!-- plus: add icon -->
      </el-form-item>

      <div>
        <el-form-item>
          <el-button type="success" @click="add()">录入学生信息</el-button>
        </el-form-item>

        <el-form-item>
          <el-button round type="warning" @click="player()"
            >媒体播放器</el-button
          >
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="upload()"
            >文件管理<i class="el-icon-upload el-icon--right"></i
          ></el-button>
          <!-- plus: add icon -->
        </el-form-item>

        <el-form-item>
          <el-button round type="success" @click="articles()"
            >文章管理</el-button
          >
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="charts()">数据可视化</el-button>
        </el-form-item>
      </div>

      <div>
        <!-- <el-form-item> -->
        <!-- <el-button round type="warning" @click="listchart()">图表展示</el-button> -->
        <!-- </el-form-item> -->
        <!-- <el-form-item> -->
        <!-- <el-button round type="warning" @click="listback()">成绩列表</el-button> -->
        <!-- </el-form-item> -->
      </div>
    </el-form>

    <el-main>
      <!-- 这里不要把所有的列的width都设置，要不然会出现空白的列，是由组件自动填充的 -->
      <!--  :data="studentList"  -->
      <el-table :data="studentList" border style="width: 100%" stripe>
        <el-table-column
          fixed
          prop="snumber"
          label="学号"
          width="170"
          style="text-align: center; justify-content: center"
        >
        </el-table-column>
        <el-table-column prop="class" label="班级"> </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="sex" label="性别"> </el-table-column>
        <el-table-column
          prop="webGrade"
          label="web设计"
          :rules="[
            { min: 0, max: 3, message: '长度不在有效范围内', trigger: 'blur' },
          ]"
        >
        </el-table-column>
        <el-table-column prop="dbGrade" label="数据库"> </el-table-column>
        <el-table-column prop="cGrade" label="C语言"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row._id)" type="primary" size="mini"
              >修改</el-button
            >
            <el-button @click="remove(scope.row._id)" type="danger" size="mini"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>

    <el-footer>
      <!-- 页码： -->
      <!-- <div float="left" style="font-size:12px;color:info">一共有{{page.total}}条记录</div> -->
      <div class="block" style="text-align: center; margin-top: 10px">
        <el-pagination
          @current-change="currentChange"
          layout="total, prev, pager, next"
          :page-size="page.size"
          :current-page="page.current"
          :total="page.total"
        >
        </el-pagination>
      </div>
      <!-- <div id="main" style="width: 100%; height: 400px"></div> -->
    </el-footer>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      date: new Date(),
      radio: true,
      studentList: [],
      xstudent: {
        snumber: "",
        name: "",
      },
      dialogTitle: "",
      dialogFormVisible: false,
      addstudent: {},
      formLabelWidth: "120px",
      //分页：
      page: {
        current: 1,
        size: 10,
        total: 0,
      },
      rules: {
        // "xstudent.snumber": [
        //   {required: true, message: '学号不可为空', trigger: 'blur'},
        //   {type:'number',message:'输入数字字符',trigger:'blur'}
        // ],

        name: [{ required: true, message: "姓名不可为空", trigger: "blur" }],
      },
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

  // watch: {
  //   TimeIntervalNumberData: {
  //     handler(newVal, oldVal) {
  //       console.log("修改了数据")
  //       this.setOption();
  //     },
  //     deep: true,
  //   },
  // },
  methods: {
    //plus confirm
    logout() {
      this.$confirm("确定退出?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.sessionStorage.clear();
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
    listback() {
      let that = this;
      this.$http
        .get("studentList?currentPage=" + 1 + "&pageSize=" + 10)
        .then((res) => {
          console.log("返回的数据：");
          console.log(res.data);

          that.studentList = res.data.data;
          that.page.total = res.data.total;
          that.page.current = 1;
        });
    },
    charts() {
      this.$router.push("/echarts");
    },
    //无分页显示学生成绩列表：
    fetch() {
      // this.$http.get('getStudentList').then(res=>{
      //   console.log('返回的数据：')
      //   console.log(res.data)
      //   this.studentList = res.data
      // });
      this.xstudent.name = "";
      this.page.current = 1;
      this.pageUpdate();
    },
    //录入学生：
    add() {
      this.dialogTitle = "录入学生信息";
      this.dialogFormVisible = true;
    },
    addStudent() {
      this.$http.post("students", this.addstudent).then(() => {
        //清空录入框信息：
        this.addstudent = {};
        //隐藏录入框：
        this.dialogFormVisible = false;
        this.$message({
          message: "录入成功",
          type: "success",
        });
        this.page.current = 1;
        this.pageUpdate();
      });
    },
    //删除学生：
    // this.page.current = 1;

    // remove(id) {
    // this.$http.delete(`students/${id}`).then(() => {
    // this.$message({
    // message: "删除学生信息成功",
    // type: "success",
    // });
    // this.pageUpdate();
    // });
    // },
    //plus1
    remove(id) {
      this.$confirm("确定删除这条学生信息?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$http.delete(`students/${id}`).then(() => {
            this.$message({
              message: "删除学生信息成功",
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
    //修改学生：
    edit(id) {
      this.id = id;
      this.dialogTitle = "修改学生信息";
      this.$http.get(`update/${id}`).then((res) => {
        this.addstudent = res.data;
        this.dialogFormVisible = true;
      });
    },
    ConfirmUpdateStudent(id) {
      this.$http.put(`confirmUpdate/${id}`, this.addstudent).then(() => {
        this.dialogFormVisible = false;
        this.$message({
          message: "更新成功",
          type: "success",
        });
        this.addstudent = {};
        // this.page.current = 1;
        this.pageUpdate();
      });
    },
    //录入和修改：
    addAndUpdateStudent() {
      this.dialogFormVisible = false;
      if (this.dialogTitle == "录入学生信息") {
        this.addStudent();
      } else {
        this.ConfirmUpdateStudent(this.id);
      }
    },
    //关闭模态框：
    close() {
      if (this.dialogTitle == "修改学生信息") {
        this.addstudent = {};
      }
      this.dialogFormVisible = false;
    },
    onSubmit(ruleForm) {
      if (
        (this.xstudent.snumber != "" && this.xstudent.name == "") ||
        (this.xstudent.snumber != "" && this.xstudent.name != "")
      ) {
        console.log(this.xstudent.snumber);
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            //根据学号精确查询：
            this.$http
              .get(`findBySnumber/${this.xstudent.snumber}`)
              .then((res) => {
                console.log("学号查询");
                this.studentList = res.data;
                this.xstudent.snumber = "";
                this.page.total = 0;
              });
          } else {
            this.message("请输入10位数字学号", "error");
            return false;
          }
        });
      } else if (this.xstudent.snumber == "" && this.xstudent.name != "") {
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            console.log("姓名查询");
            //根据姓名模糊查询：
            this.$http
              .get(
                "findByName?currentPage=" +
                  this.page.current +
                  "&pageSize=" +
                  this.page.size +
                  "&names=" +
                  this.xstudent.name
              )
              .then((res) => {
                console.log("姓名模糊分页查询结果：");
                console.log(res.data);
                console.log(res.data.total);
                this.studentList = res.data.data;
                this.page.total = res.data.total;
              });
          } else {
            this.message("无效字符", "warning");
            return false;
          }
        });
      } else {
        if (this.xstudent.snumber == "" && this.xstudent.name == "") {
          this.message("请输入有效字符", "error");
          return;
        }
      }
    },
    //消息通知框：
    message(messages, mtype) {
      this.$message({
        message: messages,
        type: mtype,
      });
    },

    pageUpdate() {
      let that = this;
      //每次点击更改页码值
      this.$http
        .get(
          "studentList?currentPage=" +
            that.page.current +
            "&pageSize=" +
            that.page.size
        )
        .then((res) => {
          if (res.data.data == null || res.data.data.length == 0) {
            //除第一页的其他某页全都删除了的情况：
            that.page.current = that.page.current - 1;
            that.pageUpdate();
          } else {
            that.studentList = res.data.data;
            that.page.total = res.data.total;
          }
        });
    },
    currentChange(current) {
      console.log(current);
      this.page.current = current;
      //姓名模糊查询的分页：
      if (this.xstudent.name != "") {
        this.$http
          .get(
            "findByName?currentPage=" +
              this.page.current +
              "&pageSize=" +
              this.page.size +
              "&names=" +
              this.xstudent.name
          )
          .then((res) => {
            console.log("姓名模糊分页查询结果：");
            console.log(res.data);
            this.studentList = res.data.data;
            this.page.total = res.data.total;
          });
        return;
      }
      this.pageUpdate();
    },
    player() {
      //this.$router.push({ path: "/player" });      一样？
      this.$router.push("/player");
    },

    upload() {
      this.$router.push("/upload");
    },
    articles() {
      this.$router.push("/article");
    },
  },
};
</script>



<style lang="less" scoped>
//plus   
//.flexHeader {
  //display: flex;
  //justify-content: space-between;
  //align-items: center;
  //font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;  //有些元素应用不上？ 非原生？
  //font-family: sans-serif;  //default
  //font-family:'Times New Roman', Times, serif;
//}


.el-icon-s-home {
  color: rgb(252, 128, 200);
  // text-decoration: none;
}
.el-icon-s-home:hover {
  text-decoration: underline;
  background-color: rgb(123, 198, 228);
  // border-radius: 50%;
  border-radius: 10px;
}

.flexHeader .el-icon-s-custom {
  // position:absolute;
  // position: relative;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif; // 没用？  怎么修改字体样式？    要原生 html css button ？
  // margin:auto;
}

.el-footer {
  text-align: center;
}
.el-header {//  element ui  自带的container  css  ？   el-header无效果     为什么 这里  .不表示class 属性    而表示元素标签？
  /* background-color: lightpink; */
  // background-color: rgb(248, 226, 229);
  /* background-color: #f0f9eb; */
  background-color: rgb(247, 232, 253);
}
// el-form {
  // text-align: center;
  // justify-content: center;
// }
//为什么 这里  .不表示class 属性     element ui  自带的css  ？
.el-form {
  text-align: center;
  justify-content: center;
}
// .demo-form-inline {
  // text-align: center;
  // justify-content: center;
// }
</style>


<style lang="less">
//plus   
body {
  margin-top: 0px;
  margin-left: 0px;
  margin-right: 0px;
  /* background-color: lightskyblue; */
  background-color: rgb(192, 229, 252);
}

// .flexHeader.home  区分 .flexHeader .home
.flexHeader .home {
  // position: absolute;
  // position: relative;   // default ?
  //left:850px;//左边空xxxpx
  //font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;// 没用？  怎么修改字体样式？    要原生 html css button ？
  margin: auto;
}
.flexHeader {
  display: flex;
  align-items: center;
}
</style>