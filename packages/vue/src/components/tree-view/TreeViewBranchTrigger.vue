<script setup lang="ts">
import { TreeViewBranchTrigger as ArkTreeViewBranchTrigger } from '@ark-ui/vue/tree-view';
import type { TreeViewBranchTriggerProps } from '@ark-ui/vue/tree-view';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './TreeView.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewBranchTriggerProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewBranchTrigger
    v-bind="attrs"
    :class="clsx(styles.branchTrigger, className)"
    data-slot="tree-view-branch-trigger"
  >
    <slot><ChevronRightIcon /></slot>
  </ArkTreeViewBranchTrigger>
</template>