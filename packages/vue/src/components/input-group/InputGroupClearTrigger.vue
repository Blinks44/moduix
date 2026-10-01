<script setup lang="ts">
import { clsx } from 'clsx';
import { computed, inject, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { CloseIcon } from '@/lib/moduix/icons/ui/Icons';
import CloseButton from '../close-button/CloseButton.vue';
import type { Props as CloseButtonProps } from '../close-button/CloseButton.vue';
import { defaultInputGroupSize, InputGroupSizeContextKey } from './context';
import type { InputGroupSize } from './context';
import styles from './InputGroup.module.css';

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
    :class="clsx(styles.clearTrigger, className)"
    :data-size="buttonSize"
    :type="type"
    :aria-label="ariaLabel ?? (ariaLabelledby == null ? a11yLabels.clearInput : undefined)"
    :aria-labelledby="ariaLabelledby"
    data-scope="input-group"
    data-part="clear-trigger"
    data-slot="input-group-clear-trigger"
  >
    <slot><CloseIcon /></slot>
  </CloseButton>
</template>