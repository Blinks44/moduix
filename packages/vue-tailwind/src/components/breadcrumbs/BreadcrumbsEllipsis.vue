<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { EllipsisIcon } from '@/lib/moduix/icons/ui/Icons';

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
    data-slot="breadcrumbs-ellipsis"
    aria-hidden="true"
    :class="
      cn(
        'inline-flex min-h-4 min-w-4 items-center justify-center rounded-sm px-1 transition-[color] duration-200 ease-in-out motion-reduce:transition-none [:where(button:has(>&))]:cursor-pointer [:where(button:has(>&))]:outline-none [button:focus-visible>&]:ring-1 [button:focus-visible>&]:ring-ring [@media(hover:hover)]:[button:hover>&]:text-foreground',
        className,
      )
    "
  >
    <slot><EllipsisIcon class="size-[1em] flex-none" /></slot>
  </ark.span>
</template>