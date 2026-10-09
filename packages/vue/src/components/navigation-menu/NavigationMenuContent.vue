<script setup lang="ts">
import { NavigationMenuContent as ArkNavigationMenuContent } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuContentProps } from '@ark-ui/vue/navigation-menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NavigationMenu.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNavigationMenuContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    data-slot="navigation-menu-content"
  >
    <slot />
  </ArkNavigationMenuContent>
</template>