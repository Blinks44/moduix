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

const attrs = useAttrs();
</script>

<template>
  <ArkNumberInputInput
    v-bind="attrs"
    :class="
      cn(
        'h-control-md w-24 rounded-none border-x-0 border-y border-input bg-background px-3 py-1 text-center text-md leading-6 text-foreground tabular-nums transition-[border-color] duration-normal ease-in-out outline-none group-focus-within/number-input-control:border-ring group-data-invalid/number-input:border-destructive group-data-[size=lg]/number-input:h-control-lg group-data-[size=lg]/number-input:px-4 group-data-[size=lg]/number-input:text-lg group-data-[size=lg]/number-input:leading-7 group-data-[size=sm]/number-input:h-control-sm group-data-[size=sm]/number-input:px-2 group-data-[size=sm]/number-input:text-sm group-data-[size=sm]/number-input:leading-5 group-data-[size=xl]/number-input:h-control-xl group-data-[size=xl]/number-input:px-4 group-data-[size=xl]/number-input:py-2 group-data-[size=xl]/number-input:text-lg group-data-[size=xl]/number-input:leading-7 group-data-[size=xs]/number-input:h-control-xs group-data-[size=xs]/number-input:px-2 group-data-[size=xs]/number-input:py-0.5 group-data-[size=xs]/number-input:text-xs group-data-[size=xs]/number-input:leading-4',
        props.class,
      )
    "
    data-slot="number-input-input"
  />
</template>