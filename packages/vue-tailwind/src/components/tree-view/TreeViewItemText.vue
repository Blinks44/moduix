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
  'inline-flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap [&_svg]:size-4 [&_svg]:shrink-0';
</script>

<template>
  <ArkTreeViewItemText
    v-bind="attrs"
    :class="cn(componentClass, className)"
    data-slot="tree-view-item-text"
    ><slot
  /></ArkTreeViewItemText>
</template>