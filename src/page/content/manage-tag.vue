<template>
  <div class="manage-box">
    <nav>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item v-text="'标签管理'"></el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
    <div class="option-box">
      <el-button-group class="option-box">
        <el-button type="primary" @click="refreshList(currPage, true)" :loading="loading">刷新列表</el-button>
        <el-button type="primary" @click="handleNew">新建标签</el-button>
      </el-button-group>
    </div>
    <el-table class="my-table" :data="tableData" border stripe>
      <el-table-column prop="tag_id" label="编号" width="60px" align="center"></el-table-column>
      <el-table-column prop="tag_name" label="名称"></el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope" align="center">
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
    created(){
      this.refreshList();
    },
    methods: {
      refreshList() {
        this.loading = true;
        this.$api.listTags().then(response=>{
          if(response.status && response.status === 200){
            this.tableData = response.data;
          }else{
            this.$message.error("标签列表获取失败!");
          }
          this.loading = false;
        })
      },
      handleNew(){
        this.$prompt('请输入标签名：', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(value.length > 0){
            this.$api.createTag({tag_name: value}).then(response=>{
              if(response.status && response.status===200){
                this.$message.success(`'${value}' 创建成功！`);
              }else{
                this.$message.error(`'${value}' 创建失败！`);
              }
              this.refreshList();
            })
          }
        }).catch(() => {
        });
      },
      handleEdit(row){
        this.$prompt('请输入新的标签名：', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(value.length > 0){
            let data = {
              tag_id: row.tag_id,
              tag_name: value
            };
            this.$api.modifyTag(data).then(response=>{
              if(response.status && response.status===200){
                this.$message.success("修改成功！");
              }else{
                this.$message.error("修改失败！");
              }
              this.refreshList();
            })
          }
        }).catch(() => {
        });
      },
      handleDelete(row){
        this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.deleteTag(row.tag_id).then(response=>{
            if(response.status && response.status===200){
              this.$message.success("删除成功！");
            }else{
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
