<script setup lang="ts">
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs, useSlots } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import CloseButton from '../close-button/CloseButton.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'button'> {
  ariaLabel?: string;
  ariaLabelledby?: string;
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, ariaLabelledby, asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const slots = useSlots();
</script>

<template>
  <CloseButton
    v-bind="attrs"
    :as-child="asChild"
    :aria-label="
      ariaLabel ?? (!asChild && !slots.default && ariaLabelledby == null ? 'Remove tag' : undefined)
    "
    :aria-labelledby="ariaLabelledby"
    data-scope="tag"
    data-part="close-trigger"
    data-slot="tag-close-trigger"
    :class="
      cn(
        'size-4 rounded-full bg-transparent p-0 text-inherit focus-visible:outline-1 focus-visible:outline-offset-0 [&>svg]:size-4 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-current/12 [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-inherit',
        className,
      )
    "
  >
    <slot v-if="slots.default" />
  </CloseButton>
</template>