<template>
  <div class="manage-box">
    <nav>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item v-text="'文章管理'"></el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
    <div class="option-box">
      <el-button-group class="option-box">
        <el-button type="primary" @click="refreshList(currPage, true)" :loading="loading">刷新列表</el-button>
        <el-button type="primary" @click="$router.push({path: '/content/new-article'})">新建文章</el-button>
      </el-button-group>
    </div>
    <el-table class="my-table" :data="tableData" border stripe>
      <el-table-column prop="article_id" label="编号" width="60px" align="center"></el-table-column>
      <el-table-column prop="article_title" label="标题"></el-table-column>
      <el-table-column prop="article_date" label="发布日期"></el-table-column>
      <el-table-column prop="click_count" label="点击量" width="100px"></el-table-column>
      <el-table-column prop="comment_count" label="评论数量" width="100px"></el-table-column>
      <el-table-column prop="categoryName" label="分类">
        <template slot-scope="scope" align="center">
          <el-tag type="primary" disable-transitions>{{scope.row.category.category_name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        tableData: [],
        pageSize: 10,
        total: 0,
        currPage: 1
      }
    },
    created() {
      this.refreshList();
    },
    methods: {
      refreshList() {
        this.loading = true;
        this.$api.listArticles().then(response => {
          if (response.status && response.status === 200) {
            this.tableData = response.data;
            this.tableData.forEach(item => {
              item.article_date = new Date(item.article_date).format("yyyy-MM-dd hh:mm:ss")
            });
          } else {
            this.$message.error("文章列表获取失败!");
          }
          this.loading = false;
        })
      },
      handleEdit(row) {
        this.$router.push({name: "新建文章", params: {id: row.article_id}});
      },
      handleDelete(row) {
        this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.deleteArticle(row.article_id).then(response => {
            if (response.status && response.status === 200) {
              this.$message.success("删除成功！");
            } else {
              this.$message.error("删除失败!");
            }
            this.refreshList();
          });
        }).catch(() => {
        });
      }
    }
  }
</script>

<style scoped>
  .manage-box {
    margin:0 20px;
    transition: all .3s
  }

  nav {
    margin-bottom: 20px;
  }

  .option-box {
    background-color: #fff;
    padding: 4px;
  }
</style>
