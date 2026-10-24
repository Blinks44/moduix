<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { cva } from 'class-variance-authority';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';

export type ListElement = 'ul' | 'ol';
export type ListMarker = 'disc' | 'decimal' | 'none';
export type ListGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ListTone = 'default' | 'muted' | 'primary' | 'destructive';

const listVariants = cva(
  [
    'flex flex-col gap-(--_list-gap) ps-5 font-regular tracking-normal break-words',
    '[&>li>:is(ul,ol)]:mt-(--_list-gap)',
    '[&>li:has(>[data-slot=list-indicator])]:flex [&>li:has(>[data-slot=list-indicator])]:items-start',
  ],
  {
    variants: {
      marker: {
        disc: 'list-disc',
        decimal: 'list-decimal',
        none: 'list-none ps-0',
      },
      gap: {
        xs: '[--_list-gap:var(--moduix-spacing-1)]',
        sm: '[--_list-gap:var(--moduix-spacing-2)]',
        md: '[--_list-gap:var(--moduix-spacing-3)]',
        lg: '[--_list-gap:var(--moduix-spacing-4)]',
        xl: '[--_list-gap:var(--moduix-spacing-5)]',
        '2xl': '[--_list-gap:var(--moduix-spacing-6)]',
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
        primary: 'text-primary',
        destructive: 'text-destructive',
      },
    },
  },
);

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ HTMLArkProps<'ol'> {
  as?: ListElement;
  class?: HTMLAttributes['class'];
  gap?: ListGap;
  marker?: ListMarker;
  role?: HTMLAttributes['role'];
  size?: ListSize;
  tone?: ListTone;
}

const {
  as = 'ul',
  class: className,
  gap = 'sm',
  marker,
  role,
  size = 'md',
  tone = 'default',
} = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
const markerValue = computed(() => marker ?? (as === 'ol' ? 'decimal' : 'disc'));
</script>

<template>
  <component
    :is="ark[as]"
    v-bind="attrs"
    :class="cn(listVariants({ marker: markerValue, gap, size, tone }), className)"
    :role="role ?? (markerValue === 'none' ? 'list' : undefined)"
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