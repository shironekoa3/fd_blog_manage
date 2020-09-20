<template>
  <header>
    <div class="avatar-box">
      <div class="avatar-img" :style="`background-image:url(${defaultAvatarUrl}),url(${defaultAvatarUrl});`"></div>
      <div class="avatar-name" v-text="name?name:defaultName"></div>
    </div>
  </header>
</template>

<script>
  export default {
    data() {
      return {
        defaultAvatarUrl: "https://cdn.jsdelivr.net/gh/shironekoa3/cdn@master/images/gravatar.jpg",
        defaultName: "NULL",
        avatarUrl: "",
        name: ""
      }
    },
    created() {
      this.$api.getManagerInfo().then(response => {
        if (response.status && response.status === 200) {
          this.avatarUrl = response.data["img_url"];
          this.name = response.data["nickname"];
        }
      });
    }
  }
</script>

<style scoped>
  header {
    width: 100%;
    height: 60px;
    background-color: #fff;
    margin-bottom: 20px;
  }

  .avatar-box {
    float: right;
    margin-right: 20px;
    padding: 0 10px;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    display: flex;
    transition: all .3s;
  }

  .avatar-box:hover {
    background-color: #eeeeee;
  }

  .avatar-img {
    width: 30px;
    height: 30px;
    margin-top: 15px;
    border-radius: 50%;
    background-size: 100%, 100%;
  }

  .avatar-name {
    margin-left: 4px;
    font-weight: lighter;
    user-select: none;
  }
</style>
