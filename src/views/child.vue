<template>
  <div>
    <div>
      <p>传给子应用的值: {{ childState.firstName + " " + childState.lastName }}</p>
      <p>子应用修改的值: {{ (childVal.firstName || '') + " " + (childVal.lastName || '') }}</p>
    </div>
    <div>
      <el-button type="primary" @click="handleClick">点击修改传值</el-button>
    </div>
  </div>
</template>

<script>
import { looseEqual } from '../utils/index'
import { mapState } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      updateVal: {
        firstName: 'new',
        lastName: 'value'
      },
      childVal: {}
    };
  },
  computed: {
    ...mapState(['childState'])
  },
  mounted() {
    this.$actions.onGlobalStateChange((nv, ov) => {
      console.log(ov)
      if (!looseEqual(nv, this.updateVal)) {
        this.childVal = nv
      }
    })
  },
  methods: {
    handleClick() {
      this.$actions.setGlobalState(this.updateVal)
    }
  },
  beforeDestory() {
    this.$actions.offGlobalStateChange()
  }
}
</script>

<style>
</style>
