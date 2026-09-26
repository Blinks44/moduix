<script setup lang="ts">
import { CollapsibleRootProvider as ArkCollapsibleRootProvider } from '@ark-ui/vue/collapsible';
import type { CollapsibleRootProviderProps } from '@ark-ui/vue/collapsible';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Collapsible.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ CollapsibleRootProviderProps {
  class?: HTMLAttributes['class'];
  value: CollapsibleRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkCollapsibleRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="collapsible-root-provider"
  >
    <slot />
  </ArkCollapsibleRootProvider>
</template>