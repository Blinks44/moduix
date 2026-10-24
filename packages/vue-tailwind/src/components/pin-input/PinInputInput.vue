<script setup lang="ts">
import { PinInputInput as ArkPinInputInput } from '@ark-ui/vue/pin-input';
import type { PinInputInputProps } from '@ark-ui/vue/pin-input';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ PinInputInputProps {
  class?: HTMLAttributes['class'];
  index: number;
}

const props = defineProps<Props>();
const attrs = useAttrs();
</script>

<template>
  <ArkPinInputInput
    v-bind="attrs"
    :class="
      cn(
        'size-control-md flex-none rounded-md border border-border bg-background p-0 text-center text-lg font-medium text-inherit tabular-nums outline-focus-inset outline-offset-focus-inset outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out group-data-[size=lg]/pin-input:size-control-lg group-data-[size=lg]/pin-input:text-xl group-data-[size=sm]/pin-input:size-control-sm group-data-[size=sm]/pin-input:text-md group-data-[size=xl]/pin-input:size-control-xl group-data-[size=xl]/pin-input:text-2xl group-data-[size=xs]/pin-input:size-control-xs group-data-[size=xs]/pin-input:text-sm placeholder:text-muted-foreground focus-visible:outline-ring data-invalid:border-destructive data-invalid:focus-visible:outline-destructive',
        props.class,
      )
    "
    :index="props.index"
    data-slot="pin-input-input"
  />
</template>