<script setup lang="ts">
import { NumberInputInput as ArkNumberInputInput } from '@ark-ui/vue/number-input';
import type { NumberInputInputProps } from '@ark-ui/vue/number-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ NumberInputInputProps {
  class?: HTMLAttributes['class'];
}

const props = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputInput
    v-bind="attrs"
    :class="
      cn(
        'h-control-md w-24 rounded-none border-x-0 border-y border-border bg-background px-3 py-1 text-center text-md leading-6 text-foreground tabular-nums outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out group-data-invalid/number-input:border-t-destructive group-data-invalid/number-input:border-b-destructive focus-visible:z-1 focus-visible:outline-ring group-data-invalid/number-input:focus-visible:outline-destructive data-invalid:border-t-destructive data-invalid:border-b-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        props.class,
      )
    "
    data-slot="number-input-input"
  >
    <slot />
  </ArkNumberInputInput>
</template>