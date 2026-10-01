<script setup lang="ts">
import { TreeViewBranch as ArkTreeViewBranch } from '@ark-ui/vue/tree-view';
import type { TreeViewBranchProps } from '@ark-ui/vue/tree-view';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewBranchProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewBranch
    v-bind="attrs"
    :class="cn('relative flex min-w-0 flex-col gap-1', className)"
    data-slot="tree-view-branch"
    ><slot
  /></ArkTreeViewBranch>
</template>