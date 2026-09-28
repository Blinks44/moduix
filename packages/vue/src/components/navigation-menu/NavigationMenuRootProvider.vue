<script setup lang="ts">
import { NavigationMenuRootProvider as ArkNavigationMenuRootProvider } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuRootProviderProps } from '@ark-ui/vue/navigation-menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NavigationMenu.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuRootProviderProps {
  class?: HTMLAttributes['class'];
  value: NavigationMenuRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNavigationMenuRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="navigation-menu-root-provider"
  >
    <slot />
  </ArkNavigationMenuRootProvider>
</template>