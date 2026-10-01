<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'caption'> {
  class?: HTMLAttributes['class'];
  side?: 'top' | 'bottom';
}

const { class: className, side = 'bottom' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.caption
    v-bind="attrs"
    :class="
      cn(
        'px-4 text-left text-sm leading-5 text-pretty text-muted-foreground group-data-[size=lg]/table:px-5 group-data-[size=sm]/table:px-3 data-[side=bottom]:caption-bottom data-[side=bottom]:pt-3 data-[side=bottom]:pb-2 data-[side=top]:caption-top data-[side=top]:pt-2 data-[side=top]:pb-3',
        className,
      )
    "
    data-scope="table"
    data-part="caption"
    :data-side="side"
    data-slot="table-caption"
  >
    <slot />
  </ark.caption>
</template>