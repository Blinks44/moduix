<script setup lang="ts">
import { TreeViewBranchIndicator as ArkTreeViewBranchIndicator } from '@ark-ui/vue/tree-view';
import type { TreeViewBranchIndicatorProps } from '@ark-ui/vue/tree-view';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewBranchIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const componentClass =
  'inline-flex size-4 shrink-0 items-center justify-center transition-transform duration-200 ease-in-out data-[state=open]:rotate-90 motion-reduce:transition-none [&_svg]:size-3.5';
</script>

<template>
  <ArkTreeViewBranchIndicator
    v-bind="attrs"
    :class="cn(componentClass, className)"
    data-slot="tree-view-branch-indicator"
  >
    <slot><ChevronRightIcon /></slot>
  </ArkTreeViewBranchIndicator>
</template>