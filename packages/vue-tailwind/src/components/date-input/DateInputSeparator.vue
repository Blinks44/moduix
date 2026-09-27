<script setup lang="ts">
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <span
    aria-hidden="true"
    role="presentation"
    v-bind="attrs"
    :class="cn('text-muted-foreground select-none', className)"
    data-slot="date-input-separator"
  >
    <slot />
  </span>
</template>