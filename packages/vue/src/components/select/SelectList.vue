<script setup lang="ts">
import { SelectList as ArkSelectList } from '@ark-ui/vue/select';
import type { SelectListProps } from '@ark-ui/vue/select';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Select.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SelectListProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSelectList v-bind="attrs" :class="clsx(styles.list, className)" data-slot="select-list">
    <slot />
  </ArkSelectList>
</template>