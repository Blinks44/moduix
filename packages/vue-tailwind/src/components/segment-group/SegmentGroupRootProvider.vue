<script setup lang="ts">
import { SegmentGroupRootProvider as ArkSegmentGroupRootProvider } from '@ark-ui/vue/segment-group';
import type { SegmentGroupRootProviderProps } from '@ark-ui/vue/segment-group';
import { useAttrs } from 'vue';
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/moduix/cn';
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
const rootClass =
  'group/segment-group isolate inline-flex max-w-full gap-1 rounded-lg border border-border bg-muted p-1 text-foreground [--_segment-group-size:var(--moduix-size-md)] data-disabled:opacity-disabled data-invalid:border-destructive data-[orientation=vertical]:flex-col data-[size=lg]:[--_segment-group-size:var(--moduix-size-lg)] data-[size=sm]:[--_segment-group-size:var(--moduix-size-sm)]';
</script>

<template>
  <ArkSegmentGroupRootProvider
    v-bind="attrs"
    :class="cn(rootClass, className)"
    :data-size="size"
    :value="value"
    data-slot="segment-group-root-provider"
  >
    <slot />
  </ArkSegmentGroupRootProvider>
</template>