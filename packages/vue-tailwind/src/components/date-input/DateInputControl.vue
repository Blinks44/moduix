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
  'box-border inline-flex min-h-control-md w-full items-center gap-1 rounded-md border border-border bg-background px-3 py-1 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out focus-within:outline-ring data-disabled:pointer-events-none data-focus:outline-ring data-invalid:border-destructive data-invalid:focus-within:outline-destructive data-invalid:data-focus:outline-destructive motion-reduce:transition-none';
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