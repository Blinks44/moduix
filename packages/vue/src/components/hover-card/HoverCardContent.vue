<script setup lang="ts">
import { HoverCardContent as ArkHoverCardContent } from '@ark-ui/vue/hover-card';
import type { HoverCardContentProps } from '@ark-ui/vue/hover-card';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './HoverCard.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HoverCardContentProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkHoverCardContent
    v-bind="attrs"
    :class="clsx(styles.content, className)"
    data-slot="hover-card-content"
  >
    <slot />
  </ArkHoverCardContent>
</template>