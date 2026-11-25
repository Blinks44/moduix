<script setup lang="ts">
import { TabsRoot as ArkTabsRoot } from '@ark-ui/vue/tabs';
import type { TabsRootEmits, TabsRootProps } from '@ark-ui/vue/tabs';
import { cva } from 'class-variance-authority';
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

const tabsRootVariants = cva(
  'group/tabs flex w-full min-w-0 flex-col gap-3 text-foreground data-[orientation=vertical]:flex-row',
  {
    variants: {
      size: {
        sm: '[--_tabs-size:var(--moduix-size-sm)]',
        md: '[--_tabs-size:var(--moduix-size-md)]',
        lg: '[--_tabs-size:var(--moduix-size-lg)]',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

const { class: className, variant = 'default', size = 'md', fitted } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTabsRoot
    v-bind="attrs"
    :class="cn(tabsRootVariants({ size }), className)"
    :data-variant="variant"
    :data-size="size"
    :data-fitted="fitted ? '' : undefined"
    data-slot="tabs-root"
  >
    <slot />
  </ArkTabsRoot>
</template>