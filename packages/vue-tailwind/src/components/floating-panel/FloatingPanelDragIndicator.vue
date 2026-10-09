<script setup lang="ts">
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { GripIcon } from '@/lib/moduix/icons/ui/Icons';

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
    v-bind="attrs"
    :class="
      cn(
        'inline-flex flex-none items-center justify-center text-muted-foreground [&>svg]:size-4',
        className,
      )
    "
    data-slot="floating-panel-drag-indicator"
  >
    <slot><GripIcon /></slot>
  </span>
</template>