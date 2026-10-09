<script setup lang="ts">
import { TreeViewTree as ArkTreeViewTree } from '@ark-ui/vue/tree-view';
import type { TreeViewTreeProps } from '@ark-ui/vue/tree-view';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewTreeProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewTree
    v-bind="attrs"
    :class="cn('flex min-w-0 flex-col gap-1 text-sm leading-5 text-foreground', className)"
    data-slot="tree-view-tree"
    ><slot
  /></ArkTreeViewTree>
</template>