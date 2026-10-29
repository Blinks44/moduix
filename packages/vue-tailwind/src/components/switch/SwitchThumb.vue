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
        'absolute start-0.5 top-1/2 inline-flex aspect-square h-[calc(100%-var(--moduix-spacing-0-5)*2)] -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-input text-muted transition-[inset-inline-start,translate,scale,background-color,box-shadow,color] duration-normal ease-in-out data-[state=checked]:start-[calc(100%-var(--moduix-spacing-0-5))] data-[state=checked]:-translate-x-full data-[state=checked]:scale-100 data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary data-[state=checked]:shadow-sm [&>svg]:size-[65%] data-[state=checked]:[&[dir=rtl]]:translate-x-full',
        className,
      )
    "
    data-slot="switch-thumb"
  >
    <slot />
  </ArkSwitchThumb>
</template>