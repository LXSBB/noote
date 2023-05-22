<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import '../../../../../lib/zTree/js/jquery-1.4.4.min'
import '../../../../../lib/ztree/js/jquery.ztree.all'
import '../../../../../lib/ztree/js/jquery.ztree.core'
import '../../../../../lib/ztree/js/jquery.ztree.excheck'
import '../../../../../lib/ztree/js/jquery.ztree.exedit'
import '../../../../../lib/ztree/js/jquery.ztree.exhide'
import { readTreeDataList } from '../../tools/communication'

let tree

let zNodes = []

/**
 * @method
 * @desc 树节点点击事件
 */
const onClickTree = (): void => {

}

onMounted(() => {
  nextTick(async () => {
    await getTreeData()
    init()
  })
})

/**
 * @method
 * @desc 读取文件数据
 */
const getTreeData = () => {
  return new Promise((resolve, reject) => {
    readTreeDataList('D:\\桌面\\note_test').then((res: []) => {
      console.log(res, '[[][][][[]')
      zNodes = res
      resolve()
    })
  })
}
const init = (): void => {
  $.fn.zTree.init($('#noteZTree'), setting, zNodes)
}

/**
 * @method
 * @desc 获取树对象实例
 */
const getTreeObj = (): never => {
  return $.fn.zTree.getZTreeObj('#noteZTree')
}

const setting = {
  view: {
    showLine: false,
    showIcon: false
  },
  callback: {
    onClick: onClickTree
  }
}
</script>

<template>
  <div id="noteZTree" class="ztree">
  </div>
</template>

<style scoped lang="less">

</style>
