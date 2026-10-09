<script setup lang="ts">
import { NavigationMenuTrigger as ArkNavigationMenuTrigger } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuTriggerProps } from '@ark-ui/vue/navigation-menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NavigationMenu.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuTriggerProps {
  asChild?: NavigationMenuTriggerProps['asChild'];
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNavigationMenuTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.trigger, className)"
    data-slot="navigation-menu-trigger"
  >
    <slot />
  </ArkNavigationMenuTrigger>
</template>