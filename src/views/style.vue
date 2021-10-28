<template>
  <div>
    <p class="child-style">qiankun样式隔离-->主应用样式</p>
  </div>
</template>

<script>

export default {
  name: 'App-style',
  data() {
    return {};
  }
}
</script>

<style>
.child-style {
  color: blue;
  font-size: 18px;
}
</style>
