<script setup lang="ts">
import { SwitchRootProvider as ArkSwitchRootProvider } from '@ark-ui/vue/switch';
import type { SwitchRootProviderProps as ArkSwitchRootProviderProps } from '@ark-ui/vue/switch';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import type { SwitchSize } from './Switch.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ ArkSwitchRootProviderProps {
  class?: HTMLAttributes['class'];
  size?: SwitchSize;
  value: ArkSwitchRootProviderProps['value'];
}

const { class: className, size = 'md', value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSwitchRootProvider
    v-bind="attrs"
    :class="
      cn(
        'group/switch inline-flex w-fit cursor-pointer items-center gap-2 align-middle data-disabled:cursor-default data-disabled:opacity-50 data-readonly:cursor-default',
        className,
      )
    "
    :data-size="size"
    :value="value"
    data-slot="switch-root-provider"
  >
    <slot />
  </ArkSwitchRootProvider>
</template>