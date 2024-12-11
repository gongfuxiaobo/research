<template>
  <div class="w-60 h-full flex flex-col overflow-hidden bg-white">
    <div class="text-base font-medium px-4 py-2">组件</div>
    <a-divider class="!m-0" />
    <div class="flex-1 overflow-hidden px-4 mb-4">
      <div ref="menu" class="w-full h-full overflow-y-auto grid grid-flow-row auto-rows-max grid-cols-2 gap-2">
        <template v-for="group in components" :key="group">
          <div class="pt-2 col-span-2">{{ group.name }}</div>
          <a-button v-for="item in group.children" :key="item.type" :data-type="item.type" :data-name="item.name" class="col-span-1 !rounded !cursor-move draggable sortable-draggable">{{ item.name }}</a-button>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { WidgetName, WidgetType } from '@/views/form/types/types';
import type { MenuItem } from '@/views/form/components/menu/types/types';
import Sortable from 'sortablejs';

/**
 * 组件
 */
const components = ref<MenuItem[]>([
  {
    name: 'Layout',
    children: [
      {
        name: WidgetName.List,
        type: WidgetType.List
      },
      {
        name: WidgetName.Object,
        type: WidgetType.Object
      }
    ]
  },
  {
    name: 'String',
    children: [
      {
        name: WidgetName.Input,
        type: WidgetType.Input
      },
      {
        name: WidgetName.TextArea,
        type: WidgetType.TextArea
      },
      {
        name: WidgetName.Radio,
        type: WidgetType.Radio
      },
      {
        name: WidgetName.Select,
        type: WidgetType.Select
      }
    ]
  },
  {
    name: 'Number',
    children: [
      {
        name: WidgetName.InputNumber,
        type: WidgetType.InputNumber
      }
    ]
  },
  {
    name: 'Boolean',
    children: [
      {
        name: WidgetName.Switch,
        type: WidgetType.Switch
      },
      {
        name: WidgetName.Checkbox,
        type: WidgetType.Checkbox
      }
    ]
  },
  {
    name: 'Array',
    children: [
      {
        name: WidgetName.CheckboxMultiple,
        type: WidgetType.CheckboxMultiple
      },
      {
        name: WidgetName.SelectMultiple,
        type: WidgetType.SelectMultiple
      },
      {
        name: WidgetName.Cascader,
        type: WidgetType.Cascader
      }
    ]
  }
]);
const menu = ref<HTMLElement | undefined>(undefined); // 菜单面板ref

/**
 * 初始化
 */
function init(): void {
  if (!menu.value) {
    return;
  }
  Sortable.create(menu.value, {
    group: {
      name: 'form',
      pull: 'clone',
      put: false
    },
    animation: 300,
    draggable: '.draggable',
    sort: false
  });
}

onMounted(() => {
  init();
});
</script>
<style lang="less" scoped></style>
