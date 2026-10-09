<script setup lang="ts">
import { JsonTreeViewRoot as ArkJsonTreeViewRoot } from '@ark-ui/vue/json-tree-view';
import type { JsonTreeViewRootProps } from '@ark-ui/vue/json-tree-view';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './JsonTreeView.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ JsonTreeViewRootProps {
  class?: HTMLAttributes['class'];
  data: JsonTreeViewRootProps['data'];
}

const { class: className, data } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkJsonTreeViewRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data="data"
    data-slot="json-tree-view-root"
  >
    <slot />
  </ArkJsonTreeViewRoot>
</template>