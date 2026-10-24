<script setup lang="ts">
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import { SeparatorMarkIcon } from '@/lib/moduix/icons/ui';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLAttributes {
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
    :class="cn('inline-flex size-4 flex-none text-muted-foreground [&>svg]:size-full', className)"
    data-slot="pin-input-separator"
  >
    <slot><SeparatorMarkIcon /></slot>
  </span>
</template>