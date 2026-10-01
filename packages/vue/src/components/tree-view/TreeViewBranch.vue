<script setup lang="ts">
import { TreeViewBranch as ArkTreeViewBranch } from '@ark-ui/vue/tree-view';
import type { TreeViewBranchProps } from '@ark-ui/vue/tree-view';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TreeView.module.css';

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
    :class="clsx(styles.branch, className)"
    data-slot="tree-view-branch"
    ><slot
  /></ArkTreeViewBranch>
</template>