<script setup lang="ts">
import { SegmentGroupRootProvider as ArkSegmentGroupRootProvider } from '@ark-ui/vue/segment-group';
import type { SegmentGroupRootProviderProps } from '@ark-ui/vue/segment-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './SegmentGroup.module.css';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SegmentGroupRootProviderProps {
  asChild?: boolean;
  class?: HTMLAttributes['class'];
  value: SegmentGroupRootProviderProps['value'];
}

const { asChild = undefined, class: className, value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSegmentGroupRootProvider
    v-bind="attrs"
    :as-child="asChild"
    :class="clsx(styles.root, className)"
    :value="value"
    data-slot="segment-group-root-provider"
  >
    <slot />
  </ArkSegmentGroupRootProvider>
</template>