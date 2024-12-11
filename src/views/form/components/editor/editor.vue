<template>
  <div ref="editor" class="flex-1 h-full overflow-auto mx-2 px-2 pt-4 content">
    <component :is="vnode" v-for="vnode in components" :key="vnode.key" />
  </div>
</template>
<script setup lang="ts">
import { computed, h, onMounted, reactive, ref, type VNode } from 'vue';
import Sortable from 'sortablejs';
import useNodeStore from '@/views/form/stores/nodeStore';

import Node from '@/views/form/types/node/Node';
import RootNode from '@/views/form/types/node/layout/RootNode';
import ListNode from '@/views/form/types/node/layout/ListNode';
import ObjectNode from '@/views/form/types/node/layout/ObjectNode';
import InputNode from '@/views/form/types/node/string/InputNode';

import RootComponent from '@/views/form/components/editor/components/layout/rootComponent.vue';
import ObjectComponent from '@/views/form/components/editor/components/layout/objectComponent.vue';
import ListComponent from '@/views/form/components/editor/components/layout/listComponent.vue';
import InputComponent from '@/views/form/components/editor/components/string/inputComponent .vue';

const { formNode, createNode } = useNodeStore();

const editor = ref<HTMLElement | undefined>(undefined); // 内容面板ref
const componentMap = reactive<Map<Node, VNode>>(new Map()); // 组件Map
const components = computed(() => getComponents(formNode)); // 组件

/**
 * 获取组件
 * @param node 节点数据
 */
function getComponents(node: Node): VNode[] {
  let list: VNode[] = [];
  list.push(getComponent(node));
  componentMap.set(node, getComponent(node));
  if (node instanceof RootNode || node instanceof ListNode || node instanceof ObjectNode) {
    let head: Node | undefined = node.head;
    while (head) {
      list.push(...getComponents(head));
      head = head.next;
    }
  }
  return list;
}

/**
 * 获取组件
 * @param node 节点数据
 */
function getComponent(node: Node): VNode {
  if (componentMap.has(node)) {
    return componentMap.get(node)!;
  }
  switch (true) {
    case node instanceof RootNode: // 根
      return h(RootComponent, { key: node.id, node });
    case node instanceof ListNode: // 列表
      return h(ListComponent, { key: node.id, node });
    case node instanceof ObjectNode: // 对象
      return h(ObjectComponent, { key: node.id, node });
    case node instanceof InputNode: // 单行文本
      return h(InputComponent, { key: node.id, node });
    default:
      throw new Error('未知的Component类型');
  }
}

/**
 * 初始化
 */
function init(): void {
  if (!editor.value) {
    return;
  }
  new Sortable(editor.value, {
    group: 'form',
    animation: 300,
    draggable: '.draggable',
    fallbackOnBody: true,
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    onAdd: (event: any) => {
      const newIndex: number = event.newIndex;
      const itemElement: any = event.item;
      const oldNode: Node = components.value[newIndex - 1].props?.node;
      const newNode: Node = createNode(itemElement.dataset.type);
      const _oldNode: Node = oldNode;
      const _newNode: Node = newNode;
      if ((_oldNode instanceof RootNode || _oldNode instanceof ListNode || _oldNode instanceof ObjectNode) && (oldNode instanceof RootNode || oldNode instanceof ListNode || oldNode instanceof ObjectNode)) {
        newNode.insertNextNode(_oldNode.head);
        newNode.insertParentNode(_oldNode);
        oldNode.insertHeadNode(_newNode);
      } else {
        newNode.insertPrevNode(_oldNode);
        newNode.insertNextNode(_oldNode.next);
        newNode.insertParentNode(_oldNode.parent);
        oldNode.insertNextNode(_newNode);
      }
      console.log(components.value);
      itemElement.parentNode.removeChild(itemElement);
    },
    onEnd: (event: any) => {
      console.log(event);
      const oldIndex: number = event.oldIndex;
      const newIndex: number = event.newIndex;
      const oldNode: Node = components.value[oldIndex].props?.node;
      const newNode: Node = components.value[newIndex].props?.node;
      const _oldNode: Node = oldNode;
      const _newNode: Node = newNode;
      console.log(oldNode.prev);
      _oldNode.prev?.insertNextNode(_oldNode.next);
      _oldNode.next?.insertPrevNode(_oldNode.prev);
      // oldNode.next?.insertParentNode(_oldNode.parent);

      oldNode.insertPrevNode(_newNode.prev);
      oldNode.insertNextNode(_newNode);
      // oldNode.insertParentNode(newNode.parent);

      newNode.insertPrevNode(oldNode);
      console.log(oldNode);
      console.log(newNode);
    }
  });
}

onMounted(() => {
  init();
});
</script>
<style lang="less" scoped>
.content {
  :deep(.sortable-draggable) {
    background-color: #aad6b0;
    @apply w-full h-28 mb-4 rounded-lg cursor-move;
  }
  .sortable-ghost {
    @apply opacity-50;
  }
  .sortable-chosen {
    @apply border-orange;
  }
  .sortable-drag {
    @apply border-orange bg-orange-4 bg-opacity-50 opacity-50;
  }
}
</style>
