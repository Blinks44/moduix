<script setup lang="ts">
import { JsonTreeViewTree as ArkJsonTreeViewTree } from '@ark-ui/vue/json-tree-view';
import type { JsonTreeViewTreeProps } from '@ark-ui/vue/json-tree-view';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './JsonTreeView.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ JsonTreeViewTreeProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
type ArkJsonTreeViewTreeSlots = InstanceType<typeof ArkJsonTreeViewTree>['$slots'];
defineSlots<{
  arrow?: ArkJsonTreeViewTreeSlots['arrow'];
  indentGuide?: ArkJsonTreeViewTreeSlots['indentGuide'];
  renderValue?: ArkJsonTreeViewTreeSlots['renderValue'];
}>();

const attrs = useAttrs();
</script>

<template>
  <ArkJsonTreeViewTree
    v-bind="attrs"
    :class="clsx(styles.tree, className)"
    data-slot="json-tree-view-tree"
  >
    <template #arrow>
      <slot name="arrow"><ChevronRightIcon aria-hidden="true" /></slot>
    </template>
    <template v-if="$slots.indentGuide" #indentGuide>
      <slot name="indentGuide" />
    </template>
    <template v-if="$slots.renderValue" #renderValue="slotProps">
      <slot name="renderValue" v-bind="slotProps" />
    </template>
  </ArkJsonTreeViewTree>
</template>