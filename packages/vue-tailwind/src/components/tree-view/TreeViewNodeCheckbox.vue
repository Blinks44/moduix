<script setup lang="ts">
import { TreeViewNodeCheckbox as ArkTreeViewNodeCheckbox } from '@ark-ui/vue/tree-view';
import type { TreeViewNodeCheckboxProps } from '@ark-ui/vue/tree-view';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewNodeCheckboxProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const componentClass =
  'inline-flex size-4 shrink-0 items-center justify-center rounded-xs border border-border bg-background text-primary-foreground outline-1 outline-offset-1 outline-transparent transition-[background-color,border-color,outline-color] duration-200 ease-in-out focus-visible:outline-ring data-disabled:cursor-default data-disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:bg-primary motion-reduce:transition-none [&_svg]:size-3 [:is([data-slot=tree-view-item][data-disabled],[data-slot=tree-view-branch-control][data-disabled])_&]:opacity-100 [:is([data-slot=tree-view-root],[data-slot=tree-view-root-provider])[data-disabled]_&]:opacity-100';
</script>

<template>
  <ArkTreeViewNodeCheckbox
    v-bind="attrs"
    :class="cn(componentClass, className)"
    data-slot="tree-view-node-checkbox"
    ><slot
  /></ArkTreeViewNodeCheckbox>
</template>