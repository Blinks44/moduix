<script setup lang="ts">
import { DateInputControl as ArkDateInputControl } from '@ark-ui/vue/date-input';
import type { DateInputControlProps } from '@ark-ui/vue/date-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ DateInputControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const controlClass =
  'flex min-h-control-md w-full items-center gap-1 rounded-md border border-border bg-background px-3 py-1 text-md text-foreground outline-focus-inset outline-offset-focus-inset outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out data-disabled:pointer-events-none data-focus:outline-ring data-invalid:border-destructive data-invalid:data-focus:outline-destructive';
</script>

<template>
  <ArkDateInputControl
    v-bind="attrs"
    :class="cn(controlClass, className)"
    data-slot="date-input-control"
  >
    <slot />
  </ArkDateInputControl>
</template>