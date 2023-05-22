<script setup lang="ts">
import { onMounted } from 'vue'
import Tree from './components/tree/tree.vue'
import { DragLine } from './tools/DragLine'

onMounted(() => {
  const dom: HTMLDivElement = document.querySelector('.leftContainer')
  const line = new DragLine('Horizontal', dom, 500, 100)
})
</script>

<template>
  <div class="container">
    <div class="leftContainer">
      <div class="optionsWrap"></div>
      <div class="treeWrap">
        <tree></tree>
      </div>
    </div>
    <div class="contentWrap">

    </div>
  </div>
</template>

<style lang="less">
@import 'assets/css/index';
.container {
  width: 100vw;
  height: 100vh;
  background-color: #303845;
  display: flex;
  .leftContainer {
    width: 300px;
    height: 100vh;
    background-color: #343c4a;
    position: relative;
  }
  .contentWrap {
    height: 100%;
    flex: 1;
  }
}
</style>
