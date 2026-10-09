<script setup lang="ts">
import { MenuContextTrigger as ArkMenuContextTrigger } from '@ark-ui/vue/menu';
import type { MenuContextTriggerProps } from '@ark-ui/vue/menu';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Menu.module.css';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuContextTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuContextTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.contextTrigger, className)"
    data-slot="menu-context-trigger"
  >
    <slot />
  </ArkMenuContextTrigger>
</template>