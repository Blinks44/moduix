<script setup lang="ts">
import { TreeViewItemText as ArkTreeViewItemText } from '@ark-ui/vue/tree-view';
import type { TreeViewItemTextProps } from '@ark-ui/vue/tree-view';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewItemTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const componentClass =
  'min-w-0 flex-1 truncate [&_svg]:my-[calc((1lh-var(--moduix-spacing-4))/2)] [&_svg]:me-2 [&_svg]:inline-block [&_svg]:size-4 [&_svg]:align-top';
</script>

<template>
  <ArkTreeViewItemText
    v-bind="attrs"
    :class="cn(componentClass, className)"
    data-slot="tree-view-item-text"
    ><slot
  /></ArkTreeViewItemText>
</template>