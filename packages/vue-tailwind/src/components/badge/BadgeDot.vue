<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

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
    data-scope="badge"
    data-part="dot"
    data-slot="badge-dot"
    aria-hidden="true"
    :class="cn('size-1.5 shrink-0 rounded-full bg-current', className)"
  >
    <slot />
  </ark.span>
</template>