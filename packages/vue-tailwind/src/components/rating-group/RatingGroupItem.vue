<script setup lang="ts">
import { RatingGroupItem as ArkRatingGroupItem } from '@ark-ui/vue/rating-group';
import type { RatingGroupItemProps } from '@ark-ui/vue/rating-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
    :class="
      cn(
        'inline-flex cursor-pointer rounded-sm outline-focus-inset outline-offset-focus-inset outline-transparent focus-visible:outline-focus-inset focus-visible:outline-offset-1 focus-visible:outline-ring data-disabled:cursor-default data-readonly:cursor-default',
        className,
      )
    "
    :index="index"
    @pointerdown="handlePointerDown"
    data-slot="rating-group-item"
  >
    <slot />
  </ArkRatingGroupItem>
</template>