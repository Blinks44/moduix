<script setup lang="ts">
import { TreeViewBranchIndentGuide as ArkTreeViewBranchIndentGuide } from '@ark-ui/vue/tree-view';
import type { TreeViewBranchIndentGuideProps } from '@ark-ui/vue/tree-view';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TreeView.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewBranchIndentGuideProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewBranchIndentGuide
    v-bind="attrs"
    :class="clsx(styles.branchIndentGuide, className)"
    data-slot="tree-view-branch-indent-guide"
    ><slot
  /></ArkTreeViewBranchIndentGuide>
</template>