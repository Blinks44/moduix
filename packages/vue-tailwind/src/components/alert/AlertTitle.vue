<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'p'> {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ark.p
    v-bind="attrs"
    :class="cn('m-0 min-w-0 text-sm font-semibold [overflow-wrap:anywhere]', className)"
    data-scope="alert"
    data-part="title"
    data-slot="alert-title"
  >
    <slot />
  </ark.p>
</template>