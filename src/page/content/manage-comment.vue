<template>
  <div class="manage-box">
    <nav>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item v-text="'评论管理'"></el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
    <div class="option-box">
      <el-button-group class="option-box">
        <el-button type="primary" @click="refreshList(currPage, true)" :loading="loading">刷新列表</el-button>
      </el-button-group>
    </div>
    <el-table class="my-table" :data="tableData" border stripe>
      <el-table-column prop="comment_id" label="编号" width="60px" align="center"></el-table-column>
      <el-table-column prop="article_title" label="文章"></el-table-column>
      <el-table-column prop="nickname" label="昵称"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column label="操作" width="150px" align="center">
        <template slot-scope="scope">
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
        this.$api.listComments().then(response => {
          if (response.status && response.status === 200) {
            this.tableData = response.data;
            this.tableData.forEach(item => {
              item.date = new Date(item.date).format("yyyy-MM-dd hh:mm:ss")
            });
          } else {
            this.$message.error("评论列表获取失败!");
          }
          this.loading = false;
        })
      },
      handleDelete(row) {
        this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.deleteComment(row.comment_id).then(response => {
            if (response.status && response.status === 200) {
              this.$message.success("删除成功！");
            } else {
              this.$message.error("删除失败！");
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
    margin: 0 10px;
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
