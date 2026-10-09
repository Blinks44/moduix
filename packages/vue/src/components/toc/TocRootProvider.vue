<script setup lang="ts">
import { TocRootProvider as ArkTocRootProvider } from '@ark-ui/vue/toc';
import type { TocRootProviderProps } from '@ark-ui/vue/toc';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './Toc.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ TocRootProviderProps {
  class?: HTMLAttributes['class'];
  value: TocRootProviderProps['value'];
}

const { class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkTocRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="toc-root-provider"
  >
    <slot />
  </ArkTocRootProvider>
</template>