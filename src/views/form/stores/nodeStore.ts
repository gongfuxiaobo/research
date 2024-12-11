import { reactive, ref } from 'vue';
import type Node from '@/views/form/types/node/Node';
import { WidgetType } from '@/views/form/types/types';
import RootNode from '@/views/form/types/node/layout/RootNode';
import ListNode from '@/views/form/types/node/layout/ListNode';
import ObjectNode from '@/views/form/types/node/layout/ObjectNode';
import InputNode from '@/views/form/types/node/string/InputNode';
import TextAreaNode from '@/views/form/types/node/string/TextAreaNode';

const formNode = reactive<Node>(new RootNode()); // 表单节点数据
const node = ref<Node | undefined>(undefined); // 当前选中节点

/**
 * 设置当前选中节点
 * @param _node 节点数据
 */
function setNode(_node: Node): void {
  node.value = _node;
}

/**
 * 创建节点
 * @param type 节点数据
 * @returns
 */
function createNode(type: WidgetType): Node {
  switch (type) {
    case WidgetType.Root: // 根
      return new RootNode();
    case WidgetType.List: // 列表
      return new ListNode();
    case WidgetType.Object: // 对象
      return new ObjectNode();
    case WidgetType.Input: // 单行文本
      return new InputNode();
    case WidgetType.TextArea: // 多行文本
      return new TextAreaNode();
    default:
      throw new Error('未知的node类型');
  }
}

/**
 * 节点store
 * @returns
 */
export default function useNodeStore() {
  return {
    formNode,
    node,
    setNode,
    createNode
  };
}
