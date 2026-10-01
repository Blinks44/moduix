<script setup lang="ts">
import { TreeViewBranchContent as ArkTreeViewBranchContent } from '@ark-ui/vue/tree-view';
import type { TreeViewBranchContentProps } from '@ark-ui/vue/tree-view';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewBranchContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const componentClass =
  'relative flex min-w-0 flex-col gap-1 overflow-hidden data-[state=closed]:animate-[moduix-collapsible-content-closed_150ms_ease-out] data-[state=open]:animate-[moduix-collapsible-content-open_150ms_ease-out] motion-reduce:animate-none';
</script>

<template>
  <ArkTreeViewBranchContent
    v-bind="attrs"
    :class="cn(componentClass, className)"
    data-slot="tree-view-branch-content"
    ><slot
  /></ArkTreeViewBranchContent>
</template>