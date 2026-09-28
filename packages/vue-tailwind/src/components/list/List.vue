<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

type ListMarker = 'disc' | 'decimal' | 'none';
type ListGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ListTone = 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';

const listVariants = cva('flex flex-col font-regular tracking-normal list-outside break-words', {
  variants: {
    as: {
      ul: null,
      ol: null,
    },
    gap: {
      xs: 'gap-space-xs',
      sm: 'gap-space-sm',
      md: 'gap-space-md',
      lg: 'gap-space-lg',
      xl: 'gap-space-xl',
      '2xl': 'gap-space-2xl',
    },
    marker: {
      auto: null,
      disc: 'list-disc ps-5',
      decimal: 'list-decimal ps-5',
      none: 'list-none',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-md',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    tone: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      subtle: 'text-secondary-foreground',
      primary: 'text-primary',
      destructive: 'text-destructive',
    },
  },
  compoundVariants: [
    { as: 'ul', marker: 'auto', class: 'list-disc ps-5' },
    { as: 'ol', marker: 'auto', class: 'list-[revert] ps-5' },
  ],
  defaultVariants: {
    as: 'ul',
    gap: 'sm',
    marker: 'auto',
    size: 'md',
    tone: 'default',
  },
});

const elements = {
  ol: ark.ol,
  ul: ark.ul,
} as const;

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'ol'> {
  as?: 'ul' | 'ol';
  class?: HTMLAttributes['class'];
  gap?: ListGap;
  marker?: ListMarker;
  role?: HTMLAttributes['role'];
  size?: ListSize;
  tone?: ListTone;
}

const {
  as: elementName,
  class: className,
  gap = 'sm',
  marker,
  role,
  size = 'md',
  tone = 'default',
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const element = computed(() => elements[elementName ?? 'ul']);
const markerValue = computed(() => marker ?? 'auto');
const listRole = computed(() => role ?? (markerValue.value === 'none' ? 'list' : undefined));
const rootClass = computed(() =>
  cn(
    listVariants({
      as: elementName === 'ol' ? 'ol' : 'ul',
      gap,
      marker: markerValue.value,
      size,
      tone,
    }),
    className,
  ),
);
</script>

<template>
  <component
    :is="element"
    v-bind="attrs"
    :class="rootClass"
    :role="listRole"
    data-scope="list"
    data-part="root"
    data-slot="list-root"
    :data-gap="gap"
    :data-marker="markerValue"
    :data-size="size"
    :data-tone="tone"
  >
    <slot />
  </component>
</template>