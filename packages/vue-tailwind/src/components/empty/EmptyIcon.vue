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
        'inline-flex min-w-0 items-center justify-center rounded-full bg-muted p-3 text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0',
        className,
      )
    "
    data-scope="empty"
    data-part="icon"
    data-slot="empty-icon"
  >
    <slot />
  </ark.div>
</template>