<script setup lang="ts">
import { TreeViewNodeCheckbox as ArkTreeViewNodeCheckbox } from '@ark-ui/vue/tree-view';
import type { TreeViewNodeCheckboxProps } from '@ark-ui/vue/tree-view';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TreeView.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TreeViewNodeCheckboxProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewNodeCheckbox
    v-bind="attrs"
    :class="clsx(styles.nodeCheckbox, className)"
    data-slot="tree-view-node-checkbox"
    ><slot
  /></ArkTreeViewNodeCheckbox>
</template>