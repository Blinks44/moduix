<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ HTMLArkProps<'span'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ark.span
    v-bind="attrs"
    :class="
      cn(
        `inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-muted-foreground [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4`,
        className,
      )
    "
    data-slot="command-palette-item-icon"
  >
    <slot />
  </ark.span>
</template>