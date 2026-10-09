<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'div'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.div
    v-bind="attrs"
    :class="
      cn(
        'grid w-full min-w-0 justify-items-center gap-4 rounded-xl border border-border bg-[color-mix(in_oklab,var(--color-card)_92%,var(--color-muted))] p-8 text-center text-card-foreground',
        className,
      )
    "
    data-scope="empty"
    data-part="root"
    data-slot="empty-root"
  >
    <slot />
  </ark.div>
</template>