<script setup lang="ts">
import { HoverCardTrigger as ArkHoverCardTrigger } from '@ark-ui/vue/hover-card';
import type { HoverCardTriggerProps } from '@ark-ui/vue/hover-card';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './HoverCard.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HoverCardTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkHoverCardTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(!asChild && styles.trigger, className)"
    data-slot="hover-card-trigger"
  >
    <slot />
  </ArkHoverCardTrigger>
</template>