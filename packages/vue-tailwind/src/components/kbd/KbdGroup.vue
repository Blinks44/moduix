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
    v-bind="attrs"
    role="group"
    data-scope="kbd"
    data-part="group"
    data-slot="kbd-group"
    :class="
      cn(
        'box-border inline-flex max-w-full flex-wrap items-center gap-1 border-0 bg-transparent p-0 align-middle text-muted-foreground shadow-none',
        className,
      )
    "
  >
    <slot />
  </ark.span>
</template>