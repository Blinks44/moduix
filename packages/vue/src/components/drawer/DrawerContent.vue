<script setup lang="ts">
import { DrawerContent as ArkDrawerContent } from '@ark-ui/vue/drawer';
import type { DrawerContentProps } from '@ark-ui/vue/drawer';
import { clsx } from 'clsx';
import { computed, inject, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { DrawerVariantContextKey, type DrawerVariant } from './context';
import styles from './Drawer.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DrawerContentProps {
  class?: HTMLAttributes['class'];
  variant?: DrawerVariant;
}

const { class: className, variant } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
const context = inject(DrawerVariantContextKey, { variant: () => undefined });
const rootVariant = computed(() => context.variant());
</script>

<template>
  <ArkDrawerContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    :data-variant="variant ?? rootVariant"
    data-slot="drawer-content"
  >
    <slot />
  </ArkDrawerContent>
</template>