<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'ol'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.ol
    v-bind="attrs"
    data-slot="breadcrumbs-list"
    :class="
      cn(
        'flex min-w-0 items-center gap-1 whitespace-nowrap [&>[data-slot=breadcrumbs-item]:last-child]:max-w-64 [&>[data-slot=breadcrumbs-item]:last-child]:flex-auto',
        className,
      )
    "
  >
    <slot />
  </ark.ol>
</template>