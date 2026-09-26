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
        'grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-x-2 gap-y-1 px-6 pt-6 group-data-[size=lg]/card:px-8 group-data-[size=lg]/card:pt-8 group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:pt-4',
        className,
      )
    "
    data-scope="card"
    data-part="header"
    data-slot="card-header"
  >
    <slot />
  </ark.div>
</template>