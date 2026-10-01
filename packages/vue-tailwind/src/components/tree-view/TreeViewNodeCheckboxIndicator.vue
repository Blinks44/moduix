<script setup lang="ts">
import { TreeViewNodeCheckboxIndicator as ArkTreeViewNodeCheckboxIndicator } from '@ark-ui/vue/tree-view';
import type { TreeViewNodeCheckboxIndicatorProps } from '@ark-ui/vue/tree-view';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CheckIcon, IndeterminateIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewNodeCheckboxIndicatorProps {
  class?: HTMLAttributes['class'];
  fallback?: TreeViewNodeCheckboxIndicatorProps['fallback'];
  indeterminate?: TreeViewNodeCheckboxIndicatorProps['indeterminate'];
}

const { class: className, fallback, indeterminate } = defineProps<Props>();
defineSlots<{
  default?: () => unknown;
  indeterminate?: () => unknown;
  fallback?: () => unknown;
}>();

const attrs = useAttrs();
</script>

<template>
  <span
    v-bind="attrs"
    :class="cn('inline-flex items-center justify-center', className)"
    data-slot="tree-view-node-checkbox-indicator"
  >
    <ArkTreeViewNodeCheckboxIndicator :fallback="fallback" :indeterminate="indeterminate">
      <template #indeterminate>
        <slot name="indeterminate"><IndeterminateIcon /></slot>
      </template>
      <template #default>
        <slot><CheckIcon /></slot>
      </template>
      <template v-if="$slots.fallback" #fallback>
        <slot name="fallback" />
      </template>
    </ArkTreeViewNodeCheckboxIndicator>
  </span>
</template>