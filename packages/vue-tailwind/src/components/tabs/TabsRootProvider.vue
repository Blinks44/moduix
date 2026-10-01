<script setup lang="ts">
import { TabsRootProvider as ArkTabsRootProvider } from '@ark-ui/vue/tabs';
import type { TabsRootProviderProps } from '@ark-ui/vue/tabs';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

type TabsVariant = 'default' | 'line';

export interface Props extends /* @vue-ignore */ TabsRootProviderProps {
  class?: HTMLAttributes['class'];
  value: TabsRootProviderProps['value'];
  variant?: TabsVariant;
}

const { class: className, value, variant = 'default' } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const orientation = computed(
  () =>
    (
      value.getRootProps() as {
        'data-orientation'?: 'horizontal' | 'vertical';
      }
    )['data-orientation'],
);
</script>

<template>
  <ArkTabsRootProvider
    v-bind="attrs"
    :class="
      cn(
        'group/tabs box-border flex w-full min-w-0 flex-col gap-3 text-foreground data-[orientation=vertical]:flex-row data-[orientation=vertical]:items-stretch',
        className,
      )
    "
    :value="value"
    :data-variant="orientation === 'vertical' ? 'default' : variant"
    data-slot="tabs-root-provider"
  >
    <slot />
  </ArkTabsRootProvider>
</template>