<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'header'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.header
    v-bind="attrs"
    :class="
      cn(
        'flex flex-none items-center gap-2 p-3 group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:px-1 [&>*:only-child]:w-full group-data-[state=collapsed]/sidebar-panel:[&>*:only-child]:w-auto',
        className,
      )
    "
    data-scope="sidebar"
    data-part="header"
    data-slot="sidebar-header"
  >
    <slot />
  </ark.header>
</template>