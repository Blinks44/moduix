<script setup lang="ts">
import { useAttrs, computed, inject } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import Button from '../button/Button.vue';
import type { Props as ButtonProps } from '../button/Button.vue';
import { defaultInputGroupSize, InputGroupSizeContextKey } from './context';
import { inputGroupButtonClass } from './variants';

defineOptions({ inheritAttrs: false });

export interface Props
  extends /* @vue-ignore */ Omit<ButtonProps, 'class' | 'size' | 'type' | 'variant'> {
  class?: HTMLAttributes['class'];
  size?: ButtonProps['size'];
  type?: ButtonProps['type'];
  variant?: ButtonProps['variant'];
}

const { class: className, size, type = 'button', variant = 'ghost' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const groupSize = inject(
  InputGroupSizeContextKey,
  computed(() => defaultInputGroupSize),
);
const buttonSize = computed(() => size ?? groupSize.value);
</script>

<template>
  <Button
    v-bind="attrs"
    :class="cn(inputGroupButtonClass, className)"
    :size="buttonSize"
    :type="type"
    :variant="variant"
    data-slot="input-group-button"
  >
    <slot />
  </Button>
</template>