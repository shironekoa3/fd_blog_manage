<template>
  <div>
    <div class="logo">
      <router-link to="/" class="logo-link">BLOG MANAGE</router-link>
    </div>
    <el-menu
      class="my-el-menu"
      background-color="#001529"
      text-color="hsla(0, 0%, 100%, .65)"
      active-text-color="#ffffff"
      :default-active="defaultActive"
      :router="true">

      <template v-for="(item,index) in menuList">
        <el-menu-item class="my-menu-item" :index="item.path" :key="index" v-if="!item.children">
          <font-awesome-icon class="icon" :icon="item.icon" v-if="item.icon"/>
          <span slot="title" v-text="item.name"></span>
        </el-menu-item>
        <el-submenu :index="item.path" v-else :key="index">
          <template slot="title">
            <font-awesome-icon class="icon" :icon="item.icon" v-if="item.icon"/>
            <span v-text="item.name"></span>
          </template>
          <el-menu-item :index="subItem.path" class="my-menu-item" v-for="(subItem,subIndex) in item.children"
                        :key="subIndex">
            <font-awesome-icon class="icon" :icon="subItem.icon" v-if="subItem.icon"/>
            <span slot="title" v-text="subItem.name"></span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import {routes} from "../../router";

  export default {
    data() {
      return {
        defaultActive: "",
        menuList: []
      }
    },
    created() {
      this.menuList = routes[0].children;
      this.defaultActive = this.$route.path;
    },
    watch:{
      $route(){
        this.defaultActive = this.$route.path;
      }
    }
  }
</script>

<style scoped>
  .logo {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }

  .logo-link {
    color: #cccccc;
    font-size: 20px;
    font-weight: 800;
    transition: all .3s;
  }

  .logo-link:hover {
    color: white;
  }

  .my-el-menu {
    border-right: none;
    user-select: none;
  }

  .icon {
    margin: 0 5px;
    width: 18px;

  }

  .my-menu-item:hover,
  /deep/ .el-submenu__title:hover {
    color: #ffffff !important;
  }

  /deep/ .el-menu-item.is-active {
    background-color: #1890ff !important;
  }
</style>
