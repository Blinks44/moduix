<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'span'> {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild = false, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.span
    v-bind="attrs"
    :as-child="asChild"
    data-scope="tag"
    data-part="start-element"
    data-slot="tag-start-element"
    :class="
      cn(
        'inline-flex min-w-0 shrink-0 items-center justify-center [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0',
        className,
      )
    "
  >
    <slot />
  </ark.span>
</template>