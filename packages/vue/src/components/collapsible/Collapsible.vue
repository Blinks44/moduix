<script setup lang="ts">
import { CollapsibleRoot as ArkCollapsibleRoot } from '@ark-ui/vue/collapsible';
import type { CollapsibleRootEmits, CollapsibleRootProps } from '@ark-ui/vue/collapsible';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Collapsible.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CollapsibleRootProps {
  class?: HTMLAttributes['class'];
}

export interface Emits extends /* @vue-ignore */ CollapsibleRootEmits {}

const { class: className } = defineProps<Props>();
defineEmits<Emits>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCollapsibleRoot
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    data-slot="collapsible-root"
  >
    <slot />
  </ArkCollapsibleRoot>
</template>