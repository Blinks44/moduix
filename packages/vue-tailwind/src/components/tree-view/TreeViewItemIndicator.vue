<script setup lang="ts">
import { TreeViewItemIndicator as ArkTreeViewItemIndicator } from '@ark-ui/vue/tree-view';
import type { TreeViewItemIndicatorProps } from '@ark-ui/vue/tree-view';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewItemIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewItemIndicator
    v-bind="attrs"
    :class="
      cn('inline-flex size-4 shrink-0 items-center justify-center [&_svg]:size-3.5', className)
    "
    data-slot="tree-view-item-indicator"
  >
    <slot><CheckIcon /></slot>
  </ArkTreeViewItemIndicator>
</template>