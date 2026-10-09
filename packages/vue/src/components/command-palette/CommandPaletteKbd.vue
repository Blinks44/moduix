<script setup lang="ts">
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import Kbd from '../kbd/Kbd.vue';
import styles from './CommandPalette.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ HTMLArkProps<'kbd'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <Kbd v-bind="attrs" :class="clsx(styles.kbd, className)" data-slot="command-palette-kbd">
    <slot />
  </Kbd>
</template>