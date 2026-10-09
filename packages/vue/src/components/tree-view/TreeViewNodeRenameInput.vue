<script setup lang="ts">
import { TreeViewNodeRenameInput as ArkTreeViewNodeRenameInput } from '@ark-ui/vue/tree-view';
import type { TreeViewNodeRenameInputProps } from '@ark-ui/vue/tree-view';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './TreeView.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ Omit<TreeViewNodeRenameInputProps, 'class'> {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTreeViewNodeRenameInput
    v-bind="attrs"
    :class="clsx(styles.nodeRenameInput, props.class)"
    data-slot="tree-view-node-rename-input"
  >
    <template v-if="$slots.default" #default><slot /></template>
  </ArkTreeViewNodeRenameInput>
</template>