<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'h3'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.h3
    v-bind="attrs"
    :class="
      cn(
        'min-w-0 flex-1 truncate px-2 text-xs leading-4 font-medium text-muted-foreground group-data-[state=collapsed]/sidebar-panel:sr-only',
        className,
      )
    "
    data-scope="sidebar"
    data-part="group-label"
    data-slot="sidebar-group-label"
  >
    <slot />
  </ark.h3>
</template>