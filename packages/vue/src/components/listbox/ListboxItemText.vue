<script setup lang="ts">
import { ListboxItemText as ArkListboxItemText } from '@ark-ui/vue/listbox';
import type { ListboxItemTextProps } from '@ark-ui/vue/listbox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Listbox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ListboxItemTextProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxItemText
    v-bind="attrs"
    :class="clsx(styles.itemText, className)"
    data-slot="listbox-item-text"
  >
    <slot />
  </ArkListboxItemText>
</template>