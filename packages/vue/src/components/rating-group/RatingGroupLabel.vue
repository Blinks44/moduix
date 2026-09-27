<script setup lang="ts">
import { RatingGroupLabel as ArkRatingGroupLabel } from '@ark-ui/vue/rating-group';
import type { RatingGroupLabelProps } from '@ark-ui/vue/rating-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './RatingGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RatingGroupLabelProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkRatingGroupLabel
    v-bind="attrs"
    :class="clsx(styles.label, className)"
    data-slot="rating-group-label"
  >
    <slot />
  </ArkRatingGroupLabel>
</template>