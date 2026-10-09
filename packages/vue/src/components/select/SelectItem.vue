<script lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import type { SelectItemProps } from '@ark-ui/vue/select';
import type { HTMLAttributes } from 'vue';

export interface Props<T extends CollectionItem>
  extends /* @vue-ignore */ Omit<SelectItemProps, 'item'> {
  class?: HTMLAttributes['class'];
  item: T;
}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { SelectItem as ArkSelectItem } from '@ark-ui/vue/select';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import styles from './Select.module.css';

defineOptions({ inheritAttrs: false });

const { class: className, item } = defineProps<Props<T>>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectItem
    v-bind="attrs"
    :class="clsx(styles.item, className)"
    :item="item"
    data-slot="select-item"
  >
    <slot />
  </ArkSelectItem>
</template>