<script setup lang="ts">
import { ListboxEmpty as ArkListboxEmpty } from '@ark-ui/vue/listbox';
import type { ListboxEmptyProps } from '@ark-ui/vue/listbox';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Listbox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ListboxEmptyProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkListboxEmpty v-bind="attrs" :class="clsx(styles.empty, className)" data-slot="listbox-empty">
    <slot />
  </ArkListboxEmpty>
</template>