<script lang="ts">
import type { CollectionItem } from '@ark-ui/vue/collection';
import type { ListboxItemProps } from '@ark-ui/vue/listbox';
import type { HTMLAttributes } from 'vue';

export interface Props<T extends CollectionItem>
  extends /* @vue-ignore */ Omit<ListboxItemProps, 'item'> {
  class?: HTMLAttributes['class'];
  item: T;
}
</script>

<script setup lang="ts" generic="T extends CollectionItem">
import { ListboxItem as ArkListboxItem } from '@ark-ui/vue/listbox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import styles from './Listbox.module.css';

defineOptions({ inheritAttrs: false });

const { class: className, item } = defineProps<Props<T>>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxItem
    v-bind="attrs"
    :class="clsx(styles.item, className)"
    :item="item"
    data-slot="listbox-item"
  >
    <slot />
  </ArkListboxItem>
</template>