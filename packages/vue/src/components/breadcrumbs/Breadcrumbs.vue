<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { useA11yLabels } from '@/lib/moduix/a11yLabels';
import styles from './Breadcrumbs.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'nav'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const labels = useA11yLabels();
</script>

<template>
  <ark.nav
    :aria-label="labels.breadcrumb"
    v-bind="attrs"
    data-slot="breadcrumbs-root"
    :class="clsx(styles.root, className)"
  >
    <slot />
  </ark.nav>
</template>