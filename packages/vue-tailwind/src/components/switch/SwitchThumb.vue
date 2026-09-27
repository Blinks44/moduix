<script setup lang="ts">
import { SwitchThumb as ArkSwitchThumb } from '@ark-ui/vue/switch';
import type { SwitchThumbProps as ArkSwitchThumbProps } from '@ark-ui/vue/switch';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkSwitchThumbProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSwitchThumb
    v-bind="attrs"
    :class="
      cn(
        'inline-flex size-5 translate-x-0 items-center justify-center rounded-full border-transparent bg-background text-muted shadow-sm transition-[translate,background-color,color] duration-200 ease-in-out group-data-[size=lg]/switch:size-control-xs group-data-[size=sm]/switch:size-4 group-data-[size=xl]/switch:size-7 group-data-[size=xs]/switch:size-3 data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary group-data-[size=lg]/switch:data-[state=checked]:translate-x-[22px] group-data-[size=sm]/switch:data-[state=checked]:translate-x-[14px] group-data-[size=xl]/switch:data-[state=checked]:translate-x-[26px] group-data-[size=xs]/switch:data-[state=checked]:translate-x-[10px] motion-reduce:transition-none rtl:data-[state=checked]:-translate-x-[18px] group-data-[size=lg]/switch:rtl:data-[state=checked]:-translate-x-[22px] group-data-[size=sm]/switch:rtl:data-[state=checked]:-translate-x-[14px] group-data-[size=xl]/switch:rtl:data-[state=checked]:-translate-x-[26px] group-data-[size=xs]/switch:rtl:data-[state=checked]:-translate-x-[10px] [&>svg]:block [&>svg]:size-[65%] [&>svg]:shrink-0',
        className,
      )
    "
    data-slot="switch-thumb"
  >
    <slot />
  </ArkSwitchThumb>
</template>