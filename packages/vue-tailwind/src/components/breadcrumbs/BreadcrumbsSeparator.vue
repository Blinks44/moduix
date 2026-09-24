<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { ChevronRightIcon } from '@/lib/moduix/icons/ui/Icons';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'li'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.li
    v-bind="attrs"
    data-slot="breadcrumbs-separator"
    aria-hidden="true"
    :class="
      cn(
        'inline-flex items-center text-[length:0.875em] leading-none text-muted-foreground select-none',
        className,
      )
    "
  >
    <slot><ChevronRightIcon class="size-[1em] flex-none rtl:rotate-180" /></slot>
  </ark.li>
</template>