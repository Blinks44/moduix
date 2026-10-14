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
        'flex min-w-0 flex-wrap items-center gap-2 px-(--card-spacing) pt-(--card-spacing) last:pb-(--card-spacing)',
        className,
      )
    "
    data-scope="card"
    data-part="footer"
    data-slot="card-footer"
  >
    <slot />
  </ark.div>
</template>