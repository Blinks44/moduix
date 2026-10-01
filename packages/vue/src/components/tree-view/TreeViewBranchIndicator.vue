<script setup lang="ts">
import { TreeViewBranchIndicator as ArkTreeViewBranchIndicator } from '@ark-ui/vue/tree-view';
import type { TreeViewBranchIndicatorProps } from '@ark-ui/vue/tree-view';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './TreeView.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewBranchIndicatorProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewBranchIndicator
    v-bind="attrs"
    :class="clsx(styles.branchIndicator, className)"
    data-slot="tree-view-branch-indicator"
  >
    <slot><ChevronRightIcon /></slot>
  </ArkTreeViewBranchIndicator>
</template>