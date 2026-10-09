<script setup lang="ts">
import { TreeViewLabel as ArkTreeViewLabel } from '@ark-ui/vue/tree-view';
import type { TreeViewLabelProps } from '@ark-ui/vue/tree-view';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TreeView.module.css';

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
    :class="clsx(styles.label, className)"
    data-slot="tree-view-label"
    ><slot
  /></ArkTreeViewLabel>
</template>