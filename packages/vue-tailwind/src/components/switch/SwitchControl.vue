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
        `relative inline-flex h-control-xs w-11 shrink-0 rounded-full border border-border bg-muted transition-[background-color,border-color] duration-normal ease-in-out select-none group-data-[size=lg]/switch:h-[1.75rem] group-data-[size=lg]/switch:w-13 group-data-[size=sm]/switch:h-[1.25rem] group-data-[size=sm]/switch:w-9 group-data-[size=xl]/switch:h-control-sm group-data-[size=xl]/switch:w-15 group-data-[size=xs]/switch:h-[1rem] group-data-[size=xs]/switch:w-7 data-focus-visible:outline-focus-inset data-focus-visible:outline-offset-1 data-focus-visible:outline-ring data-invalid:border-destructive data-invalid:data-focus-visible:outline-destructive data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:data-invalid:border-destructive [@media(hover:hover)]:[&:not([data-disabled]):not([data-readonly])[data-state='unchecked'][data-hover]]:bg-accent`,
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