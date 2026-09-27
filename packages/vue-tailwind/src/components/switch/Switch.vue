<script setup lang="ts">
import { SwitchRoot as ArkSwitchRoot } from '@ark-ui/vue/switch';
import type { SwitchRootEmits, SwitchRootProps } from '@ark-ui/vue/switch';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export type SwitchSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface Props extends /* @vue-ignore */ SwitchRootProps {
  class?: HTMLAttributes['class'];
  size?: SwitchSize;
}

export interface Emits extends /* @vue-ignore */ SwitchRootEmits {}

const { class: className, size = 'md' } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSwitchRoot
    v-bind="attrs"
    :class="
      cn(
        'group/switch inline-flex w-fit cursor-pointer items-center gap-2 align-middle data-disabled:cursor-default data-disabled:opacity-50 data-readonly:cursor-default',
        className,
      )
    "
    :data-size="size"
    data-slot="switch-root"
  >
    <slot />
  </ArkSwitchRoot>
</template>