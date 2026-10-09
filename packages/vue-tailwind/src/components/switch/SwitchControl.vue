<script setup lang="ts">
import { SwitchControl as ArkSwitchControl } from '@ark-ui/vue/switch';
import type { SwitchControlProps as ArkSwitchControlProps } from '@ark-ui/vue/switch';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import SwitchThumb from './SwitchThumb.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkSwitchControlProps {
  class?: HTMLAttributes['class'];
}

const { class: className } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSwitchControl
    v-bind="attrs"
    :class="
      cn(
        `relative inline-flex h-[var(--switch-height)] w-11 shrink-0 items-center rounded-full border border-border bg-muted p-0.5 leading-none outline-0 transition-[background-color,border-color,opacity] duration-200 ease-in-out select-none [--switch-height:var(--moduix-size-xs)] [--switch-thumb-size:calc(var(--switch-height)-var(--moduix-spacing-0-5)*2-2px)] group-data-[size=lg]/switch:w-13 group-data-[size=lg]/switch:[--switch-height:1.75rem] group-data-[size=sm]/switch:w-9 group-data-[size=sm]/switch:[--switch-height:1.25rem] group-data-[size=xl]/switch:w-15 group-data-[size=xl]/switch:[--switch-height:var(--moduix-size-sm)] group-data-[size=xs]/switch:w-7 group-data-[size=xs]/switch:[--switch-height:1rem] data-focus-visible:outline-1 data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:border-destructive data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:data-invalid:border-destructive motion-reduce:transition-none [@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly])[data-state='unchecked'][data-hover]]:bg-accent`,
        className,
      )
    "
    data-slot="switch-control"
  >
    <slot>
      <SwitchThumb />
    </slot>
  </ArkSwitchControl>
</template>