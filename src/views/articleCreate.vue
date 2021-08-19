<template>
  <el-container>
    <el-header class="flexHeader">
      <!-- 用全局过滤器实现格式化时间的处理 -->
      <!-- plus -->
      <span v-cloak>北京时间：{{ date | dateFormat }}</span>
      <el-button class="home" type="primary" @click="pageUpdate()"
        ><i class="el-icon-document"></i>文章管理</el-button
      >
      <el-dropdown>
        <el-button type="primary">
          更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>文章列表</el-dropdown-item>
          <el-dropdown-item>创建文章</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <i class="el-icon-s-custom">当前用户: {{ username }}</i>
      <el-button type="success" @click="backhome">返回</el-button>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-menu router="['1', '3']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-menu"></i>文章管理</template
            >
            <el-menu-item-group>
              <el-menu-item index="/article">文章列表</el-menu-item>
              <el-menu-item index="/article/create">创建文章</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-main>
        <el-form
          @submit.native.prevent
          ref="form"
          :model="article"
          label-width="80px"
        >
          <el-form-item label="文章标题">
            <el-input v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="文章内容">
            <el-input
              autosize="true"
              type="textarea"
              v-model="article.body"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit" @click="saveArticle"
              >立即创建</el-button
            >
            <el-button @click="back">取消</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </el-container>
</template>




<script>
export default {
  data() {
    return {
      username: "",
      date: new Date(),
      article: {
        title: "",
        body: "",
      },
      articleList: [],
    };
  },
  created() {
    // this.fetch();
    this.username = window.sessionStorage.getItem("username");
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
    backhome() {
      // this.$router.go(-1);
      this.$router.push("/home");
    },
    back() {
      this.$router.go(-1);
    },

    saveArticle() {
      this.$http.post("article", this.article).then(() => {
        this.$message({
          message: "文章创建成功",
          type: "success",
        });
        this.$router.push("/article");
      });
    },
  },
};
</script>


<style scoped>
.el-header {
  background-color: rgb(248, 226, 229);
}
.el-main {
  text-align: center;
  justify-content: center;
}
.el-aside {
  /* background-color: rgb(156, 11, 223);   背景颜色  默认背景颜色会比较好 不突兀*/
  /* 也可直接在前面的el-aside标签中写 style="background-color: rgb(141, 26, 207);" */

  color: rgb(141, 26, 207);
  /* 怎么变色    格式 每个标签代表什么？ */
}
</style>
