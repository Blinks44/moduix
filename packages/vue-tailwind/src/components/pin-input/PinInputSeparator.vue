<script setup lang="ts">
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLAttributes {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <span
    aria-hidden="true"
    role="presentation"
    v-bind="attrs"
    :class="
      cn(
        'pointer-events-none inline-flex size-4 flex-none items-center justify-center leading-none text-muted-foreground [&>svg]:size-full [&>svg]:flex-none',
        className,
      )
    "
    data-slot="pin-input-separator"
  >
    <slot><SeparatorMarkIcon /></slot>
  </span>
</template>