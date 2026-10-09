<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'a'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.a
    v-bind="attrs"
    data-slot="breadcrumbs-link"
    :class="
      cn(
        'block max-w-full min-w-0 truncate rounded-sm px-1 text-muted-foreground no-underline underline-offset-[0.2em] transition-[color] duration-200 ease-in-out outline-none focus-visible:ring-1 focus-visible:ring-ring motion-reduce:transition-none [@media(hover:hover)]:hover:text-foreground',
        className,
      )
    "
  >
    <slot />
  </ark.a>
</template>