<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Bleed.module.css';

type BleedAmount = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type BleedInline = BleedAmount | 'full';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  block?: BleedAmount;
  class?: HTMLAttributes['class'];
  inline?: BleedInline;
}

const { block = 'none', class: className, inline = 'full' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-scope="bleed"
    data-part="root"
    data-slot="bleed-root"
    :data-inline="inline"
    :data-block="block"
  >
    <slot />
  </ark.div>
</template>