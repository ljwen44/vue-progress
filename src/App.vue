<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      :router="true"
      active-text-color="#ffd04b">
      <el-menu-item index="/vue-qiankun">vue-qiankan</el-menu-item>
      <el-menu-item index="/vue-qiankun/commit">通信处理</el-menu-item>
      <el-menu-item index="/vue-qiankun/style">样式隔离</el-menu-item>
      <el-menu-item index="/react-qiankun">react子应用</el-menu-item>
    </el-menu>
    <router-view></router-view>
    <div id="vue"></div>
    <div id="react"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeIndex: this.$route.path || '/vue-qiankun'
    };
  }
}
</script>

<style>
</style>
