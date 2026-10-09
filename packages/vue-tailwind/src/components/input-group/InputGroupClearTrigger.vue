<script setup lang="ts">
import { useAttrs, computed, inject } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import CloseButton from '../close-button/CloseButton.vue';
import type { Props as CloseButtonProps } from '../close-button/CloseButton.vue';
import { defaultInputGroupSize, InputGroupSizeContextKey } from './context';
import type { InputGroupSize } from './context';
import { inputGroupClearTriggerVariants } from './variants';

defineOptions({ inheritAttrs: false });

export interface Props
  extends /* @vue-ignore */ Omit<
    CloseButtonProps,
    'class' | 'type' | 'ariaLabel' | 'ariaLabelledby'
  > {
  ariaLabel?: string;
  ariaLabelledby?: string;
  class?: HTMLAttributes['class'];
  size?: InputGroupSize;
  type?: CloseButtonProps['type'];
}

const { ariaLabel, ariaLabelledby, class: className, size, type = 'button' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const groupSize = inject(
  InputGroupSizeContextKey,
  computed(() => defaultInputGroupSize),
);
const buttonSize = computed(() => size ?? groupSize.value);
</script>

<template>
  <CloseButton
    v-bind="attrs"
    :class="cn(inputGroupClearTriggerVariants({ size: buttonSize }), className)"
    :data-size="buttonSize"
    :type="type"
    :aria-label="ariaLabel ?? (ariaLabelledby == null ? 'Clear input' : undefined)"
    :aria-labelledby="ariaLabelledby"
    data-scope="input-group"
    data-part="clear-trigger"
    data-slot="input-group-clear-trigger"
  >
    <slot><CloseIcon class="size-4 shrink-0" /></slot>
  </CloseButton>
</template>