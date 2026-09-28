<script setup lang="ts">
import { HoverCardArrow as ArkHoverCardArrow } from '@ark-ui/vue/hover-card';
import type { HoverCardArrowProps } from '@ark-ui/vue/hover-card';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './HoverCard.module.css';
import HoverCardArrowTip from './HoverCardArrowTip.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HoverCardArrowProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkHoverCardArrow
    v-bind="attrs"
    :class="clsx(styles.arrow, className)"
    data-slot="hover-card-arrow"
  >
    <slot><HoverCardArrowTip /></slot>
  </ArkHoverCardArrow>
</template>