<script setup lang="ts">
import { TabsRootProvider as ArkTabsRootProvider } from '@ark-ui/vue/tabs';
import type { TabsRootProviderProps } from '@ark-ui/vue/tabs';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
import type { TabsSize, TabsVariant } from './Tabs.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TabsRootProviderProps {
  class?: HTMLAttributes['class'];
  value: TabsRootProviderProps['value'];
  variant?: TabsVariant;
  size?: TabsSize;
  fitted?: boolean;
}

const { class: className, value, variant = 'default', size = 'md', fitted } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTabsRootProvider
    v-bind="attrs"
    :class="
      cn(
        'group/tabs box-border flex w-full min-w-0 flex-col gap-3 text-foreground [--_tabs-size:var(--moduix-size-md)] data-[orientation=vertical]:flex-row data-[size=lg]:[--_tabs-size:var(--moduix-size-lg)] data-[size=sm]:[--_tabs-size:var(--moduix-size-sm)]',
        className,
      )
    "
    :value="value"
    :data-variant="variant"
    :data-size="size"
    :data-fitted="fitted ? '' : undefined"
    data-slot="tabs-root-provider"
  >
    <slot />
  </ArkTabsRootProvider>
</template>