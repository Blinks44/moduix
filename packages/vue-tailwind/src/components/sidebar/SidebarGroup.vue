<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'section'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.section
    v-bind="attrs"
    :class="
      cn('flex flex-col gap-1 p-3 group-data-[state=collapsed]/sidebar-panel:px-1', className)
    "
    data-scope="sidebar"
    data-part="group"
    data-slot="sidebar-group"
  >
    <slot />
  </ark.section>
</template>