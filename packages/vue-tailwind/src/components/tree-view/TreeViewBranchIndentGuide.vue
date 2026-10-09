<script setup lang="ts">
import { TreeViewBranchIndentGuide as ArkTreeViewBranchIndentGuide } from '@ark-ui/vue/tree-view';
import type { TreeViewBranchIndentGuideProps } from '@ark-ui/vue/tree-view';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewBranchIndentGuideProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const componentClass =
  'pointer-events-none absolute inset-y-0 start-[calc(1rem+((var(--depth,1)-1)*1rem))] z-1 w-px bg-border';
</script>

<template>
  <ArkTreeViewBranchIndentGuide
    v-bind="attrs"
    :class="cn(componentClass, className)"
    data-slot="tree-view-branch-indent-guide"
    ><slot
  /></ArkTreeViewBranchIndentGuide>
</template>