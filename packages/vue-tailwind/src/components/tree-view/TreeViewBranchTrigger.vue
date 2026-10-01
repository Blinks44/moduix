<script setup lang="ts">
import { TreeViewBranchTrigger as ArkTreeViewBranchTrigger } from '@ark-ui/vue/tree-view';
import type { TreeViewBranchTriggerProps } from '@ark-ui/vue/tree-view';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewBranchTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const componentClass =
  'inline-flex size-4 shrink-0 items-center justify-center transition-transform duration-200 ease-in-out data-[state=open]:rotate-90 motion-reduce:transition-none [&_svg]:size-3.5';
</script>

<template>
  <ArkTreeViewBranchTrigger
    v-bind="attrs"
    :class="cn(componentClass, className)"
    data-slot="tree-view-branch-trigger"
  >
    <slot><ChevronRightIcon /></slot>
  </ArkTreeViewBranchTrigger>
</template>