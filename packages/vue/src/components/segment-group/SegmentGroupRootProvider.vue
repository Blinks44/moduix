<script setup lang="ts">
import { SegmentGroupRootProvider as ArkSegmentGroupRootProvider } from '@ark-ui/vue/segment-group';
import type { SegmentGroupRootProviderProps } from '@ark-ui/vue/segment-group';
import { clsx } from 'clsx';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import styles from './SegmentGroup.module.css';
import type { SegmentGroupSize } from './SegmentGroup.vue';

defineOptions({ inheritAttrs: false });

export interface Props extends /* @vue-ignore */ SegmentGroupRootProviderProps {
  class?: HTMLAttributes['class'];
  size?: SegmentGroupSize;
  value: SegmentGroupRootProviderProps['value'];
}

const { class: className, size = 'md', value } = defineProps<Props>();
defineSlots<{ default?: () => unknown }>();

const attrs = useAttrs();
</script>

<template>
  <ArkSegmentGroupRootProvider
    v-bind="attrs"
    :class="clsx(styles.root, className)"
    :data-size="size"
    :value="value"
    data-slot="segment-group-root-provider"
  >
    <slot />
  </ArkSegmentGroupRootProvider>
</template>