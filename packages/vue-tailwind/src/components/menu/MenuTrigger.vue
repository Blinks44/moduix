<script setup lang="ts">
import { MenuTrigger as ArkMenuTrigger } from '@ark-ui/vue/menu';
import type { MenuTriggerProps } from '@ark-ui/vue/menu';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

interface Props extends /* @vue-ignore */ MenuTriggerProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
}

const { asChild, class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();
const attrs = useAttrs();
</script>

<template>
  <ArkMenuTrigger
    v-bind="attrs"
    :as-child="asChild"
    :class="
      cn(
        !asChild &&
          'inline-flex min-h-control-md cursor-pointer items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-1 text-sm font-medium text-foreground outline-0 transition-colors duration-200 ease-in-out select-none focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-ring active:bg-muted data-disabled:pointer-events-none data-disabled:opacity-50 data-[current]:data-[state=open]:bg-muted motion-reduce:transition-none [@media(hover:hover)]:hover:bg-muted',
        className,
      )
    "
    data-slot="menu-trigger"
  >
    <slot />
  </ArkMenuTrigger>
</template>