import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const index = () => import("@/home/index");
const main = () => import("@/home/components/main");
const dashboard = () => import("@/page/dashboard/index");
const newArticle = () => import("@/page/content/new-article");
const manageArticle = () => import("@/page/content/manage-article");
const manageCategory = () => import("@/page/content/manage-category");
const manageTag = () => import("@/page/content/manage-tag");
const manageComment = () => import("@/page/content/manage-comment");
const settings = () => import("@/page/settings/index");


export const routes = [{
  path: '/',
  component: index,
  redirect: '/dashboard',
  children: [
    {
      path: '/dashboard',
      name: '首页',
      icon: 'home',
      component: main,
      children: [
        {
          path: '/dashboard',
          name: '仪表盘',
          icon: 'tachometer-alt',
          component: dashboard
        }
      ]
    },
    {
      path: '/content',
      name: '内容管理',
      icon: 'folder',
      component: main,
      children: [
        {
          path: '/content/new-article',
          name: '新建文章',
          icon: 'pen-square',
          component: newArticle
        },
        {
          path: '/content/manage-article',
          name: '文章管理',
          icon: 'file-alt',
          component: manageArticle
        },
        {
          path: '/content/manage-category',
          name: '分类管理',
          icon: 'folder-open',
          component: manageCategory
        },
        {
          path: '/content/manage-tag',
          name: '标签管理',
          icon: 'tags',
          component: manageTag
        },
        {
          path: '/content/manage-comment',
          name: '评论管理',
          icon: 'comments',
          component: manageComment
        }

      ]
    },
    {
      path: '/settings',
      name: '设置',
      icon: 'cogs',
      component: main,
      children: [
        {
          path: '/settings/web',
          name: '站点设置',
          icon: 'info-circle',
          component: settings
        }
      ]
    },
  ]
}];

export default new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes
})
