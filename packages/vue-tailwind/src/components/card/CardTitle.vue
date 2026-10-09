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
        'col-start-1 min-w-0 text-lg font-semibold wrap-anywhere group-data-[size=lg]/card:text-xl group-data-[size=sm]/card:text-md',
        className,
      )
    "
    data-scope="card"
    data-part="title"
    data-slot="card-title"
  >
    <slot />
  </ark.h3>
</template>