<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'kbd'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.kbd
    v-bind="attrs"
    data-scope="kbd"
    data-part="root"
    data-slot="kbd-root"
    :class="
      cn(
        `box-border inline-flex min-h-control-xs min-w-control-xs flex-none items-center justify-center gap-1 rounded-sm border border-border bg-muted px-2 align-middle font-mono text-xs font-medium whitespace-nowrap text-foreground tabular-nums shadow-[inset_0_-1px_0_color-mix(in_oklab,currentColor_12%,transparent)] select-none [&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-3`,
        className,
      )
    "
  >
    <slot />
  </ark.kbd>
</template>