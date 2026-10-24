<script setup lang="ts">
import { TabsRoot as ArkTabsRoot } from '@ark-ui/vue/tabs';
import type { TabsRootEmits, TabsRootProps } from '@ark-ui/vue/tabs';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

defineOptions({ inheritAttrs: false });

export type TabsVariant = 'default' | 'line';
export type TabsSize = 'sm' | 'md' | 'lg';

export interface Props extends /* @vue-ignore */ TabsRootProps {
  class?: HTMLAttributes['class'];
  variant?: TabsVariant;
  size?: TabsSize;
  fitted?: boolean;
}

export interface Emits extends /* @vue-ignore */ TabsRootEmits {}

const { class: className, variant = 'default', size = 'md', fitted } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTabsRoot
    v-bind="attrs"
    :class="
      cn(
        'group/tabs flex w-full min-w-0 flex-col gap-3 text-foreground [--_tabs-size:var(--moduix-size-md)] data-[orientation=vertical]:flex-row data-[size=lg]:[--_tabs-size:var(--moduix-size-lg)] data-[size=sm]:[--_tabs-size:var(--moduix-size-sm)]',
        className,
      )
    "
    :data-variant="variant"
    :data-size="size"
    :data-fitted="fitted ? '' : undefined"
    data-slot="tabs-root"
  >
    <slot />
  </ArkTabsRoot>
</template>