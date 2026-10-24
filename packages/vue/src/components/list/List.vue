<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './List.module.css';

export type ListElement = 'ul' | 'ol';
export type ListMarker = 'disc' | 'decimal' | 'none';
export type ListGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ListTone = 'default' | 'muted' | 'primary' | 'destructive';

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
    :class="clsx(styles.root, className)"
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