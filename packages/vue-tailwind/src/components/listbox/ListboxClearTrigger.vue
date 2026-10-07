<script setup lang="ts">
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { CloseIcon } from '@/lib/moduix/icons/ui/Icons';
import CloseButton from '../close-button/CloseButton.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'button'> {
  ariaLabel?: string;
  class?: HTMLAttributes['class'];
  type?: 'button' | 'reset' | 'submit';
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <CloseButton
    v-bind="attrs"
    :aria-label="props.ariaLabel ?? 'Clear search'"
    :class="
      cn(
        'absolute end-3 top-1/2 size-control-xs -translate-y-1/2 rounded-sm bg-transparent text-muted-foreground [&>svg]:size-4 [@media(hover:hover)]:hover:bg-muted [@media(hover:hover)]:hover:text-foreground',
        props.class,
      )
    "
    data-slot="listbox-clear-trigger"
    :type="props.type ?? 'button'"
  >
    <slot><CloseIcon class="size-3 shrink-0" /></slot>
  </CloseButton>
</template>