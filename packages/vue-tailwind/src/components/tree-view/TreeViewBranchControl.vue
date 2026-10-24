<script setup lang="ts">
import { TreeViewBranchControl as ArkTreeViewBranchControl } from '@ark-ui/vue/tree-view';
import type { TreeViewBranchControlProps } from '@ark-ui/vue/tree-view';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { treeViewRowVariants } from './TreeView.variants';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewBranchControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const componentClass = 'ps-[calc(var(--_tree-view-indent)+var(--moduix-spacing-2))]';
</script>

<template>
  <ArkTreeViewBranchControl
    v-bind="attrs"
    :class="cn(treeViewRowVariants(), componentClass, className)"
    data-slot="tree-view-branch-control"
  >
    <slot />
  </ArkTreeViewBranchControl>
</template>