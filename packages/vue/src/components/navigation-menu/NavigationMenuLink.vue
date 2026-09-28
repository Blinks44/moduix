<script setup lang="ts">
import { NavigationMenuLink as ArkNavigationMenuLink } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuLinkProps } from '@ark-ui/vue/navigation-menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NavigationMenu.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuLinkProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNavigationMenuLink
    v-bind="attrs"
    :class="clsx(styles.link, className)"
    data-slot="navigation-menu-link"
  >
    <slot />
  </ArkNavigationMenuLink>
</template>