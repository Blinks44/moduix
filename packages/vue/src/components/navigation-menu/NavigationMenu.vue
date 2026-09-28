<script setup lang="ts">
import { NavigationMenuRoot as ArkNavigationMenuRoot } from '@ark-ui/vue/navigation-menu';
import type { NavigationMenuRootEmits, NavigationMenuRootProps } from '@ark-ui/vue/navigation-menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './NavigationMenu.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NavigationMenuRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ NavigationMenuRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNavigationMenuRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-slot="navigation-menu-root"
  >
    <slot />
  </ArkNavigationMenuRoot>
</template>