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
        'mt-0.5 inline-flex size-4 shrink-0 items-center justify-center text-(color:--alert-indicator-color) [&_svg]:pointer-events-none [&_svg]:shrink-0 [:where(&_svg)]:size-4',
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