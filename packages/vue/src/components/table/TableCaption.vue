<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Table.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'caption'> {
  class?: HTMLAttributes['class'];
  side?: 'top' | 'bottom';
}

const { class: className, side = 'bottom' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.caption
    v-bind="attrs"
    :class="clsx(styles.caption, className)"
    data-scope="table"
    data-part="caption"
    :data-side="side"
    data-slot="table-caption"
  >
    <slot />
  </ark.caption>
</template>