<script setup lang="ts">
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import CloseButton from '../close-button/CloseButton.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'button'> {
  ariaLabel?: string;
  class?: HTMLAttributes['class'];
}

const { ariaLabel, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <CloseButton
    v-bind="attrs"
    :aria-label="ariaLabel ?? a11yLabels.clearSearch"
    :class="cn('absolute end-3 top-1/2 size-control-xs -translate-y-1/2', className)"
    data-slot="listbox-clear-trigger"
  >
    <slot />
  </CloseButton>
</template>