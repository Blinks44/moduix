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
        'box-border inline-flex min-h-control-xs max-w-full min-w-control-xs flex-none items-center justify-center rounded-sm border border-border bg-muted px-2 py-0 text-center align-middle font-mono text-xs font-medium wrap-anywhere text-foreground tabular-nums shadow-[inset_0_-1px_0_color-mix(in_oklab,currentColor_12%,transparent)] select-none',
        className,
      )
    "
  >
    <slot />
  </ark.kbd>
</template>