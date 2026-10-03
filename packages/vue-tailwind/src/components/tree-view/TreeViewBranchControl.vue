<script setup lang="ts">
import { TreeViewBranchControl as ArkTreeViewBranchControl } from '@ark-ui/vue/tree-view';
import type { TreeViewBranchControlProps } from '@ark-ui/vue/tree-view';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewBranchControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const rowClass =
  "relative z-0 box-border flex min-h-8 w-full min-w-0 cursor-pointer items-center gap-2 rounded-sm bg-transparent py-1 pe-2 text-start text-foreground no-underline transition-[color,opacity] duration-200 ease-in-out outline-none select-none [font:inherit] before:pointer-events-none before:absolute before:inset-y-0 before:start-[calc(0.5rem+((var(--depth,1)-1)*1rem))] before:end-0 before:-z-1 before:rounded-sm before:bg-transparent before:ring-1 before:ring-transparent before:transition-[background-color,box-shadow] before:duration-200 before:ease-in-out before:content-[''] before:ring-inset focus-visible:before:ring-ring data-disabled:cursor-default data-disabled:text-muted-foreground data-disabled:opacity-50 [:is([data-slot=tree-view-root],[data-slot=tree-view-root-provider])[data-disabled]_&]:opacity-100 data-focus:before:ring-ring data-selected:text-accent-foreground data-selected:before:bg-accent motion-reduce:before:transition-none [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-accent-foreground [@media(hover:hover)]:[&:not([data-disabled]):hover]:before:bg-accent";
const componentClass = 'ps-[calc(0.5rem+((var(--depth,1)-1)*1rem))]';
</script>

<template>
  <ArkTreeViewBranchControl
    v-bind="attrs"
    :class="cn(rowClass, componentClass, className)"
    data-slot="tree-view-branch-control"
  >
    <slot />
  </ArkTreeViewBranchControl>
</template>