<script setup lang="ts">
import { TreeViewLabel as ArkTreeViewLabel } from '@ark-ui/vue/tree-view';
import type { TreeViewLabelProps } from '@ark-ui/vue/tree-view';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewLabel
    v-bind="attrs"
    :class="cn('text-sm leading-5 font-medium text-foreground select-none', className)"
    data-slot="tree-view-label"
    ><slot
  /></ArkTreeViewLabel>
</template>