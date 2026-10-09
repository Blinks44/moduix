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
        'flex min-w-0 flex-wrap items-center gap-2 px-6 pb-6 group-data-[size=lg]/card:px-8 group-data-[size=lg]/card:pb-8 group-data-[size=sm]/card:px-4 group-data-[size=sm]/card:pb-4',
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