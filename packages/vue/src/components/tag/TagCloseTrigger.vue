<script setup lang="ts">
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import CloseButton from '../close-button/CloseButton.vue';
import styles from './Tag.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'button'> {
  ariaLabel?: string;
  ariaLabelledby?: string;
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, ariaLabelledby, asChild = false, class: className } = defineProps<Props>();
const slots = defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <CloseButton
    v-bind="attrs"
    :as-child="asChild"
    :aria-label="
      ariaLabel ??
      (!asChild && !slots.default && ariaLabelledby == null ? a11yLabels.closeTag : undefined)
    "
    :aria-labelledby="ariaLabelledby"
    data-scope="tag"
    data-part="close-trigger"
    data-slot="tag-close-trigger"
    :class="clsx(styles.closeTrigger, className)"
  >
    <slot v-if="slots.default" />
  </CloseButton>
</template>