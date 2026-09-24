<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'span'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.span
    v-bind="attrs"
    data-slot="breadcrumbs-ellipsis"
    aria-hidden="true"
    :class="
      cn(
        'inline-flex min-h-4 min-w-4 items-center justify-center overflow-hidden px-1 text-ellipsis text-muted-foreground',
        className,
      )
    "
  >
    <slot>...</slot>
  </ark.span>
</template>