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
        'size-control-md flex-none rounded-md border border-border bg-background px-0 py-0 text-center text-lg font-medium text-foreground tabular-nums outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,background-color] duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none data-disabled:pointer-events-none data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        props.class,
      )
    "
    :index="props.index"
    data-slot="pin-input-input"
  />
</template>