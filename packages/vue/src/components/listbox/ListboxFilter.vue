<script setup lang="ts">
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { SearchIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Listbox.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <div v-bind="attrs" :class="clsx(styles.filter, className)" data-slot="listbox-filter">
    <SearchIcon data-slot="listbox-filter-icon" :class="styles.filterIcon" />
    <slot />
  </div>
</template>