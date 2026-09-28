<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory';
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { clsx } from 'clsx';
import { computed, useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './List.module.css';

type ListMarker = 'disc' | 'decimal' | 'none';
type ListGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ListSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ListTone = 'default' | 'muted' | 'subtle' | 'primary' | 'destructive';

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
</script>

<template>
  <component
    :is="element"
    v-bind="attrs"
    :class="clsx(styles.root, className)"
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