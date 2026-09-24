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
        'min-w-0 px-6 pt-4 pb-6 text-sm wrap-anywhere text-muted-foreground group-data-[size=lg]/card:px-8 group-data-[size=lg]/card:pb-8 group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:pb-4 first:pt-6 group-data-[size=lg]/card:first:pt-8 group-data-[size=sm]/card:first:pt-4',
        className,
      )
    "
    data-scope="card"
    data-part="body"
    data-slot="card-body"
  >
    <slot />
  </ark.div>
</template>