<script setup lang="ts">
import { RatingGroupItem as ArkRatingGroupItem } from '@ark-ui/vue/rating-group';
import type { RatingGroupItemProps } from '@ark-ui/vue/rating-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './RatingGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ RatingGroupItemProps {
  class?: HTMLAttributes['class'];
  index: RatingGroupItemProps['index'];
}

const emit = defineEmits<{ pointerdown: [event: PointerEvent] }>();

const { class: className, index } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();

const handlePointerDown = (event: PointerEvent) => {
  emit('pointerdown', event);

  if (event.button !== 0) return;

  const currentTarget = event.currentTarget as HTMLElement | null;
  if (!currentTarget || currentTarget.matches('[data-disabled], [data-readonly]')) return;

  currentTarget.focus({ preventScroll: true, focusVisible: false });
};
</script>

<template>
  <ArkRatingGroupItem
    v-bind="attrs"
    :class="clsx(styles.item, className)"
    :index="index"
    @pointerdown="handlePointerDown"
    data-slot="rating-group-item"
  >
    <slot />
  </ArkRatingGroupItem>
</template>