<template>
  <!-- 第一层分页 -->
  <el-submenu v-if="item.second && item.second.length > 0"
    :index="item.url" v-on:click="goTo()">
    <span slot="title">
      <i :class="item.icon"></i>
      {{item.name}}
    </span>
    <menulist v-for="child in item.second"
      :item="child">
    </menulist>

  </el-submenu>
  <!-- 第一层不分页 -->
  <el-menu-item v-else
    :index="item.url" v-on:click="goTo()">
    <i :class="item.icon"></i>
    <span slot="title">{{item.name}}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: "menulist",
  props: {
    item: Object
  },
  data() {
    return {

    }
  },
  methods: {
    goTo(){
      this.$emit('goTopath','');
    }
  },
}
</script>

<style>
</style>
