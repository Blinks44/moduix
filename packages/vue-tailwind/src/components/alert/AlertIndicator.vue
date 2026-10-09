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
    aria-hidden="true"
    v-bind="attrs"
    :class="
      cn(
        'mt-0.5 inline-flex size-4 shrink-0 items-center justify-center text-muted-foreground group-data-[status=error]/alert:text-destructive group-data-[status=success]/alert:text-success group-data-[status=warning]/alert:text-warning [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
        className,
      )
    "
    data-scope="alert"
    data-part="indicator"
    data-slot="alert-indicator"
  >
    <slot />
  </ark.span>
</template>