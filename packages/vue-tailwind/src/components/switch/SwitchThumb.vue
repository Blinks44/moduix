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
        'absolute start-0.5 top-1/2 inline-flex size-[var(--switch-thumb-size)] shrink-0 translate-x-0 -translate-y-1/2 items-center justify-center rounded-full border-transparent bg-background text-muted shadow-sm transition-[inset-inline-start,translate,background-color,color] duration-200 ease-in-out data-[state=checked]:start-[calc(100%-var(--moduix-spacing-0-5))] data-[state=checked]:-translate-x-full data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary motion-reduce:transition-none [&:dir(rtl)]:data-[state=checked]:translate-x-full [&>svg]:block [&>svg]:size-[65%] [&>svg]:shrink-0',
        className,
      )
    "
    data-slot="switch-thumb"
  >
    <slot />
  </ArkSwitchThumb>
</template>