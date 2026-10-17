<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import type { InputGroupAddonAlign } from './context';
import styles from './InputGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'span'> {
  align?: InputGroupAddonAlign;
  class?: HTMLAttributes['class'];
}

const { align = 'inline', class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.span
    v-bind="attrs"
    :class="clsx(styles.text, className)"
    data-scope="input-group"
    data-part="text"
    data-slot="input-group-text"
    :data-align="align"
  >
    <slot />
  </ark.span>
</template>