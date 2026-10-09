<script setup lang="ts">
import { ListboxItemGroupLabel as ArkListboxItemGroupLabel } from '@ark-ui/vue/listbox';
import type { ListboxItemGroupLabelProps } from '@ark-ui/vue/listbox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Listbox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ListboxItemGroupLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxItemGroupLabel
    v-bind="attrs"
    :class="clsx(styles.itemGroupLabel, className)"
    data-slot="listbox-item-group-label"
  >
    <slot />
  </ArkListboxItemGroupLabel>
</template>