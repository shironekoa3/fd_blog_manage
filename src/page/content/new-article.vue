<template>
  <div class="new-article-box">
    <nav>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        <el-breadcrumb-item v-text="'发布文章'"></el-breadcrumb-item>
      </el-breadcrumb>
    </nav>
    <div class="container">
      <div class="content-main-box">
        <el-input v-model="title" placeholder="添加标题"></el-input>
        <mavon-editor
          :toolbars="toolbars"
          v-model="content"
          :boxShadow="false"
          class="editor-box"
          :scrollStyle="true"
          id="editor"
        ></mavon-editor>
      </div>
      <div class="content-extra-box">
        <div class="release-box">
          <p class="content-extra-title">发布</p>
          <hr/>
          <el-date-picker style="width: 100%" v-model="date" type="datetime" placeholder="选择发布时间"></el-date-picker>
          <div class="release-btn">
            <el-button-group>
              <el-button>预览</el-button>
              <el-button type="primary" @click="releaseArticle" v-text="id>0?'更新':'发布'"></el-button>
            </el-button-group>
          </div>
        </div>
        <div class="tag-box">
          <p class="content-extra-title">标签</p>
          <hr/>
          <el-input placeholder="请输入标签名" v-model="newTagName">
            <template slot="append">
              <el-button type="primary" @click="addTag({tag_id: 0, tag_name: newTagName})">添加</el-button>
            </template>
          </el-input>
          <div>
             <span v-for="(item,i) in tags" :key="i">
              <el-tag style="margin-top: 10px;" closable @close="closeTag(item)">{{item.tag_name}}</el-tag>&nbsp;
            </span>
          </div>
          <div class="all-tags">
            <el-link style="margin-top: 20px;" type="primary" @click="showTags = !showTags">显示标签列表</el-link>
            <div v-show="showTags">
              <span v-for="(item,i) in allTags" :key="i">
                <el-tag style="cursor: pointer; margin-top: 10px;" @click="addTag(item)"
                        v-text="item.tag_name"></el-tag>&nbsp;
              </span>
            </div>
          </div>
        </div>
        <div class="category-box">
          <p class="content-extra-title">分类</p>
          <hr/>
          <el-input placeholder="新的分类" v-model="category.category_name" @input="categoryTextChange()"></el-input>
          <el-button
            style="margin-top: 10px;"
            type="text"
            v-text="item.category_name"
            v-for="(item,i) in allCategories"
            :key="i"
            @click="category.category_name = item.category_name;category.category_id = item.category_id"
          ></el-button>
        </div>
        <div class="other-box">
          <p class="content-extra-title">其他</p>
          <hr/>
          <div>
            <span>评论状态</span>
            <el-switch
              class="my-switch"
              v-model="isComment"
              active-color="#3a8ee6"
              inactive-color="#ccc">
            </el-switch>
          </div>
          <div style="margin-top: 10px;">
            <span>文章置顶</span>
            <el-switch
              class="my-switch"
              v-model="isTop"
              active-color="#3a8ee6"
              inactive-color="#ccc">
            </el-switch>
          </div>
          <div style="margin-top: 10px;">
            <span>文章图片链接</span>
            <el-input v-model="imgUrl" size="mini" placeholder="输入图片链接" style="margin-top: 10px;"/>
            <img :src="imgUrl" alt="" width="100%" style="margin-top: 10px;">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "new-article",
    data() {
      return {
        toolbars: {},
        id: 0,
        title: "",
        date: "",
        content: "",
        newTagName: "",
        showTags: false,
        tags: [],
        allTags: [],
        category: {category_id: 0, category_name: ""},
        existsCategory: {},
        allCategories: [],
        isTop: false,
        isComment: true,
        imgUrl: ""
      }
    },
    mounted() {
    },
    created() {

      this.toolbars = {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true // 预览
      };

      this.$api.listTags().then(response => {
        if (response.status && response.status === 200) {
          this.allTags = response.data;
        } else {
          this.$message.error("标签列表获取失败!")
        }
      });

      this.$api.listCategories().then(response => {
        if (response.status && response.status === 200) {
          this.allCategories = response.data;
        } else {
          this.$message.error("分类列表获取失败!")
        }
      });

      if(this.$route.params.id && this.$route.params.id > 0){
        this.$api.searchArticle(this.$route.params.id).then(response => {
          if (response.status && response.status === 200) {
            console.log(response.data);
            this.id = response.data["article_id"];
            this.title = response.data["article_title"];
            this.date = response.data["article_date"];
            this.content = response.data["content"];
            this.tags = response.data["tagList"];
            this.category = response.data["category"];
            this.category_id = response.data["category_id"];
            this.isTop = response.data["is_top"];
            this.isComment = response.data["comment_status"];
            this.imgUrl = response.data["article_image"];
          } else {
            this.$message.error("文章获取失败!")
          }
        });
      }
    },
    methods: {
      addTag(tag) {
        if (tag.tag_id > 0) {
          if(this.tags.every(item => {return item.tag_id !== tag.tag_id})){
            this.tags.push(tag);
          }
        } else {
          tag.tag_name = tag.tag_name.trim();
          if (
            tag.tag_name.length > 0 &&
            this.tags.every(item => {
              return item.tag_name.toLowerCase() !== tag.tag_name.toLowerCase()
            })
          ) {
            this.tags.push(tag);
          }
          this.newTagName = "";
        }
      },
      closeTag(tag) {
        this.tags.splice(this.tags.indexOf(tag), 1);
      },
      categoryTextChange(){
        if(this.allCategories.every(item=>{return item.category_name !== this.category.category_name})){
          this.category.category_id = 0;
        }
      },
      releaseArticle() {
        if (this.title.trim() === "") {
          this.$message({type: "error", message: "还没写标题呢!"});
        } else if (this.content.trim() === "") {
          this.$message({type: "error", message: "不能发布空文章!"});
        } else if (this.date === "") {
          this.$message({type: "error", message: "请选择发布时间!"});
        } else if (this.category.category_name.trim() === "") {
          this.$message({type: "error", message: "请选择文章分类!"});
        } else {
          let data = {
            "article_id": this.id,
            "article_title": this.title,
            "article_date": new Date(this.date),
            "content": this.content,
            "category": this.category,
            "category_id": this.category.category_id,
            "tagList": this.tags,
            "is_top": this.isTop,
            "comment_status": this.isComment,
            "article_image": this.imgUrl
          };
          if (this.id > 0) {
            this.$api.modifyArticle(data).then(response=>{
              if (response.status && response.status === 200) {
                this.$message.success("文章更新成功！");
              } else {
                this.$message.error("文章更新失败！");
              }
            })
          } else {
            this.$api.createArticle(data).then(response=>{
              if (response.status && response.status === 200) {
                this.$message.success("文章发布成功！");
              } else {
                this.$message.error("文章发布失败！");
              }
            })
          }
        }


      }
    }
  }
</script>

<style scoped>
  .new-article-box {
    margin-left: 20px;
    transition: all .3s
  }

  nav {
    margin-bottom: 20px;
  }

  .container {
    display: flex;
  }

  /* 内容区域 */
  .content-main-box {
    flex: 1;
    overflow: hidden;
  }

  .editor-box {
    margin: 10px 0 30px;
    min-width: 700px;
    height: 1000px;
  }

  /* 右边区域 */
  .content-extra-box {
    width: 275px;
    min-width: 275px;
    margin: 0 10px;
  }

  .content-extra-box > div {
    background-color: #fff;
    border: 1px solid #DCDFE6;
    padding: 10px;
    margin-top: 10px;
  }

  .content-extra-box > div:nth-child(1) {
    margin-top: 0;
  }

  .content-extra-title {
    font-size: 16px;
    font-weight: lighter;
  }

  .release-btn {
    margin-top: 10px;
    text-align: right;
  }

  .other-box span {
    font-size: 14px;

  }

  .other-box .my-switch {
    margin-left: 10px;
  }
</style>
