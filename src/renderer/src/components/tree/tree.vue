<script setup lang="ts">
import { onMounted, nextTick } from 'vue'
import '../../../../../lib/zTree/js/jquery-1.4.4.min'
import '../../../../../lib/ztree/js/jquery.ztree.all'
import '../../../../../lib/ztree/js/jquery.ztree.core'
import '../../../../../lib/ztree/js/jquery.ztree.excheck'
import '../../../../../lib/ztree/js/jquery.ztree.exedit'
import '../../../../../lib/ztree/js/jquery.ztree.exhide'
import { readTreeDataList } from '../../tools/communication'
import { isTerminatorless } from '@babel/types'


let tree

let zNodes = []

/**
 * @method
 * @desc 树节点点击事件
 */
// 点击TreeNode触发
const onClickTree = (event, treeId, treeNode, clickFlag): void => {
  // // 文件夹自动展开
  // if (treeNode.type === 'folder') {
  //   // TODO：再次点击需要删除数据
  //   refreshTreeNodes(getTreeObj(), treeNode)
  // }
}

// 刷新节点
const refreshTreeNodes = (treeObj, treeNode): void => {
  readTreeDataList(treeNode.path + '/' + treeNode.name).then((list) => {
    if (treeNode.checked !== true) {
      treeNode.checked = true
      treeObj.addNodes(treeNode, list)
    }
  })
}

// 展开TreeNode
const onExpand = (event, treeId, treeNode): void => {
  refreshTreeNodes(getTreeObj(), treeNode)
}

onMounted(() => {
  nextTick(async () => {
    await getTreeData()
    init()
  })
})

// 折叠TreeNode
const onCollapse = (event, treeId, treeNode): void => {
  const treeObj = $.fn.zTree.getZTreeObj('#noteZTree')
  treeObj.removeChildNodes(treeNode)
}
/**
 * @method
 * @desc 读取文件数据
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getTreeData = () => {
  return new Promise((resolve, reject) => {
    readTreeDataList('/Users/xubinghua/code').then((res: []) => {
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
    onClick: onClickTree,
    onExpand: onExpand,
    onCollapse: onCollapse
  }
}
</script>

<template>
  <div id="noteZTree" class="ztree">
  </div>
</template>

<style scoped lang="less">

</style>
