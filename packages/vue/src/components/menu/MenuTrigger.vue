<script setup lang="ts">
import { MenuTrigger as ArkMenuTrigger } from '@ark-ui/vue/menu';
import type { MenuTriggerProps } from '@ark-ui/vue/menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Menu.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.trigger, className)"
    data-slot="menu-trigger"
  >
    <slot />
  </ArkMenuTrigger>
</template>