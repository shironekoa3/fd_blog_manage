<template>
  <div id="dashboard-box">
    <div class="top-container">
      <div class="box">
        <p class="box-title">总访问量</p>
        <p class="box-number" v-text="visits"></p>
      </div>
      <div class="box">
        <p class="box-title">文章数量</p>
        <p class="box-number" v-text="article_count"></p>
      </div>
      <div class="box">
        <p class="box-title">分类数量</p>
        <p class="box-number" v-text="category_count"></p>
      </div>
      <div class="box">
        <p class="box-title">评论数量</p>
        <p class="box-number" v-text="comment_count"></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visits: 0,
        article_count: 0,
        category_count: 0,
        comment_count: 0,
      }
    },
    created() {
      this.$api.getWebsiteInfo().then(response => {
        if (response.status && response.status === 200) {
          this.visits = response.data["visits"];
          this.article_count = response.data["article_count"];
          this.category_count = response.data["category_count"];
          this.comment_count = response.data["comment_count"];
        } else {
          this.$message.error("加载失败!")
        }
      })
    }

  }
</script>

<style scoped>
  #dashboard-box {
    margin: 0 10px;
    transition: all .3s;
  }

  .top-container {
    display: flex;
    justify-content: space-around;
    min-width: 600px;
    transition: all .3s;
  }

  .box {
    width: 24%;
    height: 180px;
    background-color: #fff;
    padding-top: 20px;
    margin: 10px 0;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }

  .box-title {
    text-align: center;
    font-size: 20px;
  }

  .box-number {
    margin-top: 10px;
    text-align: center;
    font-size: 70px;
    font-weight: lighter;
  }


  @media screen and (max-width: 1280px) {
    .top-container {
      flex-wrap: wrap;

    }

    .box {
      width: 48%;
    }
  }

</style>
