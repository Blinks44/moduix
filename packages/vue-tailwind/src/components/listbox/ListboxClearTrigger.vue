<script setup lang="ts">
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { CloseIcon } from '@/internal/icons/ui/Icons';
import { cn } from '@/lib/moduix/cn';
import CloseButton from '../close-button/CloseButton.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'button'> {
  class?: HTMLAttributes['class'];
  type?: 'button' | 'reset' | 'submit';
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const ariaLabel = computed(() => (attrs['aria-label'] as string | undefined) ?? 'Clear search');
</script>

<template>
  <CloseButton
    v-bind="attrs"
    :aria-label="ariaLabel"
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